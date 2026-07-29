"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Info,
  Briefcase,
  Car,
  BadgeIndianRupee,
  Compass,
  Images,
  Wrench,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { PageCard } from "./PageCard";
import { toast } from "sonner";
import { getMaintenanceModeAction, toggleMaintenanceModeAction } from "@/actions/maintenance";

const PAGES = [
  {
    title: "Home",
    description: "Manage homepage content and sections.",
    icon: House,
    href: "/admin/dashboard/manage-pages/home",
  },
  {
    title: "About Us",
    description: "Manage company information and brand story.",
    icon: Info,
    href: "/admin/dashboard/manage-pages/about",
  },
  {
    title: "Services",
    description: "Manage all service content and descriptions.",
    icon: Briefcase,
    href: "/admin/dashboard/manage-pages/services",
  },
  {
    title: "Fleet",
    description: "Manage fleet page content.",
    icon: Car,
    href: "/admin/dashboard/manage-pages/fleet",
  },
  {
    title: "Pricing",
    description: "Manage pricing page content.",
    icon: BadgeIndianRupee,
    href: "/admin/dashboard/manage-pages/pricing",
  },
  {
    title: "Tour Packages",
    description: "Manage tour package content.",
    icon: Compass,
    href: "/admin/dashboard/manage-pages/tour-packages",
  },
  {
    title: "Gallery",
    description: "Manage gallery content.",
    icon: Images,
    href: "/admin/dashboard/manage-pages/gallery",
  },
];

export interface ManagePagesGridProps {
  userRole?: string;
}

export const ManagePagesGrid: React.FC<ManagePagesGridProps> = ({ userRole = "admin" }) => {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [isLoadingMode, setIsLoadingMode] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [targetState, setTargetState] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    getMaintenanceModeAction()
      .then((res) => {
        if (isMounted && res.success) {
          setMaintenanceMode(res.maintenanceMode);
        }
      })
      .catch((err) => console.error("Load maintenance status error:", err))
      .finally(() => {
        if (isMounted) setIsLoadingMode(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleClick = (newValue: boolean) => {
    setTargetState(newValue);
    setShowConfirmModal(true);
  };

  const handleConfirmToggle = async () => {
    setIsUpdating(true);
    try {
      const res = await toggleMaintenanceModeAction(targetState);
      if (res.success) {
        setMaintenanceMode(targetState);
        setShowConfirmModal(false);
        toast.success(
          targetState
            ? "Website Maintenance Mode ENABLED!"
            : "Website Maintenance Mode DISABLED!",
          {
            description: targetState
              ? "The public website is now hidden under maintenance. Admin panel remains live."
              : "The public website is now live and accessible.",
          }
        );
      } else {
        toast.error("Failed to update Maintenance Mode", { description: res.error });
      }
    } catch (err: any) {
      console.error("Toggle maintenance error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* Super Admin Maintenance Mode Operational Card */}
      {userRole === "admin" && (
        <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 transition-all hover:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  maintenanceMode
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-emerald-50 border-emerald-200 text-emerald-600"
                }`}
              >
                <Wrench className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                    Website Maintenance Mode
                  </h3>
                  {isLoadingMode ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                      <Loader2 className="w-3 h-3 animate-spin" /> Checking...
                    </span>
                  ) : maintenanceMode ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></span>
                      ENABLED (Locked)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      DISABLED (Live)
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Temporarily lock the public website under a clean maintenance screen. Admin Panel remains fully accessible.
                </p>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="shrink-0 flex items-center pt-2 sm:pt-0">
              <button
                type="button"
                disabled={isLoadingMode || isUpdating}
                onClick={() => handleToggleClick(!maintenanceMode)}
                className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  maintenanceMode ? "bg-rose-600" : "bg-slate-300"
                }`}
                role="switch"
                aria-checked={maintenanceMode}
              >
                <span className="sr-only">Toggle Maintenance Mode</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    maintenanceMode ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    targetState
                      ? "bg-rose-100 text-rose-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-slate-900 text-lg">
                    {targetState ? "Enable Website Maintenance?" : "Disable Website Maintenance?"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {targetState
                      ? "The public website will become unavailable to visitors. The Admin Panel will remain 100% accessible."
                      : "The website will immediately become publicly accessible to all visitors."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={handleConfirmToggle}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                    targetState
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {targetState ? "Enable Maintenance" : "Disable Maintenance"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80">
        <h2 className="font-heading text-xl font-extrabold text-slate-900 tracking-tight">
          Website Pages Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Currently displaying {PAGES.length} editable public pages for QuickWay Ride
        </p>
      </div>

      {/* Page Cards Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAGES.map((page) => (
          <PageCard
            key={page.title}
            title={page.title}
            description={page.description}
            icon={page.icon}
            href={page.href}
          />
        ))}
      </div>
    </motion.div>
  );
};
