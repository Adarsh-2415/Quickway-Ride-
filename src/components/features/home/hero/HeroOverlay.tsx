import React from "react";

export const HeroOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {/* 1. Base Dark Navy Overlay */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* 2. Left-to-Right Readability Gradient (Left 85% opacity -> Right 40% opacity) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/35" />

      {/* 3. Radial Gold Spotlight Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_-10%,rgba(245,158,11,0.25),transparent_70%)]" />

      {/* 4. Bottom Fade to Seamless Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
};
