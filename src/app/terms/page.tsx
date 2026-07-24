import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Terms & Conditions | QuickWay Ride",
  description: "Terms and Conditions governing taxi bookings and transport services with QuickWay Ride.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Terms of Service
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Terms & Conditions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Please read these terms carefully before booking a cab with QuickWay Ride.
          </p>
        </Container>
      </section>

      <Section variant="default" padding="normal">
        <Container className="max-w-4xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">1. Taxi Booking Guidelines</h2>
          <p>
            All taxi reservations booked via QuickWay Ride website, phone, or WhatsApp are subject to vehicle availability and route feasibility. Passengers are advised to confirm pickup time at least 2 hours in advance for airport and railway station transfers.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">2. Fare & Toll Tax Policy</h2>
          <p>
            One-Way flat fares cover vehicle rent, fuel, and driver charges. State entry tax, toll booth taxes, and parking fees (if applicable) are specified transparently during booking or paid directly as per local toll receipts.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">3. Passenger Responsibilities</h2>
          <p>
            Passengers are responsible for their personal belongings. QuickWay Ride drivers maintain commercial tourist licenses and strict safety guidelines. Smoking or consumption of illegal substances inside vehicles is strictly prohibited.
          </p>
        </Container>
      </Section>
    </main>
  );
}
