import React from "react";
import { Metadata } from "next";
import { ServicesHero } from "@/components/features/services/ServicesHero";
import { ServicesGrid } from "@/components/features/services/ServicesGrid";
import { ServiceDestinations } from "@/components/features/services/ServiceDestinations";
import { ServiceGuarantees } from "@/components/features/services/ServiceGuarantees";
import { ServicesCTA } from "@/components/features/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services Offered | QuickWay Ride - Premium Taxi & Travel Platform",
  description:
    "Explore 17+ verified taxi and travel services by QuickWay Ride. Outstation one-way cabs, 24/7 airport transfers, Char Dham Yatra, hill station tours, corporate delegations & Tempo Travellers across 26+ cities.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Banner */}
      <ServicesHero />

      {/* 2. 5-Category Interactive Services Grid & Modal */}
      <ServicesGrid />

      {/* 3. 26+ Destinations Coverage Grid */}
      <ServiceDestinations />

      {/* 4. Quality Guarantees */}
      <ServiceGuarantees />

      {/* 5. Conversion CTA Banner */}
      <ServicesCTA />
    </main>
  );
}
