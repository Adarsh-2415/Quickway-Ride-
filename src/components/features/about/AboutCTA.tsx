"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/badges/Badge";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export interface AboutCTAProps {
  content?: {
    cta_badge?: string;
    cta_heading?: string;
    cta_subtext?: string;
  } | null;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({ content }) => {
  const ctaBadge = content?.cta_badge || "Ready to Travel?";
  const ctaHeading =
    content?.cta_heading || "Book Your Next Journey with QuickWay Ride Today";
  const ctaSubtext =
    content?.cta_subtext ||
    "Experience seamless outstation cabs, airport transfers, and group tour delegations across 26+ cities in North India.";

  return (
    <Section variant="dark" padding="normal">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="softAccent" size="md">
              {ctaBadge}
            </Badge>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {ctaHeading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {ctaSubtext}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/book">
              <Button
                variant="primary"
                size="lg"
                className="font-bold text-slate-900"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Calculate Fare & Book Now
              </Button>
            </Link>
            <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`}>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                iconLeft={<PhoneCall className="w-4 h-4 text-amber-400" />}
              >
                Call {SITE_CONFIG.contact.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};
