"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { contactFormSchema, ContactFormValues } from "@/schemas";

export const ContactForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service_type: "One-Way Taxi",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    toast.success("Inquiry Sent Successfully! Our team will contact you shortly.");
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

      {submittedData ? (
        <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-extrabold text-xl text-emerald-900">
            Thank You, {submittedData.name}!
          </h4>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Your inquiry for <strong>{submittedData.service_type}</strong> has been received. Our team will call or WhatsApp you at <strong>{submittedData.phone}</strong> within a few minutes.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmittedData(null);
              reset();
            }}
          >
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                {...register("name")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.name && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="space-y-1.5">
              <label htmlFor="contact-phone" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Mobile / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="e.g. 8679506655"
                {...register("phone")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.phone && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="e.g. rahul@example.com"
                {...register("email")}
                className="w-full h-11 px-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white"
              />
              {errors.email && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label htmlFor="contact-serviceType" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                id="contact-serviceType"
                {...register("service_type")}
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
              {errors.service_type && (
                <p className="text-xs font-semibold text-red-500 mt-1">{errors.service_type.message}</p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              Additional Details / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Tell us your travel date, passenger count, or specific vehicle preference..."
              {...register("message")}
              className="w-full p-4 text-sm rounded-lg border border-slate-300 focus:outline-2 focus:outline-amber-500 bg-white resize-none"
            />
            {errors.message && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full justify-center font-bold text-slate-900 shadow-md cursor-pointer"
            iconRight={<Send className="w-4 h-4" />}
          >
            Submit Inquiry
          </Button>
        </form>
      )}
    </Card>
  );
};
