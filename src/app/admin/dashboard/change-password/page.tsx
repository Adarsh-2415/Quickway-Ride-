import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ChangePasswordForm } from "@/components/admin/auth/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password | QuickWay Ride CMS",
  description: "Securely change QuickWay Ride administrator account password.",
};

export default async function ChangePasswordPage() {
  const supabase = await createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Server-side auth guard
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayout userEmail={user.email || "admin@quickwayride.com"}>
      <ChangePasswordForm />
    </DashboardLayout>
  );
}
