"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export interface ServiceItemRecord {
  id: string;
  title: string;
  category: string;
  tab_category: string;
  description: string;
  long_description: string;
  rate_hint: string;
  recommended_vehicle: string;
  badge: string;
  icon_name: string;
  inclusions: string[];
  status: "draft" | "published";
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface GuaranteeCardItem {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

export interface ServicesPageContentRecord {
  id?: string;
  hero_badge: string;
  hero_title: string;
  hero_title_highlight: string;
  hero_subtitle: string;
  guarantees_badge?: string;
  guarantees_heading?: string;
  guarantees_list?: GuaranteeCardItem[];
  status: "draft" | "published";
}

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
 * Server Action: Fetches services for public or admin mode
 */
export async function fetchServicesListAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("services_list")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchServicesListAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    const formattedData: ServiceItemRecord[] = (data || []).map((item) => ({
      ...item,
      inclusions: Array.isArray(item.inclusions)
        ? item.inclusions
        : typeof item.inclusions === "string"
        ? JSON.parse(item.inclusions)
        : [],
    }));

    return { success: true, data: formattedData };
  } catch (err: any) {
    console.error("fetchServicesListAction Exception:", err);
    return { success: false, error: "Failed to fetch services.", data: [] };
  }
}

/**
 * Server Action: Fetches Services page content text
 */
export async function fetchServicesPageContentAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("services_page_content")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchServicesPageContentAction Error:", error.message);
      return { success: false, error: error.message, data: null };
    }

    const item = data?.[0];
    if (item) {
      if (typeof item.guarantees_list === "string") {
        try {
          item.guarantees_list = JSON.parse(item.guarantees_list);
        } catch (e) {
          item.guarantees_list = [];
        }
      }
    }

    return { success: true, data: item || null };
  } catch (err: any) {
    console.error("fetchServicesPageContentAction Exception:", err);
    return { success: false, error: "Failed to fetch services page content.", data: null };
  }
}

/**
 * Server Action: Creates or updates a Service item as 'draft' (NO Storage / NO Images)
 */
export async function saveServiceItemAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const serviceId = formData.get("serviceId") as string | null;
    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const tab_category = (formData.get("tab_category") as string) || "outstation";
    const description = (formData.get("description") as string) || "";
    const long_description = (formData.get("long_description") as string) || "";
    const rate_hint = (formData.get("rate_hint") as string) || "";
    const recommended_vehicle = (formData.get("recommended_vehicle") as string) || "";
    const badge = (formData.get("badge") as string) || "";
    const icon_name = (formData.get("icon_name") as string) || "Car";
    const inclusionsRaw = (formData.get("inclusions") as string) || "";

    if (!title || !category || !description) {
      return { success: false, error: "Service title, category, and description are required." };
    }

    const inclusions = inclusionsRaw
      .split("\n")
      .map((inc) => inc.trim())
      .filter((inc) => inc.length > 0);

    const payload = {
      title: title.trim(),
      category: category.trim(),
      tab_category: tab_category.trim(),
      description: description.trim(),
      long_description: long_description.trim() || description.trim(),
      rate_hint: rate_hint.trim(),
      recommended_vehicle: recommended_vehicle.trim(),
      badge: badge.trim() || category.trim(),
      icon_name: icon_name.trim(),
      inclusions: JSON.stringify(inclusions),
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    let resultData;
    if (serviceId) {
      const { data, error } = await supabase
        .from("services_list")
        .update(payload)
        .eq("id", serviceId)
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    } else {
      const { data, error } = await supabase
        .from("services_list")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    }

    return { success: true, data: resultData };
  } catch (err: any) {
    console.error("saveServiceItemAction Error:", err);
    return { success: false, error: "Failed to save service item." };
  }
}

/**
 * Server Action: Saves Services page text content as 'draft'
 */
export async function saveServicesPageContentAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const hero_badge = (formData.get("hero_badge") as string) || "";
    const hero_title = (formData.get("hero_title") as string) || "";
    const hero_title_highlight = (formData.get("hero_title_highlight") as string) || "";
    const hero_subtitle = (formData.get("hero_subtitle") as string) || "";
    const guarantees_badge = (formData.get("guarantees_badge") as string) || "";
    const guarantees_heading = (formData.get("guarantees_heading") as string) || "";
    const guarantees_list_raw = formData.get("guarantees_list") as string | null;

    let guarantees_list: any[] = [];
    if (guarantees_list_raw) {
      try {
        guarantees_list = JSON.parse(guarantees_list_raw);
      } catch (e) {
        console.warn("Parse guarantees_list warning:", e);
      }
    }

    const payload: any = {
      hero_badge: hero_badge.trim(),
      hero_title: hero_title.trim(),
      hero_title_highlight: hero_title_highlight.trim(),
      hero_subtitle: hero_subtitle.trim(),
      guarantees_badge: guarantees_badge.trim(),
      guarantees_heading: guarantees_heading.trim(),
      guarantees_list,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase.from("services_page_content").select("id").limit(1);

    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from("services_page_content")
        .update(payload)
        .eq("id", existing[0].id)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      const { data, error } = await supabase
        .from("services_page_content")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveServicesPageContentAction Error:", err);
    return { success: false, error: "Failed to save services page content." };
  }
}

/**
 * Server Action: Deletes a Service record
 */
export async function deleteServiceItemAction(serviceId: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error: dbError } = await supabase.from("services_list").delete().eq("id", serviceId);

    if (dbError) {
      await supabase
        .from("services_list")
        .update({ is_deleted: true, updated_at: new Date().toISOString() })
        .eq("id", serviceId);
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteServiceItemAction Error:", err);
    return { success: false, error: "Failed to delete service item." };
  }
}

/**
 * Server Action: Publishes ALL pending draft services & page text content together
 */
export async function publishServicesChangesAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data: sData, error: sErr } = await supabase
      .from("services_list")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (sErr) console.error("Publish services warning:", sErr.message);

    const { data: cData, error: cErr } = await supabase
      .from("services_page_content")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (cErr) console.error("Publish services page content warning:", cErr.message);

    const publishedCount = (sData?.length || 0) + (cData?.length || 0);

    // Instantly purge Next.js static page cache & Vercel Edge CDN cache
    revalidatePath("/services");
    revalidatePath("/services/preview");

    return { success: true, count: publishedCount };
  } catch (err: any) {
    console.error("publishServicesChangesAction Error:", err);
    return { success: false, error: "Failed to publish services changes." };
  }
}
