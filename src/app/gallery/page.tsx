import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";

export const metadata: Metadata = {
  title: "Fleet & Tour Gallery | QuickWay Ride Clean Taxi Fleet",
  description:
    "View clean interior and exterior photos of QuickWay Ride's fleet including Swift Dzire, Ertiga, Innova Crysta, and Tempo Travellers.",
};

const GALLERY_ITEMS = [
  { title: "Maruti Dzire Sedan", category: "Sedan Fleet", image: "/images/swift.jfif" },
  { title: "Maruti Ertiga MPV", category: "Executive SUV", image: "/images/ertiga.jfif" },
  { title: "Toyota Innova Crysta", category: "Luxury Fleet", image: "/images/innova crysta.jfif" },
  { title: "Tempo Traveller & Urbania", category: "Group Delegation", image: "/images/Tempo Traveller.jfif" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Real Vehicle Showcase
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            QuickWay Ride Fleet Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Sanitized, well-maintained vehicles ready for your outstation and city travels.
          </p>
        </Container>
      </section>

      {/* Gallery Grid */}
      <Section variant="default" padding="normal">
        <Container>
          <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
            {GALLERY_ITEMS.map((item) => (
              <Card key={item.title} variant="standard" isHoverable className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl">
                <div className="relative h-60 w-full bg-slate-100 p-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 bg-white border-t border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">{item.category}</span>
                  <h3 className="font-heading font-bold text-base text-slate-900 mt-0.5">{item.title}</h3>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  );
}
