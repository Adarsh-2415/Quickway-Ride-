import React from "react";
import { cn } from "@/lib/utils";
import { Car, PackageSearch, SearchX, AlertTriangle, WifiOff, FileX } from "lucide-react";
import { Button } from "../buttons/Button";

export interface EmptyStateProps {
  type?: "no-data" | "no-vehicles" | "no-packages" | "no-search" | "error" | "offline";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = "no-data",
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const iconMap = {
    "no-data": <FileX className="w-10 h-10 text-slate-400" />,
    "no-vehicles": <Car className="w-10 h-10 text-amber-500" />,
    "no-packages": <PackageSearch className="w-10 h-10 text-amber-500" />,
    "no-search": <SearchX className="w-10 h-10 text-slate-400" />,
    error: <AlertTriangle className="w-10 h-10 text-red-500" />,
    offline: <WifiOff className="w-10 h-10 text-slate-400" />,
  };

  const defaultTitles = {
    "no-data": "No Information Available",
    "no-vehicles": "No Cabs Found",
    "no-packages": "No Tour Packages Found",
    "no-search": "No Matching Results",
    error: "Something Went Wrong",
    offline: "You Are Offline",
  };

  const defaultDescriptions = {
    "no-data": "There are no records to display at this moment.",
    "no-vehicles": "No vehicles available matching your current filter criteria.",
    "no-packages": "We couldn't find any tour packages matching your filter selection.",
    "no-search": "Try adjusting your search terms or clearing selected filters.",
    error: "An unexpected system error occurred. Please try again.",
    offline: "Please check your internet connection and retry.",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 space-y-4 my-6",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
        {iconMap[type]}
      </div>
      <div className="max-w-md space-y-1.5">
        <h3 className="font-heading font-bold text-lg text-slate-900">
          {title || defaultTitles[type]}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description || defaultDescriptions[type]}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
