import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "md",
  text,
  className,
  ...props
}) => {
  const sizes = {
    sm: "h-3.5 w-3.5 border-2",
    md: "h-5 w-5 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center p-6 gap-3 select-none", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-text-primary/20 border-t-text-primary",
          sizes[size]
        )}
      />
      {text && <p className="text-xs font-mono text-text-muted">{text}</p>}
    </div>
  );
};

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-xs bg-background-secondary border border-border-subtle", className)}
      {...props}
    />
  );
};
