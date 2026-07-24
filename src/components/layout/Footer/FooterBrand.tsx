"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const FooterBrand: React.FC = () => {
  const socialItems = [
    { icon: Facebook, label: "Facebook", href: SITE_CONFIG.social.facebook },
    { icon: Instagram, label: "Instagram", href: SITE_CONFIG.social.instagram },
    { icon: Twitter, label: "Twitter", href: SITE_CONFIG.social.twitter },
    { icon: Linkedin, label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
    { icon: MessageCircle, label: "WhatsApp", href: SITE_CONFIG.social.whatsapp },
  ];

  return (
    <div className="space-y-5">
      {/* Brand Logo Header */}
      <Link href="/" className="inline-flex items-center group focus:outline-none">
        <div className="bg-white px-3 py-2 rounded-xl shadow-md border border-slate-100/90 group-hover:scale-105 transition-transform duration-200">
          <Image
            src="/images/quickway-ride-logo.png"
            alt="QuickWay Ride Logo"
            width={240}
            height={70}
            className="object-contain h-[42px] sm:h-[48px] w-auto"
          />
        </div>
      </Link>

      {/* Brand Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-normal">
        QuickWay Ride is Uttarakhand's trusted premium taxi and travel partner, delivering safe, comfortable, and transparent transportation services with professional drivers and 24×7 customer support.
      </p>

      {/* Social Icons Row */}
      <div className="pt-1 flex items-center gap-3">
        {socialItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow QuickWay Ride on ${item.label}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all duration-200 shadow-sm"
            >
              <IconComponent className="w-4 h-4" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};
