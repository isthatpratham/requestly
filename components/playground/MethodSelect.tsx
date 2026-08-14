import * as React from "react";
import { HttpMethod } from "@/types/api";

export interface MethodSelectProps {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
  disabled?: boolean;
  className?: string;
}

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const MethodSelect: React.FC<MethodSelectProps> = ({
  value,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <div className={`relative ${className || ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as HttpMethod)}
        disabled={disabled}
        aria-label="HTTP Method"
        className="h-10 px-3 pr-7 py-1 text-xs font-mono font-bold rounded-xs border border-border-default bg-background-elevated text-brand-black appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-black transition-colors"
      >
        {METHODS.map((m) => (
          <option key={m} value={m} className="font-mono font-bold text-neutral-900 bg-white">
            {m}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-muted select-none">
        ▼
      </div>
    </div>
  );
};
