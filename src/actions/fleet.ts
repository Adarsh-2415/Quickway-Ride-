"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface FleetVehicleRecord {
  id: string;
  name: string;
  category: string;
  tab_category: string;
  image_url: string;
  seating: string;
  luggage: string;
  ac_type: string;
  fuel_type: string;
  per_km_rate: string;
  ideal_for: string;
  description: string;
  features: string[];
  file_paths?: string[];
  status: "draft" | "published";
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

export interface FleetPageContentRecord {
  id: string;
  hero_badge: string;
  hero_title: string;
  hero_title_highlight: string;
  hero_subtitle: string;
  features_badge?: string;
  features_heading?: string;
  features_list?: FeatureCardItem[];
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
 * Server Action: Fetches fleet vehicles for public or admin mode
 */
export async function fetchFleetVehiclesAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("fleet_vehicles")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchFleetVehiclesAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    const uniqueMap = new Map<string, FleetVehicleRecord>();
    (data || []).forEach((item) => {
      if (!uniqueMap.has(item.name)) {
        uniqueMap.set(item.name, {
          ...item,
          features: Array.isArray(item.features)
            ? item.features
            : typeof item.features === "string"
            ? JSON.parse(item.features)
            : [],
        });
      }
    });

    const formattedData: FleetVehicleRecord[] = Array.from(uniqueMap.values());

    return { success: true, data: formattedData };
  } catch (err: any) {
    console.error("fetchFleetVehiclesAction Exception:", err);
    return { success: false, error: "Failed to fetch fleet vehicles.", data: [] };
  }
}

/**
 * Server Action: Fetches Fleet page content text
 */
export async function fetchFleetPageContentAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("fleet_page_content")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchFleetPageContentAction Error:", error.message);
      return { success: false, error: error.message, data: null };
    }

    return { success: true, data: data?.[0] || null };
  } catch (err: any) {
    console.error("fetchFleetPageContentAction Exception:", err);
    return { success: false, error: "Failed to fetch fleet page content.", data: null };
  }
}

/**
 * Server Action: Creates or updates a Fleet vehicle as 'draft' with Storage upload
 */
