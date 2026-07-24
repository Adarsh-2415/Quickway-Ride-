import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickWay Ride",
  description: "Privacy Policy and Data Protection guidelines for QuickWay Ride taxi booking platform.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Legal & Compliance
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            How QuickWay Ride collects, uses, and safeguards your personal data.
          </p>
        </Container>
      </section>

      <Section variant="default" padding="normal">
        <Container className="max-w-4xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">1. Information We Collect</h2>
          <p>
            QuickWay Ride collects contact information (name, phone number, email) and travel itinerary details (pickup location, destination, date, time) solely to fulfill taxi booking requests and provide Chauffeur transport services.
          </p>
          
          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">2. Use of Information</h2>
          <p>
            Your information is strictly used for dispatching drivers, communicating trip updates via SMS/WhatsApp/Email, processing invoices, and providing customer support. We never sell or lease customer data to third-party advertisers.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">3. Data Security</h2>
          <p>
            We implement industry-standard encryption protocols and secure database access controls to safeguard your personal information against unauthorized access, disclosure, or alteration.
          </p>
        </Container>
      </Section>
    </main>
  );
}
