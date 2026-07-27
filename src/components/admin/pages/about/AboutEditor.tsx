"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  CheckCircle2,
  RotateCw,
  Loader2,
  FileText,
  Plus,
  Trash2,
  Info,
  Building2,
  Target,
  Compass,
  MapPin,
  Car,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Navigation,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchAboutPageContentAction,
  saveAboutPageContentAction,
  publishAboutChangesAction,
  AboutPageContentRecord,
  AboutStatItem,
  AboutAdvantageItem,
} from "@/actions/about";

const DEFAULT_STATS: AboutStatItem[] = [
  { label: "Year Established", value: "2024", subtext: "1+ Years of Excellence", icon: "Calendar" },
  { label: "Fleet Vehicles", value: "6+", subtext: "Sedans, SUVs & Tempo Travellers", icon: "Car" },
  { label: "Cities & Hubs Served", value: "26+", subtext: "Uttarakhand, HP, Punjab, NCR & UP", icon: "MapPin" },
  { label: "Customer Satisfaction", value: "4.9 / 5", subtext: "2,500+ Journeys Completed", icon: "Star" },
];

const DEFAULT_ADVANTAGES: AboutAdvantageItem[] = [
  {
    id: "a1",
    title: "100% Background Verified Drivers",
    description: "Every regional driver undergoes strict identity verification, background screening, and local route testing.",
    icon_name: "ShieldCheck",
  },
  {
    id: "a2",
    title: "Guaranteed On-Time Pickups",
    description: "Never miss an early flight at Jolly Grant or Delhi Airport with our 100% punctual pickup commitment.",
    icon_name: "Clock",
  },
  {
    id: "a3",
    title: "Zero Surge Pricing",
    description: "Transparent rate card per kilometer. What you see is what you pay—no unexpected peak night surcharges.",
    icon_name: "Award",
  },
  {
    id: "a4",
    title: "Clean & Sanitized Fleet",
    description: "All vehicles are thoroughly sanitized before every pickup, ensuring fresh air conditioning and immaculate interiors.",
    icon_name: "Sparkles",
  },
  {
    id: "a5",
    title: "GPS Live Route Tracking",
    description: "Real-time GPS tracking enabled in every vehicle for complete route transparency and safety monitoring.",
    icon_name: "Navigation",
  },
  {
    id: "a6",
    title: "Dedicated Support Desk",
    description: "Our customer care operations team in Roorkee & Dehradun is available around the clock to assist your journey.",
    icon_name: "Users",
  },
];

