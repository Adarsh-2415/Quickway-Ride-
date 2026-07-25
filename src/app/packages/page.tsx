import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { MapPin, Calendar, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchTourPackagesAction, TourPackageRecord } from "@/actions/packages";

export const metadata: Metadata = {
  title: "Uttarakhand Tour Packages & Pilgrimage Circuits | QuickWay Ride",
  description:
    "Explore customized taxi tour packages to Haridwar, Rishikesh, Mussoorie, Nainital, and Char Dham Yatra with QuickWay Ride.",
};

const FALLBACK_PACKAGES: TourPackageRecord[] = [
  {
    id: "1",
    title: "Haridwar Ganga Aarti & Ghat Circuit",
    slug: "haridwar-ganga-aarti-ghat-circuit",
    duration: "1 Day Express",
    starting_price: 3500,
    route: "Dehradun / Roorkee ➔ Har Ki Pauri ➔ Mansa Devi",
    cover_image: "/images/packages/mussoorie-hills.png",
    highlights: ["Evening Ganga Aarti VIP Slot", "Mansa Devi Ropeway Access", "Chandi Devi Temple"],
    status: "published",
  },
  {
    id: "2",
    title: "Rishikesh Adventure & Ashram Retreat",
    slug: "rishikesh-adventure-ashram-retreat",
    duration: "2 Days / 1 Night",
    starting_price: 5500,
    route: "Dehradun ➔ Triveni Ghat ➔ Ram Jhula ➔ Shivpuri",
    cover_image: "/images/packages/haridwar-ganga-aarti.jpg",
    highlights: ["River Rafting in Shivpuri", "Beatles Ashram Tour", "Ganga Aarti at Triveni Ghat"],
    status: "published",
  },
  {
    id: "3",
    title: "Mussoorie Queen of Hills Escape",
    slug: "mussoorie-queen-of-hills-escape",
    duration: "3 Days / 2 Nights",
    starting_price: 7500,
    route: "Dehradun ➔ Mall Road ➔ Kempty Falls ➔ Lal Tibba",
    cover_image: "/images/packages/chardham-yatra.png",
    highlights: ["Kempty Falls Picnic", "Cable Car to Gun Hill", "Company Garden Sightseeing"],
    status: "published",
  },
  {
    id: "4",
    title: "Char Dham Yatra Pilgrimage Circuit",
    slug: "char-dham-yatra-pilgrimage-circuit",
    duration: "10 Days / 9 Nights",
    starting_price: 35000,
    route: "Yamunotri ➔ Gangotri ➔ Kedarnath ➔ Badrinath",
    cover_image: "/images/packages/rishikesh-adventure.jpg",
    highlights: ["Dedicated Chauffeur & SUV", "Helicopter Sync Assistance", "Expert Hill Driving Chauffeur"],
    status: "published",
  },
];

export default async function PackagesPage() {
  const res = await fetchTourPackagesAction("public");
  const tourPackages = (res.data && res.data.length > 0) ? res.data : FALLBACK_PACKAGES;

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

      {/* Package Grid fetched dynamically from Supabase */}
      <Section variant="default" padding="normal">
        <Container className="space-y-8">
          <Grid cols={1} colsMd={2} gap={8}>
            {tourPackages.map((pkg) => (
              <Card
                key={pkg.id || pkg.title}
                variant="standard"
                isHoverable
                className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Image Banner with Floating Glass Badges */}
                  <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={pkg.cover_image || "/images/packages/haridwar-ganga-aarti.jpg"}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Floating Duration Badge (Top-Left) */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-xs font-extrabold text-amber-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 shadow-md">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Floating Private Cab Badge (Top-Right) */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-xs font-semibold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 flex items-center gap-1 shadow-md">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        Private Cab
                      </span>
                    </div>

                    {/* Gradient Fade Overlay at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Details Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">
                      {pkg.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{pkg.route}</span>
                    </p>

                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 block">
                          Package Highlights
                        </span>
                        <ul className="grid grid-cols-1 gap-1.5 text-xs font-medium text-slate-700">
                          {pkg.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Booking CTA Footer */}
                <div className="p-6 pt-0">
                  <Link href={`/book?package=${encodeURIComponent(pkg.title)}`} className="block">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-sm"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
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
