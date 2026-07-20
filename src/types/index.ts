export type BookingStatus =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'DRIVER_ASSIGNED'
  | 'TRIP_STARTED'
  | 'COMPLETED'
  | 'CANCELLED';

export type TripType =
  | 'outstation_oneway'
  | 'outstation_roundtrip'
  | 'local_rental'
  | 'airport_transfer';

export type VehicleCategory =
  | 'hatchback_sedan'
  | 'executive_suv'
  | 'luxury_suv'
  | 'tempo_traveller';

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: VehicleCategory;
  thumbnail_url: string;
  gallery_images: string[];
  seating_capacity: number;
  luggage_capacity: number;
  fuel_type: 'Diesel' | 'Petrol' | 'CNG' | 'Electric';
  ac_status: 'Air Conditioned' | 'Dual AC';
  transmission: 'Manual' | 'Automatic';
  per_km_rate: number;
  min_km_per_day: number;
  driver_allowance_per_day: number;
  base_price_local: number;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
}

export interface RouteMatrix {
  id: string;
  origin_city: string;
  destination_city: string;
  distance_km: number;
  flat_rate: number;
  est_duration: string;
}

export interface TourPackageItineraryDay {
  day_number: number;
  title: string;
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  category: 'pilgrimage' | 'hillstation' | 'adventure' | 'corporate';
  duration_days: number;
  duration_nights: number;
  starting_price: number;
  thumbnail_url: string;
  gallery_images: string[];
  itinerary: TourPackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  is_featured: boolean;
  is_active: boolean;
}

export interface Booking {
  id: string;
  reference_code: string;
  trip_type: TripType;
  origin: string;
  destination?: string;
  pickup_date: string;
  pickup_time: string;
  passengers: number;
  vehicle_id: string;
  vehicle_name: string;
  total_estimated_amount: number;
  rider_name: string;
  rider_phone: string;
  rider_email: string;
  special_instructions?: string;
  status: BookingStatus;
  driver_name?: string;
  driver_phone?: string;
  vehicle_plate?: string;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  service_requirement: string;
  estimated_passengers: number;
  trip_details: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string;
  rating: number;
  trip_route: string;
  review_text: string;
  is_featured: boolean;
  avatar_url?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fleet' | 'destinations' | 'pilgrimage' | 'customers';
  image_url: string;
  caption: string;
}

export interface GlobalSettings {
  api_config: {
    google_maps_key: string;
    rate_limit_max_requests: number;
  };
  smtp_config: {
    host: string;
    port: number;
    user: string;
    from_address: string;
  };
  booking_rules: {
    min_advance_hours: number;
    default_min_km_per_day: number;
    default_driver_allowance: number;
  };
  contact_details: {
    phone_hotline: string;
    whatsapp_number: string;
    support_email: string;
    office_address: string;
    emergency_phone: string;
    business_hours: string;
  };
  seo_defaults: {
    default_title: string;
    default_description: string;
    default_og_image: string;
  };
}
