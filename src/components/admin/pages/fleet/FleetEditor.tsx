"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Car,
  FileText,
  Upload,
  Users,
  Briefcase,
  Wind,
  Fuel,
  ShieldCheck,
  Navigation,
  Sparkles,
  UserCheck,
  Award,
  Clock,
  MapPin,
  Compass,
  Train,
  Plane,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchFleetVehiclesAction,
  fetchFleetPageContentAction,
  saveFleetVehicleAction,
  saveFleetPageContentAction,
  deleteFleetVehicleAction,
  publishFleetChangesAction,
  FleetVehicleRecord,
  FleetPageContentRecord,
  FeatureCardItem,
} from "@/actions/fleet";

const DEFAULT_FLEET_FEATURES: FeatureCardItem[] = [
  {
    id: "f1",
    title: "All-India Tourist Permit",
    description:
      "Fully licensed commercial yellow-plate vehicles with valid state border permits across North India.",
    icon_name: "ShieldCheck",
  },
  {
    id: "f2",
    title: "Real-Time GPS Tracking",
    description:
      "Every vehicle in our fleet is monitored via live GPS telemetry for passenger safety.",
    icon_name: "Navigation",
  },
  {
    id: "f3",
    title: "Sanitized & Clean",
    description:
      "Deep internal steam cleaning and seat sanitization performed before every single trip.",
    icon_name: "Sparkles",
  },
  {
    id: "f4",
    title: "Verified Chauffeurs",
    description:
      "Courteous, police-verified mountain and highway drivers with 8+ years of driving experience.",
    icon_name: "UserCheck",
  },
];

