"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BookingFilterType = "All" | "Pending" | "Approved";

export interface BookingFiltersProps {
  activeFilter: BookingFilterType;
  onFilterChange: (filter: BookingFilterType) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters: BookingFilterType[] = ["All", "Pending", "Approved"];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 overflow-x-auto select-none">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer",
              isActive
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            )}
          >
            {filter === "All" ? "All Bookings" : `${filter} Bookings`}
          </button>
        );
      })}
    </div>
  );
};
