"use client";

import React from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";

export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <div className="relative z-10 max-w-lg w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl space-y-8">
        {/* Brand Logo inside crisp white container for maximum clarity & contrast */}
        <div className="flex justify-center">
          <div className="relative w-56 h-20 bg-white px-6 py-3 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-center">
            <Image
              src="/images/quickway-ride-logo.png"
              alt="QuickWay Ride"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* Wrench Maintenance Icon Badge */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Wrench className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
            Website Under Maintenance
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
            We&apos;re preparing everything for an even better experience. Our website will be available shortly. Thank you for your patience and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};
