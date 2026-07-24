import React from "react";
import { Metadata } from "next";
import { QuoteForm } from "@/components/features/quote/QuoteForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Request a Cab Quote | QuickWay Ride Custom Taxi Rates",
  description:
    "Request a custom cab quote for outstation drops, airport transfers, and group Tempo Travellers with QuickWay Ride.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-10">
      <Section variant="default" padding="normal">
        <Container>
          <QuoteForm />
        </Container>
      </Section>
    </main>
  );
}
