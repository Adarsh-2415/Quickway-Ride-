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
  Briefcase,
  FileText,
  Plane,
  Car,
  Clock,
  Building2,
  Train,
  Hotel,
  Bus,
  Calendar,
  Compass,
  Mountain,
  Sun,
  MapPin,
  Award,
  ShieldCheck,
  Users,
  Shield,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchServicesListAction,
  fetchServicesPageContentAction,
  saveServiceItemAction,
  saveServicesPageContentAction,
  deleteServiceItemAction,
  publishServicesChangesAction,
  ServiceItemRecord,
  ServicesPageContentRecord,
  GuaranteeCardItem,
} from "@/actions/services";

const ICON_MAP: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-5 h-5 text-amber-500" />,
  Car: <Car className="w-5 h-5 text-amber-500" />,
  Clock: <Clock className="w-5 h-5 text-amber-500" />,
  Train: <Train className="w-5 h-5 text-amber-500" />,
  Hotel: <Hotel className="w-5 h-5 text-amber-500" />,
  Mountain: <Mountain className="w-5 h-5 text-amber-500" />,
  Sun: <Sun className="w-5 h-5 text-amber-500" />,
  Compass: <Compass className="w-5 h-5 text-amber-500" />,
  MapPin: <MapPin className="w-5 h-5 text-amber-500" />,
  Bus: <Bus className="w-5 h-5 text-amber-500" />,
  Building2: <Building2 className="w-5 h-5 text-amber-500" />,
  Calendar: <Calendar className="w-5 h-5 text-amber-500" />,
};

const DEFAULT_SERVICE_GUARANTEES: GuaranteeCardItem[] = [
  {
    id: "g1",
    title: "Fixed Fare Guarantee",
    description:
      "Transparent rate card with no hidden night surge fees or unexpected extra charges.",
    icon_name: "Award",
  },
  {
    id: "g2",
    title: "100% Punctual Pickup",
    description:
      "Guaranteed on-time pickups for early morning flights, trains, and urgent outstation trips.",
    icon_name: "Clock",
  },
  {
    id: "g3",
    title: "Verified GPS Cabs",
    description:
      "All vehicles equipped with live GPS tracking and driven by background-verified drivers.",
    icon_name: "ShieldCheck",
  },
  {
    id: "g4",
    title: "Dispatch Support Desk",
    description:
      "Dedicated customer support operations team in Roorkee & Dehradun available around the clock.",
    icon_name: "Users",
  },
];

