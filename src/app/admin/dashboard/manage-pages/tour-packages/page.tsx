import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { TourPackagesEditor } from "@/components/admin/pages/packages/TourPackagesEditor";

export const metadata: Metadata = {
  title: "Tour Packages Management | QuickWay Ride CMS",
  description: "Manage tour packages shown on the public website with Draft to Publish workflow.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function TourPackagesEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <TourPackagesEditor />
    </DashboardLayout>
  );
}
