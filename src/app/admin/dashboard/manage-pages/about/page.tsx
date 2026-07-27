import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { AboutEditor } from "@/components/admin/pages/about/AboutEditor";

export const metadata: Metadata = {
  title: "About Us Management | QuickWay Ride CMS",
  description: "Manage company information, brand story, mission & vision text with Draft to Publish workflow.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function AboutEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <AboutEditor />
    </DashboardLayout>
  );
}
