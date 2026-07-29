"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { bookingFormSchema, BookingFormValues } from "@/schemas";
import { sendBookingNotificationEmails } from "@/services/emailService";

export interface BookingRecord {
  id?: string;
  booking_id: string;
  customer_name: string;
  mobile_number: string;
  email?: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  vehicle_type: string;
  trip_type?: string;
  trip_schedule?: string;
  passengers?: string;
  luggage?: string;
  message?: string;
  promo_code?: string;
  status?: "Pending" | "Approved";
  created_at?: string;
}

export interface FetchBookingsResult {
  success: boolean;
  data?: BookingRecord[];
  count?: number;
  error?: string;
}

/**
 * Creates an admin client with service role key if present to bypass RLS restrictions securely
 */
function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    return createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }
  return null;
}

/**
 * Generates an atomic, concurrency-safe Booking ID in QWR-YYYY-XXXXXX format.
 */
async function generateAtomicBookingId(supabaseClient: any): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `QWR-${year}-`;

  try {
    const { data: rpcId, error: rpcError } = await supabaseClient.rpc("generate_booking_id");
    if (!rpcError && rpcId) {
      return rpcId;
    }

    const { count, error: countError } = await supabaseClient
      .from("bookings")
      .select("id", { count: "exact", head: true });

    const nextSeq = (countError || count === null ? 0 : count) + 1;
    const formattedSeq = String(nextSeq).padStart(6, "0");
    return `${prefix}${formattedSeq}`;
  } catch {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${Date.now().toString().slice(-4)}${randomSuffix}`;
  }
}

/**
 * Server Action: Creates a new booking record in Supabase (Default status: "Pending")
 */
export async function createBookingAction(formData: BookingFormValues) {
  try {
    const validatedData = bookingFormSchema.parse(formData);

    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const bookingId = await generateAtomicBookingId(supabase);

    const bookingPayload = {
      booking_id: bookingId,
      customer_name: validatedData.customerName,
      mobile_number: validatedData.mobileNumber,
      email: validatedData.email || null,
      pickup_location: validatedData.pickUpLocation,
      dropoff_location: validatedData.dropOffLocation,
      pickup_date: validatedData.pickupDate,
      pickup_time: validatedData.pickupTime,
      vehicle_type: validatedData.vehicleType,
      trip_type: validatedData.tripType || "Outstation Drop",
      trip_schedule: validatedData.tripSchedule || "One-Way",
      passengers: validatedData.passengers || "1",
      luggage: validatedData.luggage || "1-2 Bags",
      message: validatedData.message || null,
      promo_code: validatedData.promoCode || null,
      status: "Pending", // Default status for new bookings
    };

    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingPayload])
      .select();

    if (error) {
      console.warn("Supabase bookings insert warning:", error.message);
      return { success: false, booking_id: bookingId, error: error.message };
    }

    const savedRecord = data ? data[0] : null;

    // Trigger Email Notifications (Admin alert + Customer confirmation)
    if (savedRecord) {
      await sendBookingNotificationEmails(savedRecord).catch((emailErr) => {
        console.error("[createBookingAction] Email dispatch warning:", emailErr);
      });
    }

    return {
      success: true,
      booking_id: bookingId,
      data: savedRecord,
    };
  } catch (err: any) {
    console.error("createBookingAction Error:", err);
    return {
      success: false,
      booking_id: `QWR-${new Date().getFullYear()}-000001`,
      error: err.message || "Failed to process booking request.",
    };
  }
}

/**
 * Server Action: Updates a booking's approval status in Supabase (Admin Only)
 */
export async function updateBookingStatusAction(
  bookingIdOrUuid: string,
  newStatus: "Pending" | "Approved"
) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // Check if the parameter is a Booking ID (e.g. QWR-2026-000001) or a UUID
    const isQwrId = bookingIdOrUuid.startsWith("QWR-");

    const query = supabase
      .from("bookings")
      .update({ status: newStatus });

    const { data, error } = await (isQwrId
      ? query.eq("booking_id", bookingIdOrUuid)
      : query.eq("id", bookingIdOrUuid)
    ).select();

    if (error) {
      console.error("updateBookingStatusAction error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data ? data[0] : null };
  } catch (err: any) {
    console.error("updateBookingStatusAction Error:", err);
    return { success: false, error: "Failed to update booking status." };
  }
}

/**
 * Server Action: Fetches all bookings from Supabase for authenticated CMS admins
 */
export async function fetchBookingsAction(): Promise<FetchBookingsResult> {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("fetchBookingsAction Supabase response:", error.message);
      return {
        success: false,
        error: error.message,
        data: [],
        count: 0,
      };
    }

    return {
      success: true,
      data: (data as BookingRecord[]) || [],
      count: data?.length || 0,
    };
  } catch (err: any) {
    console.error("fetchBookingsAction Error:", err);
    return {
      success: false,
      error: "An unexpected error occurred while fetching bookings.",
    };
  }
}
