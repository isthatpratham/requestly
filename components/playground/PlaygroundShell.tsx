"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ApiRequestState, ApiResponseWrapper } from "@/types/api";
import { recordHistoryEntry } from "@/lib/storage/historyStorage";
import { RequestBuilder } from "./RequestBuilder";
import { ResponseViewer } from "./ResponseViewer";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";

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
    <Container className="py-8 space-y-8">
      {/* Page Heading */}
      <PageHeading
        title="API Playground"
        description="Construct, configure, and test arbitrary HTTP API requests. Inspect live response codes, headers, and JSON body payloads."
        badge={
          <Badge variant="outline" size="sm" className="font-mono">
            {loadedApiName ? `PRELOADED // ${loadedApiName}` : "API WORKSPACE"}
          </Badge>
        }
      />

      {/* Main Split Layout: Request Builder on Left/Top, Response Viewer on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-brand-black tracking-tight border-b border-border-subtle pb-2 font-mono uppercase">
            Request Configuration
          </h2>
          <RequestBuilder
            requestState={requestState}
            onRequestChange={setRequestState}
            onSend={handleSendRequest}
            isSending={isSending}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-brand-black tracking-tight border-b border-border-subtle pb-2 font-mono uppercase">
            Response Output
          </h2>
          <ResponseViewer response={response} isSending={isSending} />
        </div>
      </div>
    </Container>
  );
};
