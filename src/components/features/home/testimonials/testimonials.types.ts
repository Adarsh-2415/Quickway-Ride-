export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  city: string;
  rating: number; // 1 to 5
  review: string;
  avatar: string;
  featured?: boolean;
  is_active?: boolean;
  created_at?: string;
}
