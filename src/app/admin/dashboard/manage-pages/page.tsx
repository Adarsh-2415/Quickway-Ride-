import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ManagePagesGrid } from "@/components/admin/pages/ManagePagesGrid";

export const metadata: Metadata = {
  title: "Manage Pages | QuickWay Ride CMS",
  description: "Manage and organize all public website pages from one central location.",
};

export default async function ManagePagesPage() {
  const supabase = await createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Dual-Layer Server Auth Guard: Direct unauthenticated URL access redirects to /admin/login
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayout userEmail={user.email || "admin@quickwayride.com"}>
      <ManagePagesGrid />
    </DashboardLayout>
  );
}
