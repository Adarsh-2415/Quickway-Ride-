import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ServicesEditor } from "@/components/admin/pages/services/ServicesEditor";

export const metadata: Metadata = {
  title: "Services Management | QuickWay Ride CMS",
  description: "Manage travel services and page content with Draft to Publish workflow.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function ServicesEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <ServicesEditor />
    </DashboardLayout>
  );
}
