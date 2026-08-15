"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ApiRequestState, ApiResponseWrapper } from "@/types/api";
import { recordHistoryEntry } from "@/lib/storage/historyStorage";
import { RequestBuilder } from "./RequestBuilder";
import { ResponseViewer } from "./ResponseViewer";

export const PlaygroundShell: React.FC = () => {
  const searchParams = useSearchParams();
  const targetApiId = searchParams.get("api");
  const prefillUrl = searchParams.get("url");
  const prefillMethod = searchParams.get("method");

  // Initial Request State
  const [requestState, setRequestState] = React.useState<ApiRequestState>({
    method: (prefillMethod as ApiRequestState["method"]) || "GET",
    url: prefillUrl || "https://api.github.com/users/octocat",
    query: [],
    headers: [
      { id: "h_1", key: "Accept", value: "application/json", enabled: true },
    ],
    body: "",
    auth: { type: "none" },
  });

  const [response, setResponse] = React.useState<ApiResponseWrapper | null>(null);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const [loadedApiName, setLoadedApiName] = React.useState<string | null>(null);

  // Preload from ?api=[id] or ?url=[url] parameter if present
  React.useEffect(() => {
    if (targetApiId) {
      fetch(`/api/apis/${targetApiId}`)
        .then((r) => r.json())
        .then((res) => {
          if (res.success && res.data?.api) {
            const catalogApi = res.data.api;
            setLoadedApiName(catalogApi.name);

            let authType: "none" | "apiKey" | "bearer" | "basic" = "none";
            if (catalogApi.auth?.toLowerCase().includes("key")) authType = "apiKey";
            if (catalogApi.auth?.toLowerCase().includes("bearer")) authType = "bearer";

            setRequestState({
              method: "GET",
              url: catalogApi.url,
              query: [],
              headers: [
                { id: "h_1", key: "Accept", value: "application/json", enabled: true },
              ],
              body: "",
              auth: {
                type: authType,
                apiKey: { key: "X-API-Key", value: "", location: "header" },
                bearer: { token: "" },
                basic: { username: "", password: "" },
              },
            });
          }
        })
        .catch(() => {
          // Fallback gracefully if catalog fetch fails
        });
      return;
    }

    if (prefillUrl) {
      setRequestState((prev) => ({
        ...prev,
        url: prefillUrl,
        method: (prefillMethod as ApiRequestState["method"]) || prev.method,
      }));
    }
  }, [targetApiId, prefillUrl, prefillMethod]);

  // Execute Real Request Handler via POST /api/request & Record History
  const handleSendRequest = async () => {
    setIsSending(true);
    setResponse(null);
    try {
      const httpRes = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestState),
      });

      const res: ApiResponseWrapper = await httpRes.json();
      setResponse(res);

      // Record to history safely
      if (res.success && res.data) {
        recordHistoryEntry(requestState, res.data);
      } else if (res.error) {
        recordHistoryEntry(requestState, null, res.error.message);
      }
    } catch {
      const errResponse: ApiResponseWrapper = {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred during request execution.",
        },
      };
      setResponse(errResponse);
      recordHistoryEntry(requestState, null, "Unexpected Execution Error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "72px" }}>
      {/* Workspace Header */}
      <div className="border-b border-border-default bg-background-secondary">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
              {loadedApiName ? `Preloaded // ${loadedApiName}` : "Developer Instrument"}
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              POST /api/request · SSRF Protection Active
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-brand-black tracking-tight mb-2">
            API Playground
          </h1>
          <p className="text-sm text-text-secondary max-w-lg leading-relaxed">
            Construct, configure, and execute arbitrary HTTP requests server-side.
            Inspect live HTTP status, response headers, and raw JSON payloads.
          </p>
        </div>
      </div>

      {/* Main Split Layout: Request Builder on Left/Top, Response Viewer on Right/Bottom */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase font-semibold">
                01 // Request Configuration
              </span>
              <span className="font-mono text-[10px] text-text-muted">
                {requestState.method}
              </span>
            </div>
            <RequestBuilder
              requestState={requestState}
              onRequestChange={setRequestState}
              onSend={handleSendRequest}
              isSending={isSending}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase font-semibold">
                02 // Response Output
              </span>
              {isSending && (
                <span className="font-mono text-[10px] text-accent-blue animate-pulse">
                  Sending request…
                </span>
              )}
            </div>
            <ResponseViewer response={response} isSending={isSending} />
          </div>
        </div>
      </div>
    </div>
  );
};
