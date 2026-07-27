import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { ContactQueriesTable } from "@/components/admin/contact/ContactQueriesTable";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Queries | QuickWay Ride CMS",
  description: "Manage QuickWay Ride website contact form submissions.",
};

export default async function ContactQueriesPage() {
  const { userId, email, role } = await getCurrentUserRole();

  // Server-side auth guard
  if (!userId || !role) {
    redirect("/admin/login?error=unauthorized_role");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <ContactQueriesTable />
    </DashboardLayout>
  );
}
