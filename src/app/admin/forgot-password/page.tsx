import React from "react";
import type { Metadata } from "next";
import { BrandingPanel } from "@/components/admin/auth/BrandingPanel";
import { ForgotPasswordCard } from "@/components/admin/auth/ForgotPasswordCard";

export const metadata: Metadata = {
  title: "Reset Password | QuickWay Ride CMS",
  description: "Reset administrator password for QuickWay Ride CMS portal.",
};

export default function AdminForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex bg-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
      {/* Left Column: Enterprise Branding Panel */}
      <BrandingPanel />

      {/* Right Column: Forgot Password Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 my-auto">
        <ForgotPasswordCard />
      </div>
    </div>
  );
}
