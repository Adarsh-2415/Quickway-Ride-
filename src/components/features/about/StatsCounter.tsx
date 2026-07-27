"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Car, MapPin, Star, ShieldCheck, Clock, Award, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";

const ICON_MAP: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-6 h-6 text-amber-500" />,
  Car: <Car className="w-6 h-6 text-amber-500" />,
  MapPin: <MapPin className="w-6 h-6 text-amber-500" />,
  Star: <Star className="w-6 h-6 text-amber-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-500" />,
  Clock: <Clock className="w-6 h-6 text-amber-500" />,
  Award: <Award className="w-6 h-6 text-amber-500" />,
  Users: <Users className="w-6 h-6 text-amber-500" />,
};

const DEFAULT_STATS = [
  {
    label: "Year Established",
    value: "2024",
    subtext: "1+ Years of Excellence",
    icon_name: "Calendar",
  },
  {
    label: "Fleet Vehicles",
    value: "6+",
    subtext: "Sedans, SUVs & Tempo Travellers",
    icon_name: "Car",
  },
  {
    label: "Cities & Hubs Served",
    value: "26+",
    subtext: "Uttarakhand, HP, Punjab, NCR & UP",
    icon_name: "MapPin",
  },
  {
    label: "Customer Satisfaction",
    value: "4.9 / 5",
    subtext: "2,500+ Journeys Completed",
    icon_name: "Star",
  },
];

export interface StatsCounterProps {
  content?: {
    stats_list?: any[];
  } | null;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ content }) => {
  const stats =
    content?.stats_list && content.stats_list.length > 0
      ? content.stats_list
      : DEFAULT_STATS;

  return (
    <div className="relative -mt-10 z-20 select-none">
      <Container>
        <Grid cols={1} colsSm={2} colsLg={4} gap={4}>
          {stats.map((stat: any, idx: number) => {
            const iconNode =
              ICON_MAP[stat.icon || stat.icon_name] || (
                <Calendar className="w-6 h-6 text-amber-500" />
              );
            return (
              <motion.div
                key={stat.label || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900/95 border border-slate-800 p-6 rounded-2xl shadow-xl text-white backdrop-blur-md hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs uppercase tracking-wider font-semibold font-heading">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80">
                    {iconNode}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-amber-400 font-medium mt-1">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
