"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideItem } from "./hero.types";

interface HeroSlideProps {
  slide: SlideItem;
  isActive: boolean;
  isPriority?: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isActive, isPriority }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {isActive && (
        <motion.div
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 5.5, ease: "linear" }}
          className="relative w-full h-full"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={isPriority}
            unoptimized
            sizes="100vw"
            className="object-cover object-center w-full h-full filter brightness-95 contrast-105"
          />
        </motion.div>
      )}
    </motion.div>
  );
};
