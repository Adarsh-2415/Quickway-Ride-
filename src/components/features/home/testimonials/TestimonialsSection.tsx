"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TESTIMONIALS_DATA } from "./testimonials.data";
import { TestimonialCard } from "./TestimonialCard";
import { Testimonial } from "./testimonials.types";
import { cn } from "@/lib/utils";

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS_DATA;

  const total = activeTestimonials.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay slider every 5000ms (pauses on hover)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, total]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentTestimonial = activeTestimonials[currentIndex] || activeTestimonials[0];

  return (
    <section className="relative w-full bg-slate-950 text-white py-20 sm:py-28 overflow-hidden select-none">
      {/* Background Radial Glow Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          {/* Small Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span>Customer Love</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What Our Customers Say
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Thousands of happy travelers trust QuickWay Ride for safe, reliable and comfortable journeys across Uttarakhand.
          </p>
        </div>

        {/* Carousel Container with Pause on Hover */}
        <div
          className="relative max-w-[850px] mx-auto min-h-[420px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {currentTestimonial && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentTestimonial.id || currentIndex}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <TestimonialCard testimonial={currentTestimonial} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Controls Section Below Card */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-md">
            {activeTestimonials.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-label={`View testimonial ${idx + 1} of ${total}`}
                  className={cn(
                    "transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400",
                    isActive
                      ? "w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-400/50"
                      : "w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500"
                  )}
                />
              );
            })}
          </div>

          {/* Glassmorphism Arrow Buttons Below Card */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-800 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-800 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
