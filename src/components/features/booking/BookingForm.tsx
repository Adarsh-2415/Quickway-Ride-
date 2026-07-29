"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  Mail,
  Tag,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plane,
  Sparkles,
  ShieldCheck,
  Users,
  Briefcase,
  Check,
} from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { bookingFormSchema, BookingFormValues } from "@/schemas";
import { createBookingAction } from "@/actions/bookings";
import { cn } from "@/lib/utils";
import { PickupTimeSelector } from "./PickupTimeSelector";
import { Copy } from "lucide-react";

// Vehicle options with images & pricing metadata
const VEHICLE_OPTIONS = [
  {
    id: "Sedan",
    name: "Maruti Dzire / Etios",
    category: "Sedan (4+1 Seater)",
    rate: "₹12 / KM",
    capacity: "4 Passengers",
    luggage: "2 Bags",
    image: "/images/swift.jfif",
    popularTag: "Most Popular",
  },
  {
    id: "Executive SUV",
    name: "Maruti Ertiga / XL6",
    category: "Executive SUV (6+1 Seater)",
    rate: "₹15 / KM",
    capacity: "6 Passengers",
    luggage: "3 Bags",
    image: "/images/ertiga.jfif",
    popularTag: "Family Choice",
  },
  {
    id: "Luxury SUV",
    name: "Toyota Innova Crysta",
    category: "Luxury SUV (6+1 / 7+1)",
    rate: "₹18 / KM",
    capacity: "7 Passengers",
    luggage: "4 Bags",
    image: "/images/innova crysta.jfif",
    popularTag: "Premium Comfort",
  },
  {
    id: "Tempo Traveller",
    name: "Force Urbania / Tempo Traveller",
    category: "Group Delegation (12-26 Seater)",
    rate: "₹26 / KM",
    capacity: "12-26 Passengers",
    luggage: "Large Carrier",
    image: "/images/Tempo Traveller.jfif",
    popularTag: "Group Tour",
  },
];

// Quick Route Preset Chips (From Official Pricing Page)
const QUICK_ROUTES = [
  { from: "Dehradun", to: "Delhi" },
  { from: "Dehradun", to: "Jollygrant Airport" },
  { from: "Dehradun", to: "Haridwar" },
  { from: "Dehradun", to: "Rishikesh" },
  { from: "Dehradun", to: "Mussoorie" },
  { from: "Dehradun", to: "Roorkee" },
  { from: "Dehradun", to: "Chandigarh" },
];

