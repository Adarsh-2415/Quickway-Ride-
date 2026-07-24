"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageSquare, Mail } from "lucide-react";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/buttons/Button";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const ContactCards: React.FC = () => {
  const contactTouchpoints = [
    {
      title: "Hotline & Customer Care",
      value: SITE_CONFIG.contact.phoneDisplay,
      subtitle: "Customer Care & Instant Booking Desk",
      icon: <PhoneCall className="w-6 h-6 text-amber-500" />,
      actionLabel: "Call +91 8679506655",
      actionUrl: `tel:${SITE_CONFIG.contact.phoneHotline}`,
      btnStyle: "bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold shadow-sm",
    },
    {
      title: "WhatsApp Support Desk",
      value: "8679506655",
      subtitle: "Instant Fare Quotes & Live Chat",
      icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
      actionLabel: "Chat on WhatsApp",
      actionUrl: `https://wa.me/${SITE_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi QuickWay Ride, I want to inquire about a taxi.")}`,
      btnStyle: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-sm",
    },
    {
      title: "Official Email Desk",
      value: SITE_CONFIG.contact.supportEmail,
      subtitle: "Corporate Tie-ups & Package Inquiries",
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      actionLabel: "Send Email",
      actionUrl: `mailto:${SITE_CONFIG.contact.supportEmail}`,
      btnStyle: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm",
    },
  ];

  return (
    <div className="w-full">
      <Grid cols={1} colsMd={3} gap={6}>
        {contactTouchpoints.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card variant="standard" isHoverable className="p-6 space-y-4 h-full flex flex-col justify-between border border-slate-200 shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {item.title}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-1">
                    {item.value}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={item.actionUrl}
                  target={item.actionUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    className={`w-full justify-center ${item.btnStyle}`}
                  >
                    {item.actionLabel}
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </div>
  );
};
