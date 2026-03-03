import express from "express";
import Stripe from "stripe";
import { getSupabase } from "../src/lib/supabase.js";

const app = express();

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

// Stripe webhook must use raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
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

        // Update the record in Supabase
        try {
            const supabase = getSupabase();
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
app.use(express.json());

// API routes FIRST
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const { plan, name, birthday, email, whatsapp, description } = req.body;

        const stripe = getStripe();

        let priceAmount = 3900; // $39.00
        let productName = "Basic Consultation";

        if (plan.includes("129")) {
            priceAmount = 12900; // $129.00
            productName = "Premium Sourcing";
        }

        const session = await stripe.checkout.sessions.create({
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
        });

        // Save pending order to Supabase
        try {
            const supabase = getSupabase();
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
                console.error('Error inserting pending order to Supabase:', error);
            }
        } catch (dbError) {
            console.error('Exception inserting pending order to Supabase:', dbError);
        }

        res.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: error.message || "An error occurred during checkout" });
    }
});

export default app;
