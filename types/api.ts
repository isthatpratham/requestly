export interface ApiSource {
  provider: string;
  sourceUrl: string;
}

export interface ApiItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  auth: string | null;
  https: boolean;
  cors: "yes" | "no" | "unknown" | string | null;
  source?: ApiSource;
  createdAt?: string;
  updatedAt?: string;
}

export interface HealthCheckResult {
  status: "operational" | "unavailable" | "error" | "timeout";
  statusCode: number | null;
  responseTime: number | null;
  checkedAt: string;
  error?: {
    type: string;
    message: string;
  } | null;
}
