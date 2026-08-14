import * as React from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { MOCK_CATALOG_CATEGORIES } from "@/data/mockCatalog";

export interface ApiFiltersProps {
  category: string;
  onCategoryChange: (val: string) => void;
  auth: string;
  onAuthChange: (val: string) => void;
  https: string;
  onHttpsChange: (val: string) => void;
  cors: string;
  onCorsChange: (val: string) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  className?: string;
}

export const ApiFilters: React.FC<ApiFiltersProps> = ({
  category,
  onCategoryChange,
  auth,
  onAuthChange,
  https,
  onHttpsChange,
  cors,
  onCorsChange,
  hasActiveFilters,
  onResetFilters,
  className,
}) => {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-text-muted shrink-0 mr-1 select-none">
          Category:
        </span>
        {MOCK_CATALOG_CATEGORIES.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors whitespace-nowrap select-none ${
                isActive
                  ? "bg-brand-black text-brand-white border-brand-black font-semibold"
                  : "bg-background-elevated text-text-secondary border-border-default hover:border-border-strong"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Advanced Attribute Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div>
          <label className="block text-[11px] font-mono text-text-muted mb-1 select-none">
            Authentication
          </label>
          <Select
            value={auth}
            onChange={(e) => onAuthChange(e.target.value)}
            options={[
              { value: "all", label: "All Auth Types" },
              { value: "none", label: "No Auth (Public)" },
              { value: "apiKey", label: "API Key" },
              { value: "oauth", label: "OAuth 2.0" },
              { value: "bearer", label: "Bearer Token" },
            ]}
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted mb-1 select-none">
            HTTPS Protocol
          </label>
          <Select
            value={https}
            onChange={(e) => onHttpsChange(e.target.value)}
            options={[
              { value: "all", label: "All Protocols" },
              { value: "true", label: "HTTPS Only" },
              { value: "false", label: "HTTP Only" },
            ]}
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted mb-1 select-none">
            CORS Access
          </label>
          <Select
            value={cors}
            onChange={(e) => onCorsChange(e.target.value)}
            options={[
              { value: "all", label: "All CORS States" },
              { value: "yes", label: "CORS Supported" },
              { value: "no", label: "CORS Restricted" },
            ]}
          />
        </div>
      </div>

      {/* Active Filter Clear Action Bar */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-1 border-t border-border-subtle text-xs">
          <span className="text-text-muted font-mono text-[11px]">
            Filtered results active
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs text-semantic-error-fg hover:text-red-700 h-7 px-2"
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
