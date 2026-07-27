import React from "react";
import Link from "next/link";

export const revalidate = 0;
import { HeroSection } from "@/components/features/home/HeroSection";
import { TestimonialsSection } from "@/components/features/home/testimonials";
import { FAQSection } from "@/components/features/home/faq";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FeatureCard, Card } from "@/components/cards/Card";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { Button } from "@/components/buttons/Button";
import { Badge } from "@/components/badges/Badge";
import { ShieldCheck, Clock, Award, Users, ArrowRight, Sparkles, Navigation, Car, MapPin } from "lucide-react";
import {
  fetchHomeSliderImagesAction,
  fetchHomeTestimonialsAction,
  fetchHomeFaqsAction,
  fetchHomeAdvantagesAction,
  fetchHomeTourCircuitsAction,
} from "@/actions/home";

const ADVANTAGE_ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-600" />,
  Clock: <Clock className="w-6 h-6 text-amber-600" />,
  Award: <Award className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />,
  Navigation: <Navigation className="w-6 h-6 text-amber-600" />,
  Car: <Car className="w-6 h-6 text-amber-600" />,
  MapPin: <MapPin className="w-6 h-6 text-amber-600" />,
};

export default async function HomePage() {
  const [sRes, tRes, fRes, aRes, cRes] = await Promise.all([
    fetchHomeSliderImagesAction("public"),
    fetchHomeTestimonialsAction("public"),
    fetchHomeFaqsAction("public"),
    fetchHomeAdvantagesAction("public"),
    fetchHomeTourCircuitsAction("public"),
  ]);

  const slides = sRes.data || [];
  const testimonials = tRes.data || [];
  const faqs = fRes.data || [];
  const advantages = aRes.data || [];
  const tourCircuits = cRes.data || [];

  const defaultAdvantages = [
    {
      title: "Safety Above Everything",
      description: "100% background-checked drivers, GPS tracking, and daily sanitized vehicles for maximum rider safety.",
      icon_name: "ShieldCheck",
    },
    {
      title: "Guaranteed On-Time",
      description: "Punctual pickups guaranteed for early morning airport flights, railway stations, and urgent trips.",
      icon_name: "Clock",
    },
    {
      title: "Transparent Pricing",
      description: "No surge charges, no hidden night fees. Clear rate cards per kilometer with complete breakdown.",
      icon_name: "Award",
    },
    {
      title: "Live Support Desk",
      description: "Dedicated operations desk in Roorkee & Dehradun available around the clock for trip assistance.",
      icon_name: "Users",
    },
  ];

  const defaultTourCircuits = [
    {
      title: "Haridwar Ganga Aarti & Pilgrimage Special",
      description: "Direct pickup from Roorkee/Dehradun to Har Ki Pauri Ganga Aarti with evening return.",
    },
    {
      title: "Rishikesh Rafting & Spiritual Escape",
      description: "Visit Lakshman Jhula, Triveni Ghat Aarti, Beatles Ashram & Adventure River Rafting.",
    },
    {
      title: "Dehradun & Mussoorie Queen of Hills",
      description: "Explore Kempty Falls, Mall Road Mussoorie, Robber's Cave & Sahastradhara.",
    },
  ];

  const activeAdvantages = advantages.length > 0 ? advantages : defaultAdvantages;
  const activeCircuits = tourCircuits.length > 0 ? tourCircuits : defaultTourCircuits;

  const featuredFleet = [
    {
      name: "Swift Dzire / Etios",
      category: "Sedan (4+1 Seater)",
      rate: "₹12 / KM",
      capacity: "4 Passengers • 2 Bags",
      image: "/images/swift.jfif",
      tag: "Most Popular",
    },
    {
      name: "Ertiga / XL6",
      category: "Executive SUV (6+1 Seater)",
      rate: "₹15 / KM",
      capacity: "6 Passengers • 3 Bags",
      image: "/images/ertiga.jfif",
      tag: "Family Favorite",
    },
    {
      name: "Toyota Innova Crysta",
      category: "Luxury SUV (6+1 / 7+1)",
      rate: "₹18 / KM",
      capacity: "7 Passengers • 4 Bags",
      image: "/images/innova crysta.jfif",
      tag: "Premium Luxury",
    },
    {
      name: "Tempo Traveller (12-26 Seater)",
      category: "Group Tour Bus",
      rate: "₹26 / KM",
      capacity: "12-26 Passengers • Large Carrier",
      image: "/images/Tempo Traveller.jfif",
      tag: "Group Delegation",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Section & Background Slider (Supabase Driven) */}
      <HeroSection slides={slides} />

      {/* 2. Core Brand Values & Service Standards (Supabase Driven) */}
      <Section variant="default" padding="normal">
        <Container className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="softAccent" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
              The QuickWay Advantage
            </Badge>
            <SectionHeading>Why Travelers Choose QuickWay Ride</SectionHeading>
            <BodyRegular className="text-slate-600">
              Built on transparency, punctuality, and safety. Every vehicle in our fleet is daily sanitized and operated by experienced regional drivers.
            </BodyRegular>
          </div>

          <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
            {activeAdvantages.map((adv, idx) => (
              <FeatureCard
                key={adv.id || idx}
                icon={ADVANTAGE_ICON_MAP[adv.icon_name] || <ShieldCheck className="w-6 h-6 text-amber-600" />}
                title={adv.title}
                description={adv.description}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 3. Featured Fleet Showcase Teaser */}
      <Section variant="soft" padding="normal">
        <Container className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="softSecondary" size="md">
                Modern Fleet Roster
              </Badge>
              <SectionHeading>Select Your Travel Vehicle</SectionHeading>
              <BodyRegular>
                Well-maintained sedans, executive SUVs, and group Tempo Travellers ready for your journey.
              </BodyRegular>
            </div>
            <Link href="/fleet">
              <Button variant="outline" iconRight={<ArrowRight className="w-4 h-4" />}>
                View All Vehicles
              </Button>
            </Link>
          </div>

          <Grid cols={1} colsMd={2} colsLg={4} gap={6}>
            {featuredFleet.map((v) => (
              <Card key={v.name} variant="standard" isHoverable className="p-0 flex flex-col justify-between">
                <div className="relative h-48 w-full bg-slate-100 p-2 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{v.tag}</Badge>
                  </div>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-900">{v.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{v.category}</p>
                    <p className="text-xs text-slate-600 mt-2 font-medium">{v.capacity}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <Link href={`/book?vehicle=${encodeURIComponent(v.name)}`} className="w-full">
                      <Button variant="primary" size="sm" className="w-full justify-center font-bold text-slate-900">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 4. Customer Testimonials Section (Supabase Driven) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 5. Popular Uttarakhand Tour Packages Preview (Supabase Driven) */}
      <Section variant="default" padding="normal">
        <Container className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="softAccent" size="md">
              Uttarakhand Travel Packages
            </Badge>
            <SectionHeading>Popular Tour & Pilgrimage Circuits</SectionHeading>
            <BodyRegular>
              Carefully curated travel packages to Haridwar, Rishikesh, Mussoorie & Char Dham with dedicated cabs.
            </BodyRegular>
          </div>

          <Grid cols={1} colsMd={3} gap={6}>
            {activeCircuits.map((p, idx) => (
              <Card key={p.id || idx} variant="standard" isHoverable className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">{p.title}</h3>
                <BodyRegular className="text-sm">{p.description}</BodyRegular>
                <div className="pt-2">
                  <Link href="/packages">
                    <Button variant="outline" size="sm" className="w-full justify-center" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                      Explore Itinerary
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 6. Frequently Asked Questions (FAQ) Section (Supabase Driven) */}
      <FAQSection faqs={faqs} />
    </main>
  );
}
