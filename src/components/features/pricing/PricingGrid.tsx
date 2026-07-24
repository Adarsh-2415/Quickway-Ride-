"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight, LayoutGrid, Table, Car, Sparkles } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { ONEWAY_RATE_LIST, OnewayRateItem } from "@/constants/pricingData";
import { cn } from "@/lib/utils";

export const PricingGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredRates = ONEWAY_RATE_LIST.filter((item) =>
    item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-md">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search destination (e.g. Delhi, Airport, Rishikesh, Chandigarh...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-2 focus:outline-amber-500 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0 self-center">
          <button
            onClick={() => setViewMode("cards")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer",
              viewMode === "cards"
                ? "bg-slate-900 text-amber-400 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards View</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer",
              viewMode === "table"
                ? "bg-slate-900 text-amber-400 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>Showing {filteredRates.length} of 36 Destinations</span>
        <span className="text-amber-700">Origin: Dehradun (One-Way)</span>
      </div>

      {/* View Mode 1: Grid Cards View */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRates.map((item) => (
              <motion.div
                key={item.srNo}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  variant="standard"
                  isHoverable
                  className={cn(
                    "p-5 space-y-4 border border-slate-200 hover:border-amber-500/60 flex flex-col justify-between h-full bg-white rounded-2xl relative overflow-hidden",
                    item.destination === "Jollygrant Airport" && "border-amber-500 bg-amber-50/20"
                  )}
                >
                  {item.destination === "Jollygrant Airport" && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 fill-slate-950" /> Special Offer
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Route Header */}
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase block leading-none">
                          {item.origin} ➔ Destination
                        </span>
                        <h3 className="font-heading font-extrabold text-lg text-slate-900 mt-0.5">
                          {item.destination}
                        </h3>
                      </div>
                    </div>

                    {/* 3 Car Rate Cards */}
                    <div className="space-y-2 pt-1">
                      {/* Sedan Rate */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-xs font-bold text-slate-800">Sedan (Dzire / Etios)</span>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{item.sedanRate.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Ertiga Rate */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-xs font-bold text-slate-800">Ertiga (6+1 SUV)</span>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{item.ertigaRate.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Innova Rate */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-amber-700" />
                          <span className="text-xs font-bold text-slate-800">Innova (Crysta)</span>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{item.innovaRate.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <div className="pt-2">
                    <Link
                      href={`/book?origin=${encodeURIComponent(item.origin)}&destination=${encodeURIComponent(item.destination)}`}
                      className="w-full block"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full justify-center font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-sm"
                        iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Book {item.destination} Cab
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* View Mode 2: Detailed Table View */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-md bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-900 text-amber-400 text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                <th className="p-4 w-16">Sr No.</th>
                <th className="p-4">Origin</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Sedan (₹)</th>
                <th className="p-4">Ertiga (₹)</th>
                <th className="p-4">Innova (₹)</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-800">
              {filteredRates.map((item) => (
                <tr
                  key={item.srNo}
                  className={cn(
                    "hover:bg-amber-50/50 transition-colors",
                    item.destination === "Jollygrant Airport" && "bg-amber-50/30 font-bold"
                  )}
                >
                  <td className="p-4 text-slate-400 font-bold">{item.srNo}</td>
                  <td className="p-4 font-semibold text-slate-700">{item.origin}</td>
                  <td className="p-4 font-extrabold text-slate-900">
                    {item.destination}
                    {item.destination === "Jollygrant Airport" && (
                      <span className="ml-2 px-2 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-bold rounded-full">
                        ₹999 Deal
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-slate-900">₹{item.sedanRate.toLocaleString("en-IN")}</td>
                  <td className="p-4 font-bold text-slate-900">₹{item.ertigaRate.toLocaleString("en-IN")}</td>
                  <td className="p-4 font-bold text-slate-900">₹{item.innovaRate.toLocaleString("en-IN")}</td>
                  <td className="p-4 text-center">
                    <Link
                      href={`/book?origin=${encodeURIComponent(item.origin)}&destination=${encodeURIComponent(item.destination)}`}
                    >
                      <button className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs transition-colors shadow-sm inline-flex items-center gap-1">
                        Book <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
