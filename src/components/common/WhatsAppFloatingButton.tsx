"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { getMaintenanceModeAction } from "@/actions/maintenance";

export const WhatsAppFloatingButton: React.FC = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMaintenanceModeAction()
      .then((res) => {
        if (isMounted && res.success && res.maintenanceMode) {
          setIsMaintenance(true);
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
          y: [0, -4, 0], // Subtle continuous idle float animation
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 border-2 border-emerald-300/40 cursor-pointer"
        aria-label="Chat on WhatsApp with QuickWay Ride"
      >
        {/* Ambient Pulsing Glow Aura */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-emerald-500 -z-10 blur-sm pointer-events-none"
        />

        {/* Unread Red Notification Dot Badge */}
        {showNotification && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold border-2 border-white shadow-sm animate-bounce">
            1
          </span>
        )}

        {/* WhatsApp Icon (SVG for perfect high-res brand fidelity) */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.37a9.994 9.994 0 004.779 1.218h.004c5.506 0 9.989-4.478 9.99-9.984.001-2.668-1.034-5.176-2.919-7.063C17.202 3.036 14.693 2 12.012 2zm5.836 14.489c-.247.692-1.229 1.331-2.008 1.498-.535.114-1.233.205-3.585-.768-3.008-1.246-4.945-4.305-5.096-4.506-.149-.2-1.226-1.632-1.226-3.113 0-1.48.775-2.209 1.052-2.508.277-.299.604-.374.805-.374.201 0 .402.002.578.01.187.009.438-.071.687.525.25.597.854 2.083.928 2.234.075.151.125.328.025.527-.1.201-.151.326-.299.502-.15.176-.316.393-.45.527-.149.15-.304.313-.131.611.173.298.768 1.268 1.65 2.053 1.134 1.011 2.091 1.325 2.389 1.474.298.15.472.125.647-.075.175-.201.751-.876.952-1.176.2-.301.401-.251.676-.15.276.1.1.752 1.353 2.115 1.776.363.363.603.603.678.728.075.125.125.653-.122 1.345z" />
        </svg>
      </motion.a>
    </div>
  );
};
