"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface ContactEnquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  message: string;
  created_at?: string;
}

export interface FetchContactQueriesResult {
  success: boolean;
  data?: ContactEnquiry[];
  count?: number;
  error?: string;
}

/**
 * Creates an admin client with service role key if present to bypass RLS issues
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
 * Submits a new contact form enquiry to Supabase DB
 */
export async function submitContactEnquiryAction(enquiry: Omit<ContactEnquiry, "id" | "created_at">) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("contact_enquiries")
      .insert([
        {
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          service_type: enquiry.service_type || "One-Way Taxi",
          message: enquiry.message,
        },
      ])
      .select();

    if (error) {
      console.warn("Supabase contact_enquiries insert warning:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    console.error("submitContactEnquiryAction Error:", err);
    return { success: false, error: "Failed to submit inquiry." };
  }
}

/**
 * Fetches real contact enquiries from Supabase table contact_enquiries
 */
export async function fetchContactQueriesAction(): Promise<FetchContactQueriesResult> {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("fetchContactQueriesAction Supabase response:", error.message);
      return {
        success: false,
        error: error.message,
        data: [],
        count: 0,
      };
    }

    return {
      success: true,
      data: (data as ContactEnquiry[]) || [],
      count: data?.length || 0,
    };
  } catch (err: unknown) {
    console.error("fetchContactQueriesAction Error:", err);
    return {
      success: false,
      error: "An unexpected error occurred while fetching contact enquiries.",
    };
  }
}
