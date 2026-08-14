import * as React from "react";
import { ApiItem } from "@/types/api";

export interface ApiMetadataProps {
  api: ApiItem;
}

export const ApiMetadata: React.FC<ApiMetadataProps> = ({ api }) => {
  return (
    <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-4">
      <h3 className="text-sm font-semibold text-brand-black tracking-tight border-b border-border-subtle pb-2.5">
        Technical Specifications & Requirements
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Category */}
        <div className="space-y-1 p-3 rounded-xs bg-background-secondary border border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted block">Catalog Category</span>
          <span className="text-xs font-semibold text-brand-black">{api.category}</span>
        </div>

        {/* Authentication */}
        <div className="space-y-1 p-3 rounded-xs bg-background-secondary border border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted block">Authentication</span>
          <span className="text-xs font-semibold text-brand-black">
            {api.auth ? api.auth : "None Required"}
          </span>
        </div>

        {/* HTTPS Support */}
        <div className="space-y-1 p-3 rounded-xs bg-background-secondary border border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted block">HTTPS Encryption</span>
          <span className="text-xs font-semibold text-brand-black">
            {api.https ? "Supported (HTTPS)" : "Unencrypted (HTTP)"}
          </span>
        </div>

        {/* CORS Access */}
        <div className="space-y-1 p-3 rounded-xs bg-background-secondary border border-border-subtle">
          <span className="text-[11px] font-mono text-text-muted block">CORS Support</span>
          <span className="text-xs font-semibold text-brand-black">{api.cors || "Unknown"}</span>
        </div>
      </div>

      {/* Additional Dataset Source Metadata */}
      {api.source && (
        <div className="pt-2 text-xs font-mono text-text-muted flex items-center justify-between border-t border-border-subtle">
          <span>Source Provider: {api.source.provider}</span>
          <a
            href={api.source.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-black underline"
          >
            Source Repository ↗
          </a>
        </div>
      )}
    </div>
  );
};
