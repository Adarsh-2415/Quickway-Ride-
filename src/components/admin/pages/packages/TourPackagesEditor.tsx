"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
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
  Calendar,
  Compass,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchTourPackagesAction,
  saveTourPackageAction,
  deleteTourPackageAction,
  publishTourPackagesAction,
  TourPackageRecord,
} from "@/actions/packages";

export const TourPackagesEditor: React.FC = () => {
  const [packages, setPackages] = useState<TourPackageRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPackage, setEditingPackage] = useState<TourPackageRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TourPackageRecord | null>(null);

  // Form Fields State
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [startingPrice, setStartingPrice] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [highlightsText, setHighlightsText] = useState<string>("");

  // Cover Image File
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  // Gallery Files
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchTourPackagesAction("admin");
      if (res.success) {
        setPackages(res.data || []);
      } else {
        toast.error("Failed to load tour packages", { description: res.error });
      }
    } catch (err) {
      console.error("Load packages error:", err);
      toast.error("Failed to load tour packages.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const draftCount = packages.filter((p) => p.status === "draft").length;
  const publishedCount = packages.filter((p) => p.status === "published").length;

  const filteredPackages = useMemo(() => {
    if (!searchQuery.trim()) return packages;
    const q = searchQuery.toLowerCase().trim();
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q) ||
        p.duration.toLowerCase().includes(q)
    );
  }, [packages, searchQuery]);

  // Open Modal for Add or Edit
  const openModal = (pkg?: TourPackageRecord) => {
    if (pkg) {
      setEditingPackage(pkg);
      setTitle(pkg.title);
      setDuration(pkg.duration);
      setStartingPrice(String(pkg.starting_price || ""));
      setRoute(pkg.route);
      setShortDescription(pkg.short_description || "");
      setHighlightsText(Array.isArray(pkg.highlights) ? pkg.highlights.join("\n") : "");
      setCoverPreview(pkg.cover_image);
    } else {
      setEditingPackage(null);
      setTitle("");
      setDuration("1 Day Express");
      setStartingPrice("");
      setRoute("");
      setShortDescription("");
      setHighlightsText("Evening Ganga Aarti VIP Slot\nMansa Devi Ropeway Access\nChandi Devi Temple");
      setCoverPreview("");
    }
    setCoverFile(null);
    setGalleryFiles([]);
    setIsModalOpen(true);
  };

  // Handle Cover Image Select
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle Save Package (Draft)
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !duration.trim() || !route.trim()) {
      toast.error("Title, duration, and route are required.");
      return;
    }

    setIsSaving(true);
    const formData = new FormData();

    if (editingPackage) {
      formData.append("packageId", editingPackage.id);
      formData.append("existing_cover_image", editingPackage.cover_image);
      formData.append("existing_gallery_images", JSON.stringify(editingPackage.gallery_images || []));
      formData.append("existing_file_paths", JSON.stringify(editingPackage.file_paths || []));
    }

    formData.append("title", title.trim());
    formData.append("duration", duration.trim());
    formData.append("starting_price", startingPrice);
    formData.append("route", route.trim());
    formData.append("short_description", shortDescription.trim());
    formData.append("highlights", highlightsText);

    if (coverFile) {
      formData.append("cover_image_file", coverFile);
    }

    galleryFiles.forEach((gf) => {
      formData.append("gallery_files", gf);
    });

    try {
      const res = await saveTourPackageAction(formData);
      if (res.success) {
        toast.success(
          editingPackage ? "Tour Package Updated as Draft!" : "New Package Added as Draft!",
          {
            description: "Click 'Publish Changes' when ready to make it live on the website.",
          }
        );
        setIsModalOpen(false);
        loadData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save package error:", err);
      toast.error("An unexpected error occurred while saving package.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Publish Changes Batch
  const handlePublish = async () => {
    if (draftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All tour packages are already published live on the website.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishTourPackagesAction();
      if (res.success) {
        toast.success(`Published ${res.count} Tour Package(s) Live!`, {
          description: "The live website tour packages page has been updated instantly.",
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

  // Handle Atomic Delete Package
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);

    try {
      const res = await deleteTourPackageAction(deleteTarget.id);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        toast.success("Tour Package & Storage Files Deleted Successfully!");
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete package error:", err);
      toast.error("An unexpected error occurred while deleting package.");
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
            <span>Tour Packages Management</span>
            {draftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {draftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage all tour packages shown on the public website.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => openModal()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Package</span>
          </button>

          <Link
            href="/packages/preview"
            target="_blank"
            prefetch={false}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Page</span>
          </Link>

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

      {/* Main List Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
        {/* Search Bar & Refresh */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search package title or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {publishedCount} Published • {draftCount} Draft
            </span>
            <button
              onClick={loadData}
              title="Refresh Packages"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Packages Cards Responsive Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                No Tour Packages Found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery
                  ? "No packages match your search term."
                  : "Click 'Add Package' to create your first CMS package."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => {
              const isDraft = pkg.status === "draft";
              return (
                <div
                  key={pkg.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image Display */}
                    <div className="relative w-full h-52 bg-slate-100 p-2 flex items-center justify-center overflow-hidden">
                      <Image
                        src={pkg.cover_image || "/images/packages/haridwar-ganga-aarti.jpg"}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Status Badge */}
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

                      {/* Price Badge */}
                      {pkg.starting_price > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-extrabold shadow-sm">
                            ₹{pkg.starting_price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {pkg.duration}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-slate-900 leading-snug">
                        {pkg.title}
                      </h3>

                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{pkg.route}</span>
                      </p>

                      {pkg.highlights && pkg.highlights.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Highlights
                          </span>
                          <ul className="grid grid-cols-1 gap-1 text-xs font-medium text-slate-700">
                            {pkg.highlights.slice(0, 3).map((h, i) => (
                              <li key={i} className="flex items-center gap-1.5 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                <span className="truncate">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 mt-2">
                    <button
                      onClick={() => openModal(pkg)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteTarget(pkg)}
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

      {/* Add / Edit Package Modal */}
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
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>{editingPackage ? "Edit Tour Package" : "Add New Tour Package"}</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePackage} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                {/* Cover Image Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase block">
                    Package Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    {coverPreview && (
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
                      </div>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleCoverSelect}
                      className="hidden"
                      id="tour-cover-upload"
                    />
                    <label
                      htmlFor="tour-cover-upload"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <UploadCloud className="w-4 h-4 text-amber-600" />
                      <span>{coverPreview ? "Change Cover Image" : "Upload Cover Image"}</span>
                    </label>
                  </div>
                </div>

                {/* Title & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Package Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Haridwar Ganga Aarti Circuit"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Duration *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 Day Express, 3 Days / 2 Nights"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                {/* Starting Price & Route */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Starting Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 3500"
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Route Summary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dehradun ➔ Har Ki Pauri ➔ Mansa Devi"
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Short Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief overview of the tour package..."
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Package Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Evening Ganga Aarti VIP Slot&#10;Mansa Devi Ropeway Access&#10;Chandi Devi Temple"
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* Gallery Images Upload */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase block">
                    Multiple Gallery Photos (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={(e) => {
                      if (e.target.files) setGalleryFiles(Array.from(e.target.files));
                    }}
                    className="w-full text-xs font-semibold text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
                  />
                  {galleryFiles.length > 0 && (
                    <p className="text-xs font-bold text-amber-700">
                      {galleryFiles.length} new gallery file(s) selected for upload.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
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
                  Delete Tour Package?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  This will permanently delete <strong className="text-slate-900">{deleteTarget.title}</strong> and all associated physical images from Supabase Storage.
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
                  {deletingId ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete Package</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
