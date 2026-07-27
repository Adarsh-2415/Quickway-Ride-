"use client";

import React from "react";
import {
  ShieldCheck,
  Sparkles,
  Navigation,
  UserCheck,
  Award,
  Clock,
  Users,
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
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
  Navigation: <Navigation className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  UserCheck: <UserCheck className="w-6 h-6 text-amber-600" />,
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-amber-600" />,
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

const DEFAULT_FLEET_FEATURES = [
  {
    id: "f1",
    title: "All-India Tourist Permit",
    description:
      "Fully licensed commercial yellow-plate vehicles with valid state border permits across North India.",
    icon_name: "ShieldCheck",
  },
  {
    id: "f2",
    title: "Real-Time GPS Tracking",
    description:
      "Every vehicle in our fleet is monitored via live GPS telemetry for passenger safety.",
    icon_name: "Navigation",
  },
  {
    id: "f3",
    title: "Sanitized & Clean",
    description:
      "Deep internal steam cleaning and seat sanitization performed before every single trip.",
    icon_name: "Sparkles",
  },
  {
    id: "f4",
    title: "Verified Chauffeurs",
    description:
      "Courteous, police-verified mountain and highway drivers with 8+ years of driving experience.",
    icon_name: "UserCheck",
  },
];

export interface FeatureItemProp {
  id?: string;
  title: string;
  description: string;
  icon_name?: string;
}

export interface FleetFeaturesProps {
  badge?: string;
  heading?: string;
  items?: FeatureItemProp[];
}

export const FleetFeatures: React.FC<FleetFeaturesProps> = ({
  badge,
  heading,
  items,
}) => {
  const displayBadge = badge || "Fleet Safety & Quality Standard";
  const displayHeading = heading || "Maintained to Executive Standards";
  const featureList = items && items.length > 0 ? items : DEFAULT_FLEET_FEATURES;

  return (
    <Section variant="soft" padding="normal">
      <Container className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="softSecondary" size="md">
            {displayBadge}
          </Badge>
          <SectionHeading>{displayHeading}</SectionHeading>
        </div>

        <Grid cols={1} colsMd={2} colsLg={Math.min(featureList.length, 4) as any} gap={6}>
          {featureList.map((item, idx) => {
            const iconNode =
              (item.icon_name && ICON_MAP[item.icon_name]) || (
                <ShieldCheck className="w-6 h-6 text-amber-600" />
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
