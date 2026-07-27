"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  House,
  Info,
  Briefcase,
  Car,
  BadgeIndianRupee,
  Compass,
  Images,
} from "lucide-react";
import { PageCard } from "./PageCard";

const PAGES = [
  {
    title: "Home",
    description: "Manage homepage content and sections.",
    icon: House,
    href: "/admin/dashboard/manage-pages/home",
  },
  {
    title: "About Us",
    description: "Manage company information and brand story.",
    icon: Info,
    href: "/admin/dashboard/manage-pages/about",
  },
  {
    title: "Services",
    description: "Manage all service content and descriptions.",
    icon: Briefcase,
    href: "/admin/dashboard/manage-pages/services",
  },
  {
    title: "Fleet",
    description: "Manage fleet page content.",
    icon: Car,
    href: "/admin/dashboard/manage-pages/fleet",
  },
  {
    title: "Pricing",
    description: "Manage pricing page content.",
    icon: BadgeIndianRupee,
    href: "/admin/dashboard/manage-pages/pricing",
  },
  {
    title: "Tour Packages",
    description: "Manage tour package content.",
    icon: Compass,
    href: "/admin/dashboard/manage-pages/tour-packages",
  },
  {
    title: "Gallery",
    description: "Manage gallery content.",
    icon: Images,
    href: "/admin/dashboard/manage-pages/gallery",
  },
];

export const ManagePagesGrid: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80">
        <h2 className="font-heading text-xl font-extrabold text-slate-900 tracking-tight">
          Website Pages Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Currently displaying {PAGES.length} editable public pages for QuickWay Ride
        </p>
      </div>

      {/* Page Cards Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAGES.map((page) => (
          <PageCard
            key={page.title}
            title={page.title}
            description={page.description}
            icon={page.icon}
            href={page.href}
          />
        ))}
      </div>
    </motion.div>
  );
};
