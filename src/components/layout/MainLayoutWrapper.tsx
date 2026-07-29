"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MaintenancePage } from "@/components/common/MaintenancePage";
import { getMaintenanceModeAction } from "@/actions/maintenance";

export interface MainLayoutWrapperProps {
  children: React.ReactNode;
  initialMaintenanceMode?: boolean;
}

export const MainLayoutWrapper: React.FC<MainLayoutWrapperProps> = ({
  children,
  initialMaintenanceMode = false,
}) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(initialMaintenanceMode);

  useEffect(() => {
    if (isAdminRoute) return;

    let isMounted = true;
    getMaintenanceModeAction()
      .then((res) => {
        if (isMounted && res.success) {
          setIsMaintenanceMode(res.maintenanceMode);
        }
      })
      .catch((err) => {
        console.warn("[MainLayoutWrapper] Maintenance check warning:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, isAdminRoute]);

  // Admin routes ALWAYS render normally without block
  if (isAdminRoute) {
    return <div className="w-full flex-1 flex flex-col min-h-screen">{children}</div>;
  }

  // When Maintenance Mode is active, render ONLY the MaintenancePage (Zero Flash, Server SSR pre-rendered)
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
};
