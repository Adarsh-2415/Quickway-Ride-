"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { CheckCircle2, Send, Tag } from "lucide-react";
import { bookingFormSchema, BookingFormValues } from "@/schemas";

export const BookingForm: React.FC = () => {
  const [promoApplied, setPromoApplied] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerName: "",
      mobileNumber: "",
      email: "",
      pickUpLocation: "",
      dropOffLocation: "",
      pickupDate: "",
      pickupTime: "",
      vehicleType: "Maruti Dzire / Etios (Sedan 4+1)",
      tripSchedule: "One-Way",
      tripType: "Outstation Drop",
      passengers: "1",
      luggage: "1-2 Bags",
      message: "",
      promoCode: "",
    },
  });

  const promoCodeValue = watch("promoCode");

  const handlePromoApply = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!promoCodeValue || !promoCodeValue.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }
    setPromoApplied(true);
    toast.success(`Promo code "${promoCodeValue.toUpperCase()}" applied successfully!`);
  };

  const onSubmit = async (data: BookingFormValues) => {
    // Simulate server action submission preparation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    toast.success("Taxi Booking Submitted Successfully!");
  };

  return (
    <Card variant="standard" className="p-6 sm:p-10 space-y-8 border border-slate-200 shadow-xl max-w-4xl mx-auto bg-white rounded-2xl">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Online Taxi Booking
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Complete the details below to reserve your ride with QuickWay Ride.
        </p>
      </div>

      {submittedData ? (
        <div className="p-8 text-center space-y-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
            Booking Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Thank you <strong>{submittedData.customerName}</strong>. Your trip from <strong>{submittedData.pickUpLocation}</strong> to <strong>{submittedData.dropOffLocation}</strong> on <strong>{submittedData.pickupDate} at {submittedData.pickupTime}</strong> has been registered. Our operations team will call you at <strong>{submittedData.mobileNumber}</strong> shortly.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSubmittedData(null);
              setPromoApplied(false);
              reset();
            }}
          >
            Book Another Ride
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Row 1: Customer Name & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-customerName" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-customerName"
                type="text"
                placeholder="Enter full name"
                {...register("customerName")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.customerName && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.customerName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-mobileNumber" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-mobileNumber"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                {...register("mobileNumber")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.mobileNumber && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.mobileNumber.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email & Trip Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-email" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.email && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-tripType" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Trip Type
              </label>
              <select
                id="booking-tripType"
                {...register("tripType")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="Outstation Drop">Outstation Drop</option>
                <option value="Airport Transfer">Airport Transfer</option>
                <option value="Local Sightseeing">Local Sightseeing</option>
                <option value="Char Dham Pilgrimage">Char Dham Pilgrimage</option>
                <option value="Corporate / Event Contract">Corporate / Event Contract</option>
              </select>
              {errors.tripType && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.tripType.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Pick Up Location & Drop Off Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-pickUpLocation" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Pick Up Location <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-pickUpLocation"
                type="text"
                placeholder="Enter pickup city or landmark"
                {...register("pickUpLocation")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.pickUpLocation && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.pickUpLocation.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-dropOffLocation" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Drop Off Location <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-dropOffLocation"
                type="text"
                placeholder="Enter drop off city or landmark"
                {...register("dropOffLocation")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.dropOffLocation && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.dropOffLocation.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: Pickup Date & Pickup Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-pickupDate" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-pickupDate"
                type="date"
                {...register("pickupDate")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.pickupDate && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.pickupDate.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-pickupTime" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-pickupTime"
                type="time"
                {...register("pickupTime")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.pickupTime && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.pickupTime.message}</p>
              )}
            </div>
          </div>

          {/* Row 5: Vehicle Type & Trip Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-vehicleType" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Vehicle Type
              </label>
              <select
                id="booking-vehicleType"
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

            <div className="space-y-1.5">
              <label htmlFor="booking-tripSchedule" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Trip Schedule
              </label>
              <select
                id="booking-tripSchedule"
                {...register("tripSchedule")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="One-Way">One-Way</option>
                <option value="Round-Trip">Round-Trip</option>
                <option value="Local Hourly Package">Local Hourly Package</option>
              </select>
              {errors.tripSchedule && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.tripSchedule.message}</p>
              )}
            </div>
          </div>

          {/* Row 6: Passengers & Luggage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="booking-passengers" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Passengers
              </label>
              <select
                id="booking-passengers"
                {...register("passengers")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                <option value="6">6 Passengers</option>
                <option value="7">7 Passengers</option>
                <option value="8-12">8 - 12 Passengers</option>
                <option value="13-26">13 - 26 Passengers</option>
              </select>
              {errors.passengers && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.passengers.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-luggage" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Luggage
              </label>
              <select
                id="booking-luggage"
                {...register("luggage")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="No Luggage">No Luggage</option>
                <option value="1-2 Bags">1 - 2 Small / Medium Bags</option>
                <option value="3-4 Bags">3 - 4 Bags</option>
                <option value="Heavy Carrier Luggage">Heavy Carrier Luggage</option>
              </select>
              {errors.luggage && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.luggage.message}</p>
              )}
            </div>
          </div>

          {/* Row 7: Promo Code */}
          <div className="space-y-1.5">
            <label htmlFor="booking-promoCode" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                id="booking-promoCode"
                type="text"
                placeholder="Enter promo code if any"
                {...register("promoCode")}
                className="flex-1 h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white uppercase"
              />
              <button
                type="button"
                onClick={handlePromoApply}
                className="px-5 h-11 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" /> Apply Code
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs font-bold text-emerald-600 mt-1">
                ✓ Promo Code Applied Successfully!
              </p>
            )}
          </div>

          {/* Row 8: Message */}
          <div className="space-y-1.5">
            <label htmlFor="booking-message" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              Message
            </label>
            <textarea
              id="booking-message"
              rows={3}
              placeholder="Any special instructions or landmark details..."
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
              Confirm & Book Taxi Now
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
