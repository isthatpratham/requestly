import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, rows = 4, ...props }, ref) => {
    return (
      <textarea
        rows={rows}
        className={cn(
          "flex w-full rounded-sm border border-border-default bg-background-elevated px-3 py-2 text-sm font-sans text-text-primary placeholder:text-text-disabled transition-colors duration-150 focus-visible:border-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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

Textarea.displayName = "Textarea";
