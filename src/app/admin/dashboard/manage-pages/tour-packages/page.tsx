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

export default async function TourPackagesEditorPage() {
  const supabase = await createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayout userEmail={user.email || "admin@quickwayride.com"}>
      <TourPackagesEditor />
    </DashboardLayout>
  );
}
