export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isPublished?: boolean;
}
