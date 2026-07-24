import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Refund Policy | QuickWay Ride",
  description: "Refund policy and processing timelines for QuickWay Ride customer payments.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Payment Guarantee
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Refund Policy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Fair and automated refund processing for online advance payments.
          </p>
        </Container>
      </section>

      <Section variant="default" padding="normal">
        <Container className="max-w-4xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">1. Refund Eligibility</h2>
          <p>
            100% of advance payments are eligible for immediate refund if a booking is cancelled within the free cancellation window or if QuickWay Ride is unable to fulfill a trip due to operational reasons.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">2. Processing Timeline</h2>
          <p>
            Approved refunds are credited back to original payment methods (UPI, Bank Account, Credit/Debit Card) within 3 to 5 business days.
          </p>

          <h2 className="font-heading font-extrabold text-xl text-slate-900 pt-4">3. Support Assistance</h2>
          <p>
            For any refund status inquiries, please contact our financial operations desk at <strong>info@quickwayride.com</strong> or call <strong>+91 8679506655</strong>.
          </p>
        </Container>
      </Section>
    </main>
  );
}
