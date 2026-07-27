export type UserRole = "admin" | "client";

export const ALLOWED_ROLES: UserRole[] = ["admin", "client"];

/**
 * Centralized Single Source of Truth for Role Permissions
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["*"], // Super Admin has unrestricted access to all routes
  client: [
    "/admin/dashboard",
    "/admin/dashboard/manage-bookings",
    "/admin/dashboard/contact-queries",
    "/admin/dashboard/change-password",
  ],
};

/**
 * Validates if a user's role is authorized to access a given route
 */
export function isRouteAllowedForRole(role: string | undefined | null, pathname: string): boolean {
  if (!role || !ALLOWED_ROLES.includes(role as UserRole)) {
    return false; // Zero-trust: Unknown or unassigned role is denied immediately
  }

  const userRole = role as UserRole;
  if (userRole === "admin") return true;

  const allowedRoutes = ROLE_PERMISSIONS.client;
  return allowedRoutes.some((route) => {
    if (pathname === route) return true;
    // Allow subroutes of allowed client paths (e.g. /admin/dashboard/manage-bookings/123)
    if (route !== "/admin/dashboard" && pathname.startsWith(`${route}/`)) return true;
    return false;
  });
}
