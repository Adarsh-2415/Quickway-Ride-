"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Server } from "lucide-react";

export const BrandingPanel: React.FC = () => {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 bg-slate-950 text-white p-12 xl:p-16 flex-col justify-between overflow-hidden select-none border-r border-slate-800/80">
      {/* Background Lighting & Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header Logo */}
      <div className="relative z-10">
        <div className="inline-block bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/20">
          <Image
            src="/images/quickway-ride-logo.png"
            alt="QuickWay Ride Logo"
            width={200}
            height={60}
            className="object-contain h-10 w-auto"
            priority
          />
        </div>
      </div>

      {/* Center Value Proposition & Security Checklist */}
      <div className="relative z-10 space-y-8 my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Server className="w-3.5 h-3.5" />
            Administration Portal
          </div>

          <h1 className="font-heading text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Welcome Back to{" "}
            <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
              QuickWay Ride
            </span>
          </h1>

          <p className="text-slate-300 text-sm xl:text-base leading-relaxed max-w-md">
            Sign in to access the QuickWay Ride Administration Center for fleet tracking, bookings management, and service operations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
