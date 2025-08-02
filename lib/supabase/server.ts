
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies as getCookies } from 'next/headers';

export async function createClient(cookieStore: ReturnType<typeof getCookies>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        async setAll(_cookiesToSet) {
          // No-op for server components – middleware handles session refresh
        },
      },
    }
  );
}
 } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(cookieStore: ReturnType<typeof cookies>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll()
        },
        async setAll() {
          // No-op on server components
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
