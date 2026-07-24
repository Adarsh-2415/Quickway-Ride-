"use client";

import React from "react";

export const FooterBottom: React.FC = () => {
  return (
    <div className="pt-8 mt-12 border-t border-white/[0.08] text-center text-xs text-slate-400 font-medium">
      <p className="leading-relaxed">
        Copyright © 2026 QuickWay Ride | Powered by{" "}
        <span className="font-bold text-slate-300 hover:text-amber-400 transition-colors">
          FutureSoft India, Roorkee
        </span>{" "}
        (
        <a
          href="tel:+919045007799"
          className="font-bold text-slate-300 hover:text-amber-400 transition-colors inline-block"
        >
          +91 9045007799
        </a>
        )
      </p>
    </div>
  );
};
