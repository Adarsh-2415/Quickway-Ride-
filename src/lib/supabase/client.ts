import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a client-side Supabase instance.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
