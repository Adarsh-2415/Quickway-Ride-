"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES } from "./hero.data";
import { HeroSlide } from "./HeroSlide";
import { HeroOverlay } from "./HeroOverlay";
import { HeroDots } from "./HeroDots";
import { HeroArrows } from "./HeroArrows";

export const HeroBackgroundSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play interval: 5000ms
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          isActive={idx === currentIndex}
          isPriority={idx === 0}
        />
      ))}

      {/* Dark & Readability Gradient Overlay */}
      <HeroOverlay />

      {/* Interactive Controls (Pointer Events Enabled on controls) */}
      <div className="pointer-events-auto">
        <HeroArrows onPrev={handlePrev} onNext={handleNext} />
        <HeroDots
          total={HERO_SLIDES.length}
          current={currentIndex}
          onSelect={(index) => setCurrentIndex(index)}
        />
      </div>
    </div>
  );
};
