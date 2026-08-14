"use client";

import * as React from "react";
import { HealthCheckResult, HealthStatus } from "@/types/api";
import { ApiStatus } from "./ApiStatus";
import { Button } from "@/components/ui/Button";

export interface ApiHealthProps {
  apiId: string;
  initialHealth: HealthCheckResult;
}

export const ApiHealth: React.FC<ApiHealthProps> = ({ apiId, initialHealth }) => {
  const [health, setHealth] = React.useState<HealthCheckResult>(initialHealth);
  const [isChecking, setIsChecking] = React.useState<boolean>(false);

  const handleCheckAgain = () => {
    setIsChecking(true);
    // Simulate checking state before resolving (Tomorrow: GET /api/health?apiId=...)
    setTimeout(() => {
      setHealth({
        ...initialHealth,
        status: initialHealth.status,
        responseTime: initialHealth.responseTime
          ? Math.max(50, Math.round(initialHealth.responseTime + (Math.random() * 20 - 10)))
          : null,
        checkedAt: new Date().toISOString(),
      });
      setIsChecking(false);
    }, 600);
  };

  const currentStatus: HealthStatus = isChecking ? "checking" : health.status;

  return (
    <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="space-y-0.5">
          <div className="text-xs font-mono uppercase text-text-muted">Live Health Status</div>
          <div className="text-xs text-text-secondary">
            On-demand availability and endpoint reachability check
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          isLoading={isChecking}
          onClick={handleCheckAgain}
          className="font-mono text-xs"
        >
          Check Again
        </Button>
      </div>

      {/* Main Health Status Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xs bg-background-secondary border border-border-subtle">
        {/* Status Indicator */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-text-muted block">Reachability</span>
          <ApiStatus
            status={currentStatus}
            statusCode={health.statusCode}
            responseTime={health.responseTime}
          />
        </div>

        {/* Status Code */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-text-muted block">HTTP Status Code</span>
          <span className="font-mono text-xs font-semibold text-brand-black">
            {isChecking ? "Checking..." : health.statusCode ? `${health.statusCode}` : "No Response"}
          </span>
        </div>

        {/* Response Latency */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-text-muted block">Response Latency</span>
          <span className="font-mono text-xs font-semibold text-brand-black">
            {isChecking ? "Measuring..." : health.responseTime ? `${health.responseTime} ms` : "N/A"}
          </span>
        </div>
      </div>

      {/* Error Message Details if Error/Unavailable/Timeout */}
      {health.error && !isChecking && (
        <div className="p-3 rounded-xs bg-semantic-error-bg border border-red-200 text-xs space-y-1">
          <div className="font-mono font-semibold text-semantic-error-fg text-[11px]">
            [{health.error.type}]
          </div>
          <div className="text-semantic-error-fg leading-relaxed">{health.error.message}</div>
        </div>
      )}

      {/* Last Checked Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-1">
        <span>API ID: {apiId}</span>
        <span>
          Last checked: {isChecking ? "Checking now..." : new Date(health.checkedAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