export const AboutEditor: React.FC = () => {
  const [pageContent, setPageContent] = useState<AboutPageContentRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form State - Hero Section
  const [heroBadge, setHeroBadge] = useState<string>("");
  const [heroTitle, setHeroTitle] = useState<string>("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState<string>("");
  const [heroSubtitle, setHeroSubtitle] = useState<string>("");

  // Form State - Metrics Bar
  const [statsList, setStatsList] = useState<AboutStatItem[]>(DEFAULT_STATS);

  // Form State - Brand Story
  const [storyBadge, setStoryBadge] = useState<string>("");
  const [storyHeading, setStoryHeading] = useState<string>("");
  const [storyP1, setStoryP1] = useState<string>("");
  const [storyP2, setStoryP2] = useState<string>("");
  const [storyHighlightText, setStoryHighlightText] = useState<string>("");

  // Form State - Mission & Vision
  const [missionTitle, setMissionTitle] = useState<string>("");
  const [missionText, setMissionText] = useState<string>("");
  const [visionTitle, setVisionTitle] = useState<string>("");
  const [visionText, setVisionText] = useState<string>("");

  // Form State - Section Headings
  const [fleetBadge, setFleetBadge] = useState<string>("");
  const [fleetHeading, setFleetHeading] = useState<string>("");
  const [fleetSubtext, setFleetSubtext] = useState<string>("");

  const [citiesBadge, setCitiesBadge] = useState<string>("");
  const [citiesHeading, setCitiesHeading] = useState<string>("");
  const [citiesSubtext, setCitiesSubtext] = useState<string>("");

  // Form State - Advantages
  const [advantagesBadge, setAdvantagesBadge] = useState<string>("");
  const [advantagesHeading, setAdvantagesHeading] = useState<string>("");
  const [advantagesSubtext, setAdvantagesSubtext] = useState<string>("");
  const [advantagesList, setAdvantagesList] = useState<AboutAdvantageItem[]>(DEFAULT_ADVANTAGES);

  // Form State - CTA Banner
  const [ctaBadge, setCtaBadge] = useState<string>("");
  const [ctaHeading, setCtaHeading] = useState<string>("");
  const [ctaSubtext, setCtaSubtext] = useState<string>("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAboutPageContentAction("admin");
      if (res.success && res.data) {
        const c = res.data;
        setPageContent(c);

        setHeroBadge(c.hero_badge || "Established 2024 • QuickWay Ride Services");
        setHeroTitle(c.hero_title || "Redefining Travel Across");
        setHeroTitleHighlight(c.hero_title_highlight || "Uttarakhand & North India.");
        setHeroSubtitle(c.hero_subtitle || "");

        if (Array.isArray(c.stats_list) && c.stats_list.length > 0) {
          setStatsList(c.stats_list);
        } else {
          setStatsList(DEFAULT_STATS);
        }

        setStoryBadge(c.story_badge || "Brand Story");
        setStoryHeading(c.story_heading || "Connecting Cities, Empowering Journeys Since 2024");
        setStoryP1(c.story_p1 || "");
        setStoryP2(c.story_p2 || "");
        setStoryHighlightText(c.story_highlight_text || "100% Background Verified Regional Drivers");

        setMissionTitle(c.mission_title || "Our Mission");
        setMissionText(c.mission_text || "");
        setVisionTitle(c.vision_title || "Our Vision");
        setVisionText(c.vision_text || "");

        setFleetBadge(c.fleet_badge || "Verified Fleet Roster");
        setFleetHeading(c.fleet_heading || "Our 4+ Premium Fleet Vehicles");
        setFleetSubtext(c.fleet_subtext || "");

        setCitiesBadge(c.cities_badge || "Regional Coverage Network");
        setCitiesHeading(c.cities_heading || "Serving 26+ Key Cities & Transit Hubs");
        setCitiesSubtext(c.cities_subtext || "");

        setAdvantagesBadge(c.advantages_badge || "The QuickWay Advantage");
        setAdvantagesHeading(c.advantages_heading || "Why Travelers Choose QuickWay Ride");
        setAdvantagesSubtext(c.advantages_subtext || "");
        if (Array.isArray(c.advantages_list) && c.advantages_list.length > 0) {
          setAdvantagesList(c.advantages_list);
        } else {
          setAdvantagesList(DEFAULT_ADVANTAGES);
        }

        setCtaBadge(c.cta_badge || "Ready to Travel?");
        setCtaHeading(c.cta_heading || "Book Your Next Journey with QuickWay Ride Today");
        setCtaSubtext(c.cta_subtext || "");
      }
    } catch (err) {
      console.error("Load About page error:", err);
      toast.error("Failed to load About page text.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalDraftCount = pageContent?.status === "draft" ? 1 : 0;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("hero_badge", heroBadge);
    formData.append("hero_title", heroTitle);
    formData.append("hero_title_highlight", heroTitleHighlight);
    formData.append("hero_subtitle", heroSubtitle);
    formData.append("stats_list", JSON.stringify(statsList));

    formData.append("story_badge", storyBadge);
    formData.append("story_heading", storyHeading);
    formData.append("story_p1", storyP1);
    formData.append("story_p2", storyP2);
    formData.append("story_highlight_text", storyHighlightText);

    formData.append("mission_title", missionTitle);
    formData.append("mission_text", missionText);
    formData.append("vision_title", visionTitle);
    formData.append("vision_text", visionText);

    formData.append("fleet_badge", fleetBadge);
    formData.append("fleet_heading", fleetHeading);
    formData.append("fleet_subtext", fleetSubtext);

    formData.append("cities_badge", citiesBadge);
    formData.append("cities_heading", citiesHeading);
    formData.append("cities_subtext", citiesSubtext);

    formData.append("advantages_badge", advantagesBadge);
    formData.append("advantages_heading", advantagesHeading);
    formData.append("advantages_subtext", advantagesSubtext);
    formData.append("advantages_list", JSON.stringify(advantagesList));

    formData.append("cta_badge", ctaBadge);
    formData.append("cta_heading", ctaHeading);
    formData.append("cta_subtext", ctaSubtext);

    try {
      const res = await saveAboutPageContentAction(formData);
      if (res.success) {
        toast.success("About Us Page Text Saved as Draft!", {
          description: "Click 'Publish Changes' when ready to make it live.",
        });
        loadData();
      } else {
        toast.error("Save Failed", { description: res.error });
      }
    } catch (err) {
      console.error("Save About page error:", err);
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (totalDraftCount === 0) {
      toast.info("No Draft Changes to Publish", {
        description: "All About Us text content is already published live.",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishAboutChangesAction();
      if (res.success) {
        toast.success("Published About Us Page Text Live!", {
          description: "The public About Us page has been updated instantly.",
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

  const handleUpdateStat = (index: number, field: keyof AboutStatItem, val: string) => {
    setStatsList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleAddAdvantage = () => {
    const newItem: AboutAdvantageItem = {
      id: `adv_${Date.now()}`,
      title: "New Advantage",
      description: "Enter detailed advantage description...",
      icon_name: "ShieldCheck",
    };
    setAdvantagesList((prev) => [...prev, newItem]);
  };

  const handleUpdateAdvantage = (
    index: number,
    field: keyof AboutAdvantageItem,
    val: string
  ) => {
    setAdvantagesList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleDeleteAdvantage = (index: number) => {
    setAdvantagesList((prev) => prev.filter((_, idx) => idx !== index));
    toast.success("Advantage Card Removed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
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
            <span>About Us Management</span>
            {totalDraftCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold">
                1 Draft Pending
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage company information, brand story, mission & vision text content shown on the public website.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          <button
            onClick={loadData}
            title="Refresh Data"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <Link
            href="/about/preview"
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

      {/* Main Content Form */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading About Us Page Content...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Hero Header */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>1. Hero Section Text</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Hero Badge Tag</label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                placeholder="Established 2024 • QuickWay Ride Services"
                className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Hero Main Heading</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Redefining Travel Across"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Heading Gold Highlight</label>
                <input
                  type="text"
                  value={heroTitleHighlight}
                  onChange={(e) => setHeroTitleHighlight(e.target.value)}
                  placeholder="Uttarakhand & North India."
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
                placeholder="Hero section paragraph description..."
                className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Section 2: Key Metrics Bar */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-amber-600" />
              <span>2. Key Metrics Bar (4 Stats)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsList.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-[10px] font-extrabold text-amber-700 uppercase block">
                    Stat Card #{idx + 1}: {stat.label}
                  </span>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Display Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                      className="w-full h-9 px-2 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Subtext Label</label>
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => handleUpdateStat(idx, "subtext", e.target.value)}
                      className="w-full h-9 px-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Company Story */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Info className="w-5 h-5 text-amber-600" />
              <span>3. Company Story Section</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Section Badge Tag</label>
                <input
                  type="text"
                  value={storyBadge}
                  onChange={(e) => setStoryBadge(e.target.value)}
                  placeholder="Brand Story"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Section Main Heading</label>
                <input
                  type="text"
                  value={storyHeading}
                  onChange={(e) => setStoryHeading(e.target.value)}
                  placeholder="Connecting Cities, Empowering Journeys Since 2024"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Story Paragraph 1</label>
              <textarea
                rows={3}
                value={storyP1}
                onChange={(e) => setStoryP1(e.target.value)}
                placeholder="First paragraph of company story..."
                className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Story Paragraph 2</label>
              <textarea
                rows={3}
                value={storyP2}
                onChange={(e) => setStoryP2(e.target.value)}
                placeholder="Second paragraph of company story..."
                className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Driver Verification Label</label>
              <input
                type="text"
                value={storyHighlightText}
                onChange={(e) => setStoryHighlightText(e.target.value)}
                placeholder="100% Background Verified Regional Drivers"
                className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Section 4: Mission & Vision */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Target className="w-5 h-5 text-amber-600" />
              <span>4. Mission & Vision Statements</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mission Card Title</label>
                  <input
                    type="text"
                    value={missionTitle}
                    onChange={(e) => setMissionTitle(e.target.value)}
                    placeholder="Our Mission"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mission Description</label>
                  <textarea
                    rows={4}
                    value={missionText}
                    onChange={(e) => setMissionText(e.target.value)}
                    placeholder="Mission statement..."
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-blue-50/50 border border-blue-200">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Vision Card Title</label>
                  <input
                    type="text"
                    value={visionTitle}
                    onChange={(e) => setVisionTitle(e.target.value)}
                    placeholder="Our Vision"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Vision Description</label>
                  <textarea
                    rows={4}
                    value={visionText}
                    onChange={(e) => setVisionText(e.target.value)}
                    placeholder="Vision statement..."
                    className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Section Headings */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-6">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>5. Section Headings (Fleet Roster & Coverage Network)</span>
            </h3>

            {/* Fleet Roster Headings */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-extrabold text-amber-700 uppercase">Fleet Roster Headings</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Badge Tag</label>
                  <input
                    type="text"
                    value={fleetBadge}
                    onChange={(e) => setFleetBadge(e.target.value)}
                    placeholder="Verified Fleet Roster"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Main Heading</label>
                  <input
                    type="text"
                    value={fleetHeading}
                    onChange={(e) => setFleetHeading(e.target.value)}
                    placeholder="Our 4+ Premium Fleet Vehicles"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase">Subtext Paragraph</label>
                <input
                  type="text"
                  value={fleetSubtext}
                  onChange={(e) => setFleetSubtext(e.target.value)}
                  placeholder="Every vehicle in our fleet is maintained to executive standards..."
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>

            {/* Coverage Network Headings */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-extrabold text-amber-700 uppercase">Coverage Network Headings</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Badge Tag</label>
                  <input
                    type="text"
                    value={citiesBadge}
                    onChange={(e) => setCitiesBadge(e.target.value)}
                    placeholder="Regional Coverage Network"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase">Main Heading</label>
                  <input
                    type="text"
                    value={citiesHeading}
                    onChange={(e) => setCitiesHeading(e.target.value)}
                    placeholder="Serving 26+ Key Cities & Transit Hubs"
                    className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase">Subtext Paragraph</label>
                <input
                  type="text"
                  value={citiesSubtext}
                  onChange={(e) => setCitiesSubtext(e.target.value)}
                  placeholder="Pickups & drop-offs across Uttarakhand, Himachal Pradesh..."
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Why Choose Us Advantages Cards */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span>6. The QuickWay Advantage Cards</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Edit, add, or delete advantage cards shown on the About Us page.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddAdvantage}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Section Badge</label>
                <input
                  type="text"
                  value={advantagesBadge}
                  onChange={(e) => setAdvantagesBadge(e.target.value)}
                  placeholder="The QuickWay Advantage"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Main Heading</label>
                <input
                  type="text"
                  value={advantagesHeading}
                  onChange={(e) => setAdvantagesHeading(e.target.value)}
                  placeholder="Why Travelers Choose QuickWay Ride"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Section Subtext</label>
              <input
                type="text"
                value={advantagesSubtext}
                onChange={(e) => setAdvantagesSubtext(e.target.value)}
                placeholder="Engineered around reliability, punctuality..."
                className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {advantagesList.map((card, idx) => (
                <div key={card.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-extrabold text-amber-700 uppercase">
                      Advantage Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteAdvantage(idx)}
                      className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                      title="Delete card"
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
                        onChange={(e) => handleUpdateAdvantage(idx, "title", e.target.value)}
                        className="w-full h-9 px-3 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Icon Symbol</label>
                      <select
                        value={card.icon_name || "ShieldCheck"}
                        onChange={(e) => handleUpdateAdvantage(idx, "icon_name", e.target.value)}
                        className="w-full h-9 px-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="ShieldCheck">ShieldCheck</option>
                        <option value="Clock">Clock</option>
                        <option value="Award">Award</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Navigation">Navigation</option>
                        <option value="Users">Users</option>
                        <option value="Car">Car</option>
                        <option value="MapPin">MapPin</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700 uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => handleUpdateAdvantage(idx, "description", e.target.value)}
                      className="w-full p-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: CTA Banner */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>7. Conversion CTA Banner</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">CTA Badge Tag</label>
                <input
                  type="text"
                  value={ctaBadge}
                  onChange={(e) => setCtaBadge(e.target.value)}
                  placeholder="Ready to Travel?"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">CTA Main Heading</label>
                <input
                  type="text"
                  value={ctaHeading}
                  onChange={(e) => setCtaHeading(e.target.value)}
                  placeholder="Book Your Next Journey with QuickWay Ride Today"
                  className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">CTA Subtitle Paragraph</label>
              <textarea
                rows={2}
                value={ctaSubtext}
                onChange={(e) => setCtaSubtext(e.target.value)}
                placeholder="Experience seamless outstation cabs..."
                className="w-full p-3 text-xs font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Bottom Save Action Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-end gap-3 sticky bottom-4 z-20 shadow-lg">
            <button
              type="button"
              onClick={loadData}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              <span>Save as Draft</span>
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};
