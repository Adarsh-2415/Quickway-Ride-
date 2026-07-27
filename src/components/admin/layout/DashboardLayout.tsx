"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userEmail = "",
  userRole = "",
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Restore sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("cms_sidebar_collapsed");
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === "true");
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem("cms_sidebar_collapsed", String(nextState));
      return nextState;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex selection:bg-amber-500 selection:text-slate-900">
      {/* Admin Sidebar (280px Expanded <-> 80px Collapsed) */}
      <Sidebar
        userEmail={userEmail}
        userRole={userRole}
        isCollapsed={isSidebarCollapsed}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Right Core Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Sticky Dashboard Header (72px Height) */}
        <DashboardHeader
          userEmail={userEmail}
          userRole={userRole}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
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
