"use client";

import * as React from "react";
import { ApiRequestState } from "@/types/api";
import { MethodSelect } from "./MethodSelect";
import { UrlInput } from "./UrlInput";
import { QueryEditor } from "./QueryEditor";
import { HeadersEditor } from "./HeadersEditor";
import { AuthEditor } from "./AuthEditor";
import { BodyEditor } from "./BodyEditor";
import { Button } from "@/components/ui/Button";

export interface RequestBuilderProps {
  requestState: ApiRequestState;
  onRequestChange: (req: ApiRequestState) => void;
  onSend: () => void;
  isSending: boolean;
}

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  requestState,
  onRequestChange,
  onSend,
  isSending,
}) => {
  const [activeTab, setActiveTab] = React.useState<"params" | "headers" | "auth" | "body">(
    "params"
  );

  const isBodyAllowed = ["POST", "PUT", "PATCH"].includes(requestState.method);
  const activeParamsCount = requestState.query.filter((q) => q.enabled && q.key.trim()).length;
  const activeHeadersCount = requestState.headers.filter((h) => h.enabled && h.key.trim()).length;
  const isAuthConfigured = requestState.auth.type !== "none";

  return (
    <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-5">
      {/* Top Method + URL + Send Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <MethodSelect
          value={requestState.method}
          onChange={(m) => onRequestChange({ ...requestState, method: m })}
          disabled={isSending}
        />

        <UrlInput
          value={requestState.url}
          onChange={(u) => onRequestChange({ ...requestState, url: u })}
          disabled={isSending}
        />

        <Button
          variant="primary"
          size="md"
          isLoading={isSending}
          onClick={onSend}
          className="h-10 px-6 font-mono text-xs font-bold shrink-0"
        >
          {isSending ? "Sending..." : "Send →"}
        </Button>
      </div>

      {/* Request Configuration Tabs */}
      <div className="border-b border-border-subtle flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("params")}
          className={`px-3 py-2 text-xs font-mono border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "params"
              ? "border-brand-black text-brand-black font-semibold"
              : "border-transparent text-text-secondary hover:text-brand-black"
          }`}
        >
          <span>Params</span>
          {activeParamsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-200 text-neutral-800 font-bold">
              {activeParamsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("headers")}
          className={`px-3 py-2 text-xs font-mono border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "headers"
              ? "border-brand-black text-brand-black font-semibold"
              : "border-transparent text-text-secondary hover:text-brand-black"
          }`}
        >
          <span>Headers</span>
          {activeHeadersCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-200 text-neutral-800 font-bold">
              {activeHeadersCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("auth")}
          className={`px-3 py-2 text-xs font-mono border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "auth"
              ? "border-brand-black text-brand-black font-semibold"
              : "border-transparent text-text-secondary hover:text-brand-black"
          }`}
        >
          <span>Auth</span>
          {isAuthConfigured && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
              ●
            </span>
          )}
        </button>

        {isBodyAllowed && (
          <button
            type="button"
            onClick={() => setActiveTab("body")}
            className={`px-3 py-2 text-xs font-mono border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "body"
                ? "border-brand-black text-brand-black font-semibold"
                : "border-transparent text-text-secondary hover:text-brand-black"
            }`}
          >
            <span>Body</span>
            {requestState.body.trim() !== "" && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800 font-bold">
                JSON
              </span>
            )}
          </button>
        )}
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {activeTab === "params" && (
          <QueryEditor
            query={requestState.query}
            onChange={(q) => onRequestChange({ ...requestState, query: q })}
          />
        )}

        {activeTab === "headers" && (
          <HeadersEditor
            headers={requestState.headers}
            onChange={(h) => onRequestChange({ ...requestState, headers: h })}
          />
        )}

        {activeTab === "auth" && (
          <AuthEditor
            auth={requestState.auth}
            onChange={(a) => onRequestChange({ ...requestState, auth: a })}
          />
        )}

        {activeTab === "body" && isBodyAllowed && (
          <BodyEditor
            body={requestState.body}
            onChange={(b) => onRequestChange({ ...requestState, body: b })}
            disabled={isSending}
          />
        )}
      </div>
    </div>
  );
};
