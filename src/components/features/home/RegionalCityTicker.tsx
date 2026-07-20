import React from "react";
import { MapPin, Navigation } from "lucide-react";

export const RegionalCityTicker: React.FC = () => {
  const cities = [
    "Roorkee Hub",
    "Haridwar Ganga Aarti",
    "Rishikesh Ashram & Rafting",
    "Dehradun City",
    "Jolly Grant Airport",
    "Saharanpur Junction",
    "Mussoorie Queen of Hills",
    "Delhi IGI Airport Express",
    "Char Dham Route",
  ];

  return (
    <div className="w-full bg-slate-950 border-t border-b border-slate-800/80 py-3 overflow-hidden select-none">
      <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap text-xs font-semibold text-slate-300">
        {cities.concat(cities).map((city, idx) => (
          <div key={idx} className="inline-flex items-center gap-2 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{city}</span>
            <span className="text-slate-700">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
