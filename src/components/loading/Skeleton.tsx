import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => (
  <div
    className={cn("animate-pulse bg-slate-200/80 rounded-md", className)}
    {...props}
  />
);

export const SkeletonCard: React.FC = () => (
  <div className="p-6 border border-slate-200 rounded-xl space-y-4 bg-white">
    <Skeleton className="h-40 w-full rounded-lg" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex items-center justify-between pt-2">
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  </div>
);

export const SkeletonButton: React.FC = () => (
  <Skeleton className="h-11 w-32 rounded-lg" />
);

export const SkeletonInput: React.FC = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-11 w-full rounded-lg" />
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="space-y-3 w-full">
    <Skeleton className="h-10 w-full rounded-lg" />
    <Skeleton className="h-12 w-full rounded-md" />
    <Skeleton className="h-12 w-full rounded-md" />
    <Skeleton className="h-12 w-full rounded-md" />
  </div>
);
