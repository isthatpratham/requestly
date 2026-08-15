/**
 * lib/healthCheck.ts
 *
 * Controlled server-side health check engine & persistence layer for catalog APIs.
 * Includes first-class SSRF protection, hard timeouts, monotonic response timing,
 * and MongoDB persistence in the `healthChecks` collection.
 *
 * ⚠️  Server-side only. Never import into Client Components.
 * ⚠️  MUST NOT act as a generic HTTP proxy. Target URLs MUST originate from catalog records.
 */

import { ObjectId } from "mongodb";
import { getApisCollection, getHealthChecksCollection } from "@/lib/mongodb";
import { toApiItem, toHealthCheckResult } from "@/lib/catalog";
import type { ApiDocument } from "@/models/ApiDocument";
import type { HealthCheckDocument, InsertHealthCheckDocument } from "@/models/HealthCheckDocument";
import type { ApiItem, HealthCheckResult } from "@/types/api";

const HEALTH_TIMEOUT_MS = 5_000;

export interface SsrfCheckResult {
  safe: boolean;
  reason?: string;
}

/**
 * Validates a target URL against SSRF rules before any outbound HTTP request.
 * Blocks private IP ranges, loopback addresses, cloud metadata endpoints, and non-HTTP protocols.
 */
export function isSsrfSafeUrl(urlString: string): SsrfCheckResult {
  try {
    const parsed = new URL(urlString);

    // 1. Protocol check — allow only http and https
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { safe: false, reason: `Forbidden protocol '${parsed.protocol}'. Only http: and https: are allowed.` };
    }

    const hostname = parsed.hostname.toLowerCase();

    // 2. Loopback and localhost check
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "[::1]" ||
      hostname === "::1" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local")
    ) {
      return { safe: false, reason: "Localhost and loopback destinations are forbidden." };
    }

    // 3. Cloud metadata endpoint check
    if (hostname === "169.254.169.254" || hostname.includes("metadata.google") || hostname.includes("169.254.")) {
      return { safe: false, reason: "Cloud metadata endpoints are forbidden." };
    }

    // 4. IPv4 numeric range checks
    const ipv4Regex = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const [o1, o2] = match.slice(1).map(Number);

      // 127.0.0.0/8 (Loopback)
      if (o1 === 127) return { safe: false, reason: "Loopback IP range (127.0.0.0/8) is forbidden." };
      // 10.0.0.0/8 (Private)
      if (o1 === 10) return { safe: false, reason: "Private IP range (10.0.0.0/8) is forbidden." };
      // 172.16.0.0/12 (Private)
      if (o1 === 172 && o2 >= 16 && o2 <= 31) return { safe: false, reason: "Private IP range (172.16.0.0/12) is forbidden." };
      // 192.168.0.0/16 (Private)
      if (o1 === 192 && o2 === 168) return { safe: false, reason: "Private IP range (192.168.0.0/16) is forbidden." };
      // 169.254.0.0/16 (Link-local)
      if (o1 === 169 && o2 === 254) return { safe: false, reason: "Link-local IP range (169.254.0.0/16) is forbidden." };
      // 0.0.0.0/8
      if (o1 === 0) return { safe: false, reason: "Current network range (0.0.0.0/8) is forbidden." };
      // 100.64.0.0/10 (CGNAT)
      if (o1 === 100 && o2 >= 64 && o2 <= 127) return { safe: false, reason: "Carrier-grade NAT IP range is forbidden." };
    }

    // 5. Non-standard numeric representations (integer IP, hex, octal)
    if (/^\d+$/.test(hostname) || /^0x[0-9a-f]+$/i.test(hostname)) {
      return { safe: false, reason: "Non-standard numeric IP formats are forbidden." };
    }

    return { safe: true };
  } catch {
    return { safe: false, reason: "Malformed URL" };
  }
}

/**
 * Performs a safe, bounded server-side health check against a catalog API.
 * Does NOT execute arbitrary client URLs.
 */
