import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { PricingEditor } from "@/components/admin/pages/pricing/PricingEditor";

export const metadata: Metadata = {
  title: "Pricing Rate List Editor | QuickWay Ride CMS",
  description: "Manage destination pricing fares for Sedan, Ertiga, and Innova Crysta.",
};

export default async function PricingEditorPage() {
  const supabase = await createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayout userEmail={user.email || "admin@quickwayride.com"}>
      <PricingEditor />
    </DashboardLayout>
  );
}
