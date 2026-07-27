"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES } from "./hero.data";
import { HeroSlide } from "./HeroSlide";
import { HeroOverlay } from "./HeroOverlay";
import { HeroDots } from "./HeroDots";
import { HeroArrows } from "./HeroArrows";

export interface HeroBackgroundSliderProps {
  slides?: {
    id: string;
    image_url?: string;
    image?: string;
    title?: string;
    alt?: string;
  }[];
}

export const HeroBackgroundSlider: React.FC<HeroBackgroundSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formattedSlides =
    slides && slides.length > 0
      ? slides.map((s, idx) => ({
          id: s.id || `slide-${idx}`,
          image: s.image_url || s.image || "/images/innova crysta.jfif",
          title: s.title || "QuickWay Ride",
          alt: s.alt || s.title || "QuickWay Ride",
        }))
      : HERO_SLIDES;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % formattedSlides.length);
  }, [formattedSlides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + formattedSlides.length) % formattedSlides.length);
  }, [formattedSlides.length]);

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
      {formattedSlides.map((slide, idx) => (
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
          total={formattedSlides.length}
          current={currentIndex}
          onSelect={(index) => setCurrentIndex(index)}
        />
      </div>
    </div>
  );
};
