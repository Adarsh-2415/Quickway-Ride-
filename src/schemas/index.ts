import { z } from "zod";

// Robust 10-digit mobile phone schema that automatically cleans spaces, dashes, +91 prefixes, and extracts last 10 digits
export const phoneSchema = z
  .string()
  .transform((val) => val.trim().replace(/\D/g, ""))
  .transform((val) => (val.length > 10 ? val.slice(-10) : val))
  .refine((val) => val.length === 10, {
    message: "Please enter a valid 10-digit mobile number",
  });

// 1. Online Booking Engine Schema (14 Fields)
export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters"),
  mobileNumber: phoneSchema,
  email: z.string().email("Please enter a valid email address"),
  pickUpLocation: z.string().min(2, "Pick up location is required"),
  dropOffLocation: z.string().min(2, "Drop off location is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  tripSchedule: z.string().min(1, "Please select a trip schedule"),
  tripType: z.string().min(1, "Please select a trip type"),
  passengers: z.string().min(1, "Please select number of passengers"),
  luggage: z.string().min(1, "Please select luggage type"),
  message: z.string().optional(),
  promoCode: z.string().optional(),
});

// 2. Contact Inquiry Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
  email: z.string().email("Please enter a valid email address"),
  service_type: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

// 3. Custom Cab Quote Request Schema (7 Fields)
export const quoteFormSchema = z.object({
  origin: z.string().min(2, "Origin location is required"),
  destination: z.string().min(2, "Destination location is required"),
  journeyDate: z.string().min(1, "Journey date is required"),
  journeySchedule: z.string().min(1, "Please select a journey schedule"),
  passengersAndLuggage: z.string().optional(),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
