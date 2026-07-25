"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FileText, Car, Mail, Lock, LogOut, User, X, ShieldCheck } from "lucide-react";
import { signOutAdminAction } from "@/actions/authActions";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  userEmail?: string;
  isCollapsed?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userEmail = "admin@quickwayride.com",
  isCollapsed = false,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Pages",
      href: "/admin/dashboard/manage-pages",
      icon: FileText,
    },
    {
      label: "Manage Bookings",
      href: "/admin/dashboard/manage-bookings",
      icon: Car,
    },
    {
      label: "Contact Queries",
      href: "/admin/dashboard/contact-queries",
      icon: Mail,
    },
    {
      label: "Change Password",
      href: "/admin/dashboard/change-password",
      icon: Lock,
    },
  ];

  const sidebarContent = (
    <div
      className={cn(
        "h-full flex flex-col justify-between bg-slate-950 text-white border-r border-slate-800/90 select-none transition-all duration-300",
        isCollapsed ? "p-3" : "p-5"
      )}
    >
      {/* Top Section: Logo & Menu Items */}
      <div className="space-y-6">
        {/* Branding Logo */}
        <div className={cn("flex items-center", isCollapsed ? "justify-center py-1" : "justify-between")}>
          <Link href="/" className="inline-flex items-center">
            {isCollapsed ? (
              <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100/90">
                <Image
                  src="/images/quickway-ride-icon.png"
                  alt="QuickWay Ride"
                  width={36}
                  height={36}
                  className="object-contain w-8 h-8"
                  priority
                />
              </div>
            ) : (
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-100/90">
                <Image
                  src="/images/quickway-ride-logo.png"
                  alt="QuickWay Ride Logo"
                  width={160}
                  height={48}
                  className="object-contain h-7 w-auto"
                  priority
                />
              </div>
            )}
          </Link>

          {/* Close button for mobile drawer */}
          {onCloseMobile && !isCollapsed && (
            <button
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Portal Sub-Header Badge (Expanded only) */}
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">QuickWay Ride Admin Panel</span>
          </div>
        )}

        {/* Exactly 3 Navigation Menu Items */}
        <nav aria-label="Admin Sidebar Navigation" className="pt-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "relative flex items-center gap-3 py-3 rounded-xl font-bold text-sm transition-all duration-200 group",
                  isCollapsed ? "justify-center px-2" : "px-3.5",
                  isActive
                    ? "text-slate-950 bg-amber-500 shadow-md shadow-amber-500/20 border border-amber-400/50"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-slate-950 stroke-[2.5]" : "text-slate-400 group-hover:text-amber-400"
                  )}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {/* Active Indicator Pill */}
                {isActive && !isCollapsed && (
                  <motion.span
                    layoutId="sidebarActivePill"
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-slate-950"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logged In Admin Profile & Sign Out */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {isCollapsed ? (
          /* Collapsed Profile Icon & Logout */
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 font-bold" title={userEmail}>
              <User className="w-5 h-5" />
            </div>
            <button
              type="button"
              onClick={async () => {
                await signOutAdminAction();
                window.location.href = "/admin/login";
              }}
              title="Sign Out Session"
              aria-label="Sign Out Session"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-600/90 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Expanded Profile Card & Logout Button */
          <>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>

              <div className="space-y-0.5 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">Administrator</span>
                  <span className="px-1 py-0.1 text-[8px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate" title={userEmail}>
                  {userEmail}
                </p>
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Collapsible Sidebar (280px or 80px) */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            />
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
