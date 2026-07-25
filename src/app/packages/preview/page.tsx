import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { MapPin, Calendar, Compass, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { fetchTourPackagesAction } from "@/actions/packages";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | Uttarakhand Tour Packages",
  description: "Live Draft Preview for QuickWay Ride Tour Packages.",
};

export default async function TourPackagesPreviewPage() {
  const res = await fetchTourPackagesAction("admin");
  const tourPackages = res.data || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 select-none">
      {/* Admin Preview Ribbon */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published Tour Packages</span>
      </div>

      {/* Hero Header */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Preview Mode
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            Uttarakhand Tour Packages (Preview)
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Review live appearance of draft tour packages before publishing to the website.
          </p>
        </Container>
      </section>

      {/* Package Grid */}
      <Section variant="default" padding="normal">
        <Container className="space-y-8">
          {tourPackages.length === 0 ? (
            <div className="p-16 text-center text-slate-500 font-bold text-sm">
              No tour packages found in database.
            </div>
          ) : (
            <Grid cols={1} colsMd={2} gap={8}>
              {tourPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  variant="standard"
                  isHoverable
                  className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300 relative"
                >
                  {pkg.status === "draft" && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        Draft
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Image Banner */}
                    <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                      <Image
                        src={pkg.cover_image || "/images/packages/haridwar-ganga-aarti.jpg"}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Floating Duration Badge */}
                      <div className="absolute top-3 left-16 z-10">
                        <span className="text-xs font-extrabold text-amber-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 shadow-md">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Floating Private Cab Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-xs font-semibold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 flex items-center gap-1 shadow-md">
                          <Compass className="w-3.5 h-3.5 text-amber-400" />
                          Private Cab
                        </span>
                      </div>

                      {/* Gradient Fade Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Details Body */}
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

                  {/* Booking CTA Footer */}
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
          )}
        </Container>
      </Section>
    </main>
  );
}
