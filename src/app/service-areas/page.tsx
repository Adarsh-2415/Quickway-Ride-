import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas & Regional Coverage | QuickWay Ride Cabs",
  description:
    "QuickWay Ride taxi service operational network in Dehradun, Roorkee, Haridwar, Rishikesh, Saharanpur, and Delhi NCR.",
};

const SERVICE_REGIONS = [
  { city: "Dehradun Capital City", hubs: ["GMS Road HQ", "Jolly Grant Airport", "ISBT Dehradun", "Rajpur Road"], cabs: "Sedan, Ertiga, Innova, Urbania" },
  { city: "Roorkee & IIT Hub", hubs: ["Roorkee Junction", "IIT Main Gate", "Civil Lines", "National Highway 58"], cabs: "24/7 Outstation Cabs" },
  { city: "Haridwar Pilgrimage Hub", hubs: ["Har Ki Pauri Ghat", "Haridwar Railway Station", "BHEL Complex"], cabs: "Express Ganga Aarti Pickup" },
  { city: "Rishikesh Yoga Capital", hubs: ["Triveni Ghat", "Lakshman Jhula", "Tapovan", "Shivpuri Rafting Point"], cabs: "Tourist Special Cabs" },
  { city: "Saharanpur Railway Hub", hubs: ["Saharanpur Junction", "Court Road", "Delhi Road"], cabs: "Intercity Cabs" },
  { city: "Delhi NCR Airport Hub", hubs: ["Delhi IGI Airport Terminal 3", "Noida", "Gurugram", "Ghaziabad"], cabs: "Flat Rate One-Way Drops" },
];

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Regional Network Coverage
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            QuickWay Ride Service Areas
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Operational 24/7 cab pick-up hubs across Uttarakhand, Uttar Pradesh, Punjab, Haryana & Delhi NCR.
          </p>
        </Container>
      </section>

      {/* Regions Grid */}
      <Section variant="default" padding="normal">
        <Container>
          <Grid cols={1} colsMd={2} colsLg={3} gap={6}>
            {SERVICE_REGIONS.map((reg) => (
              <Card key={reg.city} variant="standard" isHoverable className="p-6 space-y-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                    <h3 className="font-heading font-bold text-lg text-slate-900">{reg.city}</h3>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 block">Major Pickup Hubs</span>
                    <ul className="grid grid-cols-2 gap-1 text-xs font-medium text-slate-700">
                      {reg.hubs.map((hub) => (
                        <li key={hub} className="flex items-center gap-1.5 truncate">
                          <Navigation className="w-3 h-3 text-amber-500 shrink-0" />
                          <span className="truncate">{hub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">{reg.cabs}</span>
                  <Link href={`/book?origin=${encodeURIComponent(reg.city)}`}>
                    <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer">
                      Book <ArrowRight className="w-3 h-3" />
                    </button>
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
