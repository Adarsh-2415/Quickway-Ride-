import React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, disabled, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={cn(
            "w-4 h-4 mt-0.5 border-slate-300 rounded text-amber-500 focus:ring-amber-500 focus:ring-offset-0 disabled:opacity-50 cursor-pointer",
            className
          )}
          {...props}
        />
        <div className="text-sm select-none">
          <label htmlFor={checkboxId} className="font-medium text-slate-800 cursor-pointer">
            {label}
          </label>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
          {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={cn("inline-flex items-center space-x-3 select-none cursor-pointer", disabled && "opacity-50 pointer-events-none")}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
          checked ? "bg-amber-500" : "bg-slate-300"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-slate-800">{label}</span>}
    </label>
  );
};
