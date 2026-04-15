import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True only when both required env vars are present */
export const isSupabaseConfigured = url.startsWith('https://') && anon.length > 0;

// Public client — safe for browser + server reads (respects RLS)
export const supabase = isSupabaseConfigured
  ? createClient(url, anon)
  : createClient('https://placeholder.supabase.co', 'placeholder');

// Admin client — bypasses RLS for server-side writes (API routes only)
export const supabaseAdmin =
  isSupabaseConfigured && serviceKey
    ? createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : supabase;
