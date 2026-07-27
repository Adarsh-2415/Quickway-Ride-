import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { BookingTable } from "@/components/admin/bookings/BookingTable";

import { getCurrentUserRole } from "@/lib/auth/serverAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Bookings | QuickWay Ride CMS",
  description: "View customer ride booking requests submitted through QuickWay Ride.",
};

export default async function ManageBookingsPage() {
  const { userId, email, role } = await getCurrentUserRole();

  // Dual-Layer Server-Side Auth Guard: Direct unauthenticated URL access redirects to /admin/login
  if (!userId || !role) {
    redirect("/admin/login?error=unauthorized_role");
  }

  return (
    <DashboardLayout userEmail={email} userRole={role}>
      <BookingTable />
    </DashboardLayout>
  );
}
