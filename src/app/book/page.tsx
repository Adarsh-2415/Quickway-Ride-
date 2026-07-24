import React from "react";
import { Metadata } from "next";
import { BookingForm } from "@/components/features/booking/BookingForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Book a Taxi Online | QuickWay Ride - Instant Cab Reservation",
  description:
    "Book outstation taxis, airport cabs, and Tempo Travellers online with QuickWay Ride. Instant confirmation, zero surge pricing.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-10">
      <Section variant="default" padding="normal">
        <Container>
          <BookingForm />
        </Container>
      </Section>
    </main>
  );
}
