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
    <div className={cn("flex items-center gap-3", className)}>
      {/* Secondary CTA: Call Now */}
      <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`} className="hidden sm:inline-flex">
        <Button
          variant="outline"
          size={isCompact ? "sm" : "md"}
          iconLeft={<PhoneCall className="w-4 h-4 text-amber-600" />}
        >
          Call Now
        </Button>
      </a>

      {/* Primary CTA: Book Now */}
      <Link href="/book">
        <Button
          variant="primary"
          size={isCompact ? "sm" : "md"}
          iconLeft={<Car className="w-4 h-4 stroke-[2.5]" />}
        >
          Book Now
        </Button>
      </Link>
    </div>
  );
};
