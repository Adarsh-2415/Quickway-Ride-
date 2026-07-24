"use client";

import React from "react";
import { MapPin } from "lucide-react";

export interface TickerCity {
  name: string;
  badge?: string;
}

export const TICKER_CITIES: TickerCity[] = [
  { name: "Roorkee Junction & IIT Hub", badge: "24/7 Cab Hub" },
  { name: "Haridwar Ganga Aarti Ghats", badge: "Express Pickups" },
  { name: "Rishikesh Rafting & Ashrams", badge: "Tourist Favorite" },
  { name: "Dehradun Capital City", badge: "Direct Drop" },
  { name: "Jolly Grant Dehradun Airport", badge: "Flight Sync" },
  { name: "Saharanpur Railway Junction", badge: "Station Express" },
  { name: "Mussoorie Queen of Hills", badge: "Hill Taxi" },
  { name: "Delhi IGI Airport Express", badge: "Flat Rates" },
  { name: "Char Dham Yatra Circuit", badge: "Pilgrimage Cabs" },
  { name: "Chandigarh & Mohali", badge: "Intercity Cabs" },
  { name: "Nainital Lake District", badge: "Hill Station" },
  { name: "Agra & Mathura Express", badge: "Tour Special" },
];

export const RegionalCityTicker: React.FC = () => {
  // Duplicate array 3x for endless 60FPS loop without jumps
  const repeatedCities = [...TICKER_CITIES, ...TICKER_CITIES, ...TICKER_CITIES];

  return (
    <div className="relative w-full bg-slate-950 border-t border-b border-amber-500/20 py-3.5 overflow-hidden select-none">
      
      {/* Left Edge Soft Gradient Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Right Edge Soft Gradient Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

      {/* Continuous Marquee Scrolling Track (Showcase Only - Non-Clickable) */}
      <div className="flex items-center w-full overflow-hidden pointer-events-none">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap text-xs font-medium text-slate-300">
          {repeatedCities.map((city, idx) => (
            <div
              key={`${city.name}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 shrink-0 cursor-default"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-slate-200">
                {city.name}
              </span>
              {city.badge && (
                <span className="text-[10px] font-bold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {city.badge}
                </span>
              )}
              <span className="text-slate-700 font-bold ml-1">•</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
