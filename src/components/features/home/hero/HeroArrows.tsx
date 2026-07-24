"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const HeroArrows: React.FC<HeroArrowsProps> = ({ onPrev, onNext }) => {
  return (
    <>
      {/* Left Arrow Button */}
      <motion.button
        type="button"
        onClick={onPrev}
        aria-label="Previous Slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-950/40 border border-white/15 text-white hover:text-amber-400 hover:border-amber-400/50 hover:bg-slate-950/70 backdrop-blur-md transition-all shadow-xl cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Right Arrow Button */}
      <motion.button
        type="button"
        onClick={onNext}
        aria-label="Next Slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-950/40 border border-white/15 text-white hover:text-amber-400 hover:border-amber-400/50 hover:bg-slate-950/70 backdrop-blur-md transition-all shadow-xl cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </>
  );
};
