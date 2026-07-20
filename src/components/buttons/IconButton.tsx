import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "md",
      icon,
      "aria-label": ariaLabel,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-amber-500 text-slate-900 hover:bg-amber-600 active:bg-amber-700",
      navy: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950",
      outline: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    };

    const sizeStyles = {
      sm: "w-8 h-8 rounded-md text-xs",
      md: "w-10 h-10 rounded-lg text-sm",
      lg: "w-12 h-12 rounded-xl text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shrink-0",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
