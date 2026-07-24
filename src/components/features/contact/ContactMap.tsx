"use client";

import React from "react";
import { MapPin, Navigation, Building2, PhoneCall, Mail } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const ContactMap: React.FC = () => {
  const dehradunAddress = "1st Floor, Opposite to Shiv Sani Mandir, Near Sai Lok Gate, GMS Road, Dehradun, Uttarakhand";
  const googleMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.234123456789!2d78.005123456789!3d30.321456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c123456789%3A0x123456789abcdef!2sGMS%20Road%2C%20Dehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <Card variant="standard" className="p-6 sm:p-8 space-y-6 border border-slate-200 shadow-md h-full flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wide block">
            Dehradun Headquarters
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-0.5">
            Visit Our Main Office
          </h3>
        </div>

        {/* Office Details Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <Building2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block">Office Location</span>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {dehradunAddress}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone / WhatsApp</span>
                <span className="text-xs font-bold text-slate-900">8679506655</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</span>
                <span className="text-xs font-bold text-slate-900 truncate block">info@quickwayride.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Map iFrame */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 mt-4">
          <iframe
            title="QuickWay Ride Dehradun Office Location"
            src={googleMapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter grayscale contrast-125 hover:filter-none transition-all duration-300"
          />
          <a
            href={SITE_CONFIG.contact.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3.5 py-2 rounded-lg border border-amber-500/40 shadow-lg flex items-center gap-1.5 hover:bg-slate-900 transition-all hover:scale-105"
          >
            <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
          </a>
        </div>
      </div>
    </Card>
  );
};
