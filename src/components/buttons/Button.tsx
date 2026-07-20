import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = disabled || isDisabled || isLoading;

    const variantStyles = {
      primary:
        "bg-amber-500 text-slate-900 font-semibold hover:bg-amber-600 active:bg-amber-700 shadow-sm hover:shadow-amber-500/20 border border-amber-500/40",
      navy:
        "bg-slate-900 text-white font-semibold hover:bg-slate-800 active:bg-slate-950 shadow-sm border border-slate-800",
      outline:
        "bg-white text-slate-800 font-medium border border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100",
      ghost:
        "bg-transparent text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
      link:
        "bg-transparent text-blue-600 font-medium underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs gap-1.5 rounded-md",
      md: "h-11 px-5 text-sm gap-2 rounded-lg",
      lg: "h-13 px-7 text-base gap-2.5 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={isButtonDisabled}
        className={cn(
          "inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none select-none cursor-pointer",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {!isLoading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
