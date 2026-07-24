"use client";

import React from "react";
import { ClipboardList, Car, MailCheck } from "lucide-react";
import { StatCard } from "./StatCard";

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,254",
      icon: ClipboardList,
      subtitle: "Total customer ride bookings",
      badgeText: "+12.4%",
      badgeTrend: "up" as const,
    },
    {
      title: "Total Fleet",
      value: "24",
      icon: Car,
      subtitle: "Active operational vehicles",
      badgeText: "24 Cabs",
      badgeTrend: "neutral" as const,
    },
    {
      title: "Contact Enquiries",
      value: "9",
      icon: MailCheck,
      subtitle: "Customer messages & quotes",
      badgeText: "3 Pending",
      badgeTrend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          subtitle={stat.subtitle}
          badgeText={stat.badgeText}
          badgeTrend={stat.badgeTrend}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};
