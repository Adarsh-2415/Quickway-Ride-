import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { QuoteForm } from "@/components/features/quote/QuoteForm";
import { ShieldCheck, Building2, Users, Award } from "lucide-react";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";

export const metadata: Metadata = {
  title: "Corporate & Event Cab Delegations | QuickWay Ride",
  description:
    "Monthly corporate employee transport contracts, event delegations, and luxury wedding cab fleets in Dehradun, Roorkee, and Saharanpur.",
};

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Enterprise Fleet Mobility
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Corporate & Event Cab Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Dedicated monthly fleet contracts for institutes, IT parks, wedding Baraat transport, and corporate delegations.
          </p>
        </Container>
      </section>

      {/* Feature Cards */}
      <Section variant="default" padding="normal">
        <Container className="space-y-12">
          <Grid cols={1} colsMd={3} gap={6}>
            <Card variant="standard" className="p-6 space-y-3 bg-white border border-slate-200 rounded-2xl">
              <Building2 className="w-8 h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900">Monthly Corporate Contracts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated daily commute transport for employees across Roorkee, Saharanpur, and Dehradun with monthly consolidated billing.
              </p>
            </Card>

            <Card variant="standard" className="p-6 space-y-3 bg-white border border-slate-200 rounded-2xl">
              <Users className="w-8 h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900">Wedding & Event Fleets</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-vehicle coordination including luxury Innova Crysta and Maharaja Tempo Travellers for guest transfers and baraat transport.
              </p>
            </Card>

            <Card variant="standard" className="p-6 space-y-3 bg-white border border-slate-200 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900">VIP & Executive Transfers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chauffeur-driven executive luxury sedans and SUVs with priority flight monitoring at Jolly Grant Dehradun Airport.
              </p>
            </Card>
          </Grid>

          {/* Form */}
          <div className="pt-6">
            <QuoteForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
