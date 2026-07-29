"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getMaintenanceModeAction } from "@/actions/maintenance";

export interface WhatsAppFloatingButtonProps {
  initialMaintenanceMode?: boolean;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  initialMaintenanceMode = false,
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(initialMaintenanceMode);

  useEffect(() => {
    let isMounted = true;
    getMaintenanceModeAction()
      .then((res) => {
        if (isMounted && res.success) {
          setIsMaintenance(res.maintenanceMode);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Automatically hide WhatsApp button on Maintenance mode, Booking page (/book) and CMS Admin portal (/admin/*)
  if (isMaintenance || pathname.startsWith("/book") || pathname.startsWith("/admin")) {
    return null;
  }

  const whatsappNumber = "918679506655";
  const defaultMessage = "Hello QuickWay Ride, I want to inquire about booking a taxi.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto selection:bg-emerald-500 selection:text-white">
      {/* Floating Tooltip Badge Pill (Visible on Hover or Initial Load) */}
      <AnimatePresence>
        {(isHovered || showNotification) && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 text-white border border-slate-700/80 shadow-xl shadow-slate-950/20 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-tight text-slate-100">
              Need Quick Help? <span className="text-emerald-400 font-extrabold">Chat on WhatsApp 💬</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Action Button with Ambient Glow & Pulse Animations */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowNotification(false);
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="relative group cursor-pointer"
        aria-label="Chat on WhatsApp with QuickWay Ride"
      >
        {/* Dual Pulsing Outer Glow Aura */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 opacity-75 group-hover:opacity-100 blur-sm animate-pulse transition-all duration-300" />
        <span className="absolute -inset-2 rounded-full bg-emerald-500/20 opacity-50 group-hover:opacity-80 blur-md animate-ping transition-all duration-500" />

        {/* Main Floating Button Badge */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white shadow-xl shadow-emerald-950/30 border-2 border-white/20 group-hover:border-white/50 transition-all duration-300">
          <MessageCircle className="w-7 h-7 fill-white/10 stroke-[2.2]" />

          {/* Unread Red Notification Dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-extrabold text-white items-center justify-center shadow-xs">
              1
            </span>
          </span>
        </div>
      </motion.a>
    </div>
  );
};
