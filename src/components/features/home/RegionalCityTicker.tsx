"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { ONEWAY_RATE_LIST } from "@/constants/pricingData";

export const RegionalCityTicker: React.FC = () => {
  // Map all 36 official routes from the pricing data list (Dehradun ➔ Destination)
  const tickerRoutes = ONEWAY_RATE_LIST.map((item) => ({
    from: item.origin,
    to: item.destination,
  }));

  // Duplicate array 2x for seamless 60FPS endless marquee scrolling loop
  const repeatedRoutes = [...tickerRoutes, ...tickerRoutes];

  return (
    <div className="relative w-full bg-slate-950 border-t border-b border-amber-500/20 py-3.5 overflow-hidden select-none">
      {/* Left Edge Soft Gradient Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Right Edge Soft Gradient Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Continuous Marquee Scrolling Track */}
      <div className="flex items-center w-full overflow-hidden pointer-events-none">
        <div className="flex items-center gap-6 sm:gap-8 animate-marquee whitespace-nowrap text-xs font-medium text-slate-300">
          {repeatedRoutes.map((route, idx) => (
            <div
              key={`${route.from}-${route.to}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 shrink-0 cursor-default shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-bold text-slate-100 tracking-wide inline-flex items-center gap-1.5">
                <span>{route.from}</span>
                <span className="text-amber-400 font-extrabold">➔</span>
                <span>{route.to}</span>
              </span>
              <span className="text-slate-700 font-bold ml-1.5">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
