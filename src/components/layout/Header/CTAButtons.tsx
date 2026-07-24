import React from "react";
import Link from "next/link";
import { Car, PhoneCall } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { cn } from "@/lib/utils";

export interface CTAButtonsProps {
  className?: string;
  isCompact?: boolean;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({ className, isCompact = false }) => {
  return (
    <div className={cn("flex items-center gap-2 xl:gap-3 shrink-0", className)}>
      {/* Secondary CTA: Call Now */}
      <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="hidden sm:inline-flex shrink-0">
        <Button
          variant="outline"
          size={isCompact ? "sm" : "md"}
          className="px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-semibold"
          iconLeft={<PhoneCall className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-600" />}
        >
          Call Now
        </Button>
      </a>

      {/* Primary CTA: Book Now */}
      <Link href="/book" className="shrink-0">
        <Button
          variant="primary"
          size={isCompact ? "sm" : "md"}
          className="px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-bold"
          iconLeft={<Car className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />}
        >
          Book Now
        </Button>
      </Link>
    </div>
  );
};
