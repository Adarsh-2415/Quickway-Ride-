import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-slate-500", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-amber-500 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {item.href && idx < items.length - 1 ? (
              <Link href={item.href} className="hover:text-amber-500 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export interface FeatureListProps {
  items: string[];
  icon?: React.ReactNode;
  className?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  items,
  icon,
  className,
}) => {
  return (
    <ul className={cn("space-y-2 text-sm text-slate-700", className)}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start space-x-2.5">
          <span className="text-amber-500 shrink-0 mt-0.5">{icon || "✓"}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
