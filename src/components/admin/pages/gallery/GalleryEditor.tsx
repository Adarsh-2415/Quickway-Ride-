"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Trash2,
  Eye,
  CheckCircle2,
  RotateCw,
  AlertCircle,
  Inbox,
  Loader2,
  Plus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchGalleryImagesAction,
  uploadGalleryImageAction,
  deleteGalleryImageAction,
  publishAllGalleryDraftsAction,
  GalleryImageRecord,
} from "@/actions/gallery";

export const GalleryEditor: React.FC = () => {
  const [images, setImages] = useState<GalleryImageRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Deletion Modal
  const [deleteTarget, setDeleteTarget] = useState<GalleryImageRecord | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchGalleryImagesAction("all");
      if (res.success) {
        setImages(res.data || []);
      } else {
        toast.error("Failed to load gallery images", { description: res.error });
      }
    } catch (err) {
      console.error("Load gallery images error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const draftCount = images.filter((img) => img.status === "draft").length;
  const publishedCount = images.filter((img) => img.status === "published").length;

  // Handle Multi-file Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("category", "Fleet");
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await uploadGalleryImageAction(formData);
      if (res.success) {
        toast.success(`${res.count} Image(s) Uploaded as Draft!`, {
          description: "Click 'Publish Changes' when ready to make them live on the website.",
        });
        loadData();
      } else {
        toast.error("Upload Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle Batch Publish
  const handlePublishAll = async () => {
    if (draftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All gallery images are already published on the website.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishAllGalleryDraftsAction();
      if (res.success) {
        toast.success(`Published ${res.count} Gallery Image(s) Live!`, {
          description: "The live website gallery has been updated instantly.",
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

  // Handle Atomic Image Deletion
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);

    try {
      const res = await deleteGalleryImageAction(deleteTarget.id, deleteTarget.file_path);
      if (res.success) {
        setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id));
        toast.success("Image Deleted Successfully!");
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An unexpected error occurred while deleting image.");
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
            <span>Gallery Page Editor</span>
            {draftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {draftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Upload images, review draft additions, preview live appearance, and publish to the live website.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Preview Page Button */}
          <Link
            href="/gallery/preview"
            target="_blank"
            prefetch={false}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Page</span>
          </Link>

          {/* Publish Changes Button */}
          <button
            onClick={handlePublishAll}
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

      {/* Upload Dropzone Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-amber-600" />
            <span>Upload New Images (Multi-select)</span>
          </h3>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileChange}
          className="hidden"
          id="gallery-file-upload"
        />

        <label
          htmlFor="gallery-file-upload"
          className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50/60 hover:bg-amber-500/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group"
        >
          {isUploading ? (
            <div className="space-y-2">
              <Loader2 className="w-10 h-10 text-amber-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-800">Uploading to Supabase Storage...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Click to select single or multiple images
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Supports JPG, PNG, WEBP (Saved as <strong className="text-amber-700">Draft</strong> automatically)
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Gallery Images List */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              Gallery Images ({images.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {publishedCount} Published • {draftCount} Draft
            </p>
          </div>

          <button
            onClick={loadData}
            title="Refresh Gallery"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                No Gallery Images Uploaded Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                Upload your fleet or tour photos using the upload area above.
              </p>
            </div>
          </div>
        ) : (
          /* Preserving Original Aspect Ratio Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => {
              const isDraft = img.status === "draft";
              const isDeleting = deletingId === img.id;

              return (
                <div
                  key={img.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Image Display maintaining aspect ratio */}
                  <div className="relative w-full h-48 bg-slate-100 p-2 flex items-center justify-center overflow-hidden">
                    <Image
                      src={img.image_url}
                      alt={img.title}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-2 left-2 z-10">
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
                  </div>

                  {/* Info & Actions */}
                  <div className="p-4 bg-white border-t border-slate-100 space-y-3">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900 truncate" title={img.title}>
                        {img.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Uploaded: {new Date(img.created_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <Link
                        href="/gallery/preview"
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-600" />
                        <span>Preview</span>
                      </Link>

                      <button
                        onClick={() => setDeleteTarget(img)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
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
                  Delete Gallery Image?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  This will permanently delete <strong className="text-slate-900">{deleteTarget.title}</strong> from both Supabase Storage and database. This action cannot be undone.
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
                  <span>Delete Image</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
