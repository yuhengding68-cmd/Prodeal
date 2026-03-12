import express from "express";
import crypto from "node:crypto";
import helmet from "helmet";
import Stripe from "stripe";
import { getSupabase } from "./lib/supabase.js";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");

const CHECKOUT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const CHECKOUT_IDEMPOTENCY_WINDOW_MS = 15 * 60 * 1000;
const CHECKOUT_RATE_LIMIT_MAX_REQUESTS = 5;
const VALID_PLANS = new Set(["Basic $39", "Premium $129"]);
const MAX_FIELD_LENGTHS = {
    name: 120,
    email: 254,
    whatsapp: 32,
    description: 2000,
} as const;

const checkoutRequests = new Map<string, number[]>();
const CHECKOUT_ALLOWED_CONTENT_TYPE = "application/json";

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
    if (!stripeClient) {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) {
            throw new Error('STRIPE_SECRET_KEY environment variable is required');
        }
        stripeClient = new Stripe(key);
    }
    return stripeClient;
}

app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production"
        ? {
            directives: {
                baseUri: ["'self'"],
                connectSrc: ["'self'"],
                defaultSrc: ["'self'"],
                fontSrc: ["'self'", "data:", "https:"],
                formAction: ["'self'", "https://checkout.stripe.com"],
                frameAncestors: ["'none'"],
                frameSrc: ["https://checkout.stripe.com"],
                imgSrc: ["'self'", "data:", "https:"],
                objectSrc: ["'none'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                upgradeInsecureRequests: [],
            },
        }
        : false,
    crossOriginEmbedderPolicy: false,
    hsts: false,
}));

function cleanupExpiredRequests(now: number, timestamps: number[]): number[] {
    return timestamps.filter((timestamp) => now - timestamp < CHECKOUT_RATE_LIMIT_WINDOW_MS);
}

function rateLimitCheckout(req: express.Request, res: express.Response, next: express.NextFunction) {
    const now = Date.now();
    const requestKey = req.ip || "unknown";
    const recentRequests = cleanupExpiredRequests(now, checkoutRequests.get(requestKey) || []);

    if (recentRequests.length >= CHECKOUT_RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({
            error: "Too many checkout attempts. Please wait a few minutes and try again.",
        });
    }

    recentRequests.push(now);
    checkoutRequests.set(requestKey, recentRequests);
    next();
}

type CheckoutPayload = {
    birthday: string;
    description: string;
    email: string;
    name: string;
    plan: "Basic $39" | "Premium $129";
    whatsapp: string;
};

function normalizeString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function validateCheckoutPayload(body: unknown): CheckoutPayload {
    if (!body || typeof body !== "object") {
        throw new Error("Invalid request payload.");
    }

    const payload = body as Record<string, unknown>;
    const plan = normalizeString(payload.plan);
    const name = normalizeString(payload.name);
    const birthday = normalizeString(payload.birthday);
    const email = normalizeString(payload.email).toLowerCase();
    const whatsapp = normalizeString(payload.whatsapp);
    const description = normalizeString(payload.description);

    if (!VALID_PLANS.has(plan)) {
        throw new Error("Please choose a valid plan.");
    }
    if (!name || name.length > MAX_FIELD_LENGTHS.name) {
        throw new Error("Please provide a valid full name.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
        throw new Error("Please provide a valid date of birth.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX_FIELD_LENGTHS.email) {
        throw new Error("Please provide a valid email address.");
    }
    if (!/^[\d+\-\s()]{7,32}$/.test(whatsapp) || whatsapp.length > MAX_FIELD_LENGTHS.whatsapp) {
        throw new Error("Please provide a valid WhatsApp number.");
    }
    if (!description || description.length > MAX_FIELD_LENGTHS.description) {
        throw new Error("Please provide a concise problem description.");
    }

    return {
        birthday,
        description,
        email,
        name,
        plan: plan as CheckoutPayload["plan"],
        whatsapp,
    };
}

function createCheckoutIdempotencyKey(payload: CheckoutPayload): string {
    const timeBucket = Math.floor(Date.now() / CHECKOUT_IDEMPOTENCY_WINDOW_MS);
    return crypto
        .createHash("sha256")
        .update(JSON.stringify({ payload, timeBucket }))
        .digest("hex");
}

// Stripe webhook must use raw body
app.post('/api/webhook', express.raw({ type: 'application/json', limit: '256kb' }), async (req, res) => {
    const stripe = getStripe();
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is missing');
        return res.status(400).send('Webhook secret missing');
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== 'paid') {
            return res.send();
        }

        // Update the record in Supabase
        try {
            const supabase = getSupabase();
            if (!supabase) {
                return res.send();
            }
            const { error } = await supabase
                .from('orders')
                .update({ payment_status: 'paid' })
                .eq('stripe_session_id', session.id);

            if (error) throw error;
            console.log(`Order ${session.id} marked as paid`);
        } catch (dbError) {
            console.error('Error updating order status in Supabase:', dbError);
        }
    }

    res.send();
});

