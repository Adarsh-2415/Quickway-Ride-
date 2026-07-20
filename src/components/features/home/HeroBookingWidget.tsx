"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, Calendar, Clock, Users, ArrowRight, Car, Plane, RefreshCw, Compass } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { TextInput } from "@/components/forms/TextInput";
import { Select } from "@/components/forms/Select";
import { TripType } from "@/types";
import { cn } from "@/lib/utils";

export const HeroBookingWidget: React.FC = () => {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("outstation_oneway");
  const [origin, setOrigin] = useState("Roorkee");
  const [destination, setDestination] = useState("Dehradun");
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pickupTime, setPickupTime] = useState("09:00");
  const [passengers, setPassengers] = useState("4");
  const [rentalPackage, setRentalPackage] = useState("8hr_80km");

  const cityPresets = ["Roorkee", "Haridwar", "Rishikesh", "Dehradun", "Saharanpur", "Delhi IGI Airport"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      trip: tripType,
      from: origin,
      to: destination,
      date: pickupDate,
      time: pickupTime,
      passengers: passengers,
      ...(tripType === "local_rental" ? { rentalPackage } : {}),
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden text-slate-900">
      {/* Tab Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100/80 p-1.5 border-b border-slate-200 gap-1 select-none">
        <button
          type="button"
          onClick={() => {
            setTripType("outstation_oneway");
            if (destination === "") setDestination("Dehradun");
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer",
            tripType === "outstation_oneway"
              ? "bg-slate-900 text-amber-400 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          )}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>One-Way</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType("outstation_roundtrip");
            if (destination === "") setDestination("Haridwar");
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer",
            tripType === "outstation_roundtrip"
              ? "bg-slate-900 text-amber-400 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          )}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Round-Trip</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType("local_rental");
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer",
            tripType === "local_rental"
              ? "bg-slate-900 text-amber-400 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Hourly Rental</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType("airport_transfer");
            setDestination("Jolly Grant Dehradun Airport");
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer",
            tripType === "airport_transfer"
              ? "bg-slate-900 text-amber-400 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          )}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>Airport Cab</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-4">
        {/* City Presets Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Popular Quick Pickups:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {cityPresets.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setOrigin(city)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                  origin === city
                    ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Pickup & Destination Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Pickup Location"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            iconLeft={<MapPin className="w-4 h-4 text-amber-500" />}
            placeholder="e.g. Roorkee Railway Station"
            required
          />

          {tripType !== "local_rental" ? (
            <TextInput
              label="Drop Location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              iconLeft={<Compass className="w-4 h-4 text-blue-600" />}
              placeholder="e.g. Dehradun City / Airport"
              required
            />
          ) : (
            <Select
              label="Rental Package"
              value={rentalPackage}
              onChange={(e) => setRentalPackage(e.target.value)}
              options={[
                { label: "4 Hours / 40 KM", value: "4hr_40km" },
                { label: "8 Hours / 80 KM (Standard Day)", value: "8hr_80km" },
                { label: "12 Hours / 120 KM (Full Day)", value: "12hr_120km" },
              ]}
            />
          )}
        </div>

        {/* Date, Time & Passengers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TextInput
            label="Pickup Date"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            iconLeft={<Calendar className="w-4 h-4 text-slate-400" />}
            required
          />

          <TextInput
            label="Pickup Time"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            iconLeft={<Clock className="w-4 h-4 text-slate-400" />}
            required
          />

          <Select
            label="Passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            options={[
              { label: "1 - 4 Passengers (Sedan)", value: "4" },
              { label: "5 - 7 Passengers (SUV / Innova)", value: "7" },
              { label: "8 - 12 Passengers (Tempo Traveller)", value: "12" },
              { label: "13+ Large Group Delegation", value: "20" },
            ]}
          />
        </div>

        {/* Submit Action CTA Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full justify-center text-slate-900 font-bold uppercase tracking-wider text-sm shadow-md"
          iconLeft={<Car className="w-5 h-5 stroke-[2.5]" />}
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          Calculate Fare & Select Vehicle
        </Button>
      </form>
    </div>
  );
};
