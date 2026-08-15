/**
 * lib/requestEngine.ts
 *
 * Core Request Execution Engine for Requestly.
 * Executes outbound HTTP requests on behalf of the API Playground,
 * applying strict input validation, SSRF security protection, header injection defenses,
 * credential handling, hard timeouts, bounded response streaming, and response normalization.
 *
 * ⚠️  Server-side only. Never import into Client Components.
 * ⚠️  NEVER log authorization tokens, passwords, or API keys.
 */

import { isSsrfSafeUrl } from "@/lib/healthCheck";
import type {
  ApiRequestState,
  ApiResponseData,
  ApiResponseWrapper,
  AuthConfig,
  HeaderPair,
  HttpMethod,
  QueryPair,
} from "@/types/api";

const REQUEST_TIMEOUT_MS = 5_000;
const MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024; // 2 MB
const MAX_RESPONSE_BODY_BYTES = 5 * 1024 * 1024; // 5 MB

export interface RawApiRequestInput {
  method?: string;
  url?: string;
  query?: Record<string, string> | QueryPair[];
  headers?: Record<string, string> | HeaderPair[];
  body?: unknown;
  auth?: AuthConfig;
}

/**
 * Streams & reads response body up to maxBytes.
 * Cancels stream immediately if size exceeds limit to prevent memory buffering.
 */
async function readBoundedResponseBody(
  response: Response,
  maxBytes: number
): Promise<{ rawBody: string; tooLarge: boolean }> {
  if (!response.body) {
    const text = await response.text();
    if (Buffer.byteLength(text, "utf8") > maxBytes) {
      return { rawBody: "", tooLarge: true };
    }
    return { rawBody: text, tooLarge: false };
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          try {
            await reader.cancel();
          } catch {
            // Reader cancel fallback
          }
          return { rawBody: "", tooLarge: true };
        }
        chunks.push(value);
      }
    }
  } catch {
    // If reading stream throws or gets aborted
  }

  const concatenated = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    concatenated.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const rawBody = new TextDecoder("utf-8").decode(concatenated);
  return { rawBody, tooLarge: false };
}

/**
 * Validates request input and executes an outbound HTTP request safely.
 */
