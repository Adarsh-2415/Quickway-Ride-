import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { WelcomeSection } from "@/components/admin/layout/WelcomeSection";
import { DashboardStats } from "@/components/admin/layout/DashboardStats";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | QuickWay Ride CMS",
  description: "Enterprise Administration Center for QuickWay Ride.",
};

export default async function AdminDashboardPage() {
  const { userId, email, role } = await getCurrentUserRole();

  // Zero-Trust Server Guard: User must be authenticated and have an assigned valid role
  if (!userId || !role) {
    redirect("/admin/login?error=unauthorized_role");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      {/* Welcome Banner */}
      <WelcomeSection />

      {/* 3 Core Statistics Cards */}
      <DashboardStats />
    </DashboardLayout>
  );
}
