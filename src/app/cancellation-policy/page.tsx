import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Cancellation Policy | QuickWay Ride",
  description: "Cancellation policy rules and guidelines for QuickWay Ride taxi bookings.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Booking Flexibilty
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Cancellation Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Transparent cancellation terms designed for hassle-free travel planning.
          </p>
        </Container>
      </section>

      <Section variant="default" padding="normal">
        <Container className="max-w-4xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">1. Free Cancellation Window</h2>
          <p>
            Cancellations made up to 4 hours prior to the scheduled pickup time for local & outstation drops incur <strong>ZERO cancellation fee</strong>.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">2. Late Cancellation Fee</h2>
          <p>
            If a booking is cancelled within 4 hours of the scheduled pickup time or after driver vehicle dispatch, a nominal cancellation fee equivalent to driver dispatch cost may apply.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">3. Flight Delay & Rescheduling</h2>
          <p>
            For Jolly Grant Dehradun Airport and Delhi IGI Airport pickups, flight delays are monitored automatically. No cancellation fee is charged if your flight is delayed or rescheduled.
          </p>
        </Container>
      </Section>
    </main>
  );
}
