import React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

const gapMap = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const VStack: React.FC<StackProps> = ({
  className,
  gap = 4,
  align = "stretch",
  justify = "start",
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col",
      gapMap[gap],
      alignMap[align],
      justifyMap[justify],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const HStack: React.FC<StackProps> = ({
  className,
  gap = 4,
  align = "center",
  justify = "start",
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-row flex-wrap",
      gapMap[gap],
      alignMap[align],
      justifyMap[justify],
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const PageWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn("min-h-screen flex flex-col bg-white text-slate-900", className)}
    {...props}
  >
    {children}
  </div>
);
