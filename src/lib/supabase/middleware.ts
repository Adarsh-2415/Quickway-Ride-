import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { isRouteAllowedForRole, ALLOWED_ROLES, UserRole } from "@/lib/auth/permissions";

/**
 * Creates a Service Role client for middleware role verification
 */
function getMiddlewareServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    return createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://quickway-ride-demo.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key-quickway-ride-platform";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options as any)
        );
      },
    },
  });

  // Refresh auth token and get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protect all /admin/* routes except public auth endpoints (/admin/login & /admin/forgot-password)
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!user && !isAuthPage) {
      // Unauthenticated user trying to access protected admin page -> redirect to login
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // If user is logged in, resolve role first
    let resolvedRole: UserRole | null = null;
    if (user) {
      const serviceClient = getMiddlewareServiceRoleClient();
      const clientToUse = serviceClient || supabase;

      try {
        const { data: profile } = await clientToUse
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile && profile.role) {
          const roleStr = profile.role.toString().trim().toLowerCase();
          if (ALLOWED_ROLES.includes(roleStr as UserRole)) {
            resolvedRole = roleStr as UserRole;
          }
        }
      } catch (err) {
        console.error("[RBAC Middleware] Error reading profiles table:", err);
      }

      // Fallback check user_metadata.role if profile table entry is unpopulated
      if (!resolvedRole && user.user_metadata?.role) {
        const metaRole = user.user_metadata.role.toString().trim().toLowerCase();
        if (ALLOWED_ROLES.includes(metaRole as UserRole)) {
          resolvedRole = metaRole as UserRole;
        }
      }

      // Auto-heal profile sync for primary admin and client accounts if missing in profiles table
      if (!resolvedRole) {
        const uEmail = (user.email || "").toLowerCase();
        if (uEmail === "ankulrocksclub@gmail.com") {
          resolvedRole = "admin";
          clientToUse.from("profiles").upsert({ id: user.id, email: uEmail, role: "admin" }).then();
        } else if (uEmail === "info@quickwayride.com") {
          resolvedRole = "client";
          clientToUse.from("profiles").upsert({ id: user.id, email: uEmail, role: "client" }).then();
        }
      }
    }

    // Authenticated user trying to access login / forgot-password page
    if (user && isAuthPage) {
      // Only redirect to dashboard if the user has a valid, authorized role!
      if (resolvedRole && ALLOWED_ROLES.includes(resolvedRole)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      }
      // If user lacks a valid role, allow them to stay on login page to re-authenticate or view error
      return supabaseResponse;
    }

    // Role-Based Access Control (RBAC) Route Authorization for protected admin routes
    if (user && !isAuthPage) {
      // ZERO-TRUST STRICT ENFORCEMENT: Never default to "admin".
      if (!resolvedRole || !ALLOWED_ROLES.includes(resolvedRole)) {
        console.warn(`[RBAC Middleware] Zero-trust DENY: User ${user.email} (ID: ${user.id}) has invalid/missing role ("${resolvedRole}").`);
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "unauthorized_role");
        return NextResponse.redirect(url);
      }

      // Check route authorization using Centralized Single Source of Truth
      const isAllowed = isRouteAllowedForRole(resolvedRole, pathname);
      if (!isAllowed) {
        console.warn(`[RBAC Middleware] Access DENIED: Role "${resolvedRole}" attempted to access restricted route "${pathname}". Redirecting to dashboard.`);
        const url = request.nextUrl.clone();
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