export async function executeHealthCheck(
  apiDoc: ApiDocument
): Promise<InsertHealthCheckDocument> {
  const url = apiDoc.url;
  const checkedAt = new Date();

  // SSRF Protection
  const ssrf = isSsrfSafeUrl(url);
  if (!ssrf.safe) {
    return {
      apiId: apiDoc._id,
      url,
      status: "error",
      statusCode: null,
      responseTime: null,
      checkedAt,
      error: {
        type: "SSRF_BLOCKED",
        message: ssrf.reason ?? "Target URL blocked by SSRF security policy",
      },
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
  const start = performance.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      redirect: "manual", // Prevent un-validated redirect hops
      headers: {
        "User-Agent": "Requestly-HealthCheck/1.0 (+https://requestly.dev)",
        "Accept": "*/*",
      },
    });
    clearTimeout(timer);
    const duration = Math.round(performance.now() - start);

    // Operational: any HTTP status code proves server reachability
    return {
      apiId: apiDoc._id,
      url,
      status: "operational",
      statusCode: response.status,
      responseTime: duration,
      checkedAt,
      error: null,
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    const duration = Math.round(performance.now() - start);
    const errorObj = err instanceof Error ? err : new Error(String(err));
    const isAbort = errorObj.name === "AbortError" || errorObj.message.includes("abort");

    if (isAbort) {
      return {
        apiId: apiDoc._id,
        url,
        status: "timeout",
        statusCode: null,
        responseTime: null,
        checkedAt,
        error: {
          type: "TIMEOUT",
          message: `Health check request timed out after ${HEALTH_TIMEOUT_MS}ms`,
        },
      };
    }

    return {
      apiId: apiDoc._id,
      url,
      status: "unavailable",
      statusCode: null,
      responseTime: null,
      checkedAt,
      error: {
        type: "CONNECTION_FAILED",
        message: "Target API server could not be reached",
      },
    };
  }
}

/**
 * Performs a health check for a trusted catalog API and persists the result into MongoDB `healthChecks`.
 */
export async function performAndPersistHealthCheck(
  apiDoc: ApiDocument
): Promise<HealthCheckResult> {
  const insertDoc = await executeHealthCheck(apiDoc);
  const healthCollection = await getHealthChecksCollection();

  const insertResult = await healthCollection.insertOne(
    insertDoc as unknown as HealthCheckDocument
  );

  return toHealthCheckResult({
    _id: insertResult.insertedId,
    ...insertDoc,
  });
}

/**
 * High-level service method called by the `/api/health` route.
 * Resolves the target catalog API document by `apiId` or `url`, performs the check, and persists the result.
 */
export async function performHealthCheckByIdentifier(params: {
  apiId?: string;
  url?: string;
}): Promise<{ api: ApiItem; healthCheck: HealthCheckResult } | null> {
  const collection = await getApisCollection();
  let apiDoc: ApiDocument | null = null;

  // 1. Look up by apiId if provided
  if (params.apiId && params.apiId.trim() !== "") {
    const trimmedId = params.apiId.trim();
    if (ObjectId.isValid(trimmedId)) {
      apiDoc = (await collection.findOne({ _id: new ObjectId(trimmedId) })) as ApiDocument | null;
    }
    if (!apiDoc) {
      apiDoc = (await collection.findOne({
        $or: [{ url: trimmedId }, { name: trimmedId }],
      })) as ApiDocument | null;
    }
  }

  // 2. Fallback: look up by url in the trusted catalog if apiId not provided
  if (!apiDoc && params.url && params.url.trim() !== "") {
    const trimmedUrl = params.url.trim();
    apiDoc = (await collection.findOne({ url: trimmedUrl })) as ApiDocument | null;
  }

  // Target API MUST exist in the catalog — reject arbitrary untrusted client URLs
  if (!apiDoc) {
    return null;
  }

  const healthCheck = await performAndPersistHealthCheck(apiDoc);

  return {
    api: toApiItem(apiDoc),
    healthCheck,
  };
}
