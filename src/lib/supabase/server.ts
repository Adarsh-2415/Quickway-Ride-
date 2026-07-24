import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export interface CookieToSet {
  name: string;
  value: string;
  options?: CookieOptions;
}

/**
 * Creates a server-side Supabase instance for Server Components and Server Actions.
 */
export async function createServerClientInstance() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://quickway-ride-demo.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key-quickway-ride-platform";

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // Ignored if middleware refreshes user sessions on request.
        }
      },
    },
  });
}
