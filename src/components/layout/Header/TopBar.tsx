import React from "react";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { SocialLinks } from "./SocialLinks";
import { Container } from "../Container";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white text-xs h-11 hidden lg:flex items-center select-none">
      <Container className="flex items-center justify-between">
        {/* Left Side: Contact Information & Service Areas */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${SITE_CONFIG.contact.phoneHotline}`}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">24/7 Support:</span>
            <span>{SITE_CONFIG.contact.phoneDisplay}</span>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contact.supportEmail}`}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-500" />
            <span>{SITE_CONFIG.contact.supportEmail}</span>
          </a>

          <div className="flex items-center gap-1.5 text-slate-400 border-l border-slate-800 pl-6">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">Service Cities:</span>
            <span className="text-slate-300 font-normal">
              Roorkee • Haridwar • Rishikesh • Dehradun • Saharanpur
            </span>
          </div>
        </div>

        {/* Right Side: Social Media Channels */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">Connect:</span>
          <SocialLinks variant="dark" />
        </div>
      </Container>
    </div>
  );
};
