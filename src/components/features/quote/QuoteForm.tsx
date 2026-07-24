"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { CheckCircle2, Send } from "lucide-react";
import { quoteFormSchema, QuoteFormValues } from "@/schemas";

export const QuoteForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<QuoteFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      journeyDate: "",
      journeySchedule: "One-Way",
      passengersAndLuggage: "",
      vehicleType: "Maruti Dzire / Etios (Sedan 4+1)",
      message: "",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    toast.success("Quote Request Submitted Successfully!");
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

      {submittedData ? (
        <div className="p-8 text-center space-y-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
            Quote Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Thank you! Your quote request for <strong>{submittedData.origin}</strong> to <strong>{submittedData.destination}</strong> on <strong>{submittedData.journeyDate}</strong> has been received. Our team will get back to you with the best available fare quote shortly.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSubmittedData(null);
              reset();
            }}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Row 1: Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="quote-origin" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Origin <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-origin"
                type="text"
                placeholder="Enter pickup city or location"
                {...register("origin")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.origin && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.origin.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quote-destination" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-destination"
                type="text"
                placeholder="Enter drop off city or location"
                {...register("destination")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.destination && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.destination.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Journey Date & Journey Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="quote-journeyDate" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Journey Date <span className="text-red-500">*</span>
              </label>
              <input
                id="quote-journeyDate"
                type="date"
                {...register("journeyDate")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.journeyDate && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.journeyDate.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quote-journeySchedule" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Journey Schedule
              </label>
              <select
                id="quote-journeySchedule"
                {...register("journeySchedule")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="One-Way">One-Way</option>
                <option value="Round-Trip">Round-Trip</option>
                <option value="Local Hourly Package">Local Hourly Package</option>
              </select>
              {errors.journeySchedule && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.journeySchedule.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Passengers & Luggage & Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="quote-passengersAndLuggage" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Passengers & Luggage
              </label>
              <input
                id="quote-passengersAndLuggage"
                type="text"
                placeholder="e.g. 4 Passengers, 2 Medium Bags"
                {...register("passengersAndLuggage")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="quote-vehicleType" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Vehicle Type
              </label>
              <select
                id="quote-vehicleType"
                {...register("vehicleType")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="Maruti Dzire / Etios (Sedan 4+1)">Maruti Dzire / Etios (Sedan 4+1)</option>
                <option value="Maruti Ertiga / XL6 (Executive SUV 6+1)">Maruti Ertiga / XL6 (Executive SUV 6+1)</option>
                <option value="Toyota Innova Crysta (Luxury SUV 6+1 / 7+1)">Toyota Innova Crysta (Luxury SUV 6+1 / 7+1)</option>
                <option value="Tempo Traveller / Force Urbania (Group 12-26)">Tempo Traveller / Force Urbania (Group 12-26)</option>
              </select>
              {errors.vehicleType && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.vehicleType.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="space-y-1.5">
            <label htmlFor="quote-message" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              Message
            </label>
            <textarea
              id="quote-message"
              rows={4}
              placeholder="Any special requirements, pick-up time preferences, or landmark details..."
              {...register("message")}
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
              className="w-full justify-center font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 h-12 text-base shadow-md cursor-pointer"
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
