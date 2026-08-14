import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-xs font-medium tracking-tight text-text-secondary mb-1 select-none",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-0.5 text-semantic-error-fg">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
