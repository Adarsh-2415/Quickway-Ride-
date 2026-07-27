"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  CheckCircle2,
  RotateCw,
  Loader2,
  Plus,
  Trash2,
  Edit2,
  Images,
  MessageSquareQuote,
  HelpCircle,
  Upload,
  X,
  Star,
  AlertCircle,
  Inbox,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Compass,
  MapPin,
  Car,
  Sparkles,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchHomeSliderImagesAction,
  uploadHomeSliderImagesAction,
  deleteHomeSliderImageAction,
  fetchHomeTestimonialsAction,
  saveHomeTestimonialItemAction,
  deleteHomeTestimonialItemAction,
  fetchHomeFaqsAction,
  saveHomeFaqItemAction,
  deleteHomeFaqItemAction,
  fetchHomeAdvantagesAction,
  saveHomeAdvantageItemAction,
  deleteHomeAdvantageItemAction,
  fetchHomeTourCircuitsAction,
  saveHomeTourCircuitItemAction,
  deleteHomeTourCircuitItemAction,
  publishHomeChangesAction,
  HomeSliderImageRecord,
  HomeTestimonialRecord,
  HomeFaqRecord,
  HomeAdvantageRecord,
  HomeTourCircuitRecord,
} from "@/actions/home";

const ADVANTAGE_ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-600" />,
  Clock: <Clock className="w-5 h-5 text-amber-600" />,
  Award: <Award className="w-5 h-5 text-amber-600" />,
  Users: <Users className="w-5 h-5 text-amber-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-600" />,
  Navigation: <Navigation className="w-5 h-5 text-amber-600" />,
  Car: <Car className="w-5 h-5 text-amber-600" />,
  MapPin: <MapPin className="w-5 h-5 text-amber-600" />,
};

