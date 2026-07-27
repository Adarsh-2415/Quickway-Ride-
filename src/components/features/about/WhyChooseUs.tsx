"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users, Navigation, Sparkles, Car, MapPin, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { FeatureCard } from "@/components/cards/Card";

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  Navigation: <Navigation className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />,
  MapPin: <MapPin className="w-6 h-6 text-amber-600" />,
  Star: <Star className="w-6 h-6 text-amber-600" />,
};

const DEFAULT_ADVANTAGES = [
  {
    id: "a1",
    title: "100% Background Verified Drivers",
    description:
      "Every regional driver undergoes strict identity verification, background screening, and local route testing.",
    icon_name: "ShieldCheck",
  },
  {
    id: "a2",
    title: "Guaranteed On-Time Pickups",
    description:
      "Never miss an early flight at Jolly Grant or Delhi Airport with our 100% punctual pickup commitment.",
    icon_name: "Clock",
  },
  {
    id: "a3",
    title: "Zero Surge Pricing",
    description:
      "Transparent rate card per kilometer. What you see is what you pay—no unexpected peak night surcharges.",
    icon_name: "Award",
  },
  {
    id: "a4",
    title: "Clean & Sanitized Fleet",
    description:
      "All vehicles are thoroughly sanitized before every pickup, ensuring fresh air conditioning and immaculate interiors.",
    icon_name: "Sparkles",
  },
  {
    id: "a5",
    title: "GPS Live Route Tracking",
    description:
      "Real-time GPS tracking enabled in every vehicle for complete route transparency and safety monitoring.",
    icon_name: "Navigation",
  },
  {
    id: "a6",
    title: "Dedicated Support Desk",
    description:
      "Our customer care operations team in Roorkee & Dehradun is available around the clock to assist your journey.",
    icon_name: "Users",
  },
];

export interface WhyChooseUsProps {
  content?: {
    advantages_badge?: string;
    advantages_heading?: string;
    advantages_subtext?: string;
    advantages_list?: any[];
  } | null;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content }) => {
  const badge = content?.advantages_badge || "The QuickWay Advantage";
  const heading = content?.advantages_heading || "Why Travelers Choose QuickWay Ride";
  const subtext =
    content?.advantages_subtext ||
    "Engineered around reliability, punctuality, and passenger peace of mind.";

  const advantages =
    content?.advantages_list && content.advantages_list.length > 0
      ? content.advantages_list
      : DEFAULT_ADVANTAGES;

  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="softAccent" size="md">
            {badge}
          </Badge>
          <SectionHeading>{heading}</SectionHeading>
          {subtext && <BodyRegular className="text-slate-600">{subtext}</BodyRegular>}
        </div>

        <Grid cols={1} colsMd={2} colsLg={3} gap={6}>
          {advantages.map((item: any, idx: number) => {
            const iconNode =
              (item.icon_name && ICON_MAP[item.icon_name]) || (
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              );
            return (
              <FeatureCard
                key={item.id || idx}
                icon={iconNode}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};
