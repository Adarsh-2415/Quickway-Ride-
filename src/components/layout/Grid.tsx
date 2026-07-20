import React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  colsSm?: 1 | 2 | 3 | 4;
  colsMd?: 1 | 2 | 3 | 4;
  colsLg?: 1 | 2 | 3 | 4 | 6;
  gap?: 2 | 3 | 4 | 6 | 8 | 10 | 12;
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const colsSmMap = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const colsMdMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const colsLgMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
};

const gapMap = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export const Grid: React.FC<GridProps> = ({
  className,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  gap = 6,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "grid",
        colsMap[cols],
        colsSm && colsSmMap[colsSm],
        colsMd && colsMdMap[colsMd],
        colsLg && colsLgMap[colsLg],
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
