import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ChangePasswordForm } from "@/components/admin/auth/ChangePasswordForm";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Change Password | QuickWay Ride CMS",
  description: "Securely change QuickWay Ride administrator account password.",
};

export default async function ChangePasswordPage() {
  const { userId, email, role } = await getCurrentUserRole();

  // Server-side auth guard
  if (!userId || !role) {
    redirect("/admin/login?error=unauthorized_role");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <ChangePasswordForm />
    </DashboardLayout>
  );
}
