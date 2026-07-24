"use client";

import React from "react";
import { motion } from "framer-motion";

export const WelcomeSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-1.5 pt-2 pb-6"
    >
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
        Welcome Back 👋
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
        Manage your business operations from one centralized dashboard.
      </p>
    </motion.div>
  );
};
