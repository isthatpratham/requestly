"use client";

import * as React from "react";
import { ApiResponseWrapper } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export interface ResponseViewerProps {
  response: ApiResponseWrapper | null;
  isSending: boolean;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isSending }) => {
  const [activeTab, setActiveTab] = React.useState<"body" | "raw" | "headers">("body");

  if (isSending) {
    return (
      <div className="p-8 rounded-sm border border-border-default bg-background-elevated space-y-4 flex flex-col items-center justify-center min-h-[360px]">
        <div className="h-6 w-6 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
        <div className="text-xs font-mono text-text-muted">Executing request...</div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="p-8 rounded-sm border border-border-default bg-background-elevated flex items-center justify-center min-h-[360px]">
        <EmptyState
          title="No response yet"
          description="Enter an API endpoint URL above and click 'Send' to inspect live headers, status codes, and JSON response bodies."
        />
      </div>
    );
  }

  if (!response.success && response.error) {
    return (
      <div className="p-6 rounded-sm border border-red-200 bg-semantic-error-bg space-y-4 min-h-[360px]">
        <div className="flex items-center justify-between border-b border-red-200 pb-3">
          <Badge variant="warning" size="sm" className="font-mono">
            REQUEST FAILED // {response.error.code}
          </Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-semantic-error-fg font-mono">
            Error: {response.error.code}
          </h3>
          <p className="text-xs text-semantic-error-fg leading-relaxed">
            {response.error.message}
          </p>
        </div>
      </div>
    );
  }

  const resData = response.data!;
  const is2xx = resData.status >= 200 && resData.status < 300;
  const is4xx = resData.status >= 400 && resData.status < 500;
  const is5xx = resData.status >= 500;

  return (
    <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-4 min-h-[360px] flex flex-col justify-between">
      <div className="space-y-4">
        {/* Status Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3">
          <div className="flex items-center gap-3">
            <Badge
              variant={is2xx ? "operational" : is4xx || is5xx ? "warning" : "default"}
              className="font-mono font-bold"
            >
              {resData.status} {resData.statusText}
            </Badge>

            <span className="text-xs font-mono text-text-muted">
              Latency: <strong className="text-brand-black">{resData.responseTime} ms</strong>
            </span>
          </div>

          <div className="text-[11px] font-mono text-text-muted truncate max-w-[200px]">
            {resData.contentType || "application/json"}
          </div>
        </div>

        {/* Response Tabs (Body Pretty / Body Raw / Headers) */}
        <div className="border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("body")}
              className={`px-3 py-1.5 text-xs font-mono border-b-2 transition-colors ${
                activeTab === "body"
                  ? "border-brand-black text-brand-black font-semibold"
                  : "border-transparent text-text-secondary hover:text-brand-black"
              }`}
            >
              Pretty Body
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("raw")}
              className={`px-3 py-1.5 text-xs font-mono border-b-2 transition-colors ${
                activeTab === "raw"
                  ? "border-brand-black text-brand-black font-semibold"
                  : "border-transparent text-text-secondary hover:text-brand-black"
              }`}
            >
              Raw Text
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("headers")}
              className={`px-3 py-1.5 text-xs font-mono border-b-2 transition-colors ${
                activeTab === "headers"
                  ? "border-brand-black text-brand-black font-semibold"
                  : "border-transparent text-text-secondary hover:text-brand-black"
              }`}
            >
              Headers ({Object.keys(resData.headers).length})
            </button>
          </div>
        </div>

        {/* Tab Body Contents */}
        <div>
          {activeTab === "body" && (
            <pre className="p-3 rounded-xs bg-neutral-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[420px] leading-relaxed border border-neutral-800 select-all">
              <code>{resData.rawBody || JSON.stringify(resData.body, null, 2)}</code>
            </pre>
          )}

          {activeTab === "raw" && (
            <pre className="p-3 rounded-xs bg-neutral-900 text-neutral-200 font-mono text-xs overflow-x-auto max-h-[420px] leading-relaxed border border-neutral-800 select-all">
              <code>{typeof resData.body === "string" ? resData.body : resData.rawBody}</code>
            </pre>
          )}

          {activeTab === "headers" && (
            <div className="p-3 rounded-xs bg-background-secondary border border-border-subtle font-mono text-xs space-y-1.5 max-h-[420px] overflow-y-auto">
              {Object.entries(resData.headers).map(([key, val]) => (
                <div key={key} className="flex items-start gap-2 border-b border-border-subtle pb-1">
                  <span className="text-text-muted select-none w-36 shrink-0 font-semibold">{key}:</span>
                  <span className="text-text-primary select-all break-all">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
