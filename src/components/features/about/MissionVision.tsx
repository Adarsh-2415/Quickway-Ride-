"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Sparkles, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { Card } from "@/components/cards/Card";

export const MissionVision: React.FC = () => {
  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Company Story & Brand Heritage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            <Badge variant="softAccent" size="md">
              Brand Story
            </Badge>

            <SectionHeading>
              Connecting Cities, Empowering Journeys Since 2024
            </SectionHeading>

            <BodyRegular className="text-slate-600 leading-relaxed">
              Founded in <strong className="text-slate-900 font-semibold">2024</strong>, QuickWay Ride was built to bridge the gap between traditional local taxi operators and modern digital travel expectations. Based in Roorkee and Dehradun, we provide seamless outstation cab bookings, daily airport transfers to Jolly Grant Dehradun & Delhi Airport, and curated pilgrimage tours across Uttarakhand.
            </BodyRegular>

            <BodyRegular className="text-slate-600 leading-relaxed">
              Every driver in our roster undergoes thorough background verification and route training to ensure your family, guests, and delegation travel in comfort and security.
            </BodyRegular>

            <div className="pt-2 flex items-center gap-3 text-sm font-semibold text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>100% Background Verified Regional Drivers</span>
            </div>
          </motion.div>

          {/* Right Column: Mission & Vision Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Mission Card */}
            <Card variant="standard" className="p-6 border-l-4 border-l-amber-500 space-y-3 bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                To offer safe, punctual, and transparent mobility services across Uttarakhand and North India. We aim to eliminate surge pricing stress by providing fixed rate cards, clean vehicles, and dedicated customer assistance.
              </p>
            </Card>

            {/* Vision Card */}
            <Card variant="standard" className="p-6 border-l-4 border-l-blue-600 space-y-3 bg-blue-50/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-600 text-white font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">Our Vision</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                To become the premier and most trusted regional cab management platform in North India, expanding fleet technology, eco-friendly transit options, and seamless digital booking voucher systems for travelers nationwide.
              </p>
            </Card>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
};
