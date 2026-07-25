"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon, Edit3 } from "lucide-react";

export interface PageCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export const PageCard: React.FC<PageCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/90 flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all duration-200 select-none">
      <div className="space-y-3">
        {/* Header Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Edit Button (Active if href exists, otherwise disabled) */}
      <div className="pt-3 border-t border-slate-100 flex justify-end">
        {href ? (
          <Link
            href={href}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Page</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-400 font-bold text-xs inline-flex items-center gap-1.5 opacity-60 cursor-not-allowed border border-slate-300/60 shadow-none"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        )}
      </div>
    </div>
  );
};
