import React from "react";
import type { Metadata } from "next";
import { Eye } from "lucide-react";
import { ServicesHero } from "@/components/features/services/ServicesHero";
import { ServicesGrid } from "@/components/features/services/ServicesGrid";
import { ServiceDestinations } from "@/components/features/services/ServiceDestinations";
import { ServiceGuarantees } from "@/components/features/services/ServiceGuarantees";
import { ServicesCTA } from "@/components/features/services/ServicesCTA";
import { fetchServicesListAction, fetchServicesPageContentAction } from "@/actions/services";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | Services Offered",
  description: "Live Draft Preview for QuickWay Ride Services.",
};

export default async function ServicesPreviewPage() {
  const [sRes, cRes] = await Promise.all([
    fetchServicesListAction("admin"),
    fetchServicesPageContentAction("admin"),
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900 select-none">
      {/* Admin Preview Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md sticky top-0 z-50">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published Services Data</span>
      </div>

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
