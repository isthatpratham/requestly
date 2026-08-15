import * as React from "react";
import Link from "next/link";
import { ApiItem, HealthCheckResult } from "@/types/api";
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
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 space-y-10">
      {/* Breadcrumb Contextual Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <Link href="/explore" className="hover:text-text-primary transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-text-muted">{api.category}</span>
        <span>/</span>
        <span className="text-text-primary font-medium truncate">{api.name}</span>
      </nav>

      {/* Main Technical Reference Header */}
      <div className="border-b border-border-default pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-text-muted bg-background-secondary border border-border-subtle px-2 py-0.5 rounded-xs">
              {api.category}
            </span>
            <span className="font-mono text-[10px] text-text-secondary border border-border-default px-2 py-0.5 rounded-xs">
              {api.auth ? api.auth : "No Auth required"}
            </span>
          </div>
          <div className="font-mono text-[11px] text-text-muted">
            ID: {api.id}
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-brand-black leading-tight">
          {api.name}
        </h1>

        <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
          {api.description}
        </p>

        {/* Primary Actions Bar */}
        <div className="pt-3">
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
