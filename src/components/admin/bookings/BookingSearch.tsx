"use client";

import React from "react";
import { Search, X } from "lucide-react";

export interface BookingSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const BookingSearch: React.FC<BookingSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full sm:w-80">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Booking ID, Name, Phone..."
        className="w-full pl-10 pr-9 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 select-text"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
