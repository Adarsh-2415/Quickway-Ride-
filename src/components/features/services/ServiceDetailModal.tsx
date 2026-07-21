"use client";

import React from "react";
import Link from "next/link";
import { X, CheckCircle2, Car, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  rateHint: string;
  recommendedVehicle: string;
  inclusions: string[];
  iconName: string;
  badge: string;
}

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              {service.category}
            </span>
            <h3 className="font-heading font-bold text-xl text-white">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {service.longDescription || service.description}
          </p>

          {/* Vehicle & Pricing Badge Box */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Recommended Fleet</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Car className="w-4 h-4 text-amber-600" />
                {service.recommendedVehicle}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Rate Estimate</span>
              <span className="text-sm font-extrabold text-amber-600 mt-0.5 block">
                {service.rateHint}
              </span>
            </div>
          </div>

          {/* Service Inclusions Checklist */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wide">
              Service Highlights & Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {service.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 p-3 rounded-lg border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Guaranteed Pickup • Fixed Tariff • Verified Drivers</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full justify-center" iconLeft={<PhoneCall className="w-3.5 h-3.5 text-amber-600" />}>
              Call Operations Desk
            </Button>
          </a>

          <Link href={`/book?service=${encodeURIComponent(service.id)}`} className="w-full sm:w-auto">
            <Button variant="primary" size="sm" className="w-full justify-center font-bold text-slate-900" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Book This Service Now
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};
