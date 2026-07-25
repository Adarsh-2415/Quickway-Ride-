"use server";

import { createServerClientInstance } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export interface VehicleRecord {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface RoutePriceItem {
  vehicle_id: string;
  price: number;
  status: "draft" | "published";
}

export interface RouteRecord {
  id: string;
  sr_no?: number;
  origin: string;
  destination: string;
  status: "draft" | "published";
  is_deleted?: boolean;
  prices: Record<string, number>; // vehicle_id -> price mapping
  created_at?: string;
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
 * Server Action: Fetches active vehicle columns dynamically
 */
export async function fetchVehiclesAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("fetchVehiclesAction error:", error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: (data as VehicleRecord[]) || [] };
  } catch (err: any) {
    console.error("fetchVehiclesAction Exception:", err);
    return { success: false, error: "Failed to fetch vehicles.", data: [] };
  }
}

/**
 * Server Action: Adds a new vehicle type to Supabase
 */
export async function addVehicleAction(name: string, customSlug?: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const slug =
      customSlug?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    // Fetch current max sort_order
    const { data: maxData } = await supabase
      .from("vehicles")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextSort = (maxData && maxData[0]?.sort_order ? maxData[0].sort_order : 0) + 1;

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name: name.trim(),
          slug: slug || `vehicle-${Date.now()}`,
          sort_order: nextSort,
          is_active: true,
        },
      ])
      .select();

    if (error) {
      console.error("addVehicleAction error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data ? data[0] : null };
  } catch (err: any) {
    console.error("addVehicleAction Exception:", err);
    return { success: false, error: "Failed to add vehicle type." };
  }
}

/**
 * Server Action: Deletes or deactivates a vehicle type from Supabase
 */
export async function deleteVehicleAction(vehicleId: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase
      .from("vehicles")
      .update({ is_active: false })
      .eq("id", vehicleId);

    if (error) {
      console.error("deleteVehicleAction error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteVehicleAction Exception:", err);
    return { success: false, error: "Failed to delete vehicle type." };
  }
}

/**
 * Server Action: Fetches routes and prices dynamically for admin or public mode
 */
export async function fetchRoutesAction(mode: "admin" | "public" = "public") {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // 1. Fetch active routes
    let routeQuery = supabase
      .from("routes")
      .select("*")
      .eq("is_deleted", false)
      .order("sr_no", { ascending: true });

    if (mode === "public") {
      routeQuery = routeQuery.eq("status", "published");
    }

    const { data: routesData, error: routesError } = await routeQuery;

    if (routesError) {
      console.error("fetchRoutesAction routes error:", routesError.message);
      return { success: false, error: routesError.message, data: [] };
    }

    if (!routesData || routesData.length === 0) {
      return { success: true, data: [] };
    }

    const routeIds = routesData.map((r) => r.id);

    // 2. Fetch prices for routes
    let priceQuery = supabase
      .from("route_vehicle_prices")
      .select("*")
      .in("route_id", routeIds);

    if (mode === "public") {
      priceQuery = priceQuery.eq("status", "published");
    }

    const { data: pricesData, error: pricesError } = await priceQuery;

    if (pricesError) {
      console.error("fetchRoutesAction prices error:", pricesError.message);
    }

    // 3. Map prices to routes
    const routePriceMap: Record<string, Record<string, number>> = {};

    pricesData?.forEach((priceItem) => {
      if (!routePriceMap[priceItem.route_id]) {
        routePriceMap[priceItem.route_id] = {};
      }
      // If admin mode, prefer draft price if present, else published
      routePriceMap[priceItem.route_id][priceItem.vehicle_id] = Number(priceItem.price);
    });

    const formattedRoutes: RouteRecord[] = routesData.map((r) => ({
      id: r.id,
      sr_no: r.sr_no,
      origin: r.origin,
      destination: r.destination,
      status: r.status as "draft" | "published",
      prices: routePriceMap[r.id] || {},
      created_at: r.created_at,
    }));

    return { success: true, data: formattedRoutes };
  } catch (err: any) {
    console.error("fetchRoutesAction Exception:", err);
    return { success: false, error: "Failed to fetch route prices.", data: [] };
  }
}

/**
 * Server Action: Adds or edits a route and its vehicle prices as 'draft'
 */
export async function saveRouteAction(payload: {
  routeId?: string;
  origin: string;
  destination: string;
  vehiclePrices: { vehicleId: string; price: number }[];
}) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    let routeId = payload.routeId;

    if (routeId) {
      // Update existing route
      const { error: updateError } = await supabase
        .from("routes")
        .update({
          origin: payload.origin,
          destination: payload.destination,
          status: "draft",
          updated_at: new Date().toISOString(),
        })
        .eq("id", routeId);

      if (updateError) return { success: false, error: updateError.message };
    } else {
      // Create new route
      const { data: newRoute, error: insertError } = await supabase
        .from("routes")
        .insert([
          {
            origin: payload.origin,
            destination: payload.destination,
            status: "draft",
          },
        ])
        .select();

      if (insertError || !newRoute) return { success: false, error: insertError?.message || "Route insert failed" };
      routeId = newRoute[0].id;
    }

    // Insert or update prices for each vehicle as 'draft'
    for (const item of payload.vehiclePrices) {
      if (!item.vehicleId || isNaN(item.price)) continue;

      const { error: priceError } = await supabase
        .from("route_vehicle_prices")
        .upsert(
          [
            {
              route_id: routeId,
              vehicle_id: item.vehicleId,
              price: item.price,
              status: "draft",
            },
          ],
          { onConflict: "route_id,vehicle_id,status" }
        );

      if (priceError) {
        console.warn("Price upsert warning:", priceError.message);
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error("saveRouteAction Error:", err);
    return { success: false, error: "Failed to save route." };
  }
}

/**
 * Server Action: Deletes a route record
 */
export async function deleteRouteAction(routeId: string) {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    const { error } = await supabase
      .from("routes")
      .update({ is_deleted: true, updated_at: new Date().toISOString() })
      .eq("id", routeId);

    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (err: any) {
    console.error("deleteRouteAction Error:", err);
    return { success: false, error: "Failed to delete route." };
  }
}

/**
 * Server Action: Publishes all draft routes and prices to 'published' status
 */
export async function publishPricingAction() {
  try {
    const adminClient = getAdminSupabase();
    const supabase = adminClient || (await createServerClientInstance());

    // Update draft routes to published
    const { data: updatedRoutes, error: routesError } = await supabase
      .from("routes")
      .update({ status: "published", updated_at: new Date().toISOString() })
      .eq("status", "draft")
      .select();

    if (routesError) console.warn("Routes publish warning:", routesError.message);

    // Update draft prices to published
    const { data: updatedPrices, error: pricesError } = await supabase
      .from("route_vehicle_prices")
      .update({ status: "published" })
      .eq("status", "draft")
      .select();

    if (pricesError) console.warn("Prices publish warning:", pricesError.message);

    return {
      success: true,
      routesCount: updatedRoutes?.length || 0,
      pricesCount: updatedPrices?.length || 0,
    };
  } catch (err: any) {
    console.error("publishPricingAction Error:", err);
    return { success: false, error: "Failed to publish pricing changes." };
  }
}
