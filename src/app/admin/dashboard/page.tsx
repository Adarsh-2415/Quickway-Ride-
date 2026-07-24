import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { WelcomeSection } from "@/components/admin/layout/WelcomeSection";
import { DashboardStats } from "@/components/admin/layout/DashboardStats";

export const metadata: Metadata = {
  title: "Admin Dashboard | QuickWay Ride CMS",
  description: "Enterprise Administration Center for QuickWay Ride.",
};

export default async function AdminDashboardPage() {
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
      {/* Welcome Banner */}
      <WelcomeSection />

      {/* 3 Core Statistics Cards */}
      <DashboardStats />
    </DashboardLayout>
  );
}