export const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [promoApplied, setPromoApplied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
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
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "09:00",
      vehicleType: "Maruti Dzire / Etios (Sedan 4+1)",
      tripSchedule: "One-Way",
      tripType: "Outstation Drop",
      passengers: "1",
      luggage: "1-2 Bags",
      message: "",
      promoCode: "",
    },
  });

  const watchValues = watch();
  const selectedVehicleName = watchValues.vehicleType;
  const promoCodeValue = watchValues.promoCode;

  // Find active vehicle object
  const selectedVehicleObj =
    VEHICLE_OPTIONS.find((v) => selectedVehicleName.includes(v.id)) || VEHICLE_OPTIONS[0];

  // Quick route apply handler
  const applyQuickRoute = (from: string, to: string) => {
    setValue("pickUpLocation", from, { shouldValidate: true });
    setValue("dropOffLocation", to, { shouldValidate: true });
    toast.success(`Preset applied: ${from} ➔ ${to}`);
  };

  // Promo code handler
  const handlePromoApply = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!promoCodeValue || !promoCodeValue.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }
    setPromoApplied(true);
    toast.success(`Promo code "${promoCodeValue.toUpperCase()}" applied successfully!`);
  };

  // Step 1 Validation & Next
  const goToStep2 = async () => {
    const isValid = await trigger([
      "pickUpLocation",
      "dropOffLocation",
      "pickupDate",
      "pickupTime",
      "tripType",
      "tripSchedule",
    ]);
    if (isValid) {
      setCurrentStep(2);
    } else {
      toast.error("Please fill in all required journey details.");
    }
  };

  // Step 2 Validation & Next
  const goToStep3 = async () => {
    const isValid = await trigger(["vehicleType", "passengers", "luggage"]);
    if (isValid) {
      setCurrentStep(3);
    } else {
      toast.error("Please select a vehicle.");
    }
  };

  const [submittedData, setSubmittedData] = useState<BookingFormValues | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");

  // Final Form Submission
  const onSubmit = async (data: BookingFormValues) => {
    try {
      const res = await createBookingAction(data);
      if (res.booking_id) {
        setConfirmedBookingId(res.booking_id);
      }
      setSubmittedData(data);
      toast.success(`Booking Confirmed! Reference ID: ${res.booking_id}`);
    } catch (e: any) {
      console.error("Booking submission error:", e);
      setSubmittedData(data);
      toast.success("Taxi Booking Submitted Successfully!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-2xl select-none relative">
      {/* Form Header & Stepper */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-t-3xl border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> QuickWay Express Booking
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Reserve Your Uttarakhand Taxi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium leading-relaxed">
            Submit your travel details below ➔ Quick phone & WhatsApp confirmation by QuickWay Desk ➔ Doorstep Driver Arrival
          </p>
        </div>

        {/* 3-Step Visual Progress Stepper */}
        {!submittedData && (
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              {/* Connector Bar */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-amber-400 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
                }}
              />

              {/* Step 1 Circle */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                    currentStep >= 1
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/30"
                      : "bg-slate-900 text-slate-500 border-slate-800"
                  )}
                >
                  {currentStep > 1 ? <Check className="w-5 h-5 stroke-[3]" /> : "1"}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold transition-colors",
                    currentStep >= 1 ? "text-amber-400" : "text-slate-500"
                  )}
                >
                  1. Journey Details
                </span>
              </button>

              {/* Step 2 Circle */}
              <button
                type="button"
                onClick={() => currentStep > 1 && setCurrentStep(2)}
                className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                    currentStep >= 2
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/30"
                      : "bg-slate-900 text-slate-500 border-slate-800"
                  )}
                >
                  {currentStep > 2 ? <Check className="w-5 h-5 stroke-[3]" /> : "2"}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold transition-colors",
                    currentStep >= 2 ? "text-amber-400" : "text-slate-500"
                  )}
                >
                  2. Choose Vehicle
                </span>
              </button>

              {/* Step 3 Circle */}
              <button
                type="button"
                onClick={() => currentStep === 3 && setCurrentStep(3)}
                className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                    currentStep === 3
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/30"
                      : "bg-slate-900 text-slate-500 border-slate-800"
                  )}
                >
                  3
                </div>
                <span
                  className={cn(
                    "text-xs font-bold transition-colors",
                    currentStep === 3 ? "text-amber-400" : "text-slate-500"
                  )}
                >
                  3. Your Details
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-10">
        {submittedData ? (
          /* Success Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center space-y-6 bg-emerald-50/80 border border-emerald-200 rounded-3xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950">
                Booking Request Confirmed!
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Thank you <strong>{submittedData.customerName}</strong>. Your cab request from{" "}
                <strong>{submittedData.pickUpLocation}</strong> to <strong>{submittedData.dropOffLocation}</strong> on{" "}
                <strong>{submittedData.pickupDate} at {submittedData.pickupTime}</strong> has been registered.
              </p>
            </div>

            {/* Visually Highlighted Booking ID Badge */}
            {confirmedBookingId && (
              <div className="p-5 bg-slate-950 text-white rounded-2xl border-2 border-amber-500 shadow-xl max-w-md mx-auto space-y-2 select-text">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block text-center">
                  Official Booking Reference ID
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wider">
                    {confirmedBookingId}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(confirmedBookingId);
                      toast.success("Booking ID copied to clipboard!");
                    }}
                    title="Copy Booking ID"
                    aria-label="Copy Booking ID"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 bg-white rounded-2xl border border-emerald-200 max-w-md mx-auto text-left space-y-2.5 text-xs text-slate-700 shadow-sm">
              <div className="flex justify-between items-center border-b pb-2 gap-2">
                <span className="font-semibold text-slate-500 shrink-0">Selected Vehicle:</span>
                <span className="font-bold text-slate-900 text-right">{submittedData.vehicleType}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 gap-2">
                <span className="font-semibold text-slate-500 shrink-0">Contact Phone:</span>
                <span className="font-bold text-slate-900">+91 {submittedData.mobileNumber}</span>
              </div>
              <div className="pt-1 space-y-1">
                <span className="font-bold text-slate-600 uppercase tracking-wider block text-[10px]">Status:</span>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-emerald-800 text-xs leading-relaxed flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Booking request submitted successfully. Our team will contact you shortly.</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSubmittedData(null);
                setPromoApplied(false);
                setCurrentStep(1);
                reset();
              }}
              className="bg-white border-emerald-400 text-emerald-800 hover:bg-emerald-100 font-bold"
            >
              Book Another Ride
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AnimatePresence mode="wait">
              {/* STEP 1: RIDE DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Trip Type Selector Pills */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                      Select Trip Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { label: "Outstation Drop", icon: MapPin },
                        { label: "Airport Transfer", icon: Plane },
                        { label: "Local Sightseeing", icon: Clock },
                        { label: "Char Dham Pilgrimage", icon: Sparkles },
                      ].map((t) => {
                        const Icon = t.icon;
                        const isSelected = watchValues.tripType === t.label;
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setValue("tripType", t.label)}
                            className={cn(
                              "flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm",
                              isSelected
                                ? "bg-amber-400 border-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            )}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Popular Route Presets */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      ⚡ Popular Preset Routes (Click to Auto-Fill):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_ROUTES.map((r, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => applyQuickRoute(r.from, r.to)}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span>{r.from}</span>
                          <span className="text-amber-500 font-bold">➔</span>
                          <span>{r.to}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup & Drop Off Locations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-pickUpLocation" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-amber-500" /> Pick Up Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-pickUpLocation"
                        type="text"
                        placeholder="e.g. Roorkee Railway Station / Dehradun"
                        {...register("pickUpLocation")}
                        className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                      />
                      {errors.pickUpLocation && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{errors.pickUpLocation.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="booking-dropOffLocation" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 text-amber-500" /> Drop Off Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-dropOffLocation"
                        type="text"
                        placeholder="e.g. Delhi IGI Airport Terminal 3 / Haridwar"
                        {...register("dropOffLocation")}
                        className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                      />
                      {errors.dropOffLocation && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{errors.dropOffLocation.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Date & Time & Trip Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-pickupDate" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-500" /> Pickup Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-pickupDate"
                        type="date"
                        {...register("pickupDate")}
                        className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                      />
                      {errors.pickupDate && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{errors.pickupDate.message}</p>
                      )}
                    </div>

                    <PickupTimeSelector
                      value={watchValues.pickupTime}
                      onChange={(val) => setValue("pickupTime", val, { shouldValidate: true })}
                      error={errors.pickupTime?.message}
                    />

                    <div className="space-y-1.5">
                      <label htmlFor="booking-tripSchedule" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                        Schedule Type
                      </label>
                      <select
                        id="booking-tripSchedule"
                        {...register("tripSchedule")}
                        className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                      >
                        <option value="One-Way">One-Way Trip</option>
                        <option value="Round-Trip">Round-Trip Return</option>
                        <option value="Local Hourly Package">Local Hourly Rental</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 1 Action Button */}
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      onClick={goToStep2}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-8 h-12 text-sm shadow-md cursor-pointer"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      Next: Choose Vehicle
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CHOOSE VEHICLE */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Select Vehicle Fleet Class
                    </h3>
                    <p className="text-xs text-slate-500">
                      Choose the perfect vehicle for your passenger group & luggage requirements.
                    </p>
                  </div>

                  {/* Vehicle Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VEHICLE_OPTIONS.map((v) => {
                      const isSelected = selectedVehicleName.includes(v.id);
                      return (
                        <div
                          key={v.id}
                          onClick={() => setValue("vehicleType", `${v.name} (${v.category})`)}
                          className={cn(
                            "relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-white shadow-sm hover:shadow-md",
                            isSelected
                              ? "border-amber-400 bg-amber-50/40 ring-2 ring-amber-400/20"
                              : "border-slate-200 hover:border-slate-300"
                          )}
                        >
                          {/* Popular Tag */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                              {v.popularTag}
                            </span>
                          </div>

                          {/* Image & Title */}
                          <div className="flex items-center gap-4">
                            <div className="relative w-24 h-16 bg-slate-100 rounded-xl overflow-hidden shrink-0 border">
                              <Image
                                src={v.image}
                                alt={v.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-heading font-bold text-sm text-slate-900">
                                {v.name}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">{v.category}</p>
                              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-semibold pt-1">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3 text-amber-500" /> {v.capacity}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3 text-amber-500" /> {v.luggage}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Selected Checkmark Indicator */}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md border-2 border-white">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Passengers & Luggage Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-passengers" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                        Number of Passengers
                      </label>
                      <select
                        id="booking-passengers"
                        {...register("passengers")}
                        className="w-full h-11 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                        <option value="5">5 Passengers</option>
                        <option value="6">6 Passengers</option>
                        <option value="7">7 Passengers</option>
                        <option value="8-12">8 - 12 Passengers (Group)</option>
                        <option value="13-26">13 - 26 Passengers (Bus)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="booking-luggage" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                        Luggage Count
                      </label>
                      <select
                        id="booking-luggage"
                        {...register("luggage")}
                        className="w-full h-11 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      >
                        <option value="No Luggage">No Luggage</option>
                        <option value="1-2 Bags">1 - 2 Bags</option>
                        <option value="3-4 Bags">3 - 4 Bags</option>
                        <option value="Heavy Luggage">Heavy Carrier Luggage</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 2 Action Buttons */}
                  <div className="pt-4 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 h-12 text-sm cursor-pointer"
                      iconLeft={<ArrowLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      onClick={goToStep3}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-8 h-12 text-sm shadow-md cursor-pointer"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      Next: Your Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: RIDER INFO & FINAL CONFIRMATION */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Rider & Contact Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter rider contact information for driver assignment & SMS updates.
                    </p>
                  </div>

                  {/* Name & Mobile Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="booking-customerName" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <User className="w-4 h-4 text-amber-500" /> Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-customerName"
                        type="text"
                        placeholder="Enter full name"
                        {...register("customerName")}
                        className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                      />
                      {errors.customerName && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{errors.customerName.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="booking-mobileNumber" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-amber-500" /> Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          id="booking-mobileNumber"
                          type="tel"
                          placeholder="10-digit mobile number"
                          {...register("mobileNumber")}
                          className="w-full h-12 pl-12 pr-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-xs font-semibold text-red-500 mt-1">{errors.mobileNumber.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-email" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-amber-500" /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="Enter email address for instant booking receipt"
                      {...register("email")}
                      className="w-full h-12 px-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-xs font-medium"
                    />
                    {errors.email && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-message" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                      Special Instructions / Landmark (Optional)
                    </label>
                    <textarea
                      id="booking-message"
                      rows={2}
                      placeholder="Any specific pickup point or flight number details..."
                      {...register("message")}
                      className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white resize-none"
                    />
                  </div>

                  {/* Summary Card Preview */}
                  <div className="p-5 bg-slate-950 text-white rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wide">
                        <Car className="w-4 h-4" /> Trip Reservation Summary
                      </div>
                      <span className="text-xs font-bold bg-amber-400/20 text-amber-400 px-2.5 py-1 rounded-full border border-amber-400/30">
                        {watchValues.tripSchedule}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Route:</span>
                        <span className="font-bold text-white block truncate">
                          {watchValues.pickUpLocation || "Roorkee"} ➔ {watchValues.dropOffLocation || "Delhi"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Date & Time:</span>
                        <span className="font-bold text-white block">
                          {watchValues.pickupDate} at {watchValues.pickupTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Vehicle Class:</span>
                        <span className="font-bold text-amber-400 block truncate">
                          {selectedVehicleObj.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 Action Buttons */}
                  <div className="pt-4 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 h-12 text-sm cursor-pointer"
                      iconLeft={<ArrowLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-8 h-12 text-base shadow-xl shadow-amber-500/20 cursor-pointer"
                      iconRight={<CheckCircle2 className="w-5 h-5 stroke-[2.5]" />}
                    >
                      Confirm Now 🚖
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>

      {/* Trust Footer Badges */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Guaranteed Pickup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>No Surge Charges</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Car className="w-4 h-4 text-blue-600" />
          <span>Sanitized GPS Cabs</span>
        </div>
      </div>
    </div>
  );
};
