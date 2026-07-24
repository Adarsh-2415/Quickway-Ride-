"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Car,
  Clock,
  Building2,
  Train,
  Hotel,
  Bus,
  Calendar,
  Compass,
  Mountain,
  Sun,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Badge } from "@/components/badges/Badge";
import { SectionHeading } from "@/components/typography/Headings";
import { BodyRegular } from "@/components/typography/Text";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { ServiceDetailModal, ServiceItem } from "./ServiceDetailModal";
import { cn } from "@/lib/utils";

const ALL_SERVICES: (ServiceItem & { icon: React.ReactNode; tabCategory: string })[] = [
  {
    id: "airport-taxi",
    title: "Airport Taxi Express",
    category: "Airport & Transit",
    tabCategory: "airport",
    description: "Guaranteed airport pickups & drop-offs for Dehradun (Jolly Grant) & Delhi (IGI) Airport.",
    longDescription: "Our Airport Taxi Express provides reliable transfers to and from Jolly Grant Airport Dehradun and Indira Gandhi International Airport Delhi. With real-time flight tracking, your driver will be waiting at the arrival terminal even if your flight is delayed.",
    rateHint: "Starting at ₹1,800 Flat",
    recommendedVehicle: "Swift Dzire / Innova Crysta",
    inclusions: [
      "Flight status tracking",
      "60 mins free wait time at arrival",
      "Doorstep luggage assistance",
      "Clean sanitized air-conditioned cab",
    ],
    iconName: "Plane",
    badge: "Flight Sync",
    icon: <Plane className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "one-way-taxi",
    title: "One Way Outstation Taxi",
    category: "Outstation Cabs",
    tabCategory: "outstation",
    description: "Pay for one-way distance only. Ideal for point-to-point intercity travel across 26+ cities.",
    longDescription: "Why pay for a return trip when you only need a one-way ride? Our One Way Outstation Taxi service connects Roorkee, Haridwar, Rishikesh, Dehradun, Saharanpur, Chandigarh, and Delhi NCR with zero return fare charges.",
    rateHint: "₹12 / KM (No Return Fare)",
    recommendedVehicle: "Dzire / Etios / Ertiga",
    inclusions: [
      "Pay for one-way distance only",
      "Toll taxes transparent billing",
      "Doorstep pickup & drop-off",
      "Experienced highway driver",
    ],
    iconName: "Car",
    badge: "Pay 1-Way Only",
    icon: <Car className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "round-trip-taxi",
    title: "Round Trip Outstation Cabs",
    category: "Outstation Cabs",
    tabCategory: "outstation",
    description: "Dedicated cab & driver for multi-day outstation vacations, family visits, and hill station tours.",
    longDescription: "Enjoy complete freedom during your family vacation or business trip with our Round Trip Outstation service. Keep the vehicle with you for multiple days with flexible halts and sightseeing stops.",
    rateHint: "₹12 - ₹18 / KM (250 KM/day cap)",
    recommendedVehicle: "Innova Crysta / Ertiga / Dzire",
    inclusions: [
      "Dedicated cab for entire duration",
      "Flexible sightseeing & meal halts",
      "Experienced mountain drivers",
      "All-India tourist permit",
    ],
    iconName: "Car",
    badge: "Flexible Halts",
    icon: <Car className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "railway-pickup",
    title: "Railway Station Pickup & Drop",
    category: "Airport & Transit",
    tabCategory: "airport",
    description: "Guaranteed station pickups for Roorkee, Haridwar, Dehradun, and Saharanpur Railway Stations.",
    longDescription: "Punctual railway station transfer service synced with train arrival schedules at Roorkee (RK), Haridwar (HW), Dehradun (DDN), and Saharanpur (SRE) railway junctions.",
    rateHint: "Starting at ₹500 Flat",
    recommendedVehicle: "Sedan / Executive SUV",
    inclusions: [
      "Train arrival schedule sync",
      "Platform gate pickup assistance",
      "Zero late night surge charges",
      "Clean sanitized sedan",
    ],
    iconName: "Train",
    badge: "Train Schedule Sync",
    icon: <Train className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "hotel-pickup",
    title: "Hotel & Resort Transfer",
    category: "Airport & Transit",
    tabCategory: "airport",
    description: "Direct doorstep transfers connecting all major hotels, heritage resorts & ashrams across Uttarakhand.",
    longDescription: "Seamless hotel and resort transfers for guests arriving in Haridwar, Rishikesh, Dehradun, and Mussoorie. We coordinate with hotel reception for smooth luggage loading and departure.",
    rateHint: "Standard City & Outstation Rates",
    recommendedVehicle: "Sedan / Innova Crysta",
    inclusions: [
      "Direct hotel lobby pickup",
      "Luggage loading & unloading",
      "Spacious air-conditioned cabs",
      "Dispatch helpline",
    ],
    iconName: "Hotel",
    badge: "Lobby Doorstep Pickup",
    icon: <Hotel className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "local-taxi",
    title: "Local Taxi (Hourly Rental)",
    category: "City Rentals",
    tabCategory: "outstation",
    description: "Flexible 4 Hour / 8 Hour / 12 Hour local city rentals for shopping, meetings, and local visits.",
    longDescription: "Book a cab by the hour for local city errands, business meetings, medical visits, or shopping. Includes dedicated driver with flexible kilometer packages.",
    rateHint: "₹1,200 for 4Hrs / 40KM",
    recommendedVehicle: "Swift Dzire / Ertiga",
    inclusions: [
      "Flexible hourly packages",
      "Multiple stops in city limits",
      "Fuel & driver allowance included",
      "Air-conditioned comfort",
    ],
    iconName: "Clock",
    badge: "4hr / 8hr / 12hr Packages",
    icon: <Clock className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "char-dham-yatra",
    title: "Char Dham Yatra Pilgrimage",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Complete 10-12 day pilgrimage circuit cabs to Yamunotri, Gangotri, Kedarnath & Badrinath.",
    longDescription: "Embark on a sacred journey to Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath) with our seasoned mountain drivers who know every pass, halt, and helipad route in Garhwal.",
    rateHint: "Custom Package Pricing",
    recommendedVehicle: "Innova Crysta / Tempo Traveller",
    inclusions: [
      "10-12 Day dedicated mountain vehicle",
      "Expert hill drivers with 10+ yrs exp",
      "All hill permits & toll clearance",
      "Helipad & temple stop coordination",
    ],
    iconName: "Mountain",
    badge: "Sacred Pilgrimage",
    icon: <Mountain className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "haridwar-taxi",
    title: "Haridwar Ganga Aarti Special",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Evening Har Ki Pauri Ganga Aarti tour with visits to Chandi Devi, Mansa Devi & Bharat Mata Mandir.",
    longDescription: "Experience the divine evening Ganga Aarti at Har Ki Pauri with hassle-free parking and hotel transfers. Includes visits to ropeway temples and ghats.",
    rateHint: "Starting at ₹1,500 Flat",
    recommendedVehicle: "Sedan / Ertiga",
    inclusions: [
      "Ganga Aarti timing alignment",
      "Ropeway station transfer",
      "Local temple circuit coverage",
      "Return hotel/station drop",
    ],
    iconName: "Sun",
    badge: "Divine Ganga Aarti",
    icon: <Sun className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "rishikesh-taxi",
    title: "Rishikesh Adventure & Spiritual",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Visit Lakshman Jhula, Triveni Ghat Aarti, Beatles Ashram & Adventure River Rafting points.",
    longDescription: "Explore the Yoga Capital of the World. Our cabs take you to white-water rafting points in Shivpuri, Ram Jhula, Beatles Ashram, and Triveni Ghat for evening Aarti.",
    rateHint: "Starting at ₹1,800 Flat",
    recommendedVehicle: "Sedan / Executive SUV",
    inclusions: [
      "River rafting point drop & pickup",
      "Ram & Lakshman Jhula access",
      "Beatles Ashram tour stop",
      "Evening Triveni Aarti drop",
    ],
    iconName: "Compass",
    badge: "Yoga & Rafting Hub",
    icon: <Compass className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "mussoorie-tour",
    title: "Mussoorie Queen of Hills",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Full-day or multi-day tour to Kempty Falls, Mall Road Mussoorie, Lal Tibba & Company Garden.",
    longDescription: "Escape to the Queen of Hills with our experienced hill drivers. Visit Kempty Falls, Mall Road, Cloud's End, Company Garden, and George Everest peak.",
    rateHint: "Starting at ₹2,500 Full Day",
    recommendedVehicle: "Innova Crysta / Ertiga",
    inclusions: [
      "Kempty Falls & Mall Road tour",
      "Lal Tibba & Cloud's End sightseeing",
      "Mountain driving expert",
      "All hill state taxes included",
    ],
    iconName: "Mountain",
    badge: "Hill Station Escapes",
    icon: <Mountain className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "dehradun-sightseeing",
    title: "Dehradun Local Sightseeing",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Explore Robber's Cave (Guchhupani), Sahastradhara, Tapkeshwar Mahadev & Mindrolling Monastery.",
    longDescription: "Discover Dehradun's top attractions including Robber's Cave, Sahastradhara sulfur springs, Tapkeshwar Temple, Buddha Temple, and FRI (Forest Research Institute).",
    rateHint: "Starting at ₹2,000 Full Day",
    recommendedVehicle: "Swift Dzire / Ertiga",
    inclusions: [
      "All top 5 Dehradun tourist spots",
      "Flexible dining & shopping halts",
      "Air-conditioned comfort",
      "Doorstep hotel pickup",
    ],
    iconName: "MapPin",
    badge: "Capital Sightseeing",
    icon: <MapPin className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "uttarakhand-tour",
    title: "Uttarakhand Circuit Tour Packages",
    category: "Pilgrimage & Tours",
    tabCategory: "tours",
    description: "Comprehensive 5-7 day travel packages covering Haridwar, Rishikesh, Mussoorie, Nainital & Corbett.",
    longDescription: "Custom holiday packages designed for families and tourists covering Garhwal and Kumaon regions with dedicated private cabs and experienced local guides.",
    rateHint: "Custom Package Quotes",
    recommendedVehicle: "Innova Crysta / Ertiga",
    inclusions: [
      "Multi-destination circuit coverage",
      "Dedicated cab & driver for entire trip",
      "Customizable itinerary timeline",
      "Trip coordinator support",
    ],
    iconName: "Compass",
    badge: "Complete State Tour",
    icon: <Compass className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "tempo-traveller",
    title: "Tempo Traveller (12-26 Seater)",
    category: "Group Mobility",
    tabCategory: "corporate",
    description: "Luxury Force Urbania & Maharaja Tempo Travellers for family tours, wedding groups & delegations.",
    longDescription: "Travel together in luxury. Our 12-26 seater Force Urbania & Maharaja Tempo Travellers feature pushback reclining seats, dual AC, LED TV, and roof luggage carriers.",
    rateHint: "₹26 / KM",
    recommendedVehicle: "Urbania / Maharaja Traveller",
    inclusions: [
      "Pushback luxury recliner seats",
      "Dual high-capacity AC vents",
      "Roof luggage carrier + boot space",
      "Commercial heavy vehicle driver",
    ],
    iconName: "Bus",
    badge: "12-26 Seater Group Bus",
    icon: <Bus className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "corporate-taxi",
    title: "Corporate Delegation Cabs",
    category: "Corporate & Monthly",
    tabCategory: "corporate",
    description: "Executive mobility solutions for corporate delegates, VIP guests, and business conferences.",
    longDescription: "Professional executive cabs for corporate firms, educational institutes (IIT Roorkee, UPES), and industrial units in Saharanpur, Roorkee, and Haridwar with monthly GST invoicing.",
    rateHint: "Corporate Discounted Tariff",
    recommendedVehicle: "Innova Crysta / Executive Sedan",
    inclusions: [
      "GST invoice billing support",
      "Uniformed professional drivers",
      "Priority VIP booking dispatch",
      "Dedicated account manager",
    ],
    iconName: "Building2",
    badge: "GST Invoicing & VIP Service",
    icon: <Building2 className="w-6 h-6 text-amber-500" />,
  },
  {
    id: "monthly-cab-service",
    title: "Monthly Dedicated Cab Contracts",
    category: "Corporate & Monthly",
    tabCategory: "corporate",
    description: "Long-term monthly cab contracts for daily employee commute, institutes, and executive transport.",
    longDescription: "Hassle-free monthly vehicle leasing and dedicated driver contracts for corporates, factories, and institutions across Saharanpur, Roorkee, and Dehradun.",
    rateHint: "Monthly Fixed Retainer",
    recommendedVehicle: "Ertiga / Dzire / Innova",
    inclusions: [
      "Dedicated vehicle & driver assigned",
      "Backup vehicle guarantee",
      "Monthly consolidated billing",
      "Customized route scheduling",
    ],
    iconName: "Calendar",
    badge: "Monthly Corporate Lease",
    icon: <Calendar className="w-6 h-6 text-amber-500" />,
  },
];

