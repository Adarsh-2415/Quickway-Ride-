"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut, User, X, ShieldCheck } from "lucide-react";
import { signOutAdminAction } from "@/actions/authActions";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  userEmail?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userEmail = "admin@quickwayride.com",
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const isDashboardActive = pathname === "/admin/dashboard";

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-950 text-white p-6 border-r border-slate-800/90 select-none">
      {/* Top Header: Logo & Mobile Close */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <div className="bg-white px-3.5 py-2 rounded-xl shadow-md border border-slate-100/90">
              <Image
                src="/images/quickway-ride-logo.png"
                alt="QuickWay Ride Logo"
                width={180}
                height={54}
                className="object-contain h-8 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Portal Sub-Header Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
          <span>QuickWay Ride Admin Portal</span>
        </div>

        {/* Navigation Menu (Strictly 1 Menu Item: Dashboard) */}
        <nav aria-label="Admin Sidebar Navigation" className="pt-2 space-y-1">
          <Link
            href="/admin/dashboard"
            onClick={onCloseMobile}
            className={cn(
              "relative flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group",
              isDashboardActive
                ? "text-slate-950 bg-amber-500 shadow-lg shadow-amber-500/25 border border-amber-400/50"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            )}
          >
            <LayoutDashboard className={cn("w-5 h-5 shrink-0", isDashboardActive ? "text-slate-950 stroke-[2.5]" : "text-slate-400 group-hover:text-amber-400")} />
            <span>Dashboard</span>

            {/* Active Pill Accent */}
            {isDashboardActive && (
              <motion.span
                layoutId="sidebarActivePill"
                className="absolute right-3 w-2 h-2 rounded-full bg-slate-950"
              />
            )}
          </Link>
        </nav>
      </div>

      {/* Bottom Logged In Admin Profile & Sign Out */}
      <div className="pt-6 border-t border-slate-800/80 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
              <User className="w-5 h-5" />
            </div>
            {/* Green Online Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>

          <div className="space-y-0.5 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">Administrator</span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate" title={userEmail}>
              {userEmail}
            </p>
          </div>
        </div>

        {/* Logout Action Button */}
        <button
          type="button"
          onClick={async () => {
            await signOutAdminAction();
            window.location.href = "/admin/login";
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-rose-600/90 hover:border-rose-500 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar (280px) */}
      <aside className="hidden lg:block w-[280px] shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            />
            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw]"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