export const HomeEditor: React.FC = () => {
  const [sliderImages, setSliderImages] = useState<HomeSliderImageRecord[]>([]);
  const [testimonials, setTestimonials] = useState<HomeTestimonialRecord[]>([]);
  const [faqs, setFaqs] = useState<HomeFaqRecord[]>([]);
  const [advantages, setAdvantages] = useState<HomeAdvantageRecord[]>([]);
  const [tourCircuits, setTourCircuits] = useState<HomeTourCircuitRecord[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isUploadingSlider, setIsUploadingSlider] = useState<boolean>(false);
  const [isSavingTestimonial, setIsSavingTestimonial] = useState<boolean>(false);
  const [isSavingFaq, setIsSavingFaq] = useState<boolean>(false);
  const [isSavingAdvantage, setIsSavingAdvantage] = useState<boolean>(false);
  const [isSavingCircuit, setIsSavingCircuit] = useState<boolean>(false);

  // Modals state
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState<boolean>(false);
  const [editingTestimonial, setEditingTestimonial] = useState<HomeTestimonialRecord | null>(null);

  const [isFaqModalOpen, setIsFaqModalOpen] = useState<boolean>(false);
  const [editingFaq, setEditingFaq] = useState<HomeFaqRecord | null>(null);

  const [isAdvantageModalOpen, setIsAdvantageModalOpen] = useState<boolean>(false);
  const [editingAdvantage, setEditingAdvantage] = useState<HomeAdvantageRecord | null>(null);

  const [isCircuitModalOpen, setIsCircuitModalOpen] = useState<boolean>(false);
  const [editingCircuit, setEditingCircuit] = useState<HomeTourCircuitRecord | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "slider" | "testimonial" | "faq" | "advantage" | "circuit";
    id: string;
    title: string;
  } | null>(null);

  // Form states - Testimonials
  const [testName, setTestName] = useState<string>("");
  const [testDesignation, setTestDesignation] = useState<string>("");
  const [testCity, setTestCity] = useState<string>("");
  const [testRating, setTestRating] = useState<number>(5);
  const [testReview, setTestReview] = useState<string>("");
  const [testAvatar, setTestAvatar] = useState<string>("");
  const [testAvatarFile, setTestAvatarFile] = useState<File | null>(null);
  const [testAvatarPreview, setTestAvatarPreview] = useState<string>("");

  // Form states - FAQs
  const [faqQuestion, setFaqQuestion] = useState<string>("");
  const [faqAnswer, setFaqAnswer] = useState<string>("");
  const [faqCategory, setFaqCategory] = useState<string>("Booking");
  const [faqOrder, setFaqOrder] = useState<number>(1);

  // Form states - Advantages
  const [advTitle, setAdvTitle] = useState<string>("");
  const [advDescription, setAdvDescription] = useState<string>("");
  const [advIconName, setAdvIconName] = useState<string>("ShieldCheck");
  const [advOrder, setAdvOrder] = useState<number>(1);

  // Form states - Tour Circuits
  const [circTitle, setCircTitle] = useState<string>("");
  const [circDescription, setCircDescription] = useState<string>("");
  const [circOrder, setCircOrder] = useState<number>(1);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [sRes, tRes, fRes, aRes, cRes] = await Promise.all([
        fetchHomeSliderImagesAction("admin"),
        fetchHomeTestimonialsAction("admin"),
        fetchHomeFaqsAction("admin"),
        fetchHomeAdvantagesAction("admin"),
        fetchHomeTourCircuitsAction("admin"),
      ]);

      if (sRes.success) setSliderImages(sRes.data || []);
      if (tRes.success) setTestimonials(tRes.data || []);
      if (fRes.success) setFaqs(fRes.data || []);
      if (aRes.success) setAdvantages(aRes.data || []);
      if (cRes.success) setTourCircuits(cRes.data || []);
    } catch (err) {
      console.error("Load home data error:", err);
      toast.error("Failed to load Home page CMS data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const draftSliderCount = sliderImages.filter((s) => s.status === "draft").length;
  const draftTestimonialsCount = testimonials.filter((t) => t.status === "draft").length;
  const draftFaqsCount = faqs.filter((f) => f.status === "draft").length;
  const draftAdvantagesCount = advantages.filter((a) => a.status === "draft").length;
  const draftCircuitsCount = tourCircuits.filter((c) => c.status === "draft").length;
  const totalDraftCount =
    draftSliderCount + draftTestimonialsCount + draftFaqsCount + draftAdvantagesCount + draftCircuitsCount;

  // 1. Slider Upload Handler (Multiple Files)
  const handleSliderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingSlider(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("title", "Hero Slider Image");
    formData.append("alt", "QuickWay Ride Hero Slider Image");

    try {
      const res = await uploadHomeSliderImagesAction(formData);
      if (res.success) {
        toast.success(`Uploaded ${res.count} Slider Image(s) as Draft!`, {
          description: "Click 'Publish Changes' when ready to make them live.",
        });
        loadAllData();
      } else {
        toast.error("Upload Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Upload slider error:", err);
      toast.error("An unexpected error occurred during upload.");
    } finally {
      setIsUploadingSlider(false);
      e.target.value = "";
    }
  };

  // 2. Testimonial Handlers
  const openTestimonialModal = (t?: HomeTestimonialRecord) => {
    setTestAvatarFile(null);
    if (t) {
      setEditingTestimonial(t);
      setTestName(t.name);
      setTestDesignation(t.designation);
      setTestCity(t.city);
      setTestRating(t.rating);
      setTestReview(t.review);
      setTestAvatar(t.avatar || "");
      setTestAvatarPreview(t.avatar || "");
    } else {
      setEditingTestimonial(null);
      setTestName("");
      setTestDesignation("Traveler");
      setTestCity("Roorkee");
      setTestRating(5);
      setTestReview("");
      const defaultAv = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
      setTestAvatar(defaultAv);
      setTestAvatarPreview(defaultAv);
    }
    setIsTestimonialModalOpen(true);
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTestAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setTestAvatarPreview(objectUrl);
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testReview.trim()) {
      toast.error("Name and Review are required fields.");
      return;
    }

    setIsSavingTestimonial(true);
    const formData = new FormData();
    if (editingTestimonial) {
      formData.append("testimonialId", editingTestimonial.id);
    }
    formData.append("name", testName);
    formData.append("designation", testDesignation);
    formData.append("city", testCity);
    formData.append("rating", testRating.toString());
    formData.append("review", testReview);
    formData.append("avatar", testAvatar);
    if (testAvatarFile) {
      formData.append("avatarFile", testAvatarFile);
    }

    try {
      const res = await saveHomeTestimonialItemAction(formData);
      if (res.success) {
        toast.success(
          editingTestimonial ? "Testimonial Updated as Draft!" : "New Testimonial Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsTestimonialModalOpen(false);
        loadAllData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save testimonial error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSavingTestimonial(false);
    }
  };

  // 3. FAQ Handlers
  const openFaqModal = (f?: HomeFaqRecord) => {
    if (f) {
      setEditingFaq(f);
      setFaqQuestion(f.question);
      setFaqAnswer(f.answer);
      setFaqCategory(f.category || "Booking");
      setFaqOrder(f.display_order || 1);
    } else {
      setEditingFaq(null);
      setFaqQuestion("");
      setFaqAnswer("");
      setFaqCategory("Booking");
      setFaqOrder(faqs.length + 1);
    }
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      toast.error("Question and Answer are required fields.");
      return;
    }

    setIsSavingFaq(true);
    const formData = new FormData();
    if (editingFaq) {
      formData.append("faqId", editingFaq.id);
    }
    formData.append("question", faqQuestion);
    formData.append("answer", faqAnswer);
    formData.append("category", faqCategory);
    formData.append("display_order", faqOrder.toString());

    try {
      const res = await saveHomeFaqItemAction(formData);
      if (res.success) {
        toast.success(
          editingFaq ? "FAQ Updated as Draft!" : "New FAQ Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsFaqModalOpen(false);
        loadAllData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save FAQ error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSavingFaq(false);
    }
  };

  // 4. Advantage Card Handlers
  const openAdvantageModal = (a?: HomeAdvantageRecord) => {
    if (a) {
      setEditingAdvantage(a);
      setAdvTitle(a.title);
      setAdvDescription(a.description);
      setAdvIconName(a.icon_name || "ShieldCheck");
      setAdvOrder(a.display_order || 1);
    } else {
      setEditingAdvantage(null);
      setAdvTitle("");
      setAdvDescription("");
      setAdvIconName("ShieldCheck");
      setAdvOrder(advantages.length + 1);
    }
    setIsAdvantageModalOpen(true);
  };

  const handleSaveAdvantage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advTitle.trim() || !advDescription.trim()) {
      toast.error("Title and Description are required.");
      return;
    }

    setIsSavingAdvantage(true);
    const formData = new FormData();
    if (editingAdvantage) {
      formData.append("advantageId", editingAdvantage.id);
    }
    formData.append("title", advTitle);
    formData.append("description", advDescription);
    formData.append("icon_name", advIconName);
    formData.append("display_order", advOrder.toString());

    try {
      const res = await saveHomeAdvantageItemAction(formData);
      if (res.success) {
        toast.success(
          editingAdvantage ? "Advantage Card Updated as Draft!" : "New Advantage Card Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsAdvantageModalOpen(false);
        loadAllData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save advantage error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSavingAdvantage(false);
    }
  };

  // 5. Tour Circuit Teaser Handlers
  const openCircuitModal = (c?: HomeTourCircuitRecord) => {
    if (c) {
      setEditingCircuit(c);
      setCircTitle(c.title);
      setCircDescription(c.description);
      setCircOrder(c.display_order || 1);
    } else {
      setEditingCircuit(null);
      setCircTitle("");
      setCircDescription("");
      setCircOrder(tourCircuits.length + 1);
    }
    setIsCircuitModalOpen(true);
  };

  const handleSaveCircuit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!circTitle.trim() || !circDescription.trim()) {
      toast.error("Title and Description are required.");
      return;
    }

    setIsSavingCircuit(true);
    const formData = new FormData();
    if (editingCircuit) {
      formData.append("circuitId", editingCircuit.id);
    }
    formData.append("title", circTitle);
    formData.append("description", circDescription);
    formData.append("display_order", circOrder.toString());

    try {
      const res = await saveHomeTourCircuitItemAction(formData);
      if (res.success) {
        toast.success(
          editingCircuit ? "Tour Circuit Updated as Draft!" : "New Tour Circuit Added as Draft!",
          { description: "Click 'Publish Changes' when ready to make it live." }
        );
        setIsCircuitModalOpen(false);
        loadAllData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save tour circuit error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSavingCircuit(false);
    }
  };

  // 6. Global Publish Handler
  const handlePublishAll = async () => {
    if (totalDraftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All Home page sections are already published live.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishHomeChangesAction();
      if (res.success) {
        toast.success(`Published ${res.count} Home Page Change(s) Live!`, {
          description: "All sections are now live on the public website.",
        });
        loadAllData();
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

  // 7. Delete Confirm Handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      let res: { success: boolean; error?: string } = { success: false };
      if (deleteTarget.type === "slider") {
        res = await deleteHomeSliderImageAction(deleteTarget.id);
      } else if (deleteTarget.type === "testimonial") {
        res = await deleteHomeTestimonialItemAction(deleteTarget.id);
      } else if (deleteTarget.type === "faq") {
        res = await deleteHomeFaqItemAction(deleteTarget.id);
      } else if (deleteTarget.type === "advantage") {
        res = await deleteHomeAdvantageItemAction(deleteTarget.id);
      } else if (deleteTarget.type === "circuit") {
        res = await deleteHomeTourCircuitItemAction(deleteTarget.id);
      }

      if (res.success) {
        toast.success(`Item Deleted Successfully!`);
        loadAllData();
      } else {
        toast.error("Delete Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An unexpected error occurred during deletion.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 select-none"
    >
      {/* Top Header & Control Bar */}
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
            <span>Home Page Management</span>
            {totalDraftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                {totalDraftCount} Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage Hero Slider, Testimonials, FAQs, Advantage Cards, and Tour Package Circuits.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          <button
            onClick={loadAllData}
            title="Refresh All Sections"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <Link
            href="/preview/home"
            target="_blank"
            prefetch={false}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Page</span>
          </Link>

          <button
            onClick={handlePublishAll}
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

      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading Home Page CMS Data...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* =========================================================================
             SECTION 1: HERO SLIDER IMAGES MANAGEMENT
             ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Images className="w-5 h-5 text-amber-600" />
                  <span>Section 1: Home Slider Images</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Upload, view, and delete background images displayed on the homepage hero slider.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm">
                  {isUploadingSlider ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-amber-400" />
                  )}
                  <span>{isUploadingSlider ? "Uploading..." : "Add Images"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={isUploadingSlider}
                    onChange={handleSliderUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {sliderImages.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Inbox className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No Slider Images Uploaded</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sliderImages.map((item) => {
                  const isDraft = item.status === "draft";
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-44 w-full bg-slate-900">
                        <img
                          src={item.image_url}
                          alt={item.title || "Slider Image"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border shadow-sm ${
                              isDraft
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-emerald-600 text-white border-emerald-500"
                            }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-heading font-extrabold text-xs text-slate-900 truncate">
                            {item.title || "Untitled Image"}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                type: "slider",
                                id: item.id,
                                title: item.title || "Slider Image",
                              })
                            }
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

          {/* =========================================================================
             SECTION 2: TESTIMONIALS MANAGEMENT
             ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <MessageSquareQuote className="w-5 h-5 text-amber-600" />
                  <span>Section 2: Testimonials</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add, edit, or delete customer reviews displayed on the public homepage.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openTestimonialModal()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Testimonial</span>
                </button>
              </div>
            </div>

            {testimonials.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Inbox className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No Testimonials Added</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => {
                  const isDraft = item.status === "draft";
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                              alt={item.name}
                              className="w-9 h-9 rounded-full object-cover border border-amber-300"
                            />
                            <div>
                              <h4 className="font-heading font-extrabold text-sm text-slate-900 leading-none">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                {item.designation} • {item.city}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                              isDraft
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-emerald-600 text-white border-emerald-500"
                            }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= item.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal italic">
                          "{item.review}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openTestimonialModal(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "testimonial",
                              id: item.id,
                              title: `Testimonial from ${item.name}`,
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
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

          {/* =========================================================================
             SECTION 3: FAQS MANAGEMENT
             ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <span>Section 3: Frequently Asked Questions</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add, edit, or delete questions & answers displayed in the homepage FAQ accordion.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openFaqModal()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add FAQ</span>
                </button>
              </div>
            </div>

            {faqs.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Inbox className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No FAQs Added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((item) => {
                  const isDraft = item.status === "draft";
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px] uppercase border border-slate-200">
                            {item.category || "General"}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            Order #{item.display_order}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                              isDraft
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-emerald-600 text-white border-emerald-500"
                            }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-heading font-extrabold text-sm text-slate-900">
                          {item.question}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openFaqModal(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "faq",
                              id: item.id,
                              title: item.question,
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
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

          {/* =========================================================================
             SECTION 4: THE QUICKWAY ADVANTAGE CARDS MANAGEMENT
             ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>Section 4: The QuickWay Advantage Cards</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add, edit, or delete advantage cards ("Why Travelers Choose QuickWay Ride").
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openAdvantageModal()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Advantage Card</span>
                </button>
              </div>
            </div>

            {advantages.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Inbox className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No Advantage Cards Added</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advantages.map((item) => {
                  const isDraft = item.status === "draft";
                  const iconNode =
                    ADVANTAGE_ICON_MAP[item.icon_name] || <ShieldCheck className="w-5 h-5 text-amber-600" />;
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                            {iconNode}
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                              isDraft
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-emerald-600 text-white border-emerald-500"
                            }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openAdvantageModal(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "advantage",
                              id: item.id,
                              title: item.title,
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
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

          {/* =========================================================================
             SECTION 5: POPULAR TOUR CIRCUITS TEASER CARDS MANAGEMENT
             ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-600" />
                  <span>Section 5: Popular Tour & Pilgrimage Circuits</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add, edit, or delete tour package teaser cards displayed on the homepage.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openCircuitModal()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Tour Circuit</span>
                </button>
              </div>
            </div>

            {tourCircuits.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Inbox className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No Tour Circuits Added</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tourCircuits.map((item) => {
                  const isDraft = item.status === "draft";
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Order #{item.display_order}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                              isDraft
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : "bg-emerald-600 text-white border-emerald-500"
                            }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-heading font-extrabold text-base text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openCircuitModal(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "circuit",
                              id: item.id,
                              title: item.title,
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
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
        </div>
      )}

      {/* Testimonial Add/Edit Modal */}
      <AnimatePresence>
        {isTestimonialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTestimonialModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <MessageSquareQuote className="w-5 h-5 text-amber-400" />
                  <span>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</span>
                </h3>
                <button
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Designation / Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={testDesignation}
                      onChange={(e) => setTestDesignation(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">City Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Roorkee / Dehradun"
                      value={testCity}
                      onChange={(e) => setTestCity(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Rating (1 to 5 Stars)</label>
                    <select
                      value={testRating}
                      onChange={(e) => setTestRating(parseInt(e.target.value, 10))}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Good)</option>
                      <option value={2}>2 Stars (Average)</option>
                      <option value={1}>1 Star (Poor)</option>
                    </select>
                  </div>
                </div>

                {/* Avatar Selection: Upload from Device + URL Fallback */}
                <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <label className="text-xs font-bold text-slate-700 uppercase block">Customer Photo / Avatar</label>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-200 shrink-0 shadow-xs">
                      <img
                        src={testAvatarPreview || testAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileSelect}
                          className="hidden"
                        />
                      </label>

                      {testAvatarFile && (
                        <span className="text-[10px] text-emerald-700 font-bold block">
                          Selected: {testAvatarFile.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Or Paste Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={testAvatar}
                      onChange={(e) => {
                        setTestAvatar(e.target.value);
                        if (!testAvatarFile) setTestAvatarPreview(e.target.value);
                      }}
                      className="w-full h-9 px-3 text-xs font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Customer Review Text *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter customer's review feedback..."
                    value={testReview}
                    onChange={(e) => setTestReview(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingTestimonial}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingTestimonial ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FAQ Add/Edit Modal */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFaqModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>{editingFaq ? "Edit FAQ Item" : "Add New FAQ Item"}</span>
                </h3>
                <button
                  onClick={() => setIsFaqModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveFaq} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Category Tag</label>
                    <select
                      value={faqCategory}
                      onChange={(e) => setFaqCategory(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="Booking">Booking</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Airport">Airport</option>
                      <option value="Outstation">Outstation</option>
                      <option value="Fleet">Fleet</option>
                      <option value="Policies">Policies</option>
                      <option value="Group Travel">Group Travel</option>
                      <option value="Confirmation">Confirmation</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Display Order Number</label>
                    <input
                      type="number"
                      min={1}
                      value={faqOrder}
                      onChange={(e) => setFaqOrder(parseInt(e.target.value, 10))}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Question *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How can I book a cab with QuickWay Ride?"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Answer *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detailed explanation answer..."
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingFaq}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingFaq ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Advantage Card Add/Edit Modal */}
      <AnimatePresence>
        {isAdvantageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdvantageModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>{editingAdvantage ? "Edit Advantage Card" : "Add Advantage Card"}</span>
                </h3>
                <button
                  onClick={() => setIsAdvantageModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdvantage} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Card Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Safety Above Everything"
                      value={advTitle}
                      onChange={(e) => setAdvTitle(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Icon Symbol</label>
                    <select
                      value={advIconName}
                      onChange={(e) => setAdvIconName(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="ShieldCheck">Shield / Safety</option>
                      <option value="Clock">Clock / On-Time</option>
                      <option value="Award">Award / Pricing</option>
                      <option value="Users">Users / Support</option>
                      <option value="Sparkles">Sparkles / Clean</option>
                      <option value="Navigation">Navigation / GPS</option>
                      <option value="Car">Car / Fleet</option>
                      <option value="MapPin">MapPin / Location</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Display Order Number</label>
                  <input
                    type="number"
                    min={1}
                    value={advOrder}
                    onChange={(e) => setAdvOrder(parseInt(e.target.value, 10))}
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter card description..."
                    value={advDescription}
                    onChange={(e) => setAdvDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAdvantageModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingAdvantage}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingAdvantage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Save as Draft</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tour Circuit Add/Edit Modal */}
      <AnimatePresence>
        {isCircuitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCircuitModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>{editingCircuit ? "Edit Tour Circuit" : "Add Tour Circuit"}</span>
                </h3>
                <button
                  onClick={() => setIsCircuitModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCircuit} className="p-6 space-y-4 text-slate-900 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Circuit Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Haridwar Ganga Aarti & Pilgrimage Special"
                      value={circTitle}
                      onChange={(e) => setCircTitle(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Display Order Number</label>
                    <input
                      type="number"
                      min={1}
                      value={circOrder}
                      onChange={(e) => setCircOrder(parseInt(e.target.value, 10))}
                      className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter tour circuit description..."
                    value={circDescription}
                    onChange={(e) => setCircDescription(e.target.value)}
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsCircuitModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingCircuit}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingCircuit ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
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
                  Delete Item?
                </h3>
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
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
