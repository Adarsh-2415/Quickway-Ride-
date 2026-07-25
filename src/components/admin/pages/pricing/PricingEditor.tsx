"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  RotateCw,
  AlertCircle,
  Inbox,
  Loader2,
  ArrowLeft,
  X,
  MapPin,
  Car,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchVehiclesAction,
  fetchRoutesAction,
  saveRouteAction,
  deleteRouteAction,
  publishPricingAction,
  addVehicleAction,
  deleteVehicleAction,
  VehicleRecord,
  RouteRecord,
} from "@/actions/pricing";

export const PricingEditor: React.FC = () => {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isAddingVehicle, setIsAddingVehicle] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [editingRoute, setEditingRoute] = useState<RouteRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RouteRecord | null>(null);
  const [deleteVehicleTarget, setDeleteVehicleTarget] = useState<VehicleRecord | null>(null);
  const [isDeletingVehicle, setIsDeletingVehicle] = useState<boolean>(false);

  // Form Fields State
  const [origin, setOrigin] = useState<string>("Dehradun");
  const [destination, setDestination] = useState<string>("");
  const [vehiclePrices, setVehiclePrices] = useState<Record<string, string>>({});

  // New Vehicle Type Form State
  const [newVehicleName, setNewVehicleName] = useState<string>("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vRes, rRes] = await Promise.all([
        fetchVehiclesAction(),
        fetchRoutesAction("admin"),
      ]);

      if (vRes.success) setVehicles(vRes.data || []);
      if (rRes.success) setRoutes(rRes.data || []);
    } catch (err) {
      console.error("Load pricing data error:", err);
      toast.error("Failed to load pricing data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const draftCount = routes.filter((r) => r.status === "draft").length;

  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;
    const q = searchQuery.toLowerCase().trim();
    return routes.filter(
      (r) =>
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q)
    );
  }, [routes, searchQuery]);

  // Open Modal for Add or Edit Route
  const openModal = (route?: RouteRecord) => {
    if (route) {
      setEditingRoute(route);
      setOrigin(route.origin);
      setDestination(route.destination);
      const initialPrices: Record<string, string> = {};
      vehicles.forEach((v) => {
        initialPrices[v.id] = route.prices[v.id] ? String(route.prices[v.id]) : "";
      });
      setVehiclePrices(initialPrices);
    } else {
      setEditingRoute(null);
      setOrigin("Dehradun");
      setDestination("");
      const initialPrices: Record<string, string> = {};
      vehicles.forEach((v) => {
        initialPrices[v.id] = "";
      });
      setVehiclePrices(initialPrices);
    }
    setIsModalOpen(true);
  };

  // Handle Add New Vehicle Type
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleName.trim()) {
      toast.error("Please enter a vehicle name.");
      return;
    }

    setIsAddingVehicle(true);
    try {
      const res = await addVehicleAction(newVehicleName.trim());
      if (res.success && res.data) {
        toast.success(`Vehicle Type "${res.data.name}" Added!`, {
          description: "It is now available across all route pricing forms and tables.",
        });
        setNewVehicleName("");
        setIsVehicleModalOpen(false);
        // Refresh vehicles list
        const vRes = await fetchVehiclesAction();
        if (vRes.success) setVehicles(vRes.data || []);
      } else {
        toast.error("Failed to add vehicle type", { description: res.error });
      }
    } catch (err) {
      console.error("Add vehicle error:", err);
      toast.error("An unexpected error occurred while adding vehicle.");
    } finally {
      setIsAddingVehicle(false);
    }
  };

  // Handle Delete Vehicle Type
  const handleConfirmDeleteVehicle = async () => {
    if (!deleteVehicleTarget) return;
    setIsDeletingVehicle(true);

    try {
      const res = await deleteVehicleAction(deleteVehicleTarget.id);
      if (res.success) {
        toast.success(`Vehicle Type "${deleteVehicleTarget.name}" Removed!`, {
          description: "It has been removed from pricing tables and forms.",
        });
        setDeleteVehicleTarget(null);
        // Refresh vehicles list
        const vRes = await fetchVehiclesAction();
        if (vRes.success) setVehicles(vRes.data || []);
      } else {
        toast.error("Failed to delete vehicle type", { description: res.error });
      }
    } catch (err) {
      console.error("Delete vehicle error:", err);
      toast.error("An unexpected error occurred while deleting vehicle.");
    } finally {
      setIsDeletingVehicle(false);
    }
  };

  // Handle Save Route (Draft)
  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) {
      toast.error("Origin and Destination are required.");
      return;
    }

    setIsSaving(true);

    const priceList = vehicles.map((v) => ({
      vehicleId: v.id,
      price: Number(vehiclePrices[v.id]) || 0,
    }));

    try {
      const res = await saveRouteAction({
        routeId: editingRoute?.id,
        origin: origin.trim(),
        destination: destination.trim(),
        vehiclePrices: priceList,
      });

      if (res.success) {
        toast.success(
          editingRoute ? "Route Updated as Draft!" : "New Route Added as Draft!",
          {
            description: "Click 'Publish Changes' when ready to update the live website.",
          }
        );
        setIsModalOpen(false);
        loadData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save route error:", err);
      toast.error("An unexpected error occurred while saving route.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Publish Changes
  const handlePublish = async () => {
    if (draftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All pricing rates are already live on the website.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishPricingAction();
      if (res.success) {
        toast.success("Pricing Changes Published Live!", {
          description: "The live website rate list has been updated instantly.",
        });
        loadData();
      } else {
        toast.error("Publishing Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("An unexpected error occurred while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle Delete Route
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);

    try {
      const res = await deleteRouteAction(deleteTarget.id);
      if (res.success) {
        setRoutes((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        toast.success("Route Deleted Successfully!");
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An unexpected error occurred while deleting route.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* Top Header & Publishing Control Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard/manage-pages"
              className="text-xs font-bold text-slate-500 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Manage Pages</span>
            </Link>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Pricing Rate List Editor</span>
            {draftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {draftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage route fares for {vehicles.map((v) => v.name).join(", ")}. All updates save as Draft until Published.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          {/* Add Vehicle Type Button */}
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>+ Add Vehicle Type</span>
          </button>

          {/* Add New Route Button */}
          <button
            onClick={() => openModal()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Route</span>
          </button>

          {/* Preview Page Button */}
          <Link
            href="/pricing/preview"
            target="_blank"
            prefetch={false}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Page</span>
          </Link>

          {/* Publish Changes Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing || draftCount === 0}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 overflow-hidden space-y-4 p-6">
        {/* Controls Bar: Search & Refresh */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredRoutes.length} of {routes.length} Routes
            </span>
            <button
              onClick={loadData}
              title="Refresh Pricing Data"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Route Pricing Table */}
        {isLoading ? (
          <div className="space-y-3 py-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredRoutes.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                No Pricing Routes Found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery
                  ? "No routes match your search criteria."
                  : "Click 'Add New Route' to add route fares."}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4 w-16">Sr.</th>
                  <th className="py-3.5 px-4">Origin</th>
                  <th className="py-3.5 px-4">Destination</th>

                  {/* Dynamically generated active vehicle headers */}
                  {vehicles.map((v) => (
                    <th key={v.id} className="py-3.5 px-4">
                      {v.name} (₹)
                    </th>
                  ))}

                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredRoutes.map((row, index) => {
                  const isDraft = row.status === "draft";
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-amber-500/5 transition-colors duration-150"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-400">
                        {row.sr_no || index + 1}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {row.origin}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">
                        {row.destination}
                      </td>

                      {/* Dynamic Vehicle Prices */}
                      {vehicles.map((v) => {
                        const price = row.prices[v.id];
                        return (
                          <td key={v.id} className="py-3.5 px-4 font-bold text-slate-900">
                            {price ? `₹${price.toLocaleString("en-IN")}` : "—"}
                          </td>
                        );
                      })}

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                            isDraft
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-emerald-600 text-white border-emerald-500"
                          }`}
                        >
                          {isDraft ? "Draft" : "Published"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(row)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(row)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Vehicle Type Modal */}
      <AnimatePresence>
        {isVehicleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVehicleModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span>Add New Vehicle Category</span>
                </h3>
                <button
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddVehicle} className="p-6 space-y-4 text-slate-900">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Vehicle Type Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tempo Traveller (12+1), Electric Cab, Luxury SUV"
                    value={newVehicleName}
                    onChange={(e) => setNewVehicleName(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                  <p className="text-[11px] text-slate-500 font-medium">
                    This will automatically add a new price column across all route forms and pricing rate tables.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVehicleModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingVehicle}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                  >
                    {isAddingVehicle ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    <span>Save Vehicle Type</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Route Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  {editingRoute ? "Edit Route Pricing" : "Add New Route Pricing"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveRoute} className="p-6 space-y-4 text-slate-900">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Origin</label>
                    <input
                      type="text"
                      required
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full h-11 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Destination</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi, Jaipur"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-11 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Dynamic Vehicle Rate Fields */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-700 uppercase block">
                      Vehicle Fares (₹)
                    </span>
                  </div>

                  {vehicles.map((v) => (
                    <div key={v.id} className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-amber-600" />
                        {v.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">₹</span>
                          <input
                            type="number"
                            placeholder="0"
                            value={vehiclePrices[v.id] || ""}
                            onChange={(e) =>
                              setVehiclePrices((prev) => ({
                                ...prev,
                                [v.id]: e.target.value,
                              }))
                            }
                            className="w-full h-9 pl-7 pr-3 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          title={`Delete ${v.name} Vehicle Type`}
                          onClick={() => setDeleteVehicleTarget(v)}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Delete Pricing Route?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.origin} ➔ {deleteTarget.destination}</strong>?
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={Boolean(deletingId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>Delete Route</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteVehicleTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteVehicleTarget(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Delete Vehicle Category?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Are you sure you want to delete <strong className="text-slate-900">{deleteVehicleTarget.name}</strong>? This will remove its pricing column from all tables and forms.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteVehicleTarget(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeleteVehicle}
                  disabled={isDeletingVehicle}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isDeletingVehicle ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete Vehicle</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
