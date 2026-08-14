import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:pointer-events-none disabled:opacity-50 select-none rounded-sm";

    const variants = {
      primary: "bg-brand-black text-brand-white hover:bg-neutral-800 active:bg-neutral-900 border border-transparent",
      secondary: "bg-background-elevated text-text-primary border border-border-default hover:bg-background-secondary active:bg-neutral-200",
      outline: "bg-transparent text-text-primary border border-border-default hover:bg-background-secondary active:bg-neutral-100",
      ghost: "bg-transparent text-text-primary hover:bg-background-secondary active:bg-neutral-200 border border-transparent",
      destructive: "bg-semantic-error-bg text-semantic-error-fg border border-red-200 hover:bg-red-100 active:bg-red-200",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs tracking-tight gap-1.5",
      md: "h-9 px-4 text-sm tracking-tight gap-2",
      lg: "h-10 px-5 text-sm tracking-tight gap-2.5",
      icon: "h-9 w-9 p-0 text-sm",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-3.5 w-3.5 currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
