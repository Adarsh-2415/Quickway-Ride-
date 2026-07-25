"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface GalleryImageRecord {
  id: string;
  title: string;
  category: string;
  image_url: string;
  file_path: string;
  status: "draft" | "published";
  created_at: string;
  updated_at?: string;
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
 * Server Action: Uploads single or multiple files to Supabase Storage and inserts draft gallery records
 */
export async function uploadGalleryImageAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const files = formData.getAll("files") as File[];
    const category = (formData.get("category") as string) || "Fleet";

    if (!files || files.length === 0) {
      return { success: false, error: "No files uploaded." };
    }

    const insertedRecords: GalleryImageRecord[] = [];

    for (const file of files) {
      if (!file.size || file.size === 0) continue;

      const fileExt = file.name.split(".").pop() || "jpg";
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, "_");
      const filePath = `gallery_${Date.now()}_${cleanFileName}.${fileExt}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Supabase Storage Bucket 'gallery-images'
      const { error: storageError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });

      if (storageError) {
        console.error("Storage upload error:", storageError.message);
        return { success: false, error: `Upload failed: ${storageError.message}` };
      }

      // Get Public Image URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery-images").getPublicUrl(filePath);

      // Insert record into gallery_images table with status = 'draft'
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

      const { data, error: dbError } = await supabase
        .from("gallery_images")
        .insert([
          {
            title: title || "Gallery Image",
            category: category,
            image_url: publicUrl,
            file_path: filePath,
            status: "draft",
          },
        ])
        .select();

      if (dbError) {
        console.error("DB insert error:", dbError.message);
        return { success: false, error: `Database insert failed: ${dbError.message}` };
      }

      if (data && data.length > 0) {
        insertedRecords.push(data[0] as GalleryImageRecord);
      }
    }

    return {
      success: true,
      count: insertedRecords.length,
      data: insertedRecords,
    };
  } catch (err: any) {
    console.error("uploadGalleryImageAction Error:", err);
    return { success: false, error: err.message || "Failed to process image upload." };
  }
}

/**
 * Server Action: Fetches gallery images from Supabase
 */
export async function fetchGalleryImagesAction(
  statusFilter: "all" | "draft" | "published" = "all"
) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchGalleryImagesAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: (data as GalleryImageRecord[]) || [] };
  } catch (err: any) {
    console.error("fetchGalleryImagesAction Error:", err);
    return { success: false, error: "Failed to fetch gallery images.", data: [] };
  }
}

/**
 * Server Action: Deletes gallery image record from database AND physical file from storage bucket
 */
export async function deleteGalleryImageAction(id: string, filePath: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // 1. Delete file from Supabase Storage
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("gallery-images")
        .remove([filePath]);

      if (storageError) {
        console.warn("Storage deletion warning:", storageError.message);
      }
    }

    // 2. Delete record from database
    const { error: dbError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("deleteGalleryImageAction DB Error:", dbError.message);
      return { success: false, error: dbError.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteGalleryImageAction Error:", err);
    return { success: false, error: "Failed to delete gallery image." };
  }
}

/**
 * Server Action: Publishes ALL draft gallery images together in a single batch
 */
export async function publishAllGalleryDraftsAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("gallery_images")
      .update({ status: "published", updated_at: new Date().toISOString() })
      .eq("status", "draft")
      .select();

    if (error) {
      console.error("publishAllGalleryDraftsAction Error:", error.message);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      count: data?.length || 0,
    };
  } catch (err: any) {
    console.error("publishAllGalleryDraftsAction Error:", err);
    return { success: false, error: "Failed to publish gallery changes." };
  }
}
