import * as React from "react";
import { ApiItem } from "@/types/api";
import { ApiCard } from "./ApiCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export interface ApiGridProps {
  apis: ApiItem[];
  totalCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  className?: string;
}

export const ApiGrid: React.FC<ApiGridProps> = ({
  apis,
  totalCount,
  hasActiveFilters,
  onResetFilters,
  className,
}) => {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Result Counter Header */}
      <div className="flex items-center justify-between text-xs font-mono text-text-muted pb-2 border-b border-border-subtle">
        <span>
          SHOWING {apis.length} OF {totalCount} CATALOG APIS
        </span>
        {hasActiveFilters && (
          <span className="text-[11px] text-text-secondary">Filtered Results</span>
        )}
      </div>

      {/* Grid or Empty State */}
      {apis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => (
            <ApiCard key={api.id} api={api} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No public APIs match your criteria"
          description="Try broadening your search term or clearing active category, authentication, or protocol filters."
          action={
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Clear All Filters
            </Button>
          }
        />
      )}
    </div>
  );
};
