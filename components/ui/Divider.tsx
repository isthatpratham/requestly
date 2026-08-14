import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          "bg-border-default shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full my-4" : "w-[1px] h-full mx-4",
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
