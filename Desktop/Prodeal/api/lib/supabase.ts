import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;
let didWarnMissingConfig = false;
let didWarnAnonFallback = false;

export function hasSupabaseConfig(): boolean {
    return Boolean(
        process.env.SUPABASE_URL
        && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY),
    );
}

function getSupabaseKey(): string | null {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceRoleKey) {
        return serviceRoleKey;
    }

    const anonKey = process.env.SUPABASE_ANON_KEY;
    if (anonKey && !didWarnAnonFallback) {
        console.warn('SUPABASE_SERVICE_ROLE_KEY is missing; falling back to SUPABASE_ANON_KEY.');
        didWarnAnonFallback = true;
    }

    return anonKey || null;
}

export function getSupabase(): SupabaseClient | null {
    const supabaseKey = getSupabaseKey();
    if (!process.env.SUPABASE_URL || !supabaseKey) {
        if (!didWarnMissingConfig) {
            console.warn('SUPABASE_URL and a Supabase API key are required.');
            didWarnMissingConfig = true;
        }
        return null;
    }

    if (!supabaseClient) {
        supabaseClient = createClient(
            process.env.SUPABASE_URL as string,
            supabaseKey,
        );
    }

    return supabaseClient;
}
