"use client";

import React from "react";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FeatureCard } from "@/components/cards/Card";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";

export const ServiceGuarantees: React.FC = () => {
  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="softAccent" size="md">
            Our Quality Guarantee
          </Badge>
          <SectionHeading>Built on Trust & Professionalism</SectionHeading>
        </div>

        <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
          <FeatureCard
            icon={<Award className="w-6 h-6 text-amber-600" />}
            title="Fixed Fare Guarantee"
            description="Transparent rate card with no hidden night surge fees or unexpected extra charges."
          />

          <FeatureCard
            icon={<Clock className="w-6 h-6 text-amber-600" />}
            title="100% Punctual Pickup"
            description="Guaranteed on-time pickups for early morning flights, trains, and urgent outstation trips."
          />

          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-amber-600" />}
            title="Verified GPS Cabs"
            description="All vehicles equipped with live GPS tracking and driven by background-verified drivers."
          />

          <FeatureCard
            icon={<Users className="w-6 h-6 text-amber-600" />}
            title="24/7 Dispatch Desk"
            description="Dedicated customer support operations team in Roorkee & Dehradun available around the clock."
          />
        </Grid>
      </Container>
    </Section>
  );
};
