import * as React from "react";
import { Input } from "@/components/ui/Input";

export interface UrlInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Enter request URL (e.g. https://api.github.com/users/octocat)",
  className,
}) => {
  return (
    <div className={`relative flex-1 ${className || ""}`}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Request URL Endpoint"
        className="h-10 font-mono text-xs pl-3 pr-8 w-full bg-background-elevated border-border-default focus:border-brand-black"
      />
      {value && !disabled && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear URL input"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted hover:text-brand-black transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};