export const FleetEditor: React.FC = () => {
  const [vehicles, setVehicles] = useState<FleetVehicleRecord[]>([]);
  const [pageContent, setPageContent] = useState<FleetPageContentRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSavingContent, setIsSavingContent] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<FleetVehicleRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FleetVehicleRecord | null>(null);

  // Form State - Vehicle
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tabCategory, setTabCategory] = useState<string>("sedan");
  const [seating, setSeating] = useState<string>("");
  const [luggage, setLuggage] = useState<string>("");
  const [acType, setAcType] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [perKmRate, setPerKmRate] = useState<string>("");
  const [idealFor, setIdealFor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [featuresText, setFeaturesText] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Form State - Page Content
  const [heroBadge, setHeroBadge] = useState<string>("");
  const [heroTitle, setHeroTitle] = useState<string>("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState<string>("");
  const [heroSubtitle, setHeroSubtitle] = useState<string>("");

  // Form State - Fleet Features Standards
  const [featuresBadge, setFeaturesBadge] = useState<string>("");
  const [featuresHeading, setFeaturesHeading] = useState<string>("");
  const [featuresList, setFeaturesList] = useState<FeatureCardItem[]>(DEFAULT_FLEET_FEATURES);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vRes, cRes] = await Promise.all([
        fetchFleetVehiclesAction("admin"),
        fetchFleetPageContentAction("admin"),
      ]);

      if (vRes.success) setVehicles(vRes.data || []);
      if (cRes.success && cRes.data) {
        setPageContent(cRes.data);
        setHeroBadge(cRes.data.hero_badge || "");
        setHeroTitle(cRes.data.hero_title || "");
        setHeroTitleHighlight(cRes.data.hero_title_highlight || "");
        setHeroSubtitle(cRes.data.hero_subtitle || "");

        setFeaturesBadge(cRes.data.features_badge || "Fleet Safety & Quality Standard");
        setFeaturesHeading(cRes.data.features_heading || "Maintained to Executive Standards");
        if (Array.isArray(cRes.data.features_list) && cRes.data.features_list.length > 0) {
          setFeaturesList(cRes.data.features_list);
        } else {
          setFeaturesList(DEFAULT_FLEET_FEATURES);
        }
      }
    } catch (err) {
      console.error("Load fleet error:", err);
      toast.error("Failed to load fleet data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const draftVehiclesCount = vehicles.filter((v) => v.status === "draft").length;
  const draftContentCount = pageContent?.status === "draft" ? 1 : 0;
  const totalDraftCount = draftVehiclesCount + draftContentCount;

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return vehicles;
    const q = searchQuery.toLowerCase().trim();
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }, [vehicles, searchQuery]);

  const openVehicleModal = (v?: FleetVehicleRecord) => {
    if (v) {
      setEditingVehicle(v);
      setName(v.name);
      setCategory(v.category);
      setTabCategory(v.tab_category || "sedan");
      setSeating(v.seating);
      setLuggage(v.luggage);
      setAcType(v.ac_type);
      setFuelType(v.fuel_type);
      setPerKmRate(v.per_km_rate);
      setIdealFor(v.ideal_for);
      setDescription(v.description);
      setFeaturesText(Array.isArray(v.features) ? v.features.join("\n") : "");
      setImagePreview(v.image_url || "");
      setImageFile(null);
    } else {
      setEditingVehicle(null);
      setName("");
      setCategory("Sedan");
      setTabCategory("sedan");
      setSeating("4 + 1 Passengers");
      setLuggage("2 Medium, 1 Cabin, 1 Backpack");
      setAcType("AC (Plains)");
      setFuelType("Petrol / Petrol+CNG");
      setPerKmRate("₹11 - ₹12 / KM");
      setIdealFor("Couples, small families & 1-way outstation drops");
      setDescription("");
      setFeaturesText(
        "Plush fabric seating\nFast-charging mobile USB ports\nSpacious boot for 3 suitcases"
      );
      setImagePreview("");
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim() || !description.trim()) {
      toast.error("Vehicle name, category, and description are required.");
      return;
    }
    if (!editingVehicle && !imageFile) {
      toast.error("Vehicle image is required for new entries.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    if (editingVehicle) formData.append("vehicleId", editingVehicle.id);
    formData.append("name", name.trim());
    formData.append("category", category.trim());
    formData.append("tab_category", tabCategory.trim());
    formData.append("seating", seating.trim());
    formData.append("luggage", luggage.trim());
    formData.append("ac_type", acType.trim());
    formData.append("fuel_type", fuelType.trim());
    formData.append("per_km_rate", perKmRate.trim());
    formData.append("ideal_for", idealFor.trim());
    formData.append("description", description.trim());
    formData.append("features", featuresText);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await saveFleetVehicleAction(formData);
      if (res.success) {
        toast.success(
          editingVehicle ? "Vehicle Updated as Draft!" : "New Vehicle Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsModalOpen(false);
        loadData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save vehicle error:", err);
      toast.error("An unexpected error occurred while saving vehicle.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContent(true);
    const formData = new FormData();
    formData.append("hero_badge", heroBadge);
    formData.append("hero_title", heroTitle);
    formData.append("hero_title_highlight", heroTitleHighlight);
    formData.append("hero_subtitle", heroSubtitle);
    formData.append("features_badge", featuresBadge);
    formData.append("features_heading", featuresHeading);
    formData.append("features_list", JSON.stringify(featuresList));

    try {
      const res = await saveFleetPageContentAction(formData);
      if (res.success) {
        toast.success("Fleet Page Text & Safety Cards Saved as Draft!");
        setIsContentModalOpen(false);
        loadData();
      } else {
        toast.error("Save Content Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save content error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSavingContent(false);
    }
  };

  // Feature Card List Handlers
  const handleAddFeatureCard = () => {
    const newCard: FeatureCardItem = {
      id: `f_${Date.now()}`,
      title: "New Safety Standard",
      description: "Enter detailed safety specification for your fleet.",
      icon_name: "ShieldCheck",
    };
    setFeaturesList((prev) => [...prev, newCard]);
  };

  const handleUpdateFeatureCard = (
    index: number,
    field: keyof FeatureCardItem,
    value: string
  ) => {
    setFeaturesList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleDeleteFeatureCard = (index: number) => {
    setFeaturesList((prev) => prev.filter((_, idx) => idx !== index));
    toast.success("Safety Card Removed");
  };

  const handlePublish = async () => {
    if (totalDraftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All vehicles and page content are already published live.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishFleetChangesAction();
      if (res.success) {
        toast.success(`Published ${res.count} Fleet Change(s) Live!`, {
          description: "The live Fleet page has been updated instantly.",
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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);

    try {
      const res = await deleteFleetVehicleAction(deleteTarget.id);
      if (res.success) {
        setVehicles((prev) => prev.filter((v) => v.id !== deleteTarget.id));
        toast.success("Fleet Vehicle & Image Deleted Successfully!");
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An unexpected error occurred while deleting vehicle.");
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
            <span>Fleet Directory Management</span>
            {totalDraftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {totalDraftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage fleet vehicles, vehicle photos, and safety text content shown on the public website.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => setIsContentModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Edit Page Text</span>
          </button>

          <button
            onClick={() => openVehicleModal()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Vehicle</span>
          </button>

          <Link
            href="/fleet/preview"
            target="_blank"
            prefetch={false}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Page</span>
          </Link>

          <button
            onClick={handlePublish}
            disabled={isPublishing || totalDraftCount === 0}
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

      {/* Main Vehicles List Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search vehicle name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {vehicles.filter((v) => v.status === "published").length} Published • {draftVehiclesCount} Draft
            </span>
            <button
              onClick={loadData}
              title="Refresh Fleet"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                No Fleet Vehicles Found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery ? "No vehicles match your search term." : "Click 'Add Vehicle' to create your first vehicle record."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVehicles.map((v) => {
              const isDraft = v.status === "draft";
              return (
                <div
                  key={v.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-56 bg-slate-50 p-2 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={v.image_url || "/images/swift.jfif"}
                        alt={v.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shadow-xs ${
                            isDraft
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-emerald-600 text-white border-emerald-500"
                          }`}
                        >
                          {isDraft ? "Draft" : "Published"}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-extrabold shadow-sm">
                          {v.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-heading font-extrabold text-lg text-slate-900 leading-snug">
                          {v.name}
                        </h3>
                        <p className="text-xs font-bold text-amber-700 mt-0.5">
                          Ideal for: {v.ideal_for}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{v.seating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{v.luggage}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Wind className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{v.ac_type}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <Fuel className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{v.per_km_rate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 mt-2">
                    <button
                      onClick={() => openVehicleModal(v)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteTarget(v)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Vehicle Modal */}
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
              className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  <span>{editingVehicle ? "Edit Fleet Vehicle" : "Add New Fleet Vehicle"}</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVehicle} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Vehicle Photo *</label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <div className="relative w-24 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" />
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 h-20 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 transition-colors">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">
                        {imageFile ? imageFile.name : "Upload Vehicle Photo (JPG, PNG, WEBP)"}
                      </span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Vehicle Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sedan Category (Dzire / Aura)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Category Tag *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sedan, Innova Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Filter Tab</label>
                    <select
                      value={tabCategory}
                      onChange={(e) => setTabCategory(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="sedan">Sedan (4+1)</option>
                      <option value="mpv">Ertiga / MPV (6+1)</option>
                      <option value="suv">Innova Crysta (6+1, 7+1)</option>
                      <option value="traveller">Urbania & Traveller (12-26)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Seating Capacity</label>
                    <input
                      type="text"
                      placeholder="e.g. 4 + 1 Passengers"
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Luggage Capacity</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Medium, 1 Cabin, 1 Backpack"
                      value={luggage}
                      onChange={(e) => setLuggage(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Air Conditioning</label>
                    <input
                      type="text"
                      placeholder="e.g. AC (Plains) / Dual Executive AC"
                      value={acType}
                      onChange={(e) => setAcType(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Fuel Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Petrol / Petrol+CNG / Diesel"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Per KM Tariff</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹11 - ₹12 / KM"
                      value={perKmRate}
                      onChange={(e) => setPerKmRate(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Ideal For</label>
                  <input
                    type="text"
                    placeholder="e.g. Couples, small families & 1-way outstation drops"
                    value={idealFor}
                    onChange={(e) => setIdealFor(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Vehicle Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed vehicle description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Vehicle Key Features (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Plush fabric seating&#10;Fast-charging mobile USB ports&#10;Spacious boot for 3 suitcases"
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
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
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Page Content & Safety Cards Modal */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContentModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Edit Fleet Page Text & Safety Cards</span>
                </h3>
                <button
                  onClick={() => setIsContentModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveContent} className="p-6 space-y-6 text-slate-900 overflow-y-auto">
                {/* 1. Hero Text Section */}
                <div className="space-y-4">
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase border-b border-slate-100 pb-2">
                    Hero Section Text
                  </h4>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Hero Badge Tag</label>
                    <input
                      type="text"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      placeholder="Verified Clean & Sanitized Fleet"
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Hero Title Main</label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        placeholder="Our Premium Fleet of Cabs &"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Title Highlight (Gold)</label>
                      <input
                        type="text"
                        value={heroTitleHighlight}
                        onChange={(e) => setHeroTitleHighlight(e.target.value)}
                        placeholder="Group Vehicles."
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={3}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Description paragraph below hero heading..."
                      className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                {/* 2. Fleet Safety & Quality Standards Manager */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase">
                        Fleet Safety & Quality Standards Cards
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Manage, edit, or delete feature cards shown at the bottom of the Fleet page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFeatureCard}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Section Badge Tag</label>
                      <input
                        type="text"
                        value={featuresBadge}
                        onChange={(e) => setFeaturesBadge(e.target.value)}
                        placeholder="Fleet Safety & Quality Standard"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Section Main Heading</label>
                      <input
                        type="text"
                        value={featuresHeading}
                        onChange={(e) => setFeaturesHeading(e.target.value)}
                        placeholder="Maintained to Executive Standards"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Feature Cards Manager List */}
                  <div className="space-y-3 pt-2">
                    {featuresList.map((card, idx) => (
                      <div
                        key={card.id || idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-xs font-extrabold text-amber-700 uppercase">
                            Safety Card #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFeatureCard(idx)}
                            className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                            title="Delete this card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase">Card Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => handleUpdateFeatureCard(idx, "title", e.target.value)}
                              placeholder="e.g. All-India Tourist Permit"
                              className="w-full h-9 px-3 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase">Icon Symbol</label>
                            <select
                              value={card.icon_name || "ShieldCheck"}
                              onChange={(e) => handleUpdateFeatureCard(idx, "icon_name", e.target.value)}
                              className="w-full h-9 px-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="ShieldCheck">ShieldCheck</option>
                              <option value="Navigation">Navigation / GPS</option>
                              <option value="Sparkles">Sparkles / Clean</option>
                              <option value="UserCheck">UserCheck / Driver</option>
                              <option value="Award">Award / Quality</option>
                              <option value="Clock">Clock / Time</option>
                              <option value="Users">Users / Support</option>
                              <option value="Car">Car / Taxi</option>
                              <option value="Compass">Compass</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">Card Description</label>
                          <textarea
                            rows={2}
                            value={card.description}
                            onChange={(e) => handleUpdateFeatureCard(idx, "description", e.target.value)}
                            placeholder="Enter detailed safety description..."
                            className="w-full p-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsContentModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingContent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Save Text Draft</span>
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
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Delete Fleet Vehicle?</h3>
                <p className="text-xs text-slate-500 font-medium">
                  This will permanently delete <strong className="text-slate-900">{deleteTarget.name}</strong> and its uploaded storage image.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={Boolean(deletingId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {deletingId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
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
