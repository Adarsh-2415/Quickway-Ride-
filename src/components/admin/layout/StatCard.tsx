"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  badgeText?: string;
  badgeTrend?: "up" | "down" | "neutral";
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  badgeText,
  badgeTrend = "neutral",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-[20px] p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-4 select-none"
    >
      {/* Top Row: Title & Circular Badge Icon */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none pt-1">
            {value}
          </div>
        </div>

        {/* Circular Badge Icon */}
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* Bottom Footer Note */}
      {(subtitle || badgeText) && (
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {subtitle && <span className="font-medium text-slate-500">{subtitle}</span>}
          {badgeText && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide",
                badgeTrend === "up" && "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
                badgeTrend === "down" && "bg-rose-50 text-rose-600 border border-rose-200/60",
                badgeTrend === "neutral" && "bg-slate-100 text-slate-600 border border-slate-200"
              )}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
