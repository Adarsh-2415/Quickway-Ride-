"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Briefcase,
  Tag,
  MessageSquare,
  ShieldCheck,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { BookingRecord } from "@/actions/bookings";
import { BookingStatusBadge } from "./BookingStatusBadge";

export interface BookingDrawerProps {
  booking: BookingRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!booking) return null;

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.booking_id);
    toast.success("Booking ID copied to clipboard!");
  };

  const formattedCreatedAt = booking.created_at
    ? new Date(booking.created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Recently Submitted";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Slide-Over Right Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto select-none"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Customer Booking Request
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Booking Details
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Body */}
            <div className="p-6 space-y-6 flex-1 text-slate-900">
              {/* Highlighted Booking ID Badge Card */}
              <div className="p-4 bg-slate-950 text-white rounded-2xl border-2 border-amber-500 shadow-md flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    Official Reference ID
                  </span>
                  <span className="font-mono text-xl font-extrabold text-amber-400 tracking-wider">
                    {booking.booking_id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <BookingStatusBadge status={booking.status} />
                  <button
                    onClick={copyBookingId}
                    title="Copy Booking ID"
                    aria-label="Copy Booking ID"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Contact Information */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b pb-1.5 border-slate-200">
                  Rider Contact Info
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" /> Name:
                    </span>
                    <span className="font-bold text-slate-900">{booking.customer_name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600" /> Phone:
                    </span>
                    <a
                      href={`tel:${booking.mobile_number}`}
                      className="font-bold text-amber-600 hover:underline"
                    >
                      {booking.mobile_number}
                    </a>
                  </div>

                  {booking.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-600" /> Email:
                      </span>
                      <a
                        href={`mailto:${booking.email}`}
                        className="font-semibold text-slate-800 hover:underline truncate max-w-[200px]"
                      >
                        {booking.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Journey Route & Time Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b pb-1.5 border-slate-200">
                  Route & Schedule
                </span>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" /> Pickup Location:
                    </span>
                    <p className="font-bold text-slate-900 pl-5">{booking.pickup_location}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> Dropoff Location:
                    </span>
                    <p className="font-bold text-slate-900 pl-5">{booking.dropoff_location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" /> Date:
                      </span>
                      <span className="font-bold text-slate-900 block pl-4">
                        {booking.pickup_date}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Time:
                      </span>
                      <span className="font-bold text-slate-900 block pl-4">
                        {booking.pickup_time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle & Trip Specs */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b pb-1.5 border-slate-200">
                  Vehicle & Travel Requirements
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-amber-600" /> Vehicle:
                    </span>
                    <span className="font-bold text-slate-900 block pl-4">
                      {booking.vehicle_type}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" /> Passengers:
                    </span>
                    <span className="font-bold text-slate-900 block pl-4">
                      {booking.passengers || "1"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" /> Luggage:
                    </span>
                    <span className="font-bold text-slate-900 block pl-4">
                      {booking.luggage || "Standard"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-amber-600" /> Trip Type:
                    </span>
                    <span className="font-bold text-slate-900 block pl-4">
                      {booking.trip_type || "Outstation Drop"}
                    </span>
                  </div>
                </div>

                {booking.promo_code && (
                  <div className="pt-2 border-t border-slate-200/60 flex justify-between text-xs">
                    <span className="text-slate-500">Promo Code Applied:</span>
                    <span className="font-bold text-emerald-600 uppercase">
                      {booking.promo_code}
                    </span>
                  </div>
                )}
              </div>

              {/* Message / Special Instructions */}
              {booking.message && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" /> Special Message:
                  </span>
                  <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed select-text">
                    {booking.message}
                  </p>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-[11px] text-slate-400 text-center pt-2">
                Booking Submitted On: <strong>{formattedCreatedAt}</strong>
              </div>
            </div>

            {/* Footer Close Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 sticky bottom-0">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
