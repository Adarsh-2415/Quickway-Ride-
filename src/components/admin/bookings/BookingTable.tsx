"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  AlertCircle,
  Inbox,
  User,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { fetchBookingsAction, updateBookingStatusAction, BookingRecord } from "@/actions/bookings";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingSearch } from "./BookingSearch";
import { BookingFilters, BookingFilterType } from "./BookingFilters";
import { BookingDrawer } from "./BookingDrawer";

export const BookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Approving state map for smooth loading spinner per row
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // Search, Filter, Pagination, and Drawer States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<BookingFilterType>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 10;

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchBookingsAction();
      if (res.success) {
        setBookings(res.data || []);
      } else {
        setError(res.error || "Failed to load bookings.");
      }
    } catch (err: any) {
      console.error("Load bookings error:", err);
      setError("An unexpected error occurred while loading bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Admin Approve Action Handler
  const handleApproveBooking = async (bookingId: string) => {
    if (approvingId) return;
    setApprovingId(bookingId);

    try {
      const res = await updateBookingStatusAction(bookingId, "Approved");
      if (res.success) {
        // Update local state instantly
        setBookings((prev) =>
          prev.map((item) =>
            item.booking_id === bookingId || item.id === bookingId
              ? { ...item, status: "Approved" }
              : item
          )
        );
        toast.success(`Booking ${bookingId} Approved Successfully!`);
      } else {
        toast.error("Approval Failed", {
          description: res.error || "Could not update status.",
          style: { background: "#0f172a", color: "#ffffff", border: "1px solid #e11d48" },
          className: "text-white font-bold",
          descriptionClassName: "text-slate-200 font-medium text-xs pt-1 opacity-90",
        });
      }
    } catch (err) {
      console.error("Approve booking error:", err);
      toast.error("An unexpected error occurred.", {
        style: { background: "#0f172a", color: "#ffffff", border: "1px solid #e11d48" },
        className: "text-white font-bold",
        descriptionClassName: "text-slate-200 font-medium text-xs pt-1 opacity-90",
      });
    } finally {
      setApprovingId(null);
    }
  };

  // Filter Bookings by Search Query (Booking ID, Name, Phone) and Status Filter
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      // 1. Search Query Filter (Booking ID, Name, Phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = item.booking_id?.toLowerCase().includes(q);
        const matchesName = item.customer_name?.toLowerCase().includes(q);
        const matchesPhone = item.mobile_number?.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesPhone) return false;
      }

      // 2. Status Filter Tabs (All, Pending, Approved)
      if (activeFilter === "Pending") {
        return item.status !== "Approved";
      }
      if (activeFilter === "Approved") {
        return item.status === "Approved";
      }

      return true;
    });
  }, [bookings, searchQuery, activeFilter]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: BookingFilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const openDrawer = (booking: BookingRecord) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  // Format date helper for Pickup Schedule cell (e.g. 25 Jul 2026 • 10:30 AM)
  const formatSchedule = (dateStr: string, timeStr: string) => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const formattedDate = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return `${formattedDate} • ${timeStr}`;
      }
    } catch {
      // fallback
    }
    return `${dateStr} • ${timeStr}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* Top Banner, Search, and Status Filter Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Customer Bookings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Viewing {filteredBookings.length} booking records submitted via website
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BookingSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <button
              onClick={loadData}
              title="Refresh Bookings"
              aria-label="Refresh Bookings"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <BookingFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Main Table / Cards Display */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 overflow-hidden">
        {isLoading ? (
          /* Loading Skeletons */
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-slate-100/80 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Failed to Load Bookings
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
        ) : paginatedBookings.length === 0 ? (
          /* Empty State Illustration */
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                No Bookings Received Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                {searchQuery
                  ? "No booking records match your search criteria."
                  : "When website visitors submit taxi reservations through the Booking Form, they will appear here automatically."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Optimized Table View (10 Columns) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3.5 px-4 whitespace-nowrap">Booking ID</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Customer Name</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Phone</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Email</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Route</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Pickup Schedule</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">Passengers</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Vehicle</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">Status</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {paginatedBookings.map((row) => {
                    const isApproved = row.status === "Approved";
                    const isApproving = approvingId === row.booking_id;

                    return (
                      <tr
                        key={row.id || row.booking_id}
                        className="hover:bg-amber-500/5 transition-colors duration-150"
                      >
                        {/* 1. Booking ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                          <span className="px-2 py-1 rounded bg-amber-50 border border-amber-200/80 text-[11px]">
                            {row.booking_id}
                          </span>
                        </td>

                        {/* 2. Customer Name */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                          {row.customer_name}
                        </td>

                        {/* 3. Phone */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <a
                            href={`tel:${row.mobile_number}`}
                            className="hover:text-amber-600 font-semibold"
                          >
                            {row.mobile_number}
                          </a>
                        </td>

                        {/* 4. Email */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {row.email ? (
                            <a
                              href={`mailto:${row.email}`}
                              className="font-semibold text-slate-800 hover:text-amber-600 hover:underline transition-colors"
                              title={row.email}
                            >
                              {row.email}
                            </a>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        {/* 5. Route (Merged Pickup ➔ Dropoff) */}
                        <td className="py-3.5 px-4 max-w-[180px] truncate font-bold text-slate-900" title={`${row.pickup_location} ➔ ${row.dropoff_location}`}>
                          {row.pickup_location} <span className="text-amber-600 font-extrabold">➔</span> {row.dropoff_location}
                        </td>

                        {/* 6. Pickup Schedule (Merged Date • Time) */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-800 font-semibold">
                          {formatSchedule(row.pickup_date, row.pickup_time)}
                        </td>

                        {/* 7. Passengers */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-center font-bold">
                          {row.passengers || "1"}
                        </td>

                        {/* 8. Vehicle */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-800" title={row.vehicle_type}>
                          {row.vehicle_type}
                        </td>

                        {/* 9. Status Badge & Approve Action */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-center">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <BookingStatusBadge status={row.status} />
                            {!isApproved && (
                              <button
                                type="button"
                                disabled={isApproving}
                                onClick={() => handleApproveBooking(row.booking_id)}
                                className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                              >
                                {isApproving ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-3 h-3" />
                                )}
                                <span>Approve</span>
                              </button>
                            )}
                          </div>
                        </td>

                        {/* 10. Action Column (View Details) */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => openDrawer(row)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Responsive Cards View */}
            <div className="lg:hidden p-4 space-y-4">
              {paginatedBookings.map((row) => {
                const isApproved = row.status === "Approved";
                const isApproving = approvingId === row.booking_id;

                return (
                  <div
                    key={row.id || row.booking_id}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                      <span className="font-mono text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {row.booking_id}
                      </span>
                      <BookingStatusBadge status={row.status} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-bold text-sm text-slate-900">{row.customer_name}</span>
                      </div>
                      <a href={`tel:${row.mobile_number}`} className="text-xs font-bold text-amber-600">
                        {row.mobile_number}
                      </a>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-slate-200/80">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Route:</span>
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">
                          {row.pickup_location} ➔ {row.dropoff_location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Pickup Schedule:</span>
                        <span className="font-semibold text-slate-800">
                          {formatSchedule(row.pickup_date, row.pickup_time)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Vehicle:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                          {row.vehicle_type}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-end gap-2">
                      {!isApproved && (
                        <button
                          type="button"
                          disabled={isApproving}
                          onClick={() => handleApproveBooking(row.booking_id)}
                          className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                        >
                          {isApproving ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Approve</span>
                        </button>
                      )}

                      <button
                        onClick={() => openDrawer(row)}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div>
                Page {currentPage} of {totalPages} ({filteredBookings.length} total)
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

      {/* Slide-Over Details Drawer */}
      <BookingDrawer
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </motion.div>
  );
};
