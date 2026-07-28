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

export interface FleetGridProps {
  vehicles?: FleetVehicle[];
}

export const FleetGrid: React.FC<FleetGridProps> = ({ vehicles }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [activeModalVehicle, setActiveModalVehicle] = useState<FleetVehicle | null>(null);

  const fleetList = vehicles || [];

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
