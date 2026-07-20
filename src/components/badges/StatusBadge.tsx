import React from "react";
import { Badge } from "./Badge";
import { BookingStatus } from "@/types";
import { Clock, CheckCircle2, UserCheck, Navigation, Flag, XCircle } from "lucide-react";

export interface StatusBadgeProps {
  status: BookingStatus;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  switch (status) {
    case "PENDING_CONFIRMATION":
      return (
        <Badge variant="softWarning" size={size} icon={<Clock className="w-3.5 h-3.5" />}>
          Pending Confirmation
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge variant="softSecondary" size={size} icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
          Confirmed
        </Badge>
      );
    case "DRIVER_ASSIGNED":
      return (
        <Badge variant="softAccent" size={size} icon={<UserCheck className="w-3.5 h-3.5" />}>
          Driver Assigned
        </Badge>
      );
    case "TRIP_STARTED":
      return (
        <Badge variant="softSecondary" size={size} icon={<Navigation className="w-3.5 h-3.5" />}>
          Trip Started
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge variant="softSuccess" size={size} icon={<Flag className="w-3.5 h-3.5" />}>
          Completed
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="softError" size={size} icon={<XCircle className="w-3.5 h-3.5" />}>
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline" size={size}>{status}</Badge>;
  }
};
