import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = "info",
  title,
  onClose,
  children,
  ...props
}) => {
  const variantStyles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    error: "bg-red-50 border-red-200 text-red-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    error: <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-xl flex items-start space-x-3 text-sm relative transition-all duration-200",
        variantStyles[variant],
        className
      )}
      role="alert"
      {...props}
    >
      {iconMap[variant]}
      <div className="flex-1 space-y-1 pr-6">
        {title && <h4 className="font-semibold font-heading tracking-tight">{title}</h4>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          className="absolute top-3.5 right-3.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
