"use client";

import React from "react";
import { PhoneCall, Mail, MapPin, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const FooterContact: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-amber-400 border-b border-white/[0.08] pb-2">
        Contact Us
      </h4>
      <address className="not-italic space-y-3 text-xs sm:text-sm font-medium">
        {/* Phone */}
        <a
          href={`tel:${SITE_CONFIG.contact.phoneHotline}`}
          className="flex items-start gap-2.5 text-slate-300 hover:text-amber-400 transition-colors group"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
          <span>{SITE_CONFIG.contact.phoneDisplay}</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${SITE_CONFIG.contact.supportEmail}`}
          className="flex items-start gap-2.5 text-slate-300 hover:text-amber-400 transition-colors group"
        >
          <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
          <span className="truncate">{SITE_CONFIG.contact.supportEmail}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={SITE_CONFIG.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 text-slate-300 hover:text-amber-400 transition-colors group"
        >
          <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
          <span>WhatsApp Chat</span>
        </a>

        {/* Office Address */}
        <div className="flex items-start gap-2.5 text-slate-300">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span className="leading-snug">
            {SITE_CONFIG.contact.officeAddress}
          </span>
        </div>
      </address>
    </div>
  );
};
