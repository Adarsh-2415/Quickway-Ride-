import React from "react";
import type { Metadata } from "next";
import { AboutHero } from "@/components/features/about/AboutHero";
import { StatsCounter } from "@/components/features/about/StatsCounter";
import { MissionVision } from "@/components/features/about/MissionVision";
import { AboutFleetGrid } from "@/components/features/about/AboutFleetGrid";
import { CoverageCities } from "@/components/features/about/CoverageCities";
import { WhyChooseUs } from "@/components/features/about/WhyChooseUs";
import { AboutCTA } from "@/components/features/about/AboutCTA";
import { fetchAboutPageContentAction } from "@/actions/about";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us | QuickWay Ride - Premium Uttarakhand Taxi & Travel Platform",
  description:
    "Learn about QuickWay Ride (Established 2024). Providing safe, reliable outstation cabs, airport transfers, and group tour travel across 26+ cities including Roorkee, Dehradun, Haridwar, Saharanpur & Delhi.",
};

export default async function AboutPage() {
  const cRes = await fetchAboutPageContentAction("public");
  const content = cRes.data;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Banner */}
      <AboutHero content={content} />

      {/* 2. Glassmorphism Metric Stats Bar */}
      <StatsCounter content={content} />

      {/* 3. Company Story, Mission & Vision */}
      <MissionVision content={content} />

      {/* 4. Fleet Vehicle Attributes Showcase */}
      <AboutFleetGrid content={content} />

      {/* 5. 26+ Service Cities Coverage Network */}
      <CoverageCities content={content} />

      {/* 6. Why Choose Us Advantages */}
      <WhyChooseUs content={content} />

      {/* 7. Conversion CTA Banner */}
      <AboutCTA content={content} />
    </main>
  );
}