export async function executeApiRequest(
  input: RawApiRequestInput | ApiRequestState
): Promise<ApiResponseWrapper> {
  const startTime = performance.now();

  // ── 1. Validate Method ─────────────────────────────────────────────
  const rawMethod = (input.method ?? "GET").toString().toUpperCase().trim();
  const allowedMethods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  if (!allowedMethods.includes(rawMethod as HttpMethod)) {
    return {
      success: false,
      error: {
        code: "UNSUPPORTED_METHOD",
        message: `HTTP method '${rawMethod}' is unsupported. Allowed: ${allowedMethods.join(", ")}.`,
      },
    };
  }
  const method = rawMethod as HttpMethod;

  // ── 2. Validate URL & Protocol ─────────────────────────────────────
  if (!input.url || typeof input.url !== "string" || input.url.trim() === "") {
    return {
      success: false,
      error: {
        code: "INVALID_URL",
        message: "Target URL cannot be empty.",
      },
    };
  }

  let rawUrl = input.url.trim();
  if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = `https://${rawUrl}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    return {
      success: false,
      error: {
        code: "INVALID_URL",
        message: `Invalid URL format: '${input.url}'.`,
      },
    };
  }

  // Reject embedded URL credentials (https://user:pass@host)
  if (parsedUrl.username || parsedUrl.password) {
    return {
      success: false,
      error: {
        code: "INVALID_URL",
        message: "Embedded credentials in URL (username:password@) are not allowed.",
      },
    };
  }

  // ── 3. SSRF Protection ─────────────────────────────────────────────
  const ssrfCheck = isSsrfSafeUrl(parsedUrl.toString());
  if (!ssrfCheck.safe) {
    return {
      success: false,
      error: {
        code: "BLOCKED_DESTINATION",
        message: ssrfCheck.reason ?? "Target destination is blocked by SSRF security policy.",
      },
    };
  }

  // ── 4. Process Query Parameters ────────────────────────────────────
  if (input.query) {
    if (Array.isArray(input.query)) {
      // QueryPair[] from Playground frontend
      for (const pair of input.query) {
        if (pair.enabled && pair.key.trim() !== "") {
          parsedUrl.searchParams.append(pair.key.trim(), pair.value ?? "");
        }
      }
    } else if (typeof input.query === "object") {
      // Record<string, string> dictionary
      for (const [key, value] of Object.entries(input.query)) {
        if (key.trim() !== "" && value !== undefined && value !== null) {
          parsedUrl.searchParams.append(key.trim(), String(value));
        }
      }
    }
  }

  // ── 5. Process Request Headers & Defense ──────────────────────────
  const requestHeaders = new Headers();
  const forbiddenHeaders = new Set([
    "host",
    "content-length",
    "connection",
    "transfer-encoding",
    "proxy-authorization",
    "cookie",
    "set-cookie",
  ]);

  if (input.headers) {
    const headerEntries: [string, string][] = Array.isArray(input.headers)
      ? input.headers
          .filter((h) => h.enabled && h.key.trim() !== "")
          .map((h) => [h.key.trim(), h.value])
      : Object.entries(input.headers).map(([k, v]) => [k.trim(), String(v)]);

    for (const [key, val] of headerEntries) {
      // CRLF injection protection
      if (/[\r\n]/.test(key) || /[\r\n]/.test(val)) {
        return {
          success: false,
          error: {
            code: "INVALID_HEADERS",
            message: "Header keys and values cannot contain CRLF characters.",
          },
        };
      }

      const lowerKey = key.toLowerCase();
      if (forbiddenHeaders.has(lowerKey) || lowerKey.startsWith("sec-") || lowerKey.startsWith("proxy-")) {
        continue; // Strip transport-sensitive headers
      }

      requestHeaders.set(key, val);
    }
  }

  // ── 6. Process Authentication Config ──────────────────────────────
  if (input.auth && input.auth.type !== "none") {
    const { type, apiKey, bearer, basic } = input.auth;

    if (type === "apiKey" && apiKey?.value?.trim()) {
      const keyName = apiKey.key?.trim() || "X-API-Key";
      const keyValue = apiKey.value.trim();
      if (apiKey.location === "query") {
        parsedUrl.searchParams.append(keyName, keyValue);
      } else {
        requestHeaders.set(keyName, keyValue);
      }
    } else if (type === "bearer" && bearer?.token?.trim()) {
      requestHeaders.set("Authorization", `Bearer ${bearer.token.trim()}`);
    } else if (type === "basic" && (basic?.username?.trim() || basic?.password)) {
      const credentials = Buffer.from(
        `${basic.username ?? ""}:${basic.password ?? ""}`
      ).toString("base64");
      requestHeaders.set("Authorization", `Basic ${credentials}`);
    }
  }

  // ── 7. Process Request Body ────────────────────────────────────────
  let requestBodyData: string | undefined = undefined;

  if (["POST", "PUT", "PATCH"].includes(method)) {
    if (input.body !== undefined && input.body !== null) {
      if (typeof input.body === "string") {
        const trimmedBody = input.body.trim();
        if (trimmedBody !== "") {
          if (Buffer.byteLength(trimmedBody, "utf8") > MAX_REQUEST_BODY_BYTES) {
            return {
              success: false,
              error: {
                code: "INVALID_BODY",
                message: `Request body exceeds maximum allowed size of 2 MB.`,
              },
            };
          }

          // If body starts with { or [, validate JSON syntax
          if (trimmedBody.startsWith("{") || trimmedBody.startsWith("[")) {
            try {
              JSON.parse(trimmedBody);
            } catch {
              return {
                success: false,
                error: {
                  code: "INVALID_BODY",
                  message: "Malformed JSON request body.",
                },
              };
            }
          }

          requestBodyData = trimmedBody;
        }
      } else if (typeof input.body === "object") {
        const jsonString = JSON.stringify(input.body);
        if (Buffer.byteLength(jsonString, "utf8") > MAX_REQUEST_BODY_BYTES) {
          return {
            success: false,
            error: {
              code: "INVALID_BODY",
              message: "Request body exceeds maximum allowed size of 2 MB.",
            },
          };
        }
        requestBodyData = jsonString;
      }
    }

    if (requestBodyData && !requestHeaders.has("content-type")) {
      requestHeaders.set("Content-Type", "application/json");
    }
  }

  // Set default User-Agent if missing
  if (!requestHeaders.has("user-agent")) {
    requestHeaders.set(
      "User-Agent",
      "Requestly-Playground/1.0 (+https://requestly.dev)"
    );
  }

  // ── 8. Execute Outbound Fetch with Hard Timeout ────────────────────
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(parsedUrl.toString(), {
      method,
      headers: requestHeaders,
      body: requestBodyData,
      signal: controller.signal,
      redirect: "manual", // Preserve SSRF security on redirects
    });

    clearTimeout(timer);
    const duration = Math.round(performance.now() - startTime);

    // Extract Response Headers safely into record
    const responseHeadersMap: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      // Omit sensitive cookies
      if (key.toLowerCase() !== "set-cookie") {
        responseHeadersMap[key] = val;
      }
    });

    const contentType = response.headers.get("content-type") ?? null;

    // Check Content-Length header if present
    const contentLength = Number(response.headers.get("content-length"));
    if (contentLength && contentLength > MAX_RESPONSE_BODY_BYTES) {
      return {
        success: false,
        error: {
          code: "RESPONSE_TOO_LARGE",
          message: `Response size (${contentLength} bytes) exceeds maximum limit of 5 MB.`,
        },
      };
    }

    // Bounded streaming read
    const { rawBody, tooLarge } = await readBoundedResponseBody(response, MAX_RESPONSE_BODY_BYTES);
    if (tooLarge) {
      return {
        success: false,
        error: {
          code: "RESPONSE_TOO_LARGE",
          message: `Response size exceeds maximum limit of 5 MB.`,
        },
      };
    }

    // Handle 204 No Content / empty response
    let parsedJsonBody: unknown = null;
    if (response.status === 204 || rawBody.trim() === "") {
      parsedJsonBody = null;
    } else if (contentType?.includes("application/json") || rawBody.trim().startsWith("{") || rawBody.trim().startsWith("[")) {
      try {
        parsedJsonBody = JSON.parse(rawBody);
      } catch {
        parsedJsonBody = rawBody; // Fallback to raw text if JSON parse fails
      }
    } else {
      parsedJsonBody = rawBody;
    }

    const responseData: ApiResponseData = {
      status: response.status,
      statusText: response.statusText || getStatusText(response.status),
      responseTime: duration,
      headers: responseHeadersMap,
      body: parsedJsonBody,
      rawBody,
      contentType,
    };

    return {
      success: true,
      data: responseData,
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    const errorObj = err instanceof Error ? err : new Error(String(err));
    const isAbort = errorObj.name === "AbortError" || errorObj.message.includes("abort");

    if (isAbort) {
      return {
        success: false,
        error: {
          code: "UPSTREAM_TIMEOUT",
          message: `The target API did not respond within the ${REQUEST_TIMEOUT_MS / 1000}.0 second timeout.`,
        },
      };
    }

    return {
      success: false,
      error: {
        code: "CONNECTION_ERROR",
        message: `Failed to establish connection with target server (${errorObj.message}).`,
      },
    };
  }
}

/** Fallback helper for standard HTTP status text */
function getStatusText(status: number): string {
  const map: Record<number, string> = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    304: "Not Modified",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return map[status] ?? "Unknown Status";
}
