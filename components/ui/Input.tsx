import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-sm border border-border-default bg-background-elevated px-3 py-1.5 text-sm font-sans text-text-primary placeholder:text-text-disabled transition-colors duration-150 focus-visible:border-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-semantic-error-fg focus-visible:ring-semantic-error-fg",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
