import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { fetchGalleryImagesAction } from "@/actions/gallery";
import { Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "ADMIN PREVIEW | QuickWay Ride Gallery",
  description: "Live Draft Preview for QuickWay Ride Gallery.",
};

export default async function GalleryPreviewPage() {
  const res = await fetchGalleryImagesAction("all");
  const galleryItems = res.data || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 select-none">
      {/* Admin Preview Floating Ribbon */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-extrabold text-center uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
        <Eye className="w-4 h-4" />
        <span>ADMIN PREVIEW MODE — Displaying Draft & Published Images</span>
      </div>

      {/* Reusing exact Hero Header component styling */}
      <section className="bg-slate-950 py-16 text-white text-center border-b border-amber-500/20">
        <Container className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            Preview Mode
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            QuickWay Ride Gallery Preview
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Review live appearance of uploaded draft photos before publishing.
          </p>
        </Container>
      </section>

      {/* Reusing exact Gallery Grid layout component */}
      <Section variant="default" padding="normal">
        <Container>
          {galleryItems.length === 0 ? (
            <div className="p-16 text-center text-slate-500 font-bold text-sm">
              No gallery images found in database.
            </div>
          ) : (
            <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
              {galleryItems.map((item) => (
                <Card
                  key={item.id}
                  variant="standard"
                  isHoverable
                  className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.status === "draft" && (
                    <span className="absolute top-3 left-3 z-10 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                      Draft
                    </span>
                  )}
                  <div className="relative h-64 w-full bg-slate-100 p-2 flex items-center justify-center">
                    <Image
                      src={item.image_url}
                      alt={item.title || "Gallery Preview"}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
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