export const ServicesEditor: React.FC = () => {
  const [services, setServices] = useState<ServiceItemRecord[]>([]);
  const [pageContent, setPageContent] = useState<ServicesPageContentRecord | null>(null);
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
  const [editingService, setEditingService] = useState<ServiceItemRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItemRecord | null>(null);

  // Service Form State (Pure Text - NO Images)
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tabCategory, setTabCategory] = useState<string>("outstation");
  const [description, setDescription] = useState<string>("");
  const [longDescription, setLongDescription] = useState<string>("");
  const [recommendedVehicle, setRecommendedVehicle] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [iconName, setIconName] = useState<string>("Car");
  const [inclusionsText, setInclusionsText] = useState<string>("");

  // Page Content Form State
  const [heroBadge, setHeroBadge] = useState<string>("");
  const [heroTitle, setHeroTitle] = useState<string>("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState<string>("");
  const [heroSubtitle, setHeroSubtitle] = useState<string>("");

  // Quality Guarantees Manager State
  const [guaranteesBadge, setGuaranteesBadge] = useState<string>("");
  const [guaranteesHeading, setGuaranteesHeading] = useState<string>("");
  const [guaranteesList, setGuaranteesList] = useState<GuaranteeCardItem[]>(DEFAULT_SERVICE_GUARANTEES);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        fetchServicesListAction("admin"),
        fetchServicesPageContentAction("admin"),
      ]);

      if (sRes.success) setServices(sRes.data || []);
      if (cRes.success && cRes.data) {
        setPageContent(cRes.data);
        setHeroBadge(cRes.data.hero_badge || "");
        setHeroTitle(cRes.data.hero_title || "");
        setHeroTitleHighlight(cRes.data.hero_title_highlight || "");
        setHeroSubtitle(cRes.data.hero_subtitle || "");

        setGuaranteesBadge(cRes.data.guarantees_badge || "Our Quality Guarantee");
        setGuaranteesHeading(cRes.data.guarantees_heading || "Built on Trust & Professionalism");
        if (Array.isArray(cRes.data.guarantees_list) && cRes.data.guarantees_list.length > 0) {
          setGuaranteesList(cRes.data.guarantees_list);
        } else {
          setGuaranteesList(DEFAULT_SERVICE_GUARANTEES);
        }
      }
    } catch (err) {
      console.error("Load services error:", err);
      toast.error("Failed to load services data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const draftServicesCount = services.filter((s) => s.status === "draft").length;
  const draftContentCount = pageContent?.status === "draft" ? 1 : 0;
  const totalDraftCount = draftServicesCount + draftContentCount;

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase().trim();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, searchQuery]);

  const openServiceModal = (s?: ServiceItemRecord) => {
    if (s) {
      setEditingService(s);
      setTitle(s.title);
      setCategory(s.category);
      setTabCategory(s.tab_category || "outstation");
      setDescription(s.description);
      setLongDescription(s.long_description || s.description);
      setRecommendedVehicle(s.recommended_vehicle);
      setBadge(s.badge || "");
      setIconName(s.icon_name || "Car");
      setInclusionsText(Array.isArray(s.inclusions) ? s.inclusions.join("\n") : "");
    } else {
      setEditingService(null);
      setTitle("");
      setCategory("Outstation Cabs");
      setTabCategory("outstation");
      setDescription("");
      setLongDescription("");
      setRecommendedVehicle("Swift Dzire / Ertiga");
      setBadge("");
      setIconName("Car");
      setInclusionsText("Doorstep pickup & drop-off\nToll taxes transparent billing\nExperienced highway driver");
    }
    setIsModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !description.trim()) {
      toast.error("Service title, category, and description are required.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();

    if (editingService) {
      formData.append("serviceId", editingService.id);
    }

    formData.append("title", title.trim());
    formData.append("category", category.trim());
    formData.append("tab_category", tabCategory.trim());
    formData.append("description", description.trim());
    formData.append("long_description", longDescription.trim());
    formData.append("recommended_vehicle", recommendedVehicle.trim());
    formData.append("badge", badge.trim());
    formData.append("icon_name", iconName.trim());
    formData.append("inclusions", inclusionsText);

    try {
      const res = await saveServiceItemAction(formData);
      if (res.success) {
        toast.success(
          editingService ? "Service Updated as Draft!" : "New Service Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsModalOpen(false);
        loadData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save service error:", err);
      toast.error("An unexpected error occurred while saving service.");
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
    formData.append("guarantees_badge", guaranteesBadge);
    formData.append("guarantees_heading", guaranteesHeading);
    formData.append("guarantees_list", JSON.stringify(guaranteesList));

    try {
      const res = await saveServicesPageContentAction(formData);
      if (res.success) {
        toast.success("Services Page Text & Quality Cards Saved as Draft!");
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

  // Guarantee Card List Handlers
  const handleAddGuaranteeCard = () => {
    const newCard: GuaranteeCardItem = {
      id: `g_${Date.now()}`,
      title: "New Quality Guarantee",
      description: "Enter detailed guarantee description for your customers.",
      icon_name: "Award",
    };
    setGuaranteesList((prev) => [...prev, newCard]);
  };

  const handleUpdateGuaranteeCard = (
    index: number,
    field: keyof GuaranteeCardItem,
    value: string
  ) => {
    setGuaranteesList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleDeleteGuaranteeCard = (index: number) => {
    setGuaranteesList((prev) => prev.filter((_, idx) => idx !== index));
    toast.success("Quality Guarantee Card Removed");
  };

  const handlePublish = async () => {
    if (totalDraftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All services and page content are already published live.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishServicesChangesAction();
      if (res.success) {
        toast.success(`Published ${res.count} Services Change(s) Live!`, {
          description: "The live Services page has been updated instantly.",
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
      const res = await deleteServiceItemAction(deleteTarget.id);
      if (res.success) {
        setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        toast.success("Service Item Deleted Successfully!");
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An unexpected error occurred while deleting service.");
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
            <span>Services Directory Management</span>
            {totalDraftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {totalDraftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage all travel services & page text shown on the public website.
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
            onClick={() => openServiceModal()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Service</span>
          </button>

          <Link
            href="/services/preview"
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

      {/* Main Services List Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search service title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {services.filter((s) => s.status === "published").length} Published • {draftServicesCount} Draft
            </span>
            <button
              onClick={loadData}
              title="Refresh Services"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                No Services Found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery ? "No services match your search term." : "Click 'Add Service' to create your first service record."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((s) => {
              const isDraft = s.status === "draft";
              return (
                <div
                  key={s.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80">
                        {ICON_MAP[s.icon_name] || <Car className="w-5 h-5 text-amber-500" />}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                            isDraft ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-emerald-600 text-white border-emerald-500"
                          }`}
                        >
                          {isDraft ? "Draft" : "Published"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                        {s.category}
                      </span>
                      <h3 className="font-heading font-extrabold text-lg text-slate-900 leading-snug">
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openServiceModal(s)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal (Text Only - NO Images) */}
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
              className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  <span>{editingService ? "Edit Service Record" : "Add New Service Record"}</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveService} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Service Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. One Way Outstation Taxi"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Category Tag *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Outstation Cabs, Airport & Transit"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Filter Tab Category</label>
                    <select
                      value={tabCategory}
                      onChange={(e) => setTabCategory(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="outstation">Outstation & Intercity</option>
                      <option value="airport">Airport & Station Sync</option>
                      <option value="tours">Tours & Pilgrimage</option>
                      <option value="corporate">Corporate & Group</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Icon Symbol</label>
                    <select
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="Car">Car / Taxi</option>
                      <option value="Plane">Plane / Airport</option>
                      <option value="Train">Train / Station</option>
                      <option value="Clock">Clock / Hourly Rental</option>
                      <option value="Hotel">Hotel / Resort</option>
                      <option value="Mountain">Mountain / Hill Station</option>
                      <option value="Sun">Sun / Pilgrimage</option>
                      <option value="Compass">Compass / Tour</option>
                      <option value="MapPin">MapPin / Sightseeing</option>
                      <option value="Bus">Bus / Tempo Traveller</option>
                      <option value="Building2">Building / Corporate</option>
                      <option value="Calendar">Calendar / Monthly Lease</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Recommended Vehicle</label>
                  <input
                    type="text"
                    placeholder="e.g. Dzire / Etios / Ertiga"
                    value={recommendedVehicle}
                    onChange={(e) => setRecommendedVehicle(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief description shown on service card..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Full Detailed Description</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation shown inside Service Details modal..."
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Service Inclusions (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Doorstep pickup & drop-off&#10;Toll taxes transparent billing&#10;Experienced highway driver"
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
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

      {/* Edit Page Content & Quality Cards Modal */}
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
                  <span>Edit Services Page Text & Quality Guarantees</span>
                </h3>
                <button
                  onClick={() => setIsContentModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveContent} className="p-6 space-y-6 text-slate-900 overflow-y-auto">
                {/* 1. Hero Section Text */}
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
                      placeholder="17+ Specialized Mobility Services"
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
                        placeholder="Comprehensive Taxi Services Across"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Title Highlight (Gold)</label>
                      <input
                        type="text"
                        value={heroTitleHighlight}
                        onChange={(e) => setHeroTitleHighlight(e.target.value)}
                        placeholder="North India."
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

                {/* 2. Quality Guarantees Cards Manager */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase">
                        Quality Guarantee Cards
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Manage, edit, or delete guarantee cards shown at the bottom of the Services page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddGuaranteeCard}
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
                        value={guaranteesBadge}
                        onChange={(e) => setGuaranteesBadge(e.target.value)}
                        placeholder="Our Quality Guarantee"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Section Main Heading</label>
                      <input
                        type="text"
                        value={guaranteesHeading}
                        onChange={(e) => setGuaranteesHeading(e.target.value)}
                        placeholder="Built on Trust & Professionalism"
                        className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Guarantee Cards Manager List */}
                  <div className="space-y-3 pt-2">
                    {guaranteesList.map((card, idx) => (
                      <div
                        key={card.id || idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="text-xs font-extrabold text-amber-700 uppercase">
                            Guarantee Card #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGuaranteeCard(idx)}
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
                              onChange={(e) => handleUpdateGuaranteeCard(idx, "title", e.target.value)}
                              placeholder="e.g. Fixed Fare Guarantee"
                              className="w-full h-9 px-3 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-700 uppercase">Icon Symbol</label>
                            <select
                              value={card.icon_name || "Award"}
                              onChange={(e) => handleUpdateGuaranteeCard(idx, "icon_name", e.target.value)}
                              className="w-full h-9 px-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="Award">Award / Fixed Fare</option>
                              <option value="Clock">Clock / Punctual</option>
                              <option value="ShieldCheck">ShieldCheck / GPS</option>
                              <option value="Users">Users / Support</option>
                              <option value="Navigation">Navigation</option>
                              <option value="Sparkles">Sparkles</option>
                              <option value="Car">Car</option>
                              <option value="Compass">Compass</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">Card Description</label>
                          <textarea
                            rows={2}
                            value={card.description}
                            onChange={(e) => handleUpdateGuaranteeCard(idx, "description", e.target.value)}
                            placeholder="Enter detailed guarantee description..."
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
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Delete Service Item?</h3>
                <p className="text-xs text-slate-500 font-medium">
                  This will permanently delete <strong className="text-slate-900">{deleteTarget.title}</strong> from the database.
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
                  <span>Delete Service</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
