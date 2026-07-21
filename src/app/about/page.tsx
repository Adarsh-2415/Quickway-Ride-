import React from "react";
import { Metadata } from "next";
import { AboutHero } from "@/components/features/about/AboutHero";
import { StatsCounter } from "@/components/features/about/StatsCounter";
import { MissionVision } from "@/components/features/about/MissionVision";
import { AboutFleetGrid } from "@/components/features/about/AboutFleetGrid";
import { CoverageCities } from "@/components/features/about/CoverageCities";
import { WhyChooseUs } from "@/components/features/about/WhyChooseUs";
import { AboutCTA } from "@/components/features/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | QuickWay Ride - Premium Uttarakhand Taxi & Travel Platform",
  description:
    "Learn about QuickWay Ride (Established 2024). Providing safe, reliable outstation cabs, airport transfers, and group tour travel across 26+ cities including Roorkee, Dehradun, Haridwar, Saharanpur & Delhi.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Banner */}
      <AboutHero />

      {/* 2. Glassmorphism Metric Stats Bar */}
      <StatsCounter />

      {/* 3. Company Story, Mission & Vision */}
      <MissionVision />

      {/* 4. Fleet Vehicle Attributes Showcase */}
      <AboutFleetGrid />

      {/* 5. 26+ Service Cities Coverage Network */}
      <CoverageCities />

      {/* 6. Why Choose Us Advantages */}
      <WhyChooseUs />

      {/* 7. Conversion CTA Banner */}
      <AboutCTA />
    </main>
  );
}
