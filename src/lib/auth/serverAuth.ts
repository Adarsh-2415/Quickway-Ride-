import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { UserRole, ALLOWED_ROLES } from "./permissions";

/**
 * Creates a Service Role client to bypass RLS restrictions when checking user roles from profiles table
 */
export function getServiceRoleSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    return createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return null;
}

/**
 * Single Source of Truth Server Auth Resolver:
 * Fetches authenticated user ID and queries the profiles table.
 * Zero-Trust: Returns role: null if user lacks an explicit valid role ('admin' | 'client').
 */
export async function getCurrentUserRole(): Promise<{ userId: string; email: string; role: UserRole | null }> {
  try {
    const supabase = await createServerClientInstance();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { userId: "", email: "", role: null };
    }

    // Always use Service Role client if available to ensure reliable profiles table lookup
    const serviceClient = getServiceRoleSupabaseClient();
    const clientToUse = serviceClient || supabase;

    // 1. Fetch role from dedicated profiles table (Primary Single Source of Truth)
    const { data: profile, error: profileError } = await clientToUse
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profileError && profile && profile.role) {
      const roleVal = profile.role.toString().trim().toLowerCase();
      if (ALLOWED_ROLES.includes(roleVal as UserRole)) {
        return { userId: user.id, email: user.email || "", role: roleVal as UserRole };
      }
    }

    // 2. Fallback: Check auth user_metadata.role if profile table entry is not populated
    const metaRole = user.user_metadata?.role?.toString().trim().toLowerCase();
    if (metaRole && ALLOWED_ROLES.includes(metaRole as UserRole)) {
      return { userId: user.id, email: user.email || "", role: metaRole as UserRole };
    }

    // 3. Auto-heal missing profiles for configured admin & client emails
    const userEmail = (user.email || "").toLowerCase();
    if (userEmail === "ankulrocksclub@gmail.com") {
      await clientToUse.from("profiles").upsert({ id: user.id, email: userEmail, role: "admin" });
      return { userId: user.id, email: userEmail, role: "admin" };
    }
    if (userEmail === "info@quickwayride.com") {
      await clientToUse.from("profiles").upsert({ id: user.id, email: userEmail, role: "client" });
      return { userId: user.id, email: userEmail, role: "client" };
    }

    // 3. ZERO-TRUST STRICT ENFORCEMENT: Never default to "admin". Return null if role is missing or invalid.
    console.warn(`[serverAuth] Zero-Trust Deny: User ${user.email} (ID: ${user.id}) has no valid role assigned.`);
    return { userId: user.id, email: user.email || "", role: null };
  } catch (err) {
    console.error("[serverAuth] Exception fetching user role:", err);
    return { userId: "", email: "", role: null };
  }
}

/**
 * Server Action Guard: Strictly requires Super Admin role ("admin")
 */
export async function requireAdminServerAction() {
  const { userId, role } = await getCurrentUserRole();
  if (!userId || role !== "admin") {
    throw new Error("403 Forbidden: Super Admin privileges are required to perform this action.");
  }
  return { userId, role };
}
