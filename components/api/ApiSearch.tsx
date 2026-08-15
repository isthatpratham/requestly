import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface ApiSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ApiSearch: React.FC<ApiSearchProps> = ({
  value,
  onChange,
  placeholder = "Search APIs by name, description, or category...",
  className,
}) => {
  return (
    <div className={`relative w-full ${className || ""}`}>
      <div className="relative flex items-center">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search API catalog"
          className="pl-9 pr-9 text-sm font-sans"
        />
        <div className="absolute left-3 pointer-events-none text-text-muted">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zm5-1l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange("")}
            className="absolute right-1.5 h-6 w-6 text-text-muted hover:text-text-primary text-xs font-mono"
            aria-label="Clear search query"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
};
