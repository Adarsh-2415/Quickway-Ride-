import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "narrow" | "wide" | "full";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "max-w-7xl",
      narrow: "max-w-3xl",
      wide: "max-w-[1536px]",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
