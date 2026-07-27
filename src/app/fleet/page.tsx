import React from "react";
import type { Metadata } from "next";
import { FleetHero } from "@/components/features/fleet/FleetHero";
import { FleetGrid } from "@/components/features/fleet/FleetGrid";
import { FleetFeatures } from "@/components/features/fleet/FleetFeatures";
import { FleetCTA } from "@/components/features/fleet/FleetCTA";
import { fetchFleetVehiclesAction, fetchFleetPageContentAction } from "@/actions/fleet";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Fleet Directory | QuickWay Ride - Sedans, MPVs, Innova & Tempo Travellers",
  description:
    "Explore the premium fleet roster at QuickWay Ride. Modern Sedans (Dzire, Aura), 7-Seater MPVs (Ertiga, Rumion), Luxury Innova Crysta, and 12-26 Seater Force Urbania Tempo Travellers.",
};

export default async function FleetPage() {
  const [vRes, cRes] = await Promise.all([
    fetchFleetVehiclesAction("public"),
    fetchFleetPageContentAction("public"),
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
    <main className="min-h-screen bg-white text-slate-900">
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
