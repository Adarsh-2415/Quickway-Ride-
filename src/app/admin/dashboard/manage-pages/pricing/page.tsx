import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { PricingEditor } from "@/components/admin/pages/pricing/PricingEditor";

export const metadata: Metadata = {
  title: "Pricing Rate List Editor | QuickWay Ride CMS",
  description: "Manage destination pricing fares for Sedan, Ertiga, and Innova Crysta.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function PricingEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <PricingEditor />
    </DashboardLayout>
  );
}
