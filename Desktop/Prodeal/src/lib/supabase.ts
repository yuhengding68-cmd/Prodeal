import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!supabaseClient) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.warn('SUPABASE_URL or SUPABASE_ANON_KEY environment variable is missing.');
            // Fallback for build time if needed
            supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key');
        } else {
            supabaseClient = createClient(supabaseUrl, supabaseKey);
        }
    }
    return supabaseClient;
}
