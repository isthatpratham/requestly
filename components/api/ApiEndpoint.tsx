"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export interface ApiEndpointProps {
  url: string;
  method?: string;
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({ url, method = "GET" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-sm border border-border-default bg-background-elevated space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          Primary Endpoint Base URL
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs font-mono text-text-secondary hover:text-brand-black"
        >
          {copied ? "✓ Copied" : "Copy Endpoint"}
        </Button>
      </div>

      <div className="flex items-center gap-2 p-2.5 rounded-xs bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto border border-neutral-800">
        <span className="px-1.5 py-0.5 rounded-xs bg-neutral-800 text-emerald-400 font-bold text-[11px]">
          {method}
        </span>
        <span className="select-all break-all">{url}</span>
      </div>
    </div>
  );
};
