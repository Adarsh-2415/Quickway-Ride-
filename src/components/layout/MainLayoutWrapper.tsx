"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MaintenancePage } from "@/components/common/MaintenancePage";
import { getMaintenanceModeAction } from "@/actions/maintenance";

export const MainLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(false);
  const [isCheckingMode, setIsCheckingMode] = useState<boolean>(!isAdminRoute);

  useEffect(() => {
    if (isAdminRoute) {
      setIsCheckingMode(false);
      return;
    }

    let isMounted = true;
    getMaintenanceModeAction()
      .then((res) => {
        if (isMounted && res.success) {
          setIsMaintenanceMode(res.maintenanceMode);
        }
      })
      .catch((err) => {
        console.warn("[MainLayoutWrapper] Maintenance check warning:", err);
      })
      .finally(() => {
        if (isMounted) setIsCheckingMode(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, isAdminRoute]);

  // Admin routes ALWAYS render normally without block
  if (isAdminRoute) {
    return <div className="w-full flex-1 flex flex-col min-h-screen">{children}</div>;
  }

  // When Maintenance Mode is active, render ONLY the MaintenancePage (No Header, No Footer, No Page Components)
  if (!isCheckingMode && isMaintenanceMode) {
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
