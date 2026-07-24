"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const FooterMap: React.FC = () => {
  // Dehradun Office Location Google Map Embed URL
  const googleMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.234123456789!2d78.005123456789!3d30.321456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c123456789%3A0x123456789abcdef!2sGMS%20Road%2C%20Dehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <div className="space-y-4">
      <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-amber-400 border-b border-white/[0.08] pb-2 flex items-center justify-between">
        <span>Headquarters Location</span>
      </h4>
      
      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg bg-slate-900 group">
        <iframe
          title="QuickWay Ride Office Google Map"
          src={googleMapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter grayscale contrast-125 group-hover:filter-none transition-all duration-300"
        />
        <a
          href={SITE_CONFIG.contact.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2.5 right-2.5 bg-slate-950/90 text-amber-400 text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-md flex items-center gap-1.5 hover:bg-amber-500 hover:text-slate-950 transition-colors"
        >
          <Navigation className="w-3 h-3" /> Map View
        </a>
      </div>
    </div>
  );
};
