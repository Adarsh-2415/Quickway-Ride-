"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/utilities/Breadcrumb";
import { Badge } from "@/components/badges/Badge";

export const AboutHero: React.FC = () => {
  return (
    <div className="relative w-full hero-dark-bg text-white pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden select-none">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "About Us" }]} className="text-slate-300" />

        <div className="max-w-3xl space-y-4">
          <Badge variant="softAccent" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Established 2024 • QuickWay Ride Services
          </Badge>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Redefining Travel Across{" "}
            <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
              Uttarakhand & North India.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            QuickWay Ride is a premium taxi and travel service provider dedicated to delivering safe, reliable, comfortable, and professional mobility solutions for individuals, families, tourists, and corporate clients.
          </p>
        </div>
      </Container>
    </div>
  );
};
