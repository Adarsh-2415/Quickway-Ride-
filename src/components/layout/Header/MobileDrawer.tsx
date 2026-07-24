"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, Mail, Car, MessageSquare, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { SocialLinks } from "./SocialLinks";
import { Button } from "@/components/buttons/Button";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  // ESC Key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <Logo isCompact />
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-amber-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 block font-heading">
                Navigation Menu
              </span>
              <Navigation
                className="flex-col items-stretch space-y-1"
                onItemClick={onClose}
              />

              {/* Service Cities Callout */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Service Coverage
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Roorkee • Haridwar • Rishikesh • Dehradun • Saharanpur
                </p>
              </div>
            </div>

            {/* Drawer Actions & Contact Info */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Link href="/book" onClick={onClose} className="w-full">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    <Car className="w-4 h-4 stroke-[2.5]" />
                    Book Taxi
                  </Button>
                </Link>

                <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="w-full">
                  <Button variant="outline" size="md" className="w-full justify-center">
                    <PhoneCall className="w-4 h-4 text-amber-600" />
                    Call Us
                  </Button>
                </a>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent("Hi QuickWay Ride, I want to book a taxi.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Chat on WhatsApp
              </a>

              {/* Direct Touchpoints */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{SITE_CONFIG.contact.supportEmail}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <span className="text-xs font-medium text-slate-500">Follow QuickWay:</span>
                <SocialLinks variant="light" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
