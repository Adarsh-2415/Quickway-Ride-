import React from "react";
import { Metadata } from "next";
import { BookingForm } from "@/components/features/booking/BookingForm";
import { Container } from "@/components/layout/Container";
import { ShieldCheck, Clock, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Book a Taxi Online | QuickWay Ride - Instant Cab Reservation",
  description:
    "Book outstation taxis, airport cabs, and Tempo Travellers online with QuickWay Ride. Instant confirmation, zero surge pricing.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden py-12 sm:py-20 select-none">
      <Container className="relative z-10 space-y-12">
        {/* Top Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Book Your Ride Across{" "}
            <span className="text-amber-500 underline decoration-amber-500/40 decoration-4">
              Uttarakhand
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Choose your destination, select from our executive fleet, and get instant booking confirmation with helpline support.
          </p>
        </div>

        {/* The 3-Step Interactive Booking Wizard */}
        <BookingForm />

        {/* Bottom Trust Guarantee Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Zero Hidden Charges
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Transparent billing per km with toll & state tax breakdown.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Guaranteed On-Time
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Driver details dispatched via SMS 30 mins prior to trip.
              </p>
            </div>
          </div>

          <a
            href={`tel:${SITE_CONFIG.contact.phoneHotline}`}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-500/50 shadow-md flex items-center gap-3 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-amber-600 transition-colors">
                Direct Call Support
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Call {SITE_CONFIG.contact.phoneDisplay} for urgent rides.
              </p>
            </div>
          </a>
        </div>
      </Container>
    </main>
  );
}
