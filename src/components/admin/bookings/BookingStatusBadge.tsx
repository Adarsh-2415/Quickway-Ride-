"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BookingStatusBadgeProps {
  status?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status = "Pending",
}) => {
  const isApproved = status === "Approved";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide border select-none shadow-xs",
        isApproved
          ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/20"
          : "bg-amber-100 text-amber-900 border-amber-300"
      )}
    >
      {isApproved ? "Approved" : "Pending"}
    </span>
  );
};
