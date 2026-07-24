"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/badges/Badge";
import { PageHeading } from "@/components/typography/Headings";
import { BodyLarge } from "@/components/typography/Text";
import { Sparkles } from "lucide-react";

export const ContactHero: React.FC = () => {
  return (
    <section className="relative w-full bg-slate-950 text-white py-16 lg:py-20 overflow-hidden border-b border-slate-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Badge variant="softAccent" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            QuickWay Ride Operations Desk
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PageHeading className="text-white">
            Get in Touch with <span className="text-amber-400">QuickWay Ride</span>
          </PageHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BodyLarge className="text-slate-300">
            Have questions about cab fares, outstation packages, or corporate bookings? Reach out to our team in Dehradun directly via phone, WhatsApp, or email.
          </BodyLarge>
        </motion.div>
      </Container>
    </section>
  );
};
