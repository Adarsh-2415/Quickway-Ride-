import React from "react";
import type { Metadata } from "next";
import { ServicesHero } from "@/components/features/services/ServicesHero";
import { ServicesGrid } from "@/components/features/services/ServicesGrid";
import { ServiceDestinations } from "@/components/features/services/ServiceDestinations";
import { ServiceGuarantees } from "@/components/features/services/ServiceGuarantees";
import { ServicesCTA } from "@/components/features/services/ServicesCTA";
import { fetchServicesListAction, fetchServicesPageContentAction } from "@/actions/services";

export const metadata: Metadata = {
  title: "Services Offered | QuickWay Ride - Premium Taxi & Travel Platform",
  description:
    "Explore 17+ verified taxi and travel services by QuickWay Ride. Outstation one-way cabs, airport transfers, Char Dham Yatra, hill station tours, corporate delegations & Tempo Travellers across 26+ cities.",
};

export default async function ServicesPage() {
  const [sRes, cRes] = await Promise.all([
    fetchServicesListAction("public"),
    fetchServicesPageContentAction("public"),
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Banner */}
      <ServicesHero content={cRes.data} />

      {/* 2. 5-Category Interactive Services Grid & Modal */}
      <ServicesGrid services={sRes.data} />

      {/* 3. 26+ Destinations Coverage Grid */}
      <ServiceDestinations />

      {/* 4. Quality Guarantees */}
      <ServiceGuarantees
        badge={cRes.data?.guarantees_badge}
        heading={cRes.data?.guarantees_heading}
        items={cRes.data?.guarantees_list}
      />

      {/* 5. Conversion CTA Banner */}
      <ServicesCTA />
    </main>
  );
}
