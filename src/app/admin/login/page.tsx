import React from "react";
import type { Metadata } from "next";
import { BrandingPanel } from "@/components/admin/auth/BrandingPanel";
import { LoginCard } from "@/components/admin/auth/LoginCard";

export const metadata: Metadata = {
  title: "Administrator Login | QuickWay Ride CMS",
  description: "Secure CMS Authentication Portal for authorized QuickWay Ride administrators.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
      {/* Left Column: Enterprise Branding Panel */}
      <BrandingPanel />

      {/* Right Column: Interactive Login Card Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 my-auto">
        <LoginCard />
      </div>
    </div>
  );
}
