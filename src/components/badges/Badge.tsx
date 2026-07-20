import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "outline"
    | "softAccent"
    | "softSecondary"
    | "softSuccess"
    | "softWarning"
    | "softError";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "softAccent",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-slate-900 text-white border border-slate-800",
    secondary: "bg-blue-600 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-amber-600 text-white",
    danger: "bg-red-600 text-white",
    outline: "bg-white text-slate-700 border border-slate-200",
    softAccent: "bg-amber-100 text-amber-900 border border-amber-200/60 font-semibold",
    softSecondary: "bg-blue-50 text-blue-800 border border-blue-200/60 font-semibold",
    softSuccess: "bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold",
    softWarning: "bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold",
    softError: "bg-red-50 text-red-800 border border-red-200/60 font-semibold",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] gap-1 rounded",
    md: "px-2.5 py-1 text-xs gap-1.5 rounded-md",
    lg: "px-3 py-1.5 text-sm gap-2 rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium tracking-tight shrink-0 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
