"use client";

import React from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Testimonial } from "./testimonials.types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="w-full max-w-[780px] mx-auto bg-white text-slate-900 rounded-[24px] shadow-2xl shadow-slate-950/20 border border-slate-100/80 p-8 sm:p-12 text-center relative overflow-hidden select-none">
      {/* Decorative Subtle Background Quote Watermark */}
      <div className="absolute top-4 right-6 opacity-5 pointer-events-none">
        <Quote className="w-24 h-24 text-slate-900" />
      </div>

      {/* Top Quote Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
          <Quote className="w-6 h-6 fill-amber-500/20" />
        </div>
      </div>

      {/* 5 Gold Star Rating */}
      <div className="flex items-center justify-center gap-1 mb-6" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-100"
            }`}
          />
        ))}
      </div>

      {/* Testimonial Message Content */}
      <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 max-w-2xl mx-auto italic font-sans">
        "{testimonial.review}"
      </blockquote>

      {/* Customer Avatar & Profile Details */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-slate-100">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            unoptimized
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
            {testimonial.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {testimonial.designation} <span className="text-amber-500 mx-1">•</span> {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
};
