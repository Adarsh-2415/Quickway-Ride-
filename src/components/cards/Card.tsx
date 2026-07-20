import React from "react";
import { cn } from "@/lib/utils";
import { CardHeading } from "../typography/Headings";
import { BodyRegular } from "../typography/Text";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "feature" | "info" | "stat" | "cta";
  isHoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "standard", isHoverable = false, children, ...props },
    ref
  ) => {
    const variantStyles = {
      standard: "bg-white border border-slate-200 shadow-sm",
      feature: "bg-white border border-slate-200/80 shadow-sm hover:border-amber-400/80",
      info: "bg-blue-50/50 border border-blue-100 text-slate-900",
      stat: "bg-slate-900 border border-slate-800 text-white shadow-md",
      cta: "bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-400 text-slate-900 shadow-md",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all duration-200 overflow-hidden relative",
          variantStyles[variant],
          isHoverable && "hover:-translate-y-1 hover:shadow-md cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badge,
  className,
  ...props
}) => (
  <Card variant="feature" isHoverable className={cn("space-y-3", className)} {...props}>
    <div className="flex items-center justify-between gap-3">
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-amber-100/80 text-amber-900 flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>
      )}
      {badge}
    </div>
    <CardHeading>{title}</CardHeading>
    <BodyRegular className="text-slate-600">{description}</BodyRegular>
  </Card>
);

export interface StatisticCardProps extends CardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  change,
  icon,
  className,
  ...props
}) => (
  <Card variant="stat" className={cn("space-y-2", className)} {...props}>
    <div className="flex items-center justify-between text-slate-400">
      <span className="text-xs uppercase tracking-wider font-semibold">{title}</span>
      {icon && <span className="text-amber-400 text-lg">{icon}</span>}
    </div>
    <div className="text-3xl font-extrabold font-heading text-white tracking-tight">
      {value}
    </div>
    {change && <p className="text-xs text-amber-400 font-medium">{change}</p>}
  </Card>
);
