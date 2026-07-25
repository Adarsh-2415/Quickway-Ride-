"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Inbox, RotateCw, ChevronLeft, ChevronRight, Mail, Phone, User, Tag, MessageSquare, AlertCircle } from "lucide-react";
import { fetchContactQueriesAction, ContactEnquiry } from "@/actions/contactQueriesActions";
import { cn } from "@/lib/utils";

export const ContactQueriesTable: React.FC = () => {
  const [data, setData] = useState<ContactEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Pagination States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchContactQueriesAction();
      if (res.success) {
        setData(res.data || []);
      } else {
        setError(res.error || "Failed to load contact enquiries.");
      }
    } catch (err: unknown) {
      console.error("Load enquiries error:", err);
      setError("An unexpected error occurred while loading contact enquiries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter items by Search Query (Name, Phone, Email)
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  // Paginated Slicing
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* Header Banner & Live Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Contact Queries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manage website contact submissions ({filteredData.length} total)
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search name, phone, email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 select-text"
          />
        </div>
      </div>

      {/* Main Table / Cards Content */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 overflow-hidden">
        {/* Loading Skeletons State */}
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-slate-100/80 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          /* Error State with Retry Button */
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Failed to Load Enquiries
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">{error}</p>
            </div>
            <button
              onClick={loadData}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs inline-flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Retry Request</span>
            </button>
          </div>
        ) : paginatedData.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                No Contact Enquiries Received Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery
                  ? "No enquiries match your search query."
                  : "When website visitors submit the Contact Form, their inquiries will appear here automatically."}
              </p>
            </div>
          </div>
        ) : (
          /* Real Data Views */
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-5">Name</th>
                    <th className="py-3.5 px-5">Phone</th>
                    <th className="py-3.5 px-5">Email</th>
                    <th className="py-3.5 px-5">Service Type</th>
                    <th className="py-3.5 px-5">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {paginatedData.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className="hover:bg-amber-500/5 transition-colors duration-150"
                    >
                      {/* 1. Name */}
                      <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-700 font-bold flex items-center justify-center text-xs shrink-0">
                            {row.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{row.name}</span>
                        </div>
                      </td>

                      {/* 2. Phone */}
                      <td className="py-4 px-5 whitespace-nowrap text-slate-800 font-semibold">
                        <a
                          href={`tel:${row.phone}`}
                          className="hover:text-amber-600 hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{row.phone}</span>
                        </a>
                      </td>

                      {/* 3. Email */}
                      <td className="py-4 px-5 whitespace-nowrap text-slate-700">
                        <a
                          href={`mailto:${row.email}`}
                          className="hover:text-amber-600 hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{row.email}</span>
                        </a>
                      </td>

                      {/* 4. Service Type */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-bold">
                          {row.service_type || "Taxi Service"}
                        </span>
                      </td>

                      {/* 5. Message */}
                      <td className="py-4 px-5 max-w-xs text-slate-600 leading-relaxed truncate select-text" title={row.message}>
                        {row.message || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Responsive Cards View */}
            <div className="lg:hidden p-4 space-y-4">
              {paginatedData.map((row, idx) => (
                <div
                  key={row.id || idx}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-bold text-sm text-slate-900">{row.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {row.service_type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <a href={`tel:${row.phone}`} className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{row.phone}</span>
                    </a>
                    <a href={`mailto:${row.email}`} className="flex items-center gap-2 text-slate-600 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{row.email}</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600 leading-normal">
                    <span className="font-bold text-slate-700 block mb-0.5">Message:</span>
                    <p className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-slate-700 select-text">
                      {row.message || "No message provided."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Pagination Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div>
                Page {currentPage} of {totalPages} ({filteredData.length} records)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
