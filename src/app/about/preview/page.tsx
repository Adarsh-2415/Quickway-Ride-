import React from "react";
import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { AboutHero } from "@/components/features/about/AboutHero";
import { StatsCounter } from "@/components/features/about/StatsCounter";
import { MissionVision } from "@/components/features/about/MissionVision";
import { AboutFleetGrid } from "@/components/features/about/AboutFleetGrid";
import { CoverageCities } from "@/components/features/about/CoverageCities";
import { WhyChooseUs } from "@/components/features/about/WhyChooseUs";
import { AboutCTA } from "@/components/features/about/AboutCTA";
import { fetchAboutPageContentAction } from "@/actions/about";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | About Us",
  description: "Live Draft Preview for QuickWay Ride About Us Page.",
};

export default async function AboutPreviewPage() {
  const cRes = await fetchAboutPageContentAction("admin");
  const content = cRes.data;

  return (
    <main className="min-h-screen bg-white text-slate-900 select-none">
      {/* Admin Preview Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md sticky top-0 z-50">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published About Us Data</span>
      </div>

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
