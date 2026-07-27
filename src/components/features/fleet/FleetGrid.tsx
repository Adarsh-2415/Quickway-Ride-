"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Wind, Fuel, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Badge } from "@/components/badges/Badge";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { VehicleSpecModal, FleetVehicle } from "./VehicleSpecModal";
import { cn } from "@/lib/utils";

const FLEET_ROSTER: FleetVehicle[] = [
  {
    id: "sedan",
    name: "Sedan Category (Dzire / Aura)",
    category: "Sedan",
    tabCategory: "sedan",
    image: "/images/swift.jfif",
    seating: "4 + 1 Passengers",
    luggage: "2 Medium, 1 Cabin, 1 Backpack",
    acType: "AC (Plains)",
    fuelType: "Petrol / Petrol+CNG",
    perKmRate: "₹11 - ₹12 / KM",
    idealFor: "Couples, small families & 1-way outstation drops",
    features: [
      "Plush fabric seating",
      "Fast-charging mobile USB ports",
      "Spacious boot for 3 suitcases",
      "Smooth city & highway suspension",
    ],
    description: "Our compact sedan fleet comprising Maruti Suzuki Dzire and Hyundai Aura delivers unmatched fuel efficiency, smooth highway rides, and clean comfortable seating for 4 passengers.",
  },
  {
    id: "ertiga",
    name: "MPV Category (Ertiga / Rumion)",
    category: "Ertiga & MPV",
    tabCategory: "mpv",
    image: "/images/ertiga.jfif",
    seating: "6 + 1 Passengers",
    luggage: "3 Medium, 1 Cabin, 1 Backpack",
    acType: "AC (Plains)",
    fuelType: "Petrol / Petrol+CNG / Diesel",
    perKmRate: "₹14 - ₹15 / KM",
    idealFor: "Family trips, hill station tours & outstation travel",
    features: [
      "Flexible 3-row seating",
      "Rear air-conditioning vents",
      "Roof luggage carrier option",
      "High ground clearance for hill roads",
    ],
    description: "The 7-seater Maruti Ertiga and Toyota Rumion provide the perfect balance between spacious family seating and economical outstation travel across Uttarakhand, Himachal & Punjab.",
  },
  {
    id: "innova",
    name: "Luxury SUV (Innova Crysta / Hycross)",
    category: "Innova Category",
    tabCategory: "suv",
    image: "/images/innova crysta.jfif",
    seating: "6+1 / 7+1 Captain Seats",
    luggage: "3 Large, 1 Medium, 1 Backpack",
    acType: "Dual Executive AC",
    fuelType: "Diesel / Hybrid",
    perKmRate: "₹18 - ₹20 / KM",
    idealFor: "VIPs, executive delegations, long hill tours & Char Dham Yatra",
    features: [
      "Luxurious leather captain seats",
      "Dual-zone automatic climate control",
      "All-terrain hill driving capability",
      "Premium ambient cabin lighting",
    ],
    description: "The gold standard of Indian road travel. Our Toyota Innova Crysta features plush captain seating, dual executive AC, and supreme ride comfort for long outstation tours and Char Dham Yatra.",
  },
  {
    id: "tempo-traveller",
    name: "Urbania & Maharaja (Tempo Traveller)",
    category: "Urbania & Maharaja",
    tabCategory: "traveller",
    image: "/images/Tempo Traveller.jfif",
    seating: "12 to 26 Seater",
    luggage: "Heavy Roof Carrier + Boot",
    acType: "Dual Executive AC Vents",
    fuelType: "Diesel",
    perKmRate: "₹25 - ₹28 / KM",
    idealFor: "Large family reunions, wedding groups, corporate outings & pilgrimages",
    features: [
      "Pushback recliner seats with armrests",
      "Individual AC blower vents",
      "Heavy duty roof luggage carrier",
      "High roof standing clearance & LED TV",
    ],
    description: "Our luxury Force Urbania and Maharaja Tempo Travellers offer 12 to 26 recliner seat configurations for large family tours, wedding baraat transport, and group pilgrimages.",
  },
];

export interface FleetGridProps {
  vehicles?: FleetVehicle[];
}

export const FleetGrid: React.FC<FleetGridProps> = ({ vehicles }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [activeModalVehicle, setActiveModalVehicle] = useState<FleetVehicle | null>(null);

  const fleetList = vehicles && vehicles.length > 0 ? vehicles : FLEET_ROSTER;

  const categories = [
    { id: "all", label: "All Vehicles" },
    { id: "sedan", label: "Sedan (4+1)" },
    { id: "mpv", label: "Ertiga / MPV (6+1)" },
    { id: "suv", label: "Innova Crysta (6+1, 7+1)" },
    { id: "traveller", label: "Urbania & Traveller (12-26)" },
  ];

  const filtered = fleetList.filter(
    (v) => selectedTab === "all" || v.tabCategory === selectedTab
  );

  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-10">
        
        {/* Category Tabs */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  selectedTab === cat.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Cards Grid */}
        <Grid cols={1} colsMd={2} gap={8}>
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="standard"
                  isHoverable
                  className="overflow-hidden border border-slate-200 hover:border-amber-500/50 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Vehicle Image Banner */}
                    <div className="relative w-full h-60 bg-slate-100 p-2 border-b border-slate-100">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        className="object-contain p-4"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="softAccent" size="sm">
                          {vehicle.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-slate-900">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-amber-700 font-bold mt-0.5">
                          Ideal for: {vehicle.idealFor}
                        </p>
                      </div>

                      {/* 4 Spec Pills */}
                      <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <Users className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{vehicle.seating}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="truncate">{vehicle.luggage}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <Wind className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{vehicle.acType}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <Fuel className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{vehicle.fuelType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => setActiveModalVehicle(vehicle)}
                    >
                      View Full Specs
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center font-bold text-slate-900"
                      iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={() => setActiveModalVehicle(vehicle)}
                    >
                      Book Car
                    </Button>
                  </div>

                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Grid>

        {/* Modal Popup */}
        <VehicleSpecModal
          vehicle={activeModalVehicle}
          onClose={() => setActiveModalVehicle(null)}
        />

      </Container>
    </Section>
  );
};
