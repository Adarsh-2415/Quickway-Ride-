import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PricingGrid } from "@/components/features/pricing/PricingGrid";
import { Sparkles, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Oneway Taxi Rate List | QuickWay Ride Dehradun Cabs",
  description:
    "Official fixed one-way cab fares from Dehradun to 36 major destinations across India including Delhi, Airport, Mussoorie, Rishikesh, Haridwar & Chandigarh.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Dark Luxury Hero Header */}
      <section className="relative bg-slate-950 py-16 sm:py-20 text-white overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />
        
        <Container className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Official Fixed Rates</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            For Oneway Travel Rate List
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Transparent fixed one-way cab rates starting from <strong>Dehradun</strong> across 36 major destinations in Sedan, Ertiga, and Innova Crysta.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> 36 Destinations
            </span>
            <span>•</span>
            <span>Zero Hidden Charges</span>
            <span>•</span>
            <span>24/7 Verified Chauffeurs</span>
          </div>
        </Container>
      </section>

      {/* Main Pricing Grid Section */}
      <Section variant="default" padding="normal">
        <Container>
          <PricingGrid />
        </Container>
      </Section>

    </main>
  );
}
