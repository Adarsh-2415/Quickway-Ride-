import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { HomeEditor } from "@/components/admin/pages/home/HomeEditor";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Page Management | QuickWay Ride CMS",
  description: "Manage Hero Slider Images, Testimonials, and FAQs with Draft to Publish workflow.",
};

export default async function HomeEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <HomeEditor />
    </DashboardLayout>
  );
}
