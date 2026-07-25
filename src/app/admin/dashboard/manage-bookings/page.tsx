import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/admin/layout/DashboardLayout";
import { BookingTable } from "@/components/admin/bookings/BookingTable";

export const metadata: Metadata = {
  title: "Manage Bookings | QuickWay Ride CMS",
  description: "View customer ride booking requests submitted through QuickWay Ride.",
};

export default async function ManageBookingsPage() {
  const supabase = await createServerClientInstance();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Dual-Layer Server-Side Auth Guard: Direct unauthenticated URL access redirects to /admin/login
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <DashboardLayout userEmail={user.email || "admin@quickwayride.com"}>
      <BookingTable />
    </DashboardLayout>
  );
}
