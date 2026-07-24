"use client";

import React from "react";
import { PhoneCall, CheckCircle2, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroBookingWidget } from "./HeroBookingWidget";
import { HeroTrustBadges } from "./HeroTrustBadges";
import { RegionalCityTicker } from "./RegionalCityTicker";
import { HeroBackgroundSlider } from "./hero";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden text-white pt-2 lg:pt-3 pb-0 select-none min-h-[580px] sm:min-h-[640px] flex flex-col justify-between">
      {/* Cinematic Full-Width Background Slider & Overlays (z-0 to z-10) */}
      <HeroBackgroundSlider />

      {/* Hero Core Content Container (z-20) */}
      <Container className="relative z-20 pt-2 sm:pt-3 lg:pt-4 pb-12 lg:pb-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Brand Message, Value Propositions & Direct Touchpoints */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Trust Proof Badges */}
            <HeroTrustBadges />

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md">
              Always Safe. Always On Time. Ride Across{" "}
              <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
                Uttarakhand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm">
              Your trusted travel partner for{" "}
              <strong className="text-white font-semibold">Airport Transfers</strong>,{" "}
              <strong className="text-white font-semibold">Outstation Trips</strong>,{" "}
              <strong className="text-white font-semibold">Local Travel</strong> &{" "}
              <strong className="text-white font-semibold">Tour Packages</strong>. Book comfortable rides in just a click.
            </p>

            {/* Key Value Points Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 font-medium">
              <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified Drivers & GPS Cabs</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fixed Rates • No Surge Fee</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Guaranteed On-Time Pickup</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Clean & Sanitized Cabs</span>
              </div>
            </div>

            {/* Direct Call & WhatsApp Touchpoints */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold text-slate-900 shadow-xl shadow-amber-500/20 bg-amber-400 hover:bg-amber-500 cursor-pointer"
                  iconLeft={<PhoneCall className="w-4 h-4 stroke-[2.5]" />}
                >
                  Call {SITE_CONFIG.contact.phoneDisplay}
                </Button>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi QuickWay Ride, I want to inquire about a taxi.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-emerald-600/90 text-white border-emerald-500 hover:bg-emerald-700 shadow-md cursor-pointer"
                  iconLeft={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp Cabs
                </Button>
              </a>
            </div>

            {/* Social Proof Testimonial Pill */}
            <div className="pt-1 flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md max-w-md shadow-xl">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center border-2 border-slate-900">
                  R
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center border-2 border-slate-900">
                  A
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center border-2 border-slate-900">
                  V
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">
                  Trusted by 1,000+ Families, Students & Corporates
                </span>
                <span className="text-[11px] text-amber-400 italic block font-medium">
                  "Reliable, punctual rides across Uttarakhand"
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Instant Booking Engine Widget (z-30) */}
          <div className="lg:col-span-6 relative z-30">
            <HeroBookingWidget />
          </div>

        </div>
      </Container>

      {/* Regional City Coverage Ticker (z-20) */}
      <div className="relative z-20">
        <RegionalCityTicker />
      </div>

      {/* Fluid SVG Wave Bottom Divider (z-20) */}
      <div className="relative w-full overflow-hidden leading-none z-20 bg-slate-950">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,65 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};
