import React from "react";
import { cn } from "@/lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const BodyLarge: React.FC<TextProps> = ({ className, children, ...props }) => (
  <p
    className={cn("text-base sm:text-lg text-slate-600 leading-relaxed font-normal", className)}
    {...props}
  >
    {children}
  </p>
);

export const BodyRegular: React.FC<TextProps> = ({ className, children, ...props }) => (
  <p
    className={cn("text-sm sm:text-base text-slate-600 leading-normal font-normal", className)}
    {...props}
  >
    {children}
  </p>
);

export const BodySmall: React.FC<TextProps> = ({ className, children, ...props }) => (
  <p
    className={cn("text-xs sm:text-sm text-slate-500 leading-normal font-normal", className)}
    {...props}
  >
    {children}
  </p>
);

export const Caption: React.FC<TextProps> = ({ className, children, ...props }) => (
  <span
    className={cn("text-xs text-slate-500 font-medium tracking-wide uppercase", className)}
    {...props}
  >
    {children}
  </span>
);

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  children,
  ...props
}) => (
  <label
    className={cn("text-xs sm:text-sm font-semibold text-slate-800 tracking-tight block mb-1.5", className)}
    {...props}
  >
    {children}
  </label>
);

export const HelperText: React.FC<TextProps> = ({ className, children, ...props }) => (
  <p className={cn("text-xs text-slate-500 mt-1.5", className)} {...props}>
    {children}
  </p>
);

export const ErrorText: React.FC<TextProps> = ({ className, children, ...props }) => (
  <p className={cn("text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1", className)} {...props}>
    {children}
  </p>
);
