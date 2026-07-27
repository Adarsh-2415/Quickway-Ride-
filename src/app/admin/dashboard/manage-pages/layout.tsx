import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function ManagePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, role } = await getCurrentUserRole();

  // Zero-trust server side check: Manage Pages & Editors are strictly restricted to Super Admin
  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return <>{children}</>;
}
