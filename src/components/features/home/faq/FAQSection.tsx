"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FAQHeader } from "./FAQHeader";
import { FAQAccordion } from "./FAQAccordion";
import { FAQCTA } from "./FAQCTA";
import { FAQ_ITEMS } from "./faq.data";
import { FAQItem } from "./faq.types";
import { ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export interface FAQSectionProps {
  faqs?: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : FAQ_ITEMS;

  return (
    <Section variant="default" padding="normal" className="bg-white">
      <Container className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Header & Trust Card */}
          <div className="lg:col-span-5 space-y-6">
            <FAQHeader />

            {/* Trust Highlights Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 shadow-sm">
              <h4 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wide border-b border-slate-200/80 pb-2">
                QuickWay Service Commitments
              </h4>

              <div className="space-y-3 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Punctual Pickups:</strong> Drivers arrive 10-15 minutes prior to scheduled departure.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Commercial Permits:</strong> 100% verified tourist taxis with comprehensive GPS tracking.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Surge Charges:</strong> Fixed transparent fares with no hidden booking fees.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <FAQAccordion items={activeFaqs} />
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <FAQCTA />
      </Container>
    </Section>
  );
};
