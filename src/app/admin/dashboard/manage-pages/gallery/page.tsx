import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { GalleryEditor } from "@/components/admin/pages/gallery/GalleryEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery Page Editor | QuickWay Ride CMS",
  description: "Manage fleet and tour gallery images with Draft to Publish workflow.",
};

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export default async function GalleryEditorPage() {
  const { userId, email, role } = await getCurrentUserRole();

  if (!userId || role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <GalleryEditor />
    </DashboardLayout>
  );
}
