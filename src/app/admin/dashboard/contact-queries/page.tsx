import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ContactQueriesTable } from "@/components/admin/contact/ContactQueriesTable";

export const metadata: Metadata = {
  title: "Contact Queries | QuickWay Ride CMS",
  description: "Manage QuickWay Ride website contact form submissions.",
};

export default async function ContactQueriesPage() {
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
      <ContactQueriesTable />
    </DashboardLayout>
  );
}
