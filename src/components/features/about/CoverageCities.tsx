"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { TextInput } from "@/components/forms/TextInput";

const CITIES = [
  { name: "Saharanpur", state: "Uttar Pradesh", region: "Western UP" },
  { name: "Roorkee", state: "Uttarakhand", region: "HQ Hub" },
  { name: "Paonta Sahib", state: "Himachal Pradesh", region: "Sirmour" },
  { name: "Ambala", state: "Haryana", region: "GT Road" },
  { name: "Chandigarh", state: "UT", region: "Tricity" },
  { name: "Mohali", state: "Punjab", region: "Tricity" },
  { name: "Shimla", state: "Himachal Pradesh", region: "Hill Station" },
  { name: "Manali", state: "Himachal Pradesh", region: "Hill Station" },
  { name: "Agra", state: "Uttar Pradesh", region: "Heritage" },
  { name: "Mathura", state: "Uttar Pradesh", region: "Pilgrimage" },
  { name: "Vrindavan", state: "Uttar Pradesh", region: "Pilgrimage" },
  { name: "Jaipur", state: "Rajasthan", region: "Pink City" },
  { name: "Amritsar", state: "Punjab", region: "Golden Temple" },
  { name: "Delhi", state: "NCR", region: "Capital Hub" },
  { name: "Faridabad", state: "NCR", region: "Haryana" },
  { name: "Noida", state: "NCR", region: "UP" },
  { name: "Ghaziabad", state: "NCR", region: "UP" },
  { name: "Gurugram", state: "NCR", region: "Haryana" },
  { name: "Greater Noida", state: "NCR", region: "UP" },
  { name: "Nainital", state: "Uttarakhand", region: "Lake District" },
  { name: "Haldwani", state: "Uttarakhand", region: "Kumaon Hub" },
  { name: "Rudrapur", state: "Uttarakhand", region: "Industrial Hub" },
  { name: "Kotdwar", state: "Uttarakhand", region: "Garhwal Gateway" },
  { name: "Kashipur", state: "Uttarakhand", region: "Kumaon" },
  { name: "Jollygrant Airport", state: "Uttarakhand", region: "Dehradun Airport" },
  { name: "Ludhiana", state: "Punjab", region: "Industrial Hub" },
];

export const CoverageCities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="softSecondary" size="md">
              Regional Coverage Network
            </Badge>
            <SectionHeading>Serving 26+ Key Cities & Transit Hubs</SectionHeading>
            <BodyRegular className="text-slate-600">
              Pickups & drop-offs across Uttarakhand, Himachal Pradesh, Punjab, Delhi NCR, Rajasthan, and Uttar Pradesh.
            </BodyRegular>
          </div>

          {/* Search Filter Input */}
          <div className="w-full md:w-72">
            <TextInput
              placeholder="Search city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              iconLeft={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        </div>

        {/* Cities Grid Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredCities.map((city) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-500 hover:bg-amber-50/50 transition-colors flex flex-col justify-between space-y-1 group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-amber-700">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{city.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium pl-5">
                {city.state}
              </span>
            </motion.div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No city matches your search. We also offer custom outstation routes across all North Indian states!
          </div>
        )}
      </Container>
    </Section>
  );
};
