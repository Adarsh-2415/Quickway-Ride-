import React from "react";
import Image from "next/image";
import { PhoneCall, Shield, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroBookingWidget } from "./HeroBookingWidget";
import { HeroTrustBadges } from "./HeroTrustBadges";
import { RegionalCityTicker } from "./RegionalCityTicker";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full hero-dark-bg overflow-hidden text-white pt-6 pb-0">
      {/* Background Lighting & Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 pt-4 pb-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Message, Value Proposition & Trust Badges */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Trust Badges Bar */}
            <HeroTrustBadges />

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Always Safe. Always On Time. Ride Comfortably Across{" "}
              <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
                Uttarakhand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
              Professional taxi & travel services connecting{" "}
              <strong className="text-white font-semibold">Roorkee</strong>,{" "}
              <strong className="text-white font-semibold">Haridwar</strong>,{" "}
              <strong className="text-white font-semibold">Rishikesh</strong>,{" "}
              <strong className="text-white font-semibold">Dehradun</strong>,{" "}
              <strong className="text-white font-semibold">Saharanpur</strong> & Delhi Airport.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified Drivers & GPS Cabs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fixed Rates • No Hidden Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Guaranteed Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Clean & Sanitized Vehicles</span>
              </div>
            </div>

            {/* Direct Call & WhatsApp Touchpoints */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold text-slate-900"
                  iconLeft={<PhoneCall className="w-4 h-4 stroke-[2.5]" />}
                >
                  Call {SITE_CONFIG.contact.phoneDisplay}
                </Button>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent("Hi QuickWay Ride, I want to inquire about a taxi.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-emerald-600/90 text-white border-emerald-500 hover:bg-emerald-700"
                  iconLeft={<MessageSquare className="w-4 h-4" />}
                >
                  WhatsApp Cabs
                </Button>
              </a>
            </div>

            {/* Vehicle Preview / Driver Badge Card */}
            <div className="pt-4 flex items-center gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md max-w-md">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
                🚖
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                   Uttarakhand Fleet Ready
                </p>
                <p className="text-xs text-slate-300 leading-snug">
                  Sedans, Executive SUVs (Innova Crysta) & Tempo Travellers available 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Instant Booking Widget */}
          <div className="lg:col-span-6 relative">
            <HeroBookingWidget />
          </div>
        </div>
      </Container>

      {/* Regional City Coverage Ticker */}
      <RegionalCityTicker />

      {/* Fluid SVG Wave Bottom Divider */}
      <div className="relative w-full overflow-hidden leading-none z-10 bg-slate-950">
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
