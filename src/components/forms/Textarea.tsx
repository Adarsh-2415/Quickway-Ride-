import React from "react";
import { cn } from "@/lib/utils";
import { Label, HelperText, ErrorText } from "../typography/Text";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, disabled, ...props }, ref) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1">
        {label && <Label htmlFor={textareaId}>{label}</Label>}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={cn(
            "w-full min-h-[100px] p-3.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed resize-y",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
        {!error && helperText && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
