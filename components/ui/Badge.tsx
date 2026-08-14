import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "operational" | "unavailable" | "checking" | "outline" | "warning";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center font-mono font-normal transition-colors select-none rounded-xs";

    const sizes = {
      sm: "px-1.5 py-0.5 text-[11px] leading-none gap-1",
      md: "px-2 py-1 text-xs leading-none gap-1.5",
    };

    const variants = {
      default: "bg-background-secondary text-text-secondary border border-border-default",
      outline: "bg-transparent text-text-muted border border-border-subtle",
      operational: "bg-semantic-success-bg text-semantic-success-fg border border-emerald-200",
      unavailable: "bg-semantic-error-bg text-semantic-error-fg border border-red-200",
      checking: "bg-semantic-info-bg text-semantic-info-fg border border-blue-200",
      warning: "bg-semantic-warning-bg text-semantic-warning-fg border border-yellow-200",
    };

    return (
      <div ref={ref} className={cn(baseStyles, sizes[size], variants[variant], className)} {...props}>
        {variant === "operational" && <span className="text-[10px]">●</span>}
        {variant === "unavailable" && <span className="text-[10px]">○</span>}
        {variant === "checking" && <span className="text-[10px] animate-pulse">◌</span>}
        <span>{children}</span>
      </div>
    );
  }
);

Badge.displayName = "Badge";
