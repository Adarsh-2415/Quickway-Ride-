"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterLegal } from "./FooterLegal";
import { FooterContact } from "./FooterContact";
import { FooterMap } from "./FooterMap";
import { FooterBottom } from "./FooterBottom";

export const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <footer
      aria-label="Site Footer"
      className="w-full bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white border-t border-white/[0.08] pt-16 pb-8 overflow-hidden select-none"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10"
        >
          {/* Column 1: Brand Info & Social Icons */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <FooterBrand />
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <FooterLinks />
          </motion.div>

          {/* Column 3: Legal & Policies */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <FooterLegal />
          </motion.div>

          {/* Column 4: Contact Us */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <FooterContact />
          </motion.div>

          {/* Column 5: Responsive Google Map */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <FooterMap />
          </motion.div>
        </motion.div>

        {/* Bottom Copyright */}
        <FooterBottom />
      </Container>
    </footer>
  );
};
