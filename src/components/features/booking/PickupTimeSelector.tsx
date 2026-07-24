"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PickupTimeSelectorProps {
  value: string; // 24-hr format "HH:mm" e.g., "14:30"
  onChange: (val: string) => void;
  error?: string;
}

const HOURS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const MINUTES = ["00", "15", "30", "45"];

// Convert 24hr string "18:30" or "ASAP" to 12hr display object
function parseTime(val: string) {
  if (!val || val === "ASAP") {
    return { hour: "09", minute: "00", period: "AM", isAsap: val === "ASAP" };
  }
  const [hStr, mStr] = val.split(":");
  let h = parseInt(hStr, 10);
  if (isNaN(h)) h = 9;
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const hourFormatted = h < 10 ? `0${h}` : `${h}`;
  const minuteFormatted = MINUTES.includes(mStr) ? mStr : "00";
  return { hour: hourFormatted, minute: minuteFormatted, period, isAsap: false };
}

// Convert 12hr parts back to 24hr string "HH:mm"
function format24Hour(hourStr: string, minuteStr: string, periodStr: string): string {
  let h = parseInt(hourStr, 10);
  if (periodStr === "PM" && h < 12) h += 12;
  if (periodStr === "AM" && h === 12) h = 0;
  const hFormatted = h < 10 ? `0${h}` : `${h}`;
  return `${hFormatted}:${minuteStr}`;
}

export function PickupTimeSelector({ value, onChange, error }: PickupTimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const parsed = parseTime(value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectHour = (h: string) => {
    const time24 = format24Hour(h, parsed.minute, parsed.period);
    onChange(time24);
  };

  const handleSelectMinute = (m: string) => {
    const time24 = format24Hour(parsed.hour, m, parsed.period);
    onChange(time24);
  };

  const handleSelectPeriod = (p: "AM" | "PM") => {
    const time24 = format24Hour(parsed.hour, parsed.minute, p);
    onChange(time24);
  };

  // Formatted display string for input button
  const displayLabel =
    value === "ASAP"
      ? "⚡ ASAP (Immediate Pickup)"
      : value
      ? `${parsed.hour}:${parsed.minute} ${parsed.period}`
      : "Select Pickup Time";

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label htmlFor="pickup-time-input" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-500" /> Pickup Time <span className="text-red-500">*</span>
        </span>
        {value && value !== "ASAP" && (
          <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            {parsed.hour}:{parsed.minute} {parsed.period}
          </span>
        )}
      </label>

      {/* Main Time Selector Trigger Button */}
      <div className="relative">
        <button
          id="pickup-time-input"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-12 px-4 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all bg-white shadow-xs cursor-pointer",
            isOpen
              ? "border-amber-500 ring-2 ring-amber-500/20"
              : error
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 hover:border-slate-400"
          )}
        >
          <div className="flex items-center gap-2.5 text-slate-900">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">{displayLabel}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-xs text-slate-400 font-normal hidden sm:inline">Change</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
          </div>
        </button>

        {/* Custom 12-Hour AM/PM Grid Dropdown */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-[100] w-full min-w-[280px] sm:w-[320px] bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header with AM/PM Segmented Switch */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Hour & Minute</span>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSelectPeriod(p)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      parsed.period === p && !parsed.isAsap
                        ? "bg-amber-400 text-slate-950 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Grid */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Hour</span>
              <div className="grid grid-cols-6 gap-1.5">
                {HOURS.map((h) => {
                  const isSelected = parsed.hour === h && !parsed.isAsap;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelectHour(h)}
                      className={cn(
                        "py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                        isSelected
                          ? "bg-slate-950 text-amber-400 border-slate-950 shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Grid */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Minute</span>
              <div className="grid grid-cols-4 gap-2">
                {MINUTES.map((m) => {
                  const isSelected = parsed.minute === m && !parsed.isAsap;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelectMinute(m)}
                      className={cn(
                        "py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-1",
                        isSelected
                          ? "bg-amber-400 text-slate-950 border-amber-500 font-extrabold shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      <span>:{m}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Done Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Set Pickup Time ({parsed.hour}:{parsed.minute} {parsed.period})
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-semibold text-red-500 mt-1">{error}</p>}
    </div>
  );
}
