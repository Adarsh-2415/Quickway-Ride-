import React from "react";
import { Star, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import { Badge } from "@/components/badges/Badge";

export const HeroTrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 select-none">
      {/* Overall Rating Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-white backdrop-blur-md shadow-sm">
        <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
          <span>4.9 / 5</span>
        </div>
        <span className="text-slate-400 text-xs">•</span>
        <span className="text-slate-300 text-xs font-medium">
          2,500+ Journeys in Uttarakhand
        </span>
      </div>

      {/* Verified Drivers Badge */}
      <Badge variant="softSuccess" size="md" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}>
        100% Verified Drivers
      </Badge>

      {/* Zero Surge Pricing Badge */}
      <Badge variant="softAccent" size="md" icon={<CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />}>
        Zero Surge Pricing
      </Badge>
    </div>
  );
};
