import { z } from "zod";

export const phoneRegex = /^[6-9]\d{9}$/;

export const bookingFormSchema = z.object({
  trip_type: z.enum([
    "outstation_oneway",
    "outstation_roundtrip",
    "local_rental",
    "airport_transfer",
  ]),
  origin: z.string().min(2, "Pickup location is required"),
  destination: z.string().optional(),
  pickup_date: z.string().min(1, "Pickup date is required"),
  pickup_time: z.string().min(1, "Pickup time is required"),
  passengers: z.number().min(1, "At least 1 passenger is required").max(26, "Maximum 26 passengers"),
  vehicle_id: z.string().min(1, "Please select a vehicle"),
  rider_name: z.string().min(2, "Rider name must be at least 2 characters"),
  rider_phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian phone number"),
  rider_email: z.string().email("Please enter a valid email address"),
  special_instructions: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian phone number"),
  email: z.string().email("Please enter a valid email address"),
  service_type: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export const quoteRequestSchema = z.object({
  company_name: z.string().min(2, "Company / Event name is required"),
  contact_person: z.string().min(2, "Contact person name is required"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit phone number"),
  email: z.string().email("Please enter a valid email address"),
  service_requirement: z.string().min(1, "Please select requirement type"),
  estimated_passengers: z.number().min(1),
  trip_details: z.string().min(10, "Please describe trip details"),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;
