"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Returns a singleton browser client for Supabase.
 * Uses NEXT_PUBLIC_* env vars.
 */
export function supabaseBrowser() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase;
}
