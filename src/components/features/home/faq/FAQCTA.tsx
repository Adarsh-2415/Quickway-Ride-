"use client";

import React from "react";
import { PhoneCall, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const FAQCTA: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20">
          <HelpCircle className="w-3.5 h-3.5" /> Support Helpline Desk
        </div>
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md">
          Speak directly with our regional dispatch team in Roorkee & Dehradun for instant travel assistance.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
        <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-md cursor-pointer"
            iconLeft={<PhoneCall className="w-4 h-4" />}
          >
            Call Hotline
          </Button>
        </a>

        <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-center text-white border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:text-amber-400 cursor-pointer"
            iconLeft={<MessageSquare className="w-4 h-4 text-emerald-400" />}
          >
            WhatsApp Support
          </Button>
        </a>
      </div>
    </div>
  );
};
