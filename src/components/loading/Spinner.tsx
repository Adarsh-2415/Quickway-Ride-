import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const LoadingSpinner: React.FC<SpinnerProps> = ({ size = "md", className }) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <Loader2 className={cn("animate-spin text-amber-500 shrink-0", sizeMap[size], className)} />
  );
};

export const PageLoader: React.FC<{ label?: string }> = ({ label = "Loading QuickWay Ride..." }) => (
  <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 text-white">
    <LoadingSpinner size="xl" />
    <p className="text-sm font-medium tracking-wide text-slate-300 font-heading">
      {label}
    </p>
  </div>
);
