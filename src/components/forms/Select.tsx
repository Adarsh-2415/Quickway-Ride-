import React from "react";
import { cn } from "@/lib/utils";
import { Label, HelperText, ErrorText } from "../typography/Text";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      options,
      placeholder = "Select an option",
      helperText,
      error,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1">
        {label && <Label htmlFor={selectId}>{label}</Label>}
        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              "w-full h-11 pl-3.5 pr-10 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm appearance-none transition-all duration-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none shrink-0" />
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        {!error && helperText && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);

Select.displayName = "Select";
