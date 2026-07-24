"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    serviceType: "One-Way Taxi",
    pickupLocation: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Inquiry Sent Successfully! Our team will contact you shortly.");
    }, 1200);
  };

  return (
    <Card variant="standard" className="p-6 sm:p-8 space-y-6 border border-slate-200 shadow-md">
      <div>
        <h3 className="font-heading font-extrabold text-2xl text-slate-900">
          Send Us an Inquiry
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Fill out the details below and our operations desk in Dehradun will send you an instant fare estimate.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-extrabold text-xl text-emerald-900">
            Thank You, {formData.fullName}!
          </h4>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Your inquiry for <strong>{formData.serviceType}</strong> has been received. Our team will call or WhatsApp you at <strong>{formData.phone}</strong> within a few minutes.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ fullName: "", phone: "", serviceType: "One-Way Taxi", pickupLocation: "", message: "" });
            }}
          >
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Mobile / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 8679506655"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              >
                <option value="One-Way Taxi">One-Way Taxi</option>
                <option value="Airport Taxi">Airport Taxi (Jolly Grant / Delhi)</option>
                <option value="Round Trip Outstation">Round Trip Outstation</option>
                <option value="Local Sightseeing">Local Sightseeing</option>
                <option value="Char Dham Yatra">Char Dham Yatra</option>
                <option value="Corporate / Monthly Contract">Corporate / Monthly Contract</option>
                <option value="Tempo Traveller Bus">Tempo Traveller Bus (12-26 Seater)</option>
              </select>
            </div>

            {/* Pickup / Route Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Pickup City / Route
              </label>
              <input
                type="text"
                placeholder="e.g. Dehradun to Delhi Airport"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Additional Details / Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us your travel date, passenger count, or specific vehicle preference..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full justify-center font-bold text-slate-900 shadow-md"
            iconRight={<Send className="w-4 h-4" />}
          >
            Submit Inquiry
          </Button>
        </form>
      )}
    </Card>
  );
};
