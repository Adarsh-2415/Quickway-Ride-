import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { MapPin, Calendar, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uttarakhand Tour Packages & Pilgrimage Circuits | QuickWay Ride",
  description:
    "Explore customized taxi tour packages to Haridwar, Rishikesh, Mussoorie, Nainital, and Char Dham Yatra with QuickWay Ride.",
};

const TOUR_PACKAGES = [
  {
    title: "Haridwar Ganga Aarti & Ghat Circuit",
    duration: "1 Day Express",
    route: "Dehradun / Roorkee ➔ Har Ki Pauri ➔ Mansa Devi",
    highlights: ["Evening Ganga Aarti VIP Slot", "Mansa Devi Ropeway Access", "Chandi Devi Temple"],
  },
  {
    title: "Rishikesh Adventure & Ashram Retreat",
    duration: "2 Days / 1 Night",
    route: "Dehradun ➔ Triveni Ghat ➔ Ram Jhula ➔ Shivpuri",
    highlights: ["River Rafting in Shivpuri", "Beatles Ashram Tour", "Ganga Aarti at Triveni Ghat"],
  },
  {
    title: "Mussoorie Queen of Hills Escape",
    duration: "3 Days / 2 Nights",
    route: "Dehradun ➔ Mall Road ➔ Kempty Falls ➔ Lal Tibba",
    highlights: ["Kempty Falls Picnic", "Cable Car to Gun Hill", "Company Garden Sightseeing"],
  },
  {
    title: "Char Dham Yatra Pilgrimage Circuit",
    duration: "10 Days / 9 Nights",
    route: "Yamunotri ➔ Gangotri ➔ Kedarnath ➔ Badrinath",
    highlights: ["Dedicated Chauffeur & SUV", "Helicopter Sync Assistance", "Expert Hill Driving Chauffeur"],
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Tour & Pilgrimage Circuits
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Uttarakhand Tour Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Hassle-free, private cab itineraries for hill station escapes, spiritual ghats, and Char Dham Yatra.
          </p>
        </Container>
      </section>

      {/* Package Grid */}
      <Section variant="default" padding="normal">
        <Container className="space-y-8">
          <Grid cols={1} colsMd={2} gap={8}>
            {TOUR_PACKAGES.map((pkg) => (
              <Card key={pkg.title} variant="standard" isHoverable className="p-6 space-y-4 border border-slate-200 bg-white rounded-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-500" /> Private Cab
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">{pkg.title}</h3>

                  <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{pkg.route}</span>
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 block">Package Highlights</span>
                    <ul className="grid grid-cols-1 gap-1 text-xs font-medium text-slate-700">
                      {pkg.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/book?package=${encodeURIComponent(pkg.title)}`} className="block">
                    <Button variant="primary" size="md" className="w-full justify-center font-bold text-slate-950 bg-amber-400 hover:bg-amber-500" iconRight={<ArrowRight className="w-4 h-4" />}>
                      Book Package Cab
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  );
}
