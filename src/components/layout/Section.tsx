import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "soft" | "dark" | "transparent";
  padding?: "none" | "compact" | "normal" | "spacious";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = "default",
      padding = "normal",
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-white text-slate-900",
      soft: "bg-slate-50 text-slate-900 border-y border-slate-200/60",
      dark: "hero-dark-bg text-white",
      transparent: "bg-transparent",
    };

    const paddingStyles = {
      none: "py-0",
      compact: "py-8 sm:py-12",
      normal: "py-12 sm:py-16 lg:py-24",
      spacious: "py-16 sm:py-24 lg:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden transition-colors duration-200",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