// Middleware for parsing JSON bodies for other routes
app.use(express.json({ limit: '16kb' }));

// API routes FIRST
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/create-checkout-session", rateLimitCheckout, async (req, res) => {
    let session: Stripe.Checkout.Session | null = null;

    try {
        if (!req.is(CHECKOUT_ALLOWED_CONTENT_TYPE)) {
            return res.status(415).json({
                error: "Requests must use application/json.",
            });
        }

        const { plan, name, birthday, email, whatsapp, description } = validateCheckoutPayload(req.body);

        const stripe = getStripe();

        let priceAmount = 3900; // $39.00
        let productName = "Basic Consultation";

        if (plan.includes("129")) {
            priceAmount = 12900; // $129.00
            productName = "Premium Sourcing";
        }

        session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: productName,
                            description: `Consultation for ${name}`,
                        },
                        unit_amount: priceAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.APP_URL || 'http://localhost:3000'}?success=true`,
            cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}?canceled=true`,
            customer_email: email.includes('@') ? email : undefined,
            metadata: {
                plan,
                name,
                birthday,
                email,
                whatsapp,
                description
            }
        }, {
            idempotencyKey: createCheckoutIdempotencyKey({
                birthday,
                description,
                email,
                name,
                plan,
                whatsapp,
            }),
        });

        // Save pending order to Supabase
        const supabase = getSupabase();
        if (supabase) {
            if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
                const { data: existingOrder, error: lookupError } = await supabase
                    .from('orders')
                    .select('stripe_session_id')
                    .eq('stripe_session_id', session.id)
                    .maybeSingle();

                if (lookupError) {
                    throw new Error(`Unable to verify existing order: ${lookupError.message}`);
                }

                if (existingOrder) {
                    return res.json({ url: session.url });
                }
            }

            const { error } = await supabase.from('orders').insert({
                name,
                email,
                whatsapp,
                birthday,
                plan,
                description,
                stripe_session_id: session.id,
                payment_status: 'pending'
            });
            if (error) {
                throw new Error(`Unable to save order: ${error.message}`);
            }
        }

        res.json({ url: session.url });
    } catch (error: any) {
        if (session?.id) {
            try {
                await getStripe().checkout.sessions.expire(session.id);
            } catch (expireError) {
                console.error("Failed to expire checkout session:", expireError);
            }
        }
        const message = error instanceof Error ? error.message : "";
        const isValidationError = [
            "Please choose a valid plan.",
            "Please provide a valid full name.",
            "Please provide a valid date of birth.",
            "Please provide a valid email address.",
            "Please provide a valid WhatsApp number.",
            "Please provide a concise problem description.",
            "Invalid request payload.",
        ].includes(message);

        if (isValidationError) {
            console.warn("Checkout validation failed:", message);
        } else {
            console.error("Checkout session error:", error);
        }

        res.status(isValidationError ? 400 : 500).json({
            error: isValidationError
                ? message
                : "Unable to create checkout session. Please try again shortly.",
        });
    }
});

export default app;
