import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { FleetEditor } from "@/components/admin/pages/fleet/FleetEditor";

export const metadata: Metadata = {
  title: "Fleet Directory Management | QuickWay Ride CMS",
  description: "Manage fleet vehicles and page content with Draft to Publish workflow.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function FleetEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <FleetEditor />
    </DashboardLayout>
  );
}
