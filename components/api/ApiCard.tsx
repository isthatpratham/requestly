import * as React from "react";
import Link from "next/link";
import { ApiItem } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ApiStatus } from "./ApiStatus";
import { getMockHealth } from "@/data/mockHealth";

export interface ApiCardProps {
  api: ApiItem;
  className?: string;
}

export const ApiCard: React.FC<ApiCardProps> = ({ api, className }) => {
  const authLabel = api.auth ? api.auth : "No Auth";
  const health = getMockHealth(api.id);

  return (
    <div
      className={`p-5 rounded-sm border border-border-default bg-background-elevated space-y-4 hover:border-border-strong transition-colors flex flex-col justify-between ${className || ""}`}
    >
      <div className="space-y-2.5">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="default" size="sm">
              {api.category}
            </Badge>
            <Badge variant="outline" size="sm">
              {authLabel}
            </Badge>
            {api.https && (
              <Badge variant="outline" size="sm">
                HTTPS
              </Badge>
            )}
            {api.cors && (
              <Badge variant="outline" size="sm">
                CORS: {api.cors}
              </Badge>
            )}
          </div>
          <ApiStatus
            status={health.status}
            statusCode={health.statusCode}
            responseTime={health.responseTime}
          />
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-base font-semibold text-brand-black tracking-tight leading-snug">
            <Link
              href={`/explore/${api.id}`}
              className="hover:underline focus:outline-none focus:ring-1 focus:ring-brand-black rounded-xs"
            >
              {api.name}
            </Link>
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed mt-1 line-clamp-2">
            {api.description}
          </p>
        </div>

        {/* URL Endpoint Display */}
        <div className="p-2 rounded-xs bg-background-secondary border border-border-subtle font-mono text-[11px] text-text-muted truncate select-all">
          {api.url}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border-subtle gap-2">
        <Link href={`/explore/${api.id}`}>
          <Button variant="ghost" size="sm" className="text-xs text-text-secondary hover:text-brand-black px-2">
            Inspect Details
          </Button>
        </Link>

        <Link href={`/playground?api=${api.id}`}>
          <Button variant="outline" size="sm" className="text-xs font-mono gap-1">
            <span>Playground</span>
            <span>→</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
