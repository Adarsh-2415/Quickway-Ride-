import React from "react";
import { MessageSquare, Facebook, Instagram, Twitter } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { cn } from "@/lib/utils";

export interface SocialLinksProps {
  className?: string;
  variant?: "dark" | "light";
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  variant = "dark",
}) => {
  const isDark = variant === "dark";

  const items = [
    {
      label: "WhatsApp Direct",
      href: `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent("Hi QuickWay Ride, I would like to inquire about a taxi booking.")}`,
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      label: "Facebook",
      href: SITE_CONFIG.social.facebook,
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      label: "Instagram",
      href: SITE_CONFIG.social.instagram,
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      label: "Twitter",
      href: SITE_CONFIG.social.twitter,
      icon: <Twitter className="w-4 h-4" />,
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={cn(
            "p-1.5 rounded-md transition-all duration-200 focus-visible:outline-amber-500",
            isDark
              ? "text-slate-300 hover:text-amber-400 hover:bg-slate-800"
              : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
          )}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
