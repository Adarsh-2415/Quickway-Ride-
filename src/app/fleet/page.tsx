import React from "react";
import { Metadata } from "next";
import { FleetHero } from "@/components/features/fleet/FleetHero";
import { FleetGrid } from "@/components/features/fleet/FleetGrid";
import { FleetFeatures } from "@/components/features/fleet/FleetFeatures";
import { FleetCTA } from "@/components/features/fleet/FleetCTA";

export const metadata: Metadata = {
  title: "Fleet Directory | QuickWay Ride - Sedans, MPVs, Innova & Tempo Travellers",
  description:
    "Explore the premium fleet roster at QuickWay Ride. Modern Sedans (Dzire, Aura), 7-Seater MPVs (Ertiga, Rumion), Luxury Innova Crysta, and 12-26 Seater Force Urbania Tempo Travellers.",
};

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Header */}
      <FleetHero />

      {/* 2. Interactive Fleet Grid & Specs Modal */}
      <FleetGrid />

      {/* 3. Fleet Safety & Quality Standard */}
      <FleetFeatures />

      {/* 4. Conversion CTA Banner */}
      <FleetCTA />
    </main>
  );
}
