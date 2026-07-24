"use client";

import React from "react";
import { ShieldCheck, Sparkles, Navigation, UserCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FeatureCard } from "@/components/cards/Card";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";

export const FleetFeatures: React.FC = () => {
  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="softSecondary" size="md">
            Fleet Safety & Quality Standard
          </Badge>
          <SectionHeading>Maintained to Executive Standards</SectionHeading>
        </div>

        <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-amber-600" />}
            title="All-India Tourist Permit"
            description="Fully licensed commercial yellow-plate vehicles with valid state border permits across North India."
          />

          <FeatureCard
            icon={<Navigation className="w-6 h-6 text-amber-600" />}
            title="Real-Time GPS Tracking"
            description="Every vehicle in our fleet is monitored 24/7 via live GPS telemetry for passenger safety."
          />

          <FeatureCard
            icon={<Sparkles className="w-6 h-6 text-amber-600" />}
            title="Sanitized & Clean"
            description="Deep internal steam cleaning and seat sanitization performed before every single trip."
          />

          <FeatureCard
            icon={<UserCheck className="w-6 h-6 text-amber-600" />}
            title="Verified Chauffeurs"
            description="Courteous, police-verified mountain and highway drivers with 8+ years of driving experience."
          />
        </Grid>
      </Container>
    </Section>
  );
};
