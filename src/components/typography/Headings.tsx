import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const HeroHeading: React.FC<HeadingProps> = ({
  className,
  as: Component = "h1",
  children,
  ...props
}) => (
  <Component
    className={cn(
      "font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const PageHeading: React.FC<HeadingProps> = ({
  className,
  as: Component = "h1",
  children,
  ...props
}) => (
  <Component
    className={cn(
      "font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const SectionHeading: React.FC<HeadingProps> = ({
  className,
  as: Component = "h2",
  children,
  ...props
}) => (
  <Component
    className={cn(
      "font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-snug",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const SubHeading: React.FC<HeadingProps> = ({
  className,
  as: Component = "h3",
  children,
  ...props
}) => (
  <Component
    className={cn(
      "font-heading text-lg sm:text-xl font-semibold tracking-tight text-slate-800 leading-snug",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const CardHeading: React.FC<HeadingProps> = ({
  className,
  as: Component = "h4",
  children,
  ...props
}) => (
  <Component
    className={cn(
      "font-heading text-base sm:text-lg font-semibold tracking-tight text-slate-900 leading-snug",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);
