"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface TourPackageRecord {
  id: string;
  title: string;
  slug: string;
  duration: string;
  starting_price: number;
  route: string;
  short_description?: string;
  cover_image: string;
  highlights: string[];
  gallery_images?: string[];
  file_paths?: string[];
  status: "draft" | "published";
  is_deleted?: boolean;
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
 * Server Action: Fetches tour packages for public or admin mode
 */
export async function fetchTourPackagesAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let query = supabase
      .from("tour_packages")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    if (mode === "public") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      console.error("fetchTourPackagesAction Error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    const formattedData: TourPackageRecord[] = (data || []).map((item) => ({
      ...item,
      starting_price: Number(item.starting_price || 0),
      highlights: Array.isArray(item.highlights)
        ? item.highlights
        : typeof item.highlights === "string"
        ? JSON.parse(item.highlights)
        : [],
      gallery_images: Array.isArray(item.gallery_images)
        ? item.gallery_images
        : typeof item.gallery_images === "string"
        ? JSON.parse(item.gallery_images)
        : [],
    }));

    return { success: true, data: formattedData };
  } catch (err: any) {
    console.error("fetchTourPackagesAction Exception:", err);
    return { success: false, error: "Failed to fetch tour packages.", data: [] };
  }
}

/**
 * Server Action: Creates or updates a tour package as 'draft' with Storage uploads
 */
export async function saveTourPackageAction(formData: FormData) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const packageId = formData.get("packageId") as string | null;
    const title = (formData.get("title") as string) || "";
    const duration = (formData.get("duration") as string) || "";
    const starting_price = Number(formData.get("starting_price")) || 0;
    const route = (formData.get("route") as string) || "";
    const short_description = (formData.get("short_description") as string) || "";
    const highlightsRaw = (formData.get("highlights") as string) || "";

    const coverFile = formData.get("cover_image_file") as File | null;
    const existingCoverImage = (formData.get("existing_cover_image") as string) || "";

    const galleryFiles = formData.getAll("gallery_files") as File[];
    const existingGalleryRaw = (formData.get("existing_gallery_images") as string) || "[]";
    const existingFilePathsRaw = (formData.get("existing_file_paths") as string) || "[]";

    if (!title || !duration || !route) {
      return { success: false, error: "Title, duration, and route are required." };
    }

    // Parse highlights
    const highlights = highlightsRaw
      .split("\n")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const filePaths: string[] = JSON.parse(existingFilePathsRaw);
    let coverUrl = existingCoverImage;

    // 1. Upload Cover Image if new file selected
    if (coverFile && coverFile.size > 0) {
      const fileExt = coverFile.name.split(".").pop() || "jpg";
      const cleanFileName = coverFile.name.replace(/[^a-zA-Z0-9]/g, "_");
      const coverPath = `cover_${Date.now()}_${cleanFileName}.${fileExt}`;

      const arrayBuffer = await coverFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: coverErr } = await supabase.storage
        .from("tour-package-images")
        .upload(coverPath, buffer, {
          contentType: coverFile.type || "image/jpeg",
          upsert: true,
        });

      if (coverErr) {
        console.error("Cover upload error:", coverErr.message);
        return { success: false, error: `Cover upload failed: ${coverErr.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from("tour-package-images")
        .getPublicUrl(coverPath);

      coverUrl = publicUrlData.publicUrl;
      filePaths.push(coverPath);
    }

    // 2. Upload Gallery Images
    let galleryUrls: string[] = JSON.parse(existingGalleryRaw);

    for (const gFile of galleryFiles) {
      if (!gFile || !gFile.size || gFile.size === 0) continue;

      const gExt = gFile.name.split(".").pop() || "jpg";
      const gCleanName = gFile.name.replace(/[^a-zA-Z0-9]/g, "_");
      const gPath = `gallery_${Date.now()}_${gCleanName}.${gExt}`;

      const arrayBuffer = await gFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: gErr } = await supabase.storage
        .from("tour-package-images")
        .upload(gPath, buffer, {
          contentType: gFile.type || "image/jpeg",
          upsert: true,
        });

      if (gErr) {
        console.warn("Gallery image upload warning:", gErr.message);
        continue;
      }

      const { data: gPublicUrlData } = supabase.storage
        .from("tour-package-images")
        .getPublicUrl(gPath);

      galleryUrls.push(gPublicUrlData.publicUrl);
      filePaths.push(gPath);
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const payload = {
      title: title.trim(),
      slug: slug || `package-${Date.now()}`,
      duration: duration.trim(),
      starting_price: starting_price,
      route: route.trim(),
      short_description: short_description.trim(),
      cover_image: coverUrl || "/images/packages/haridwar-ganga-aarti.jpg",
      highlights: JSON.stringify(highlights),
      gallery_images: JSON.stringify(galleryUrls),
      file_paths: JSON.stringify(filePaths),
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    let resultData;
    if (packageId) {
      // Update
      const { data, error } = await supabase
        .from("tour_packages")
        .update(payload)
        .eq("id", packageId)
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    } else {
      // Insert
      const { data, error } = await supabase
        .from("tour_packages")
        .insert([payload])
        .select();

      if (error) return { success: false, error: error.message };
      resultData = data?.[0];
    }

    return { success: true, data: resultData };
  } catch (err: any) {
    console.error("saveTourPackageAction Error:", err);
    return { success: false, error: "Failed to save tour package." };
  }
}

/**
 * Server Action: Deletes a package record AND removes all physical storage files
 */
export async function deleteTourPackageAction(packageId: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // 1. Fetch package to get file_paths for storage cleanup
    const { data: pkgData } = await supabase
      .from("tour_packages")
      .select("file_paths")
      .eq("id", packageId)
      .single();

    if (pkgData && pkgData.file_paths) {
      let paths: string[] = [];
      try {
        paths = typeof pkgData.file_paths === "string"
          ? JSON.parse(pkgData.file_paths)
          : pkgData.file_paths;
      } catch (e) {
        console.warn("Parse file_paths warning:", e);
      }

      if (paths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("tour-package-images")
          .remove(paths);

        if (storageError) {
          console.warn("Storage files cleanup warning:", storageError.message);
        }
      }
    }

    // 2. Delete DB record
    const { error: dbError } = await supabase
      .from("tour_packages")
      .delete()
      .eq("id", packageId);

    if (dbError) {
      // Soft-delete fallback if hard delete is restricted
      await supabase
        .from("tour_packages")
        .update({ is_deleted: true, updated_at: new Date().toISOString() })
        .eq("id", packageId);
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteTourPackageAction Error:", err);
    return { success: false, error: "Failed to delete tour package." };
  }
}

/**
 * Server Action: Publishes ALL draft tour packages together in a single batch
 */
export async function publishTourPackagesAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("tour_packages")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("status", "draft")
      .select();

    if (error) {
      console.error("publishTourPackagesAction Error:", error.message);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      count: data?.length || 0,
    };
  } catch (err: any) {
    console.error("publishTourPackagesAction Error:", err);
    return { success: false, error: "Failed to publish tour packages changes." };
  }
}
