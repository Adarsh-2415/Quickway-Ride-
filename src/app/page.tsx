import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/features/home/HeroSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { FeatureCard, Card } from "@/components/cards/Card";
import { PageHeading, SectionHeading, SubHeading } from "@/components/typography/Headings";
import { BodyRegular, BodyLarge } from "@/components/typography/Text";
import { Button } from "@/components/buttons/Button";
import { Badge } from "@/components/badges/Badge";
import { ShieldCheck, Clock, Award, Users, MapPin, Car, ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function HomePage() {
  const featuredFleet = [
    {
      name: "Swift Dzire / Etios",
      category: "Sedan (4+1 Seater)",
      rate: "₹12 / KM",
      capacity: "4 Passengers • 2 Bags",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
      tag: "Most Popular",
    },
    {
      name: "Ertiga / XL6",
      category: "Executive SUV (6+1 Seater)",
      rate: "₹15 / KM",
      capacity: "6 Passengers • 3 Bags",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
      tag: "Family Favorite",
    },
    {
      name: "Toyota Innova Crysta",
      category: "Luxury SUV (6+1 / 7+1)",
      rate: "₹18 / KM",
      capacity: "7 Passengers • 4 Bags",
      image: "/images/innova_crysta.jpg",
      tag: "Premium Luxury",
    },
    {
      name: "Tempo Traveller (12-26 Seater)",
      category: "Group Tour Bus",
      rate: "₹26 / KM",
      capacity: "12-26 Passengers • Large Carrier",
      image: "/images/tempo_traveller.jpg",
      tag: "Group Delegation",
    },
  ];

  const popularCircuits = [
    {
      title: "Haridwar Ganga Aarti & Pilgrimage Special",
      duration: "1 Day Circuit",
      price: "₹1,800 Flat",
      description: "Direct pickup from Roorkee/Dehradun to Har Ki Pauri Ganga Aarti with evening return.",
    },
    {
      title: "Rishikesh Rafting & Spiritual Escape",
      duration: "2 Days / 1 Night",
      price: "₹3,200 Starting",
      description: "Visit Lakshman Jhula, Triveni Ghat Aarti, Beatles Ashram & Adventure River Rafting.",
    },
    {
      title: "Dehradun & Mussoorie Queen of Hills",
      duration: "3 Days / 2 Nights",
      price: "₹5,500 Starting",
      description: "Explore Kempty Falls, Mall Road Mussoorie, Robber's Cave & Sahastradhara.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Section & Live Booking Engine */}
      <HeroSection />

      {/* 2. Core Brand Values & Service Standards */}
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
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-amber-600" />}
              title="Safety Above Everything"
              description="100% background-checked drivers, GPS tracking, and daily sanitized vehicles for maximum rider safety."
            />

            <FeatureCard
              icon={<Clock className="w-6 h-6 text-amber-600" />}
              title="Guaranteed On-Time"
              description="Punctual pickups guaranteed for early morning airport flights, railway stations, and urgent trips."
            />

            <FeatureCard
              icon={<Award className="w-6 h-6 text-amber-600" />}
              title="Transparent Pricing"
              description="No surge charges, no hidden night fees. Clear rate cards per kilometer with complete breakdown."
            />

            <FeatureCard
              icon={<Users className="w-6 h-6 text-amber-600" />}
              title="24/7 Live Support"
              description="Dedicated operations desk in Roorkee & Dehradun available around the clock for trip assistance."
            />
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
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Rate Starts At</span>
                      <span className="font-heading font-extrabold text-amber-600 text-lg">{v.rate}</span>
                    </div>
                    <Link href={`/book?vehicle=${encodeURIComponent(v.name)}`}>
                      <Button variant="primary" size="sm">
                        Book
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 4. Popular Uttarakhand Tour Packages Preview */}
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
            {popularCircuits.map((p) => (
              <Card key={p.title} variant="standard" isHoverable className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60">
                  <span>{p.duration}</span>
                  <span>{p.price}</span>
                </div>
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

      {/* 5. Corporate & Wedding Travel Callout Banner */}
      <Section variant="dark" padding="normal" className="relative">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="softAccent" size="md">
                Corporate & Event Logistics
              </Badge>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Need Monthly Corporate Cabs or Wedding Delegations?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                QuickWay Ride provides dedicated monthly fleet contracts for institutes, corporates in Saharanpur/Roorkee, and multi-vehicle delegations for wedding events.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link href="/corporate">
                <Button variant="primary" size="lg" className="w-full justify-center font-bold text-slate-900">
                  Request Corporate Quote
                </Button>
              </Link>
              <a href={`tel:${SITE_CONFIG.contact.phoneHotline}`}>
                <Button variant="outline" size="lg" className="w-full justify-center bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  Call Operations Desk
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
