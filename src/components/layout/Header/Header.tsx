"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Car } from "lucide-react";
import { TopBar } from "./TopBar";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { CTAButtons } from "./CTAButtons";
import { MobileDrawer } from "./MobileDrawer";
import { Container } from "../Container";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Scroll listener to activate elevated shadow state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Information Bar */}
      <TopBar />

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "w-full bg-white transition-all duration-300 border-b border-slate-200/60",
          isScrolled ? "shadow-md bg-white/95 backdrop-blur-md border-slate-200" : "shadow-none"
        )}
      >
        <Container className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-4 sm:gap-6">
          {/* Left Block: Logo + Navigation Links */}
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-6 min-w-0">
            <Logo />
            <div className="hidden lg:flex items-center min-w-0">
              <Navigation />
            </div>
          </div>

          {/* Right Action Area: CTAs */}
          <div className="hidden sm:flex items-center shrink-0 ml-auto">
            <CTAButtons />
          </div>

          {/* Mobile Actions: Compact Book & Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/book" className="sm:hidden">
              <button
                aria-label="Book a cab"
                className="h-9 px-3 bg-amber-500 text-slate-900 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <Car className="w-3.5 h-3.5 stroke-[2.5]" />
                Book
              </button>
            </Link>

            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileDrawerOpen}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-amber-500 active:scale-95"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Slide-in Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </header>
  );
};
