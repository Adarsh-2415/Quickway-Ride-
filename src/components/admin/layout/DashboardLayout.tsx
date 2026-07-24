"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userEmail = "admin@quickwayride.com",
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex selection:bg-amber-500 selection:text-slate-900">
      {/* Admin Sidebar (280px Desktop Width & Mobile Drawer) */}
      <Sidebar
        userEmail={userEmail}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Right Core Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Dashboard Header (72px Height) */}
        <DashboardHeader
          userEmail={userEmail}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
