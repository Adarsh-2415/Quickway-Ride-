"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PhoneCall,
  ArrowRight,
  Ticket,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const HeroBookingWidget: React.FC = () => {
  const router = useRouter();

  const handleProceedToBook = () => {
    router.push("/book");
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden text-slate-900 select-none relative group">
      {/* Top Gold Gradient Ticket Header */}
      <div className="bg-slate-950 text-white p-5 sm:p-6 border-b border-slate-800 relative overflow-hidden">
        {/* Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Ticket Header Badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-extrabold tracking-wide uppercase">
              <Ticket className="w-3.5 h-3.5 fill-amber-400" />
              <span>Taxi Booking Gateway</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              Zero Advance Required
            </span>
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-tight">
            Book Your Taxi in <span className="text-amber-400 underline decoration-amber-400/40">3 Easy Steps</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Submit your route request. Our admin team will call you shortly to confirm your journey & final fare quote.
          </p>
        </div>
      </div>

      {/* Main Ticket Content Area */}
      <div className="p-5 sm:p-6 space-y-6 bg-slate-50/50">
        {/* 3-Step Process Timeline Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] flex items-center justify-center border border-amber-300">
                1
              </span>
              <span className="font-heading font-extrabold text-xs text-slate-900">
                Submit Request
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium pl-7">
              Fill travel route in 60s
            </p>
          </div>

          {/* Step 2: Highlighted Admin Call Confirmation */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 shadow-2xs space-y-1 relative">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center">
                2
              </span>
              <span className="font-heading font-extrabold text-xs text-amber-950 flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>Admin Calls You</span>
              </span>
            </div>
            <p className="text-[11px] text-amber-900 font-semibold pl-7">
              Fast phone/WA confirmation
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px] flex items-center justify-center border border-emerald-300">
                3
              </span>
              <span className="font-heading font-extrabold text-xs text-slate-900">
                Punctual Pickup
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium pl-7">
              Clean cab at your doorstep
            </p>
          </div>
        </div>

        {/* Primary Call to Action Button with Blinking Pulse Glow Effect */}
        <div className="space-y-4 pt-2">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
                "0 20px 35px -5px rgba(245, 158, 11, 0.7)",
                "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={handleProceedToBook}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 active:scale-[0.99] text-slate-950 font-extrabold text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 transition-all cursor-pointer border border-amber-300/60"
            >
              <Sparkles className="w-5 h-5 fill-slate-950 text-slate-950 animate-spin" style={{ animationDuration: "4s" }} />
              <span>Proceed to Taxi Booking Page</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Hotline Contact Fallback Bar */}
          <div className="flex items-center justify-between gap-4 text-xs text-slate-600 pt-3 border-t border-slate-200/80 flex-wrap">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneHotline}`}
              className="font-bold text-slate-800 hover:text-amber-600 inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>Call Desk: {SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <span className="text-slate-300">•</span>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi QuickWay Ride, I want to inquire about a taxi booking.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
