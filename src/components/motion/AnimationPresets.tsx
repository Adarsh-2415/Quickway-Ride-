"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeUp: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const FadeDown: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const ScaleIn: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className }) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const SectionReveal: React.FC<MotionProps> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);
