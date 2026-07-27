"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Luggage, AirVent, Fuel, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";

const FLEET_CATEGORIES = [
  {
    name: "Sedan Category",
    models: "Swift Dzire, Hyundai Aura",
    categoryBadge: "Sedan",
    seating: "4+1 Seater",
    luggage: "2 Medium, 1 Cabin, 1 Backpack",
    ac: "AC (Only in Plains)",
    fuel: "Petrol, Petrol+CNG",
    image: "/images/swift.jfif",
    tag: "Popular Outstation",
  },
  {
    name: "Ertiga Category",
    models: "Maruti Ertiga, Toyota Rumion",
    categoryBadge: "Ertiga",
    seating: "6+1 Seater",
    luggage: "3 Medium, 1 Cabin, 1 Backpack",
    ac: "AC (Only in Plains)",
    fuel: "Petrol, Petrol+CNG, Diesel",
    image: "/images/ertiga.jfif",
    tag: "Family Favorite",
  },
  {
    name: "Innova Category",
    models: "Toyota Innova Crysta, Innova Hycross",
    categoryBadge: "Innova",
    seating: "6+1, 7+1 Seater",
    luggage: "3 Large, 1 Medium, 1 Backpack",
    ac: "Dual Executive AC",
    fuel: "Diesel",
    image: "/images/innova crysta.jfif",
    tag: "Premium Luxury",
  },
  {
    name: "Urbania & Maharaja Category",
    models: "Force Urbania, Maharaja Tempo Traveller",
    categoryBadge: "Urbania / Maharaja",
    seating: "12 - 26 Seater",
    luggage: "Large Carrier & Dedicated Boot",
    ac: "Executive Dual AC",
    fuel: "Diesel",
    image: "/images/Tempo Traveller.jfif",
    tag: "Group Delegation",
  },
];

export interface AboutFleetGridProps {
  content?: {
    fleet_badge?: string;
    fleet_heading?: string;
    fleet_subtext?: string;
  } | null;
}

export const AboutFleetGrid: React.FC<AboutFleetGridProps> = ({ content }) => {
  const fleetBadge = content?.fleet_badge || "Verified Fleet Roster";
  const fleetHeading = content?.fleet_heading || "Our 4+ Premium Fleet Vehicles";
  const fleetSubtext =
    content?.fleet_subtext ||
    "Every vehicle in our fleet is maintained to executive standards with daily sanitization and GPS tracking.";

  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="softAccent" size="md">
            {fleetBadge}
          </Badge>
          <SectionHeading>{fleetHeading}</SectionHeading>
          {fleetSubtext && <BodyRegular className="text-slate-600">{fleetSubtext}</BodyRegular>}
        </div>

        <Grid cols={1} colsMd={2} gap={6}>
          {FLEET_CATEGORIES.map((vehicle, idx) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card variant="standard" isHoverable className="p-0 flex flex-col justify-between h-full">
                {/* Vehicle Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 p-2">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="primary">{vehicle.tag}</Badge>
                    <span className="text-xs font-bold text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-sm">
                      {vehicle.categoryBadge}
                    </span>
                  </div>
                </div>

                {/* Vehicle Specifications Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">{vehicle.name}</h3>
                    <p className="text-xs text-amber-600 font-semibold mt-0.5">{vehicle.models}</p>
                  </div>

                  {/* Attribute Tags Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Seating</span>
                        <span className="font-semibold text-slate-900">{vehicle.seating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Luggage</span>
                        <span className="font-semibold text-slate-900">{vehicle.luggage}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <AirVent className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Climate Control</span>
                        <span className="font-semibold text-slate-900">{vehicle.ac}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Fuel Type</span>
                        <span className="font-semibold text-slate-900">{vehicle.fuel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Daily Sanitized & Insured
                    </span>
                    <Link href={`/book?vehicle=${encodeURIComponent(vehicle.name)}`}>
                      <Button variant="primary" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                        Select Vehicle
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
