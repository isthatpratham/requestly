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

export type HealthStatus = "operational" | "unavailable" | "error" | "timeout" | "checking";

export interface HealthCheckResult {
  status: HealthStatus;
  statusCode: number | null;
  responseTime: number | null;
  checkedAt: string;
  error?: {
    type: string;
    message: string;
  } | null;
}

export interface ApiDetailModel {
  api: ApiItem;
  health: HealthCheckResult;
}

/* ===================================================
   PLAYGROUND & REQUEST ENGINE TYPES
   =================================================== */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HeaderPair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface QueryPair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export type AuthType = "none" | "apiKey" | "bearer" | "basic";

export interface ApiKeyAuth {
  key: string;
  value: string;
  location: "header" | "query";
}

export interface BearerAuth {
  token: string;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export interface AuthConfig {
  type: AuthType;
  apiKey?: ApiKeyAuth;
  bearer?: BearerAuth;
  basic?: BasicAuth;
}

export interface ApiRequestState {
  method: HttpMethod;
  url: string;
  query: QueryPair[];
  headers: HeaderPair[];
  body: string;
  auth: AuthConfig;
}

export interface ApiResponseData {
  status: number;
  statusText: string;
  responseTime: number;
  headers: Record<string, string>;
  body: unknown;
  rawBody: string;
  contentType: string | null;
}

export interface ApiResponseWrapper {
  success: boolean;
  data?: ApiResponseData;
  error?: {
    code: string;
    message: string;
  };
}

/* ===================================================
   COLLECTIONS & HISTORY TYPES
   =================================================== */

export interface Collection {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  apiIds: string[];
}

export interface HistoryEntry {
  id: string;
  method: HttpMethod;
  url: string;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
  authType: AuthType;
  status: number;
  statusText: string;
  responseTime: number;
  contentType: string | null;
  timestamp: string;
  isSuccess: boolean;
}
