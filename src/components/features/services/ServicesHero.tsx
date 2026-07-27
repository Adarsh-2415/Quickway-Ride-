"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/utilities/Breadcrumb";
import { Badge } from "@/components/badges/Badge";

export interface ServicesHeroProps {
  content?: {
    hero_badge?: string;
    hero_title?: string;
    hero_title_highlight?: string;
    hero_subtitle?: string;
  } | null;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ content }) => {
  const badge = content?.hero_badge || "17+ Specialized Mobility Services";
  const title = content?.hero_title || "Comprehensive Taxi Services Across";
  const highlight = content?.hero_title_highlight || "North India.";
  const subtitle =
    content?.hero_subtitle ||
    "From emergency airport express drops to 12-day Char Dham Yatra circuits and monthly corporate fleets — explore reliable cab services customized for your journey.";

  return (
    <div className="relative w-full hero-dark-bg text-white pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-6">
        <Breadcrumb items={[{ label: "Services" }]} className="text-slate-300" />

        <div className="max-w-3xl space-y-4">
          <Badge variant="softAccent" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {badge}
          </Badge>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            {title}{" "}
            {highlight && (
              <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
                {highlight}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
};
