"use client";

import React, { useState, useEffect } from "react";
import { Menu, Calendar, Clock, User, LogOut } from "lucide-react";
import { signOutAdminAction } from "@/actions/authActions";

export interface DashboardHeaderProps {
  userEmail?: string;
  onOpenMobileSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userEmail = "admin@quickwayride.com",
  onOpenMobileSidebar,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(`${formattedDate} • ${formattedTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-[72px] w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left Area: Mobile Menu Trigger & Page Title */}
      <div className="flex items-center gap-3.5">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            aria-label="Open sidebar menu"
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="space-y-0.5">
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Welcome back, Administrator
          </p>
        </div>
      </div>

      {/* Right Area: Date/Time Ticker & Admin Avatar Badge */}
      <div className="flex items-center gap-4">
        {/* Real-time Date/Time Ticker */}
        {currentDateTime && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{currentDateTime}</span>
          </div>
        )}

        {/* Profile Avatar Badge & Sign Out Button */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center border border-slate-800 shadow-sm shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left">
            <span className="block text-xs font-bold text-slate-900 leading-tight">
              Administrator
            </span>
            <span className="block text-[10px] text-slate-500 truncate max-w-[120px]" title={userEmail}>
              {userEmail}
            </span>
          </div>

          {/* Header Sign Out Button */}
          <button
            type="button"
            onClick={async () => {
              await signOutAdminAction();
              window.location.href = "/admin/login";
            }}
            title="Sign Out"
            aria-label="Sign Out"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
