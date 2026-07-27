"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/utilities/Breadcrumb";
import { Badge } from "@/components/badges/Badge";

export interface AboutHeroProps {
  content?: {
    hero_badge?: string;
    hero_title?: string;
    hero_title_highlight?: string;
    hero_subtitle?: string;
  } | null;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ content }) => {
  const badge = content?.hero_badge || "Established 2024 • QuickWay Ride Services";
  const title = content?.hero_title || "Redefining Travel Across";
  const highlight = content?.hero_title_highlight || "Uttarakhand & North India.";
  const subtitle =
    content?.hero_subtitle ||
    "QuickWay Ride is a premium taxi and travel service provider dedicated to delivering safe, reliable, comfortable, and professional mobility solutions for individuals, families, tourists, and corporate clients.";

  return (
    <div className="relative w-full hero-dark-bg text-white pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-6">
        <Breadcrumb items={[{ label: "About Us" }]} className="text-slate-300" />

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
