"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Users, Briefcase, Wind, Fuel, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export interface FleetVehicle {
  id: string;
  name: string;
  category: string;
  tabCategory: string;
  image: string;
  seating: string;
  luggage: string;
  acType: string;
  fuelType: string;
  perKmRate: string;
  idealFor: string;
  features: string[];
  description: string;
}

interface VehicleSpecModalProps {
  vehicle: FleetVehicle | null;
  onClose: () => void;
}

export const VehicleSpecModal: React.FC<VehicleSpecModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              {vehicle.category}
            </span>
            <h3 className="font-heading font-bold text-xl text-white">{vehicle.name}</h3>
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Image Banner */}
          <div className="relative w-full h-52 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {vehicle.description}
          </p>

          {/* 4 Technical Spec Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center space-y-1">
              <Users className="w-4 h-4 text-amber-600 mx-auto" />
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Seating</span>
              <span className="text-xs font-bold text-slate-900 block">{vehicle.seating}</span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center space-y-1">
              <Briefcase className="w-4 h-4 text-amber-600 mx-auto" />
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Luggage</span>
              <span className="text-xs font-bold text-slate-900 block">{vehicle.luggage}</span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center space-y-1">
              <Wind className="w-4 h-4 text-amber-600 mx-auto" />
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Air Con</span>
              <span className="text-xs font-bold text-slate-900 block">{vehicle.acType}</span>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center space-y-1">
              <Fuel className="w-4 h-4 text-amber-600 mx-auto" />
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Fuel Type</span>
              <span className="text-xs font-bold text-slate-900 block">{vehicle.fuelType}</span>
            </div>
          </div>

          {/* Vehicle Features Checklist */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wide">
              Standard Vehicle Equipment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Commercial Tourist Permit • GPS Tracked • Verified Chauffeur</span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full justify-center" iconLeft={<PhoneCall className="w-3.5 h-3.5 text-amber-600" />}>
              Call Hotline
            </Button>
          </a>

          <Link href={`/book?vehicle=${encodeURIComponent(vehicle.id)}`} className="w-full sm:w-auto">
            <Button variant="primary" size="sm" className="w-full justify-center font-bold text-slate-900" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Book This Vehicle
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};
