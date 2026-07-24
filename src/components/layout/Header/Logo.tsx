import React from "react";
import Link from "next/link";
import Image from "next/image";
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
        "inline-flex items-center group focus-visible:outline-amber-500 rounded-lg transition-transform active:scale-95 shrink-0",
        className
      )}
    >
      <Image
        src="/images/quickway-ride-logo.png"
        alt="QuickWay Ride Logo"
        width={isCompact ? 160 : 220}
        height={isCompact ? 48 : 66}
        className={cn(
          "object-contain w-auto shrink-0",
          isCompact ? "h-[36px] sm:h-[40px]" : "h-[38px] sm:h-[42px] lg:h-[46px] xl:h-[52px]"
        )}
        priority
      />
    </Link>
  );
};
