"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users, Navigation, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { FeatureCard } from "@/components/cards/Card";

export const WhyChooseUs: React.FC = () => {
  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="softAccent" size="md">
            The QuickWay Advantage
          </Badge>
          <SectionHeading>Why Travelers Choose QuickWay Ride</SectionHeading>
          <BodyRegular className="text-slate-600">
            Engineered around reliability, punctuality, and passenger peace of mind.
          </BodyRegular>
        </div>

        <Grid cols={1} colsMd={2} colsLg={3} gap={6}>
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-amber-600" />}
            title="100% Background Verified Drivers"
            description="Every regional driver undergoes strict identity verification, background screening, and local route testing."
          />

          <FeatureCard
            icon={<Clock className="w-6 h-6 text-amber-600" />}
            title="Guaranteed On-Time Pickups"
            description="Never miss an early flight at Jolly Grant or Delhi Airport with our 100% punctual pickup commitment."
          />

          <FeatureCard
            icon={<Award className="w-6 h-6 text-amber-600" />}
            title="Zero Surge Pricing"
            description="Transparent rate card per kilometer. What you see is what you pay—no unexpected peak night surcharges."
          />

          <FeatureCard
            icon={<Sparkles className="w-6 h-6 text-amber-600" />}
            title="Clean & Sanitized Fleet"
            description="All vehicles are thoroughly sanitized before every pickup, ensuring fresh air conditioning and immaculate interiors."
          />

          <FeatureCard
            icon={<Navigation className="w-6 h-6 text-amber-600" />}
            title="GPS Live Route Tracking"
            description="Real-time GPS tracking enabled in every vehicle for complete route transparency and safety monitoring."
          />

          <FeatureCard
            icon={<Users className="w-6 h-6 text-amber-600" />}
            title="24/7 Dedicated Support Desk"
            description="Our customer care operations team in Roorkee & Dehradun is available around the clock to assist your journey."
          />
        </Grid>
      </Container>
    </Section>
  );
};
