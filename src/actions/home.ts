"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdminServerAction } from "@/lib/auth/serverAuth";
import { revalidatePath } from "next/cache";

export interface HomeSliderImageRecord {
  id: string;
  image_url: string;
  title: string;
  alt: string;
  storage_path?: string;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface HomeTestimonialRecord {
  id: string;
  name: string;
  designation: string;
  city: string;
  rating: number;
  review: string;
  avatar: string;
  featured?: boolean;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface HomeFaqRecord {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface HomeAdvantageRecord {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  status: "draft" | "published";
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface HomeTourCircuitRecord {
  id: string;
  title: string;
  description: string;
  display_order: number;
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

/* ============================================================================
   1. HERO SLIDER ACTIONS
============================================================================ */

/**
 * Fetch Hero Slider Images
 */
export async function fetchHomeSliderImagesAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("home_slider_images")
      .select("*")
      .order("created_at", { ascending: true });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      console.error("fetchHomeSliderImagesAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("fetchHomeSliderImagesAction Exception:", err);
    return { success: false, error: "Failed to fetch slider images.", data: [] };
  }
}

/**
 * Upload Multiple Hero Slider Images (Saved as Draft)
 */
export async function uploadHomeSliderImagesAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const files = formData.getAll("files") as File[];
    const title = (formData.get("title") as string) || "Hero Slider Image";
    const alt = (formData.get("alt") as string) || "QuickWay Ride Hero Slider Image";

    if (!files || files.length === 0) {
      return { success: false, error: "No image files provided." };
    }

    const uploadedRecords: HomeSliderImageRecord[] = [];

    for (const file of files) {
      if (!file.name || file.size === 0) continue;

      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `slider_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = `slider/${fileName}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { error: uploadErr } = await supabase.storage
        .from("home-slider-images")
        .upload(filePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });

      if (uploadErr) {
        console.error("Slider upload error:", uploadErr.message);
        return { success: false, error: `Failed to upload image: ${uploadErr.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("home-slider-images")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Insert DB record as Draft
      const { data: dbData, error: dbErr } = await supabase
        .from("home_slider_images")
        .insert([
          {
            image_url: publicUrl,
            title: title.trim() || file.name,
            alt: alt.trim() || file.name,
            storage_path: filePath,
            status: "draft",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (dbErr) {
        console.error("DB insert error after upload:", dbErr.message);
        return { success: false, error: dbErr.message };
      }

      if (dbData?.[0]) {
        uploadedRecords.push(dbData[0]);
      }
    }

    return { success: true, data: uploadedRecords, count: uploadedRecords.length };
  } catch (err: any) {
    console.error("uploadHomeSliderImagesAction Exception:", err);
    return { success: false, error: "Failed to upload slider images." };
  }
}

/**
 * Delete Hero Slider Image (Atomic DB + Storage Deletion)
 */
export async function deleteHomeSliderImageAction(id: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // 1. Fetch record to get storage_path or URL
    const { data: record, error: fetchErr } = await supabase
      .from("home_slider_images")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !record) {
      return { success: false, error: "Slider image record not found." };
    }

    // 2. Delete file from Storage if storage_path exists
    if (record.storage_path) {
      const { error: storageErr } = await supabase.storage
        .from("home-slider-images")
        .remove([record.storage_path]);

      if (storageErr) {
        console.warn("Storage deletion warning:", storageErr.message);
      }
    } else if (record.image_url && record.image_url.includes("home-slider-images/")) {
      const parts = record.image_url.split("home-slider-images/");
      if (parts[1]) {
        const path = parts[1].split("?")[0];
        await supabase.storage.from("home-slider-images").remove([path]);
      }
    }

    // 3. Delete database record
    const { error: deleteErr } = await supabase
      .from("home_slider_images")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      console.error("DB delete error:", deleteErr.message);
      return { success: false, error: deleteErr.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteHomeSliderImageAction Exception:", err);
    return { success: false, error: "Failed to delete slider image." };
  }
}

/* ============================================================================
   2. TESTIMONIALS ACTIONS
============================================================================ */

/**
 * Fetch Testimonials
 */
export async function fetchHomeTestimonialsAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("home_testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      console.error("fetchHomeTestimonialsAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("fetchHomeTestimonialsAction Exception:", err);
    return { success: false, error: "Failed to fetch testimonials.", data: [] };
  }
}

/**
 * Save / Update Testimonial Item (Saved as Draft)
 */
export async function saveHomeTestimonialItemAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const testimonialId = formData.get("testimonialId") as string | null;
    const name = (formData.get("name") as string) || "";
    const designation = (formData.get("designation") as string) || "";
    const city = (formData.get("city") as string) || "";
    const rating = parseInt((formData.get("rating") as string) || "5", 10);
    const review = (formData.get("review") as string) || "";
    let avatar = (formData.get("avatar") as string) || "";

    const avatarFile = formData.get("avatarFile") as File | null;
    if (avatarFile && avatarFile.name && avatarFile.size > 0) {
      const ext = avatarFile.name.split(".").pop() || "jpg";
      const fileName = `avatars/avatar_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { error: uploadErr } = await supabase.storage
        .from("home-slider-images")
        .upload(fileName, buffer, {
          contentType: avatarFile.type || "image/jpeg",
          upsert: true,
        });

      if (uploadErr) {
        console.error("Avatar upload error:", uploadErr.message);
        return { success: false, error: `Avatar upload failed: ${uploadErr.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("home-slider-images")
        .getPublicUrl(fileName);

      avatar = publicUrlData.publicUrl;
    }

    if (!avatar) {
      avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
    }

    const payload: any = {
      name: name.trim(),
      designation: designation.trim(),
      city: city.trim(),
      rating: isNaN(rating) ? 5 : Math.max(1, Math.min(5, rating)),
      review: review.trim(),
      avatar: avatar.trim(),
      featured: true,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    if (testimonialId) {
      const { data, error } = await supabase
        .from("home_testimonials")
        .update(payload)
        .eq("id", testimonialId)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      payload.created_at = new Date().toISOString();
      const { data, error } = await supabase
        .from("home_testimonials")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveHomeTestimonialItemAction Exception:", err);
    return { success: false, error: "Failed to save testimonial." };
  }
}

/**
 * Delete Testimonial Item
 */
export async function deleteHomeTestimonialItemAction(id: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase.from("home_testimonials").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error("deleteHomeTestimonialItemAction Exception:", err);
    return { success: false, error: "Failed to delete testimonial." };
  }
}

/* ============================================================================
   3. FAQ ACTIONS
============================================================================ */

/**
 * Fetch FAQs
 */
export async function fetchHomeFaqsAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("home_faqs")
      .select("*")
      .order("display_order", { ascending: true });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      console.error("fetchHomeFaqsAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("fetchHomeFaqsAction Exception:", err);
    return { success: false, error: "Failed to fetch FAQs.", data: [] };
  }
}

/**
 * Save / Update FAQ Item (Saved as Draft)
 */
export async function saveHomeFaqItemAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const faqId = formData.get("faqId") as string | null;
    const question = (formData.get("question") as string) || "";
    const answer = (formData.get("answer") as string) || "";
    const category = (formData.get("category") as string) || "General";
    const display_order = parseInt((formData.get("display_order") as string) || "1", 10);

    const payload: any = {
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      display_order: isNaN(display_order) ? 1 : display_order,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    if (faqId) {
      const { data, error } = await supabase
        .from("home_faqs")
        .update(payload)
        .eq("id", faqId)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      payload.created_at = new Date().toISOString();
      const { data, error } = await supabase
        .from("home_faqs")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveHomeFaqItemAction Exception:", err);
    return { success: false, error: "Failed to save FAQ." };
  }
}

/**
 * Delete FAQ Item
 */
export async function deleteHomeFaqItemAction(id: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase.from("home_faqs").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error("deleteHomeFaqItemAction Exception:", err);
    return { success: false, error: "Failed to delete FAQ." };
  }
}

/* ============================================================================
   4. ADVANTAGE CARDS ACTIONS ("Why Travelers Choose QuickWay Ride")
============================================================================ */

/**
 * Fetch Advantage Cards
 */
export async function fetchHomeAdvantagesAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("home_advantages")
      .select("*")
      .order("display_order", { ascending: true });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      console.error("fetchHomeAdvantagesAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("fetchHomeAdvantagesAction Exception:", err);
    return { success: false, error: "Failed to fetch advantage cards.", data: [] };
  }
}

/**
 * Save / Update Advantage Card Item (Saved as Draft)
 */
export async function saveHomeAdvantageItemAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const advantageId = formData.get("advantageId") as string | null;
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const icon_name = (formData.get("icon_name") as string) || "ShieldCheck";
    const display_order = parseInt((formData.get("display_order") as string) || "1", 10);

    const payload: any = {
      title: title.trim(),
      description: description.trim(),
      icon_name: icon_name.trim(),
      display_order: isNaN(display_order) ? 1 : display_order,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    if (advantageId) {
      const { data, error } = await supabase
        .from("home_advantages")
        .update(payload)
        .eq("id", advantageId)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      payload.created_at = new Date().toISOString();
      const { data, error } = await supabase
        .from("home_advantages")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveHomeAdvantageItemAction Exception:", err);
    return { success: false, error: "Failed to save advantage card." };
  }
}

/**
 * Delete Advantage Card Item
 */
export async function deleteHomeAdvantageItemAction(id: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase.from("home_advantages").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error("deleteHomeAdvantageItemAction Exception:", err);
    return { success: false, error: "Failed to delete advantage card." };
  }
}

/* ============================================================================
   5. POPULAR TOUR CIRCUITS TEASER CARDS ACTIONS
============================================================================ */

/**
 * Fetch Tour Circuit Teaser Cards
 */
export async function fetchHomeTourCircuitsAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("home_tour_circuits")
      .select("*")
      .order("display_order", { ascending: true });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;
    if (error) {
      console.error("fetchHomeTourCircuitsAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (err: any) {
    console.error("fetchHomeTourCircuitsAction Exception:", err);
    return { success: false, error: "Failed to fetch tour circuit cards.", data: [] };
  }
}

/**
 * Save / Update Tour Circuit Teaser Item (Saved as Draft)
 */
export async function saveHomeTourCircuitItemAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const circuitId = formData.get("circuitId") as string | null;
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const display_order = parseInt((formData.get("display_order") as string) || "1", 10);

    const payload: any = {
      title: title.trim(),
      description: description.trim(),
      display_order: isNaN(display_order) ? 1 : display_order,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    if (circuitId) {
      const { data, error } = await supabase
        .from("home_tour_circuits")
        .update(payload)
        .eq("id", circuitId)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      payload.created_at = new Date().toISOString();
      const { data, error } = await supabase
        .from("home_tour_circuits")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveHomeTourCircuitItemAction Exception:", err);
    return { success: false, error: "Failed to save tour circuit card." };
  }
}

/**
 * Delete Tour Circuit Teaser Item
 */
export async function deleteHomeTourCircuitItemAction(id: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase.from("home_tour_circuits").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error("deleteHomeTourCircuitItemAction Exception:", err);
    return { success: false, error: "Failed to delete tour circuit card." };
  }
}

/* ============================================================================
   6. GLOBAL PUBLISH ALL HOME CHANGES ACTION
============================================================================ */

/**
 * Publishes ALL pending draft changes across Slider, Testimonials, FAQs, Advantages, and Tour Circuits in 1 click
 */
export async function publishHomeChangesAction() {
  try {
    await requireAdminServerAction();
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const now = new Date().toISOString();

    const [sliderRes, testRes, faqRes, advRes, circRes] = await Promise.all([
      supabase
        .from("home_slider_images")
        .update({ status: "published", published_at: now, updated_at: now })
        .eq("status", "draft")
        .select(),
      supabase
        .from("home_testimonials")
        .update({ status: "published", published_at: now, updated_at: now })
        .eq("status", "draft")
        .select(),
      supabase
        .from("home_faqs")
        .update({ status: "published", published_at: now, updated_at: now })
        .eq("status", "draft")
        .select(),
      supabase
        .from("home_advantages")
        .update({ status: "published", published_at: now, updated_at: now })
        .eq("status", "draft")
        .select(),
      supabase
        .from("home_tour_circuits")
        .update({ status: "published", published_at: now, updated_at: now })
        .eq("status", "draft")
        .select(),
    ]);

    const count =
      (sliderRes.data?.length || 0) +
      (testRes.data?.length || 0) +
      (faqRes.data?.length || 0) +
      (advRes.data?.length || 0) +
      (circRes.data?.length || 0);

    // Instantly purge Next.js static page cache & Vercel Edge CDN cache
    revalidatePath("/");
    revalidatePath("/preview/home");

    return { success: true, count };
  } catch (err: any) {
    console.error("publishHomeChangesAction Exception:", err);
    return { success: false, error: "Failed to publish Home page changes." };
  }
}
