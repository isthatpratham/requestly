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
        <div className="absolute left-3 pointer-events-none text-text-muted text-xs font-mono">
          🔍
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
