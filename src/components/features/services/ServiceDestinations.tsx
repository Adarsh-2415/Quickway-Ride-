"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Navigation } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { TextInput } from "@/components/forms/TextInput";

const SERVICE_DESTINATIONS = [
  { name: "Saharanpur", state: "Uttar Pradesh", tag: "Major Hub" },
  { name: "Roorkee", state: "Uttarakhand", tag: "Headquarters" },
  { name: "Paonta Sahib", state: "Himachal Pradesh", tag: "Pilgrimage" },
  { name: "Ambala", state: "Haryana", tag: "Transit Hub" },
  { name: "Chandigarh", state: "UT", tag: "Tricity" },
  { name: "Mohali", state: "Punjab", tag: "Tricity" },
  { name: "Shimla", state: "Himachal Pradesh", tag: "Hill Station" },
  { name: "Manali", state: "Himachal Pradesh", tag: "Hill Station" },
  { name: "Agra", state: "Uttar Pradesh", tag: "Heritage" },
  { name: "Mathura", state: "Uttar Pradesh", tag: "Pilgrimage" },
  { name: "Vrindavan", state: "Uttar Pradesh", tag: "Pilgrimage" },
  { name: "Jaipur", state: "Rajasthan", tag: "Heritage" },
  { name: "Amritsar", state: "Punjab", tag: "Golden Temple" },
  { name: "Delhi", state: "NCR", tag: "Capital Hub" },
  { name: "Faridabad", state: "NCR", tag: "Industrial" },
  { name: "Noida", state: "NCR", tag: "Tech Hub" },
  { name: "Ghaziabad", state: "NCR", tag: "Transit Hub" },
  { name: "Gurugram", state: "NCR", tag: "Corporate" },
  { name: "Greater Noida", state: "NCR", tag: "Expressway" },
  { name: "Nainital", state: "Uttarakhand", tag: "Lake District" },
  { name: "Haldwani", state: "Uttarakhand", tag: "Kumaon Hub" },
  { name: "Rudrapur", state: "Uttarakhand", tag: "Industrial" },
  { name: "Kotdwar", state: "Uttarakhand", tag: "Garhwal Gateway" },
  { name: "Kashipur", state: "Uttarakhand", tag: "Kumaon" },
  { name: "Jollygrant Airport", state: "Uttarakhand", tag: "Dehradun Airport" },
  { name: "Ludhiana", state: "Punjab", tag: "Industrial" },
];

export const ServiceDestinations: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = SERVICE_DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.state.toLowerCase().includes(query.toLowerCase()) ||
      d.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="softSecondary" size="md">
              Regional Coverage Network
            </Badge>
            <SectionHeading>26+ Cities & Route Destinations</SectionHeading>
            <BodyRegular className="text-slate-600">
              Daily outstation cabs, one-way transfers, and tourist rentals connecting all key North Indian hubs.
            </BodyRegular>
          </div>

          <div className="w-full md:w-72">
            <TextInput
              placeholder="Search destination or state..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              iconLeft={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((dest) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-amber-500 hover:shadow-md transition-all space-y-1 group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-amber-600">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{dest.name}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pl-5">
                <span>{dest.state}</span>
                <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                  {dest.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
