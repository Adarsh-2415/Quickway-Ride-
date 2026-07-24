import React from "react";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { HelpCircle } from "lucide-react";

export const FAQHeader: React.FC = () => {
  return (
    <div className="space-y-3">
      <Badge variant="softAccent" size="md" icon={<HelpCircle className="w-3.5 h-3.5 text-amber-500" />}>
        FAQ
      </Badge>

      <SectionHeading className="text-slate-900">
        Frequently Asked Questions
      </SectionHeading>

      <BodyRegular className="text-slate-600 max-w-lg leading-relaxed">
        Got questions about our outstation rates, driver details, or airport transfers? We've got answers.
      </BodyRegular>
    </div>
  );
};
