/**
 * Utility functions for currency formatting, distance math, and text formatting.
 */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKM(distanceKm: number): string {
  return `${distanceKm.toLocaleString("en-IN")} KM`;
}
