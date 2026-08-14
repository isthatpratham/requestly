import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { HealthStatus } from "@/types/api";

export interface ApiStatusProps {
  status?: HealthStatus | "unknown";
  statusCode?: number | null;
  responseTime?: number | null;
  className?: string;
}

export const ApiStatus: React.FC<ApiStatusProps> = ({
  status = "operational",
  statusCode,
  responseTime,
  className,
}) => {
  if (status === "operational") {
    return (
      <Badge variant="operational" className={className}>
        Operational {statusCode ? `(${statusCode})` : ""} {responseTime ? `· ${responseTime}ms` : ""}
      </Badge>
    );
  }

  if (status === "unavailable") {
    return (
      <Badge variant="unavailable" className={className}>
        Unavailable
      </Badge>
    );
  }

  if (status === "timeout") {
    return (
      <Badge variant="warning" className={className}>
        Timeout (5.0s)
      </Badge>
    );
  }

  if (status === "error") {
    return (
      <Badge variant="warning" className={className}>
        {statusCode ? `HTTP ${statusCode}` : "Check Error"}
      </Badge>
    );
  }

  if (status === "checking") {
    return (
      <Badge variant="checking" className={className}>
        Checking...
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={className}>
      Status Unknown
    </Badge>
  );
};