export async function saveFleetVehicleAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const vehicleId = formData.get("vehicleId") as string | null;
    const name = (formData.get("name") as string) || "";
    const category = (formData.get("category") as string) || "";
    const tab_category = (formData.get("tab_category") as string) || "sedan";
    const seating = (formData.get("seating") as string) || "";
    const luggage = (formData.get("luggage") as string) || "";
    const ac_type = (formData.get("ac_type") as string) || "AC (Plains)";
    const fuel_type = (formData.get("fuel_type") as string) || "Petrol / Diesel";
    const per_km_rate = (formData.get("per_km_rate") as string) || "";
    const ideal_for = (formData.get("ideal_for") as string) || "";
    const description = (formData.get("description") as string) || "";
    const featuresRaw = (formData.get("features") as string) || "";

    const imageFile = formData.get("image_file") as File | null;
    const existingImageUrl = (formData.get("existing_image_url") as string) || "";
    const existingFilePathsRaw = (formData.get("existing_file_paths") as string) || "[]";

    if (!name || !category || !seating) {
      return { success: false, error: "Vehicle name, category, and seating capacity are required." };
    }

    const features = featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const filePaths: string[] = JSON.parse(existingFilePathsRaw);
    let imageUrl = existingImageUrl;

    // 1. Upload Image to Storage if new file provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop() || "jpg";
      const cleanFileName = imageFile.name.replace(/[^a-zA-Z0-9]/g, "_");
      const storagePath = `fleet_${Date.now()}_${cleanFileName}.${fileExt}`;

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadErr } = await supabase.storage
        .from("fleet-images")
        .upload(storagePath, buffer, {
          contentType: imageFile.type || "image/jpeg",
          upsert: true,
        });

      if (uploadErr) {
        console.error("Fleet image upload error:", uploadErr.message);
        return { success: false, error: `Image upload failed: ${uploadErr.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("fleet-images")
        .getPublicUrl(storagePath);

      imageUrl = publicUrlData.publicUrl;
      filePaths.push(storagePath);
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      tab_category: tab_category.trim(),
      image_url: imageUrl || "/images/swift.jfif",
      seating: seating.trim(),
      luggage: luggage.trim(),
      ac_type: ac_type.trim(),
      fuel_type: fuel_type.trim(),
      per_km_rate: per_km_rate.trim(),
      ideal_for: ideal_for.trim(),
      description: description.trim(),
      features: JSON.stringify(features),
      file_paths: JSON.stringify(filePaths),
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    let resultData;
    if (vehicleId) {
      const { data, error } = await supabase
        .from("fleet_vehicles")
        .update(payload)
        .eq("id", vehicleId)
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    } else {
      const { data, error } = await supabase
        .from("fleet_vehicles")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    }

    return { success: true, data: resultData };
  } catch (err: any) {
    console.error("saveFleetVehicleAction Error:", err);
    return { success: false, error: "Failed to save fleet vehicle." };
  }
}

/**
 * Server Action: Saves Fleet page text content as 'draft'
 */
export async function saveFleetPageContentAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const hero_badge = (formData.get("hero_badge") as string) || "";
    const hero_title = (formData.get("hero_title") as string) || "";
    const hero_title_highlight = (formData.get("hero_title_highlight") as string) || "";
    const hero_subtitle = (formData.get("hero_subtitle") as string) || "";
    const features_badge = (formData.get("features_badge") as string) || "";
    const features_heading = (formData.get("features_heading") as string) || "";
    const features_list_raw = formData.get("features_list") as string | null;

    let features_list: any[] = [];
    if (features_list_raw) {
      try {
        features_list = JSON.parse(features_list_raw);
      } catch (e) {
        console.warn("Parse features_list warning:", e);
      }
    }

    const payload: any = {
      hero_badge: hero_badge.trim(),
      hero_title: hero_title.trim(),
      hero_title_highlight: hero_title_highlight.trim(),
      hero_subtitle: hero_subtitle.trim(),
      features_badge: features_badge.trim(),
      features_heading: features_heading.trim(),
      features_list,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase.from("fleet_page_content").select("id").limit(1);

    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from("fleet_page_content")
        .update(payload)
        .eq("id", existing[0].id)
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    } else {
      const { data, error } = await supabase
        .from("fleet_page_content")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      return { success: true, data: data?.[0] };
    }
  } catch (err: any) {
    console.error("saveFleetPageContentAction Error:", err);
    return { success: false, error: "Failed to save fleet page content." };
  }
}

/**
 * Server Action: Deletes a Fleet vehicle record AND removes physical storage files
 */
export async function deleteFleetVehicleAction(vehicleId: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // 1. Fetch file_paths for storage cleanup
    const { data: vData } = await supabase
      .from("fleet_vehicles")
      .select("file_paths")
      .eq("id", vehicleId)
      .single();

    if (vData && vData.file_paths) {
      let paths: string[] = [];
      try {
        paths = typeof vData.file_paths === "string" ? JSON.parse(vData.file_paths) : vData.file_paths;
      } catch (e) {
        console.warn("Parse file_paths warning:", e);
      }

      if (paths.length > 0) {
        await supabase.storage.from("fleet-images").remove(paths);
      }
    }

    // 2. Delete DB Record
    const { error: dbError } = await supabase.from("fleet_vehicles").delete().eq("id", vehicleId);

    if (dbError) {
      await supabase
        .from("fleet_vehicles")
        .update({ is_deleted: true, updated_at: new Date().toISOString() })
        .eq("id", vehicleId);
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteFleetVehicleAction Error:", err);
    return { success: false, error: "Failed to delete fleet vehicle." };
  }
}

/**
 * Server Action: Publishes ALL pending draft fleet vehicles & page text content together
 */
export async function publishFleetChangesAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data: vData, error: vErr } = await supabase
      .from("fleet_vehicles")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (vErr) console.error("Publish fleet vehicles warning:", vErr.message);

    const { data: cData, error: cErr } = await supabase
      .from("fleet_page_content")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (cErr) console.error("Publish fleet page content warning:", cErr.message);

    const publishedCount = (vData?.length || 0) + (cData?.length || 0);

    return { success: true, count: publishedCount };
  } catch (err: any) {
    console.error("publishFleetChangesAction Error:", err);
    return { success: false, error: "Failed to publish fleet changes." };
  }
}
