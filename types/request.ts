export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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

export interface RequestAuthConfig {
  type: AuthType;
  apiKey?: ApiKeyAuth;
  bearer?: BearerAuth;
  basic?: BasicAuth;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: unknown;
  auth?: RequestAuthConfig;
}

export interface RequestResponseData {
  status: number;
  statusText: string;
  responseTime: number;
  headers: Record<string, string>;
  body: unknown;
  rawBody?: string;
  contentType: string | null;
}
