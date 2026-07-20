import React from "react";
import Link from "next/link";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  isCompact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, isCompact = false }) => {
  return (
    <Link
      href="/"
      aria-label="QuickWay Ride - Return to Homepage"
      className={cn(
        "inline-flex items-center gap-3 group focus-visible:outline-amber-500 rounded-lg transition-transform active:scale-95",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shadow-md group-hover:bg-slate-800 transition-colors shrink-0">
        <Car className="w-6 h-6 stroke-[2.2]" />
      </div>
      <div className="flex flex-col justify-center select-none">
        <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-amber-600 transition-colors">
          QuickWay<span className="text-amber-500">.</span>Ride
        </span>
        {!isCompact && (
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase leading-snug mt-0.5">
            Premium Taxi Services
          </span>
        )}
      </div>
    </Link>
  );
};
