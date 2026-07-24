"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeroDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}

export const HeroDots: React.FC<HeroDotsProps> = ({ total, current, onSelect, className }) => {
  return (
    <div
      className={cn(
        "absolute bottom-28 sm:bottom-32 lg:bottom-36 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/15 shadow-2xl transition-all duration-300",
        className
      )}
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400",
              isActive
                ? "w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-400/50"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            )}
          />
        );
      })}
    </div>
  );
};
