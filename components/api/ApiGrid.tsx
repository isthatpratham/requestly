import * as React from "react";
import { ApiItem } from "@/types/api";
import { ApiRow } from "./ApiRow";
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
    <div className={className}>
      {/* Result counter — repository browser header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-default bg-background-secondary rounded-t-xs">
        <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">
          {apis.length} of {totalCount} APIs
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="font-mono text-[10px] text-text-muted hover:text-text-primary underline underline-offset-2 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Row list or empty state */}
      {apis.length > 0 ? (
        <div className="border border-t-0 border-border-default rounded-b-xs overflow-hidden divide-y-0">
          {apis.map((api) => (
            <ApiRow key={api.id} api={api} />
          ))}
        </div>
      ) : (
        <div className="border border-t-0 border-border-default rounded-b-xs px-6 py-16 text-center">
          <p className="font-display text-xl text-text-muted mb-2">No APIs found.</p>
          <p className="text-xs text-text-muted mb-6">
            Try clearing your search or filters to see all catalog APIs.
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
