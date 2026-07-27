"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface AboutStatItem {
  label: string;
  value: string;
  subtext: string;
  icon: string;
}

export interface AboutAdvantageItem {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

export interface AboutPageContentRecord {
  id?: string;
  hero_badge: string;
  hero_title: string;
  hero_title_highlight: string;
  hero_subtitle: string;

  stats_list?: AboutStatItem[];

  story_badge: string;
  story_heading: string;
  story_p1: string;
  story_p2: string;
  story_highlight_text: string;

  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;

  fleet_badge: string;
  fleet_heading: string;
  fleet_subtext: string;

  cities_badge: string;
  cities_heading: string;
  cities_subtext: string;

  advantages_badge: string;
  advantages_heading: string;
  advantages_subtext: string;
  advantages_list?: AboutAdvantageItem[];

  cta_badge: string;
  cta_heading: string;
  cta_subtext: string;

  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  published_at?: string;
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
 * Server Action: Fetches About Us page text content
 */
export async function fetchAboutPageContentAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("about_page_content")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchAboutPageContentAction Error:", error.message);
      return { success: false, error: error.message, data: null };
    }

    const item = data?.[0];
    if (item) {
      if (typeof item.stats_list === "string") {
        try {
          item.stats_list = JSON.parse(item.stats_list);
        } catch (e) {
          item.stats_list = [];
        }
      }
      if (typeof item.advantages_list === "string") {
        try {
          item.advantages_list = JSON.parse(item.advantages_list);
        } catch (e) {
          item.advantages_list = [];
        }
      }
    }

    return { success: true, data: item || null };
  } catch (err: any) {
    console.error("fetchAboutPageContentAction Exception:", err);
    return { success: false, error: "Failed to fetch about page content.", data: null };
  }
}

/**
 * Server Action: Saves About page text content as 'draft'
 */
export async function saveAboutPageContentAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const hero_badge = (formData.get("hero_badge") as string) || "";
    const hero_title = (formData.get("hero_title") as string) || "";
    const hero_title_highlight = (formData.get("hero_title_highlight") as string) || "";
    const hero_subtitle = (formData.get("hero_subtitle") as string) || "";

    const stats_list_raw = formData.get("stats_list") as string | null;
    let stats_list: AboutStatItem[] = [];
    if (stats_list_raw) {
      try {
        stats_list = JSON.parse(stats_list_raw);
      } catch (e) {
        console.warn("Parse stats_list warning:", e);
      }
    }

    const story_badge = (formData.get("story_badge") as string) || "";
    const story_heading = (formData.get("story_heading") as string) || "";
    const story_p1 = (formData.get("story_p1") as string) || "";
    const story_p2 = (formData.get("story_p2") as string) || "";
    const story_highlight_text = (formData.get("story_highlight_text") as string) || "";

    const mission_title = (formData.get("mission_title") as string) || "";
    const mission_text = (formData.get("mission_text") as string) || "";
    const vision_title = (formData.get("vision_title") as string) || "";
    const vision_text = (formData.get("vision_text") as string) || "";

    const fleet_badge = (formData.get("fleet_badge") as string) || "";
    const fleet_heading = (formData.get("fleet_heading") as string) || "";
    const fleet_subtext = (formData.get("fleet_subtext") as string) || "";

    const cities_badge = (formData.get("cities_badge") as string) || "";
    const cities_heading = (formData.get("cities_heading") as string) || "";
    const cities_subtext = (formData.get("cities_subtext") as string) || "";

    const advantages_badge = (formData.get("advantages_badge") as string) || "";
    const advantages_heading = (formData.get("advantages_heading") as string) || "";
    const advantages_subtext = (formData.get("advantages_subtext") as string) || "";

    const advantages_list_raw = formData.get("advantages_list") as string | null;
    let advantages_list: AboutAdvantageItem[] = [];
    if (advantages_list_raw) {
      try {
        advantages_list = JSON.parse(advantages_list_raw);
      } catch (e) {
        console.warn("Parse advantages_list warning:", e);
      }
    }

    const cta_badge = (formData.get("cta_badge") as string) || "";
    const cta_heading = (formData.get("cta_heading") as string) || "";
    const cta_subtext = (formData.get("cta_subtext") as string) || "";

    const payload: any = {
      hero_badge: hero_badge.trim(),
      hero_title: hero_title.trim(),
      hero_title_highlight: hero_title_highlight.trim(),
      hero_subtitle: hero_subtitle.trim(),
      stats_list,
      story_badge: story_badge.trim(),
      story_heading: story_heading.trim(),
      story_p1: story_p1.trim(),
      story_p2: story_p2.trim(),
      story_highlight_text: story_highlight_text.trim(),
      mission_title: mission_title.trim(),
      mission_text: mission_text.trim(),
      vision_title: vision_title.trim(),
      vision_text: vision_text.trim(),
      fleet_badge: fleet_badge.trim(),
      fleet_heading: fleet_heading.trim(),
      fleet_subtext: fleet_subtext.trim(),
      cities_badge: cities_badge.trim(),
      cities_heading: cities_heading.trim(),
      cities_subtext: cities_subtext.trim(),
      advantages_badge: advantages_badge.trim(),
      advantages_heading: advantages_heading.trim(),
      advantages_subtext: advantages_subtext.trim(),
      advantages_list,
      cta_badge: cta_badge.trim(),
      cta_heading: cta_heading.trim(),
      cta_subtext: cta_subtext.trim(),
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase.from("about_page_content").select("id").limit(1);

    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from("about_page_content")
        .update(payload)
        .eq("id", existing[0].id)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      const { data, error } = await supabase
        .from("about_page_content")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveAboutPageContentAction Error:", err);
    return { success: false, error: "Failed to save about page content." };
  }
}

/**
 * Server Action: Publishes ALL pending draft About Us page text content
 */
export async function publishAboutChangesAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data: cData, error: cErr } = await supabase
      .from("about_page_content")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (cErr) {
      console.error("Publish about page content error:", cErr.message);
      return { success: false, error: cErr.message };
    }

    return { success: true, count: cData?.length || 0 };
  } catch (err: any) {
    console.error("publishAboutChangesAction Error:", err);
    return { success: false, error: "Failed to publish about changes." };
  }
}
