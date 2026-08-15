import * as React from "react";
import Link from "next/link";
import { ApiItem, HealthCheckResult } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { ApiEndpoint } from "./ApiEndpoint";
import { ApiHealth } from "./ApiHealth";
import { ApiMetadata } from "./ApiMetadata";
import { ApiActions } from "./ApiActions";
import { getMockHealth } from "@/data/mockHealth";

export interface ApiDetailsProps {
  api: ApiItem;
  initialHealth?: HealthCheckResult;
}

export const ApiDetails: React.FC<ApiDetailsProps> = ({ api, initialHealth }) => {
  const health = initialHealth || getMockHealth(api.id);

  return (
    <div className="space-y-8">
      {/* Breadcrumb Contextual Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/explore" className="hover:text-brand-black transition-colors">
          Explore Catalog
        </Link>
        <span>/</span>
        <span className="text-brand-black font-semibold truncate">{api.name}</span>
      </nav>

      {/* Main Header Block */}
      <div className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-4 shadow-subtle">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              {api.category}
            </Badge>
            <Badge variant="outline" size="sm">
              {api.auth ? api.auth : "No Auth"}
            </Badge>
          </div>
          <div className="text-xs font-mono text-text-muted">
            ID: {api.id}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-black leading-tight">
            {api.name}
          </h1>
          <p className="text-sm font-normal text-text-secondary leading-relaxed max-w-3xl">
            {api.description}
          </p>
        </div>

        {/* Primary & Secondary Action Bar */}
        <div className="pt-2">
          <ApiActions apiId={api.id} url={api.url} />
        </div>
      </div>

      {/* Primary Endpoint Section */}
      <ApiEndpoint url={api.url} method="GET" />

      {/* Interactive Live Health Section */}
      <ApiHealth apiId={api.id} url={api.url} initialHealth={health} />

      {/* Technical Metadata Section */}
      <ApiMetadata api={api} />
    </div>
  );
};
