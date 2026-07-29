"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdminServerAction } from "@/lib/auth/serverAuth";
import { revalidatePath } from "next/cache";

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
 * Server Action: Fetches global Website Maintenance Mode status from website_settings
 */
export async function getMaintenanceModeAction(): Promise<{ success: boolean; maintenanceMode: boolean; error?: string }> {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("website_settings")
      .select("maintenance_mode")
      .eq("id", 1)
      .single();

    if (error) {
      // Table might not exist yet or empty - default to false
      console.warn("getMaintenanceModeAction Warning:", error.message);
      return { success: true, maintenanceMode: false };
    }

    return { success: true, maintenanceMode: !!data?.maintenance_mode };
  } catch (err: any) {
    console.error("getMaintenanceModeAction Error:", err);
    return { success: true, maintenanceMode: false };
  }
}

/**
 * Server Action: Toggles Website Maintenance Mode ON/OFF (Super Admin Only)
 */
export async function toggleMaintenanceModeAction(
  enabled: boolean
): Promise<{ success: boolean; maintenanceMode?: boolean; error?: string }> {
  try {
    await requireAdminServerAction();

    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const now = new Date().toISOString();

    // 1. Try upsert first
    let { error } = await supabase
      .from("website_settings")
      .upsert({ id: 1, maintenance_mode: enabled, updated_at: now }, { onConflict: "id" });

    // 2. If upsert fails due to policy/permission, fallback to update then insert
    if (error) {
      const { error: updateErr } = await supabase
        .from("website_settings")
        .update({ maintenance_mode: enabled, updated_at: now })
        .eq("id", 1);

      if (!updateErr) {
        error = null;
      } else {
        const { error: insertErr } = await supabase
          .from("website_settings")
          .insert([{ id: 1, maintenance_mode: enabled, updated_at: now }]);
        if (!insertErr) error = null;
      }
    }

    if (error) {
      console.error("toggleMaintenanceModeAction DB Error:", error.message);
      return { success: false, error: error.message };
    }

    // Instantly revalidate all public routes across Next.js & Vercel CDN
    revalidatePath("/", "layout");

    return { success: true, maintenanceMode: enabled };
  } catch (err: any) {
    console.error("toggleMaintenanceModeAction Error:", err);
    return { success: false, error: err.message || "Failed to update Maintenance Mode." };
  }
}
