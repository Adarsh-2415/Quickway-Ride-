"use client";

import React from "react";
import {
  ShieldCheck,
  Clock,
  Award,
  Users,
  Sparkles,
  Navigation,
  UserCheck,
  CheckCircle2,
  Car,
  PhoneCall,
  MapPin,
  Compass,
  Train,
  Plane,
  Building2,
  Shield,
  Star,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FeatureCard } from "@/components/cards/Card";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";

const ICON_MAP: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-amber-600" />,
  Navigation: <Navigation className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  UserCheck: <UserCheck className="w-6 h-6 text-amber-600" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />,
  PhoneCall: <PhoneCall className="w-6 h-6 text-amber-600" />,
  MapPin: <MapPin className="w-6 h-6 text-amber-600" />,
  Compass: <Compass className="w-6 h-6 text-amber-600" />,
  Train: <Train className="w-6 h-6 text-amber-600" />,
  Plane: <Plane className="w-6 h-6 text-amber-600" />,
  Building2: <Building2 className="w-6 h-6 text-amber-600" />,
  Shield: <Shield className="w-6 h-6 text-amber-600" />,
  Star: <Star className="w-6 h-6 text-amber-600" />,
};

const DEFAULT_SERVICE_GUARANTEES = [
  {
    id: "g1",
    title: "Fixed Fare Guarantee",
    description:
      "Transparent rate card with no hidden night surge fees or unexpected extra charges.",
    icon_name: "Award",
  },
  {
    id: "g2",
    title: "100% Punctual Pickup",
    description:
      "Guaranteed on-time pickups for early morning flights, trains, and urgent outstation trips.",
    icon_name: "Clock",
  },
  {
    id: "g3",
    title: "Verified GPS Cabs",
    description:
      "All vehicles equipped with live GPS tracking and driven by background-verified drivers.",
    icon_name: "ShieldCheck",
  },
  {
    id: "g4",
    title: "Dispatch Support Desk",
    description:
      "Dedicated customer support operations team in Roorkee & Dehradun available around the clock.",
    icon_name: "Users",
  },
];

export interface GuaranteeItemProp {
  id?: string;
  title: string;
  description: string;
  icon_name?: string;
}

export interface ServiceGuaranteesProps {
  badge?: string;
  heading?: string;
  items?: GuaranteeItemProp[];
}

export const ServiceGuarantees: React.FC<ServiceGuaranteesProps> = ({
  badge,
  heading,
  items,
}) => {
  const displayBadge = badge || "Our Quality Guarantee";
  const displayHeading = heading || "Built on Trust & Professionalism";
  const guaranteesList =
    items && items.length > 0 ? items : DEFAULT_SERVICE_GUARANTEES;

  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="softAccent" size="md">
            {displayBadge}
          </Badge>
          <SectionHeading>{displayHeading}</SectionHeading>
        </div>

        <Grid cols={1} colsMd={2} colsLg={Math.min(guaranteesList.length, 4) as any} gap={6}>
          {guaranteesList.map((item, idx) => {
            const iconNode =
              (item.icon_name && ICON_MAP[item.icon_name]) || (
                <Award className="w-6 h-6 text-amber-600" />
              );
            return (
              <FeatureCard
                key={item.id || idx}
                icon={iconNode}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};
