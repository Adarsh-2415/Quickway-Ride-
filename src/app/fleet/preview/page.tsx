import React from "react";
import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { FleetHero } from "@/components/features/fleet/FleetHero";
import { FleetGrid } from "@/components/features/fleet/FleetGrid";
import { FleetFeatures } from "@/components/features/fleet/FleetFeatures";
import { FleetCTA } from "@/components/features/fleet/FleetCTA";
import { fetchFleetVehiclesAction, fetchFleetPageContentAction } from "@/actions/fleet";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | Fleet Directory",
  description: "Live Draft Preview for QuickWay Ride Fleet Directory.",
};

export default async function FleetPreviewPage() {
  const [vRes, cRes] = await Promise.all([
    fetchFleetVehiclesAction("admin"),
    fetchFleetPageContentAction("admin"),
  ]);

  const vehicles = (vRes.data || []).map((v) => ({
    ...v,
    image: v.image_url,
    tabCategory: v.tab_category,
    perKmRate: v.per_km_rate,
    idealFor: v.ideal_for,
    acType: v.ac_type,
    fuelType: v.fuel_type,
  }));

  return (
    <main className="min-h-screen bg-white text-slate-900 select-none">
      {/* Admin Preview Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md sticky top-0 z-50">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published Fleet Data</span>
      </div>

      {/* 1. Hero Header */}
      <FleetHero content={cRes.data} />

      {/* 2. Interactive Fleet Grid & Specs Modal */}
      <FleetGrid vehicles={vehicles} />

      {/* 3. Fleet Safety & Quality Standard */}
      <FleetFeatures
        badge={cRes.data?.features_badge}
        heading={cRes.data?.features_heading}
        items={cRes.data?.features_list}
      />

      {/* 4. Conversion CTA Banner */}
      <FleetCTA />
    </main>
  );
}
