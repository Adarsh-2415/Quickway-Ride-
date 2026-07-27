import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ManagePagesGrid } from "@/components/admin/pages/ManagePagesGrid";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Pages | QuickWay Ride CMS",
  description: "Manage and organize all public website pages from one central location.",
};

export default async function ManagePagesPage() {
  const { userId, email, role } = await getCurrentUserRole();

  // Dual-Layer Server Auth Guard: Direct unauthenticated URL access redirects to /admin/login
  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <ManagePagesGrid />
    </DashboardLayout>
  );
}
