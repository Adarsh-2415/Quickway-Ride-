import React from "react";
import { Metadata } from "next";
import { ContactHero } from "@/components/features/contact/ContactHero";
import { ContactCards } from "@/components/features/contact/ContactCards";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { ContactMap } from "@/components/features/contact/ContactMap";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Contact Us | QuickWay Ride - Dehradun HQ & Support Desk",
  description:
    "Contact QuickWay Ride taxi services in Dehradun. Call 8679506655 or email info@quickwayride.com. Office: 1st Floor, Opposite to Shiv Sani Mandir, Near Sai Lok Gate, GMS Road, Dehradun.",
  openGraph: {
    title: "Contact Us | QuickWay Ride Taxi Services",
    description:
      "Get in touch with QuickWay Ride in Dehradun. Phone, WhatsApp & Email Support.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Hero Header Banner */}
      <ContactHero />

      {/* 2. Direct Contact Touchpoint Cards */}
      <Section variant="default" padding="normal">
        <Container className="space-y-12">
          <ContactCards />

          {/* 3. 2-Column Grid: Form + Office Location Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactMap />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
