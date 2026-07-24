"use client";

import React from "react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { NavItem } from "./NavItem";
import { cn } from "@/lib/utils";

export interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ className, onItemClick }) => {
  return (
    <nav
      aria-label="Main Navigation"
      className={cn("flex items-center gap-0.5 lg:gap-1 xl:gap-2.5", className)}
    >
      {SITE_CONFIG.navLinks.map((link) => (
        <NavItem
          key={link.href}
          label={link.label}
          href={link.href}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
};
