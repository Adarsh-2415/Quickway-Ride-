"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const FooterLegal: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-amber-400 border-b border-white/[0.08] pb-2 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-amber-500" />
        <span>Legal & Policy</span>
      </h4>
      <nav aria-label="Footer Legal Links">
        <ul className="space-y-2 text-xs sm:text-sm font-medium">
          {SITE_CONFIG.legalLinks.map((link) => (
            <li key={link.href}>
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors group py-0.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500/70 group-hover:text-amber-400 transition-colors" />
                  <span>{link.label}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
