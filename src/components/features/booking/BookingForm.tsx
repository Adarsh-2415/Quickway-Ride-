"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { CheckCircle2, Send, Tag } from "lucide-react";

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePromoApply = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.promoCode.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }
    setPromoApplied(true);
    toast.success(`Promo code "${formData.promoCode.toUpperCase()}" applied successfully!`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.mobileNumber || !formData.pickUpLocation || !formData.dropOffLocation || !formData.pickupDate) {
      toast.error("Please fill in all required booking fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Taxi Booking Submitted Successfully!");
    }, 1200);
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

      {isSubmitted ? (
        <div className="p-8 text-center space-y-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
            Booking Request Received!
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Thank you <strong>{formData.customerName}</strong>. Your trip from <strong>{formData.pickUpLocation}</strong> to <strong>{formData.dropOffLocation}</strong> on <strong>{formData.pickupDate} at {formData.pickupTime}</strong> has been registered. Our operations team will call you at <strong>{formData.mobileNumber}</strong> shortly.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
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
              });
              setPromoApplied(false);
            }}
          >
            Book Another Ride
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Customer Name & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Row 2: Email & Trip Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Trip Type
              </label>
              <select
                value={formData.tripType}
                onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="Outstation Drop">Outstation Drop</option>
                <option value="Airport Transfer">Airport Transfer</option>
                <option value="Local Sightseeing">Local Sightseeing</option>
                <option value="Char Dham Pilgrimage">Char Dham Pilgrimage</option>
                <option value="Corporate / Event Contract">Corporate / Event Contract</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pick Up Location & Drop Off Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Pick Up Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter pickup city or landmark"
                value={formData.pickUpLocation}
                onChange={(e) => setFormData({ ...formData, pickUpLocation: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Drop Off Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter drop off city or landmark"
                value={formData.dropOffLocation}
                onChange={(e) => setFormData({ ...formData, dropOffLocation: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Row 4: Pickup Date & Pickup Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Row 5: Vehicle Type & Trip Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Trip Schedule
              </label>
              <select
                value={formData.tripSchedule}
                onChange={(e) => setFormData({ ...formData, tripSchedule: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="One-Way">One-Way</option>
                <option value="Round-Trip">Round-Trip</option>
                <option value="Local Hourly Package">Local Hourly Package</option>
              </select>
            </div>
          </div>

          {/* Row 6: Passengers & Luggage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Passengers
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
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
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Luggage
              </label>
              <select
                value={formData.luggage}
                onChange={(e) => setFormData({ ...formData, luggage: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="No Luggage">No Luggage</option>
                <option value="1-2 Bags">1 - 2 Small / Medium Bags</option>
                <option value="3-4 Bags">3 - 4 Bags</option>
                <option value="Heavy Carrier Luggage">Heavy Carrier Luggage</option>
              </select>
            </div>
          </div>

          {/* Row 7: Promo Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code if any"
                value={formData.promoCode}
                onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                className="flex-1 h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white uppercase"
              />
              <button
                type="button"
                onClick={handlePromoApply}
                className="px-5 h-11 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1.5"
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
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="Any special instructions or landmark details..."
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
              Confirm & Book Taxi Now
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
