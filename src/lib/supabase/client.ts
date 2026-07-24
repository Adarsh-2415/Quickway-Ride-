import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a browser-side Supabase client instance.
 * @param rememberMe Optional flag to control session persistence.
 */
export function createClient(rememberMe: boolean = true) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://quickway-ride-demo.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key-quickway-ride-platform";

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: rememberMe,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
