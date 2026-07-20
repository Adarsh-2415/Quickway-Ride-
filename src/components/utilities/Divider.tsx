import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = "horizontal",
  label,
  ...props
}) => {
  if (orientation === "vertical") {
    return <div className={cn("w-px bg-slate-200 self-stretch my-1", className)} {...props} />;
  }

  if (label) {
    return (
      <div className={cn("relative flex items-center w-full my-4", className)} {...props}>
        <div className="flex-grow border-t border-slate-200" />
        <span className="shrink px-3 text-xs uppercase tracking-wider text-slate-400 font-medium bg-white">
          {label}
        </span>
        <div className="flex-grow border-t border-slate-200" />
      </div>
    );
  }

  return <hr className={cn("w-full border-t border-slate-200/80 my-4", className)} {...props} />;
};
