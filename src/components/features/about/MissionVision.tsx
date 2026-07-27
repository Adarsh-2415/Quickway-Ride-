"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Compass, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { Card } from "@/components/cards/Card";

export interface MissionVisionProps {
  content?: {
    story_badge?: string;
    story_heading?: string;
    story_p1?: string;
    story_p2?: string;
    story_highlight_text?: string;
    mission_title?: string;
    mission_text?: string;
    vision_title?: string;
    vision_text?: string;
  } | null;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ content }) => {
  const storyBadge = content?.story_badge || "Brand Story";
  const storyHeading =
    content?.story_heading || "Connecting Cities, Empowering Journeys Since 2024";
  const storyP1 =
    content?.story_p1 ||
    "Founded in 2024, QuickWay Ride was built to bridge the gap between traditional local taxi operators and modern digital travel expectations. Based in Roorkee and Dehradun, we provide seamless outstation cab bookings, daily airport transfers to Jolly Grant Dehradun & Delhi Airport, and curated pilgrimage tours across Uttarakhand.";
  const storyP2 =
    content?.story_p2 ||
    "Every driver in our roster undergoes thorough background verification and route training to ensure your family, guests, and delegation travel in comfort and security.";
  const storyHighlightText =
    content?.story_highlight_text || "100% Background Verified Regional Drivers";

  const missionTitle = content?.mission_title || "Our Mission";
  const missionText =
    content?.mission_text ||
    "To offer safe, punctual, and transparent mobility services across Uttarakhand and North India. We aim to eliminate surge pricing stress by providing fixed rate cards, clean vehicles, and dedicated customer assistance.";

  const visionTitle = content?.vision_title || "Our Vision";
  const visionText =
    content?.vision_text ||
    "To become the premier and most trusted regional cab management platform in North India, expanding fleet technology, eco-friendly transit options, and seamless digital booking voucher systems for travelers nationwide.";

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
              {storyBadge}
            </Badge>

            <SectionHeading>{storyHeading}</SectionHeading>

            <BodyRegular className="text-slate-600 leading-relaxed">
              {storyP1}
            </BodyRegular>

            {storyP2 && (
              <BodyRegular className="text-slate-600 leading-relaxed">
                {storyP2}
              </BodyRegular>
            )}

            {storyHighlightText && (
              <div className="pt-2 flex items-center gap-3 text-sm font-semibold text-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{storyHighlightText}</span>
              </div>
            )}
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
            <Card
              variant="standard"
              className="p-6 border-l-4 border-l-amber-500 space-y-3 bg-amber-50/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  {missionTitle}
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {missionText}
              </p>
            </Card>

            {/* Vision Card */}
            <Card
              variant="standard"
              className="p-6 border-l-4 border-l-blue-600 space-y-3 bg-blue-50/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-600 text-white font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  {visionTitle}
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {visionText}
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
