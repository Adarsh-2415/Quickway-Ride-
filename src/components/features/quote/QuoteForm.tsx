"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { CheckCircle2, Send } from "lucide-react";

export const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    journeyDate: "",
    journeySchedule: "One-Way",
    passengersAndLuggage: "",
    vehicleType: "Maruti Dzire / Etios (Sedan 4+1)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.origin || !formData.destination || !formData.journeyDate) {
      toast.error("Please fill in Origin, Destination, and Journey Date.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Quote Request Submitted Successfully!");
    }, 1200);
  };

  return (
    <Card variant="standard" className="p-6 sm:p-10 space-y-8 border border-slate-200 shadow-xl max-w-3xl mx-auto bg-white rounded-2xl">
      <div className="border-b border-slate-100 pb-5 text-center sm:text-left">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Request a Custom Cab Quote
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Fill out the journey details below to receive an instant custom rate quote from QuickWay Ride.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 text-center space-y-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
            Quote Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Thank you! Your quote request for <strong>{formData.origin}</strong> to <strong>{formData.destination}</strong> on <strong>{formData.journeyDate}</strong> has been received. Our team will get back to you with the best available fare quote shortly.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                origin: "",
                destination: "",
                journeyDate: "",
                journeySchedule: "One-Way",
                passengersAndLuggage: "",
                vehicleType: "Maruti Dzire / Etios (Sedan 4+1)",
                message: "",
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Origin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter pickup city or location"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter drop off city or location"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Row 2: Journey Date & Journey Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Journey Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.journeyDate}
                onChange={(e) => setFormData({ ...formData, journeyDate: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Journey Schedule
              </label>
              <select
                value={formData.journeySchedule}
                onChange={(e) => setFormData({ ...formData, journeySchedule: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="One-Way">One-Way</option>
                <option value="Round-Trip">Round-Trip</option>
                <option value="Local Hourly Package">Local Hourly Package</option>
              </select>
            </div>
          </div>

          {/* Row 3: Passengers & Luggage & Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Passengers & Luggage
              </label>
              <input
                type="text"
                placeholder="e.g. 4 Passengers, 2 Medium Bags"
                value={formData.passengersAndLuggage}
                onChange={(e) => setFormData({ ...formData, passengersAndLuggage: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Vehicle Type
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="Maruti Dzire / Etios (Sedan 4+1)">Maruti Dzire / Etios (Sedan 4+1)</option>
                <option value="Maruti Ertiga / XL6 (Executive SUV 6+1)">Maruti Ertiga / XL6 (Executive SUV 6+1)</option>
                <option value="Toyota Innova Crysta (Luxury SUV 6+1 / 7+1)">Toyota Innova Crysta (Luxury SUV 6+1 / 7+1)</option>
                <option value="Tempo Traveller / Force Urbania (Group 12-26)">Tempo Traveller / Force Urbania (Group 12-26)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Any special requirements, pick-up time preferences, or landmark details..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full justify-center font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 h-12 text-base shadow-md"
              iconRight={<Send className="w-4 h-4" />}
            >
              Request Fare Quote Now
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
