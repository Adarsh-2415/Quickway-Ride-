"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ label, href, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-1.5 lg:px-2 xl:px-3 py-1.5 sm:py-2 rounded-lg text-xs lg:text-[13px] xl:text-sm font-semibold transition-all duration-200 focus-visible:outline-amber-500 select-none whitespace-nowrap shrink-0",
        isActive
          ? "text-amber-900 bg-amber-100/80 shadow-sm shadow-amber-200/50 font-bold"
          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-500 rounded-full" />
      )}
    </Link>
  );
};
