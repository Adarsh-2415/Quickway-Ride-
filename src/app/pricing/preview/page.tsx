import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PricingGrid } from "@/components/features/pricing/PricingGrid";
import { Tag, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | Official Oneway Taxi Rate List",
  description: "Live Draft Preview for QuickWay Ride Pricing Rate List.",
};

export default function PricingPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 select-none">
      {/* Admin Preview Ribbon */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published Pricing Rates</span>
      </div>

      {/* Dark Luxury Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-20 text-white overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />

        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Admin Rate List Preview</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            For Oneway Travel Rate List (Preview)
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Review live appearance of draft fares starting from <strong>Dehradun</strong> across destinations.
          </p>
        </Container>
      </section>

      {/* Main Pricing Grid Section with Admin Draft Mode */}
      <Section variant="default" padding="normal">
        <Container>
          <PricingGrid mode="admin" />
        </Container>
      </Section>
    </main>
  );
}