export const ServicesGrid: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: "all", label: "All Services (17)" },
    { id: "outstation", label: "Outstation & Intercity" },
    { id: "airport", label: "Airport & Station Sync" },
    { id: "tours", label: "Tours & Pilgrimage" },
    { id: "corporate", label: "Corporate & Group" },
  ];

  const filteredServices = ALL_SERVICES.filter(
    (s) => selectedTab === "all" || s.tabCategory === selectedTab
  );

  return (
    <Section variant="default" padding="normal">
      <Container className="space-y-10">
        
        {/* Category Tab Switcher Bar */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  selectedTab === cat.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <Grid cols={1} colsMd={2} colsLg={3} gap={6}>
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="standard"
                  isHoverable
                  className="p-6 h-full flex flex-col justify-between space-y-4 hover:border-amber-500/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        {service.icon}
                      </div>
                      <Badge variant="softAccent" size="sm">
                        {service.badge}
                      </Badge>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">
                      {service.title}
                    </h3>

                    <BodyRegular className="text-xs text-slate-600 line-clamp-3">
                      {service.description}
                    </BodyRegular>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="text-slate-400 font-medium">Estimated Fare:</span>
                      <span className="text-amber-600 font-extrabold">{service.rateHint}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center text-xs"
                        onClick={() => setActiveModalService(service)}
                      >
                        Service Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full justify-center text-xs font-bold text-slate-900"
                        iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                        onClick={() => setActiveModalService(service)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Grid>

        {/* Service Detail Modal */}
        <ServiceDetailModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
        />

      </Container>
    </Section>
  );
};
