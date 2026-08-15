/**
 * lib/catalog.ts
 *
 * Domain service for catalog search, filtering, pagination, and single API lookups.
 * Encapsulates MongoDB query construction, input sanitization, and document mapping.
 *
 * ⚠️  Server-side only. Never import into Client Components.
 */

import { Filter, ObjectId } from "mongodb";
import { getApisCollection, getHealthChecksCollection } from "@/lib/mongodb";
import type { ApiDocument } from "@/models/ApiDocument";
import type { HealthCheckDocument } from "@/models/HealthCheckDocument";
import type { ApiItem, HealthCheckResult } from "@/types/api";
import type { PaginationMeta } from "@/types/common";

export interface CatalogQueryInput {
  q?: string;
  category?: string;
  auth?: string;
  https?: string;
  cors?: string;
  page?: string | number;
  limit?: string | number;
}

export interface CatalogQueryResult {
  items: ApiItem[];
  pagination: PaginationMeta;
}

export interface SingleApiResult {
  api: ApiItem;
  latestHealthCheck: HealthCheckResult | null;
}

export class CatalogValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogValidationError";
  }
}

/**
 * Maps a raw MongoDB ApiDocument to the public ApiItem contract.
 */
export function toApiItem(doc: ApiDocument): ApiItem {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    url: doc.url,
    category: doc.category,
    auth: doc.auth,
    https: doc.https,
    cors: doc.cors,
    source: doc.source
      ? {
          provider: doc.source.provider,
          sourceUrl: doc.source.sourceUrl,
        }
      : undefined,
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : undefined,
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : undefined,
  };
}

/**
 * Maps a raw MongoDB HealthCheckDocument to the public HealthCheckResult contract.
 */
export function toHealthCheckResult(
  doc: HealthCheckDocument
): HealthCheckResult {
  return {
    status: doc.status,
    statusCode: doc.statusCode,
    responseTime: doc.responseTime,
    checkedAt: doc.checkedAt ? doc.checkedAt.toISOString() : new Date().toISOString(),
    error: doc.error ? { type: doc.error.type, message: doc.error.message } : null,
  };
}

/**
 * Executes a paginated, filtered, and searched query against the `apis` MongoDB collection.
 * Enforces input validation and prevents MongoDB operator injection.
 */
export async function getApis(
  input: CatalogQueryInput
): Promise<CatalogQueryResult> {
  // ── 1. Validate & parse pagination parameters ───────────────────
  let page = 1;
  if (input.page !== undefined) {
    const parsedPage = Number(input.page);
    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      throw new CatalogValidationError("Query parameter 'page' must be a positive integer >= 1");
    }
    page = parsedPage;
  }

  let limit = 20;
  if (input.limit !== undefined) {
    const parsedLimit = Number(input.limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      throw new CatalogValidationError("Query parameter 'limit' must be a positive integer >= 1");
    }
    if (parsedLimit > 100) {
      throw new CatalogValidationError("Query parameter 'limit' cannot exceed maximum of 100");
    }
    limit = parsedLimit;
  }

  // ── 2. Explicitly construct MongoDB filter (prevent operator injection) ─
  const filter: Filter<ApiDocument> = {};

  // Search query (q)
  if (input.q !== undefined && input.q.trim() !== "") {
    const trimmedQ = input.q.trim();
    if (trimmedQ.length > 200) {
      throw new CatalogValidationError("Search query 'q' cannot exceed 200 characters");
    }
    filter.$text = { $search: trimmedQ };
  }

  // Category filter
  if (input.category !== undefined && input.category.trim() !== "") {
    const trimmedCategory = input.category.trim();
    if (trimmedCategory.length > 100) {
      throw new CatalogValidationError("Category filter cannot exceed 100 characters");
    }
    filter.category = trimmedCategory;
  }

  // Auth filter
  if (input.auth !== undefined && input.auth.trim() !== "") {
    const trimmedAuth = input.auth.trim();
    const lowerAuth = trimmedAuth.toLowerCase();
    if (lowerAuth === "null" || lowerAuth === "none" || lowerAuth === "no") {
      filter.auth = null;
    } else {
      filter.auth = trimmedAuth;
    }
  }

  // HTTPS filter
  if (input.https !== undefined && input.https.trim() !== "") {
    const trimmedHttps = input.https.trim().toLowerCase();
    if (trimmedHttps === "true") {
      filter.https = true;
    } else if (trimmedHttps === "false") {
      filter.https = false;
    } else {
      throw new CatalogValidationError("Query parameter 'https' must be 'true' or 'false'");
    }
  }

  // CORS filter
  if (input.cors !== undefined && input.cors.trim() !== "") {
    const trimmedCors = input.cors.trim().toLowerCase();
    if (["yes", "no", "unknown"].includes(trimmedCors)) {
      filter.cors = trimmedCors as "yes" | "no" | "unknown";
    } else {
      throw new CatalogValidationError("Query parameter 'cors' must be 'yes', 'no', or 'unknown'");
    }
  }

  // ── 3. Execute DB Query ─────────────────────────────────────────
  const collection = await getApisCollection();

  let total = 0;
  try {
    total = await collection.countDocuments(filter);
  } catch (err) {
    // Fallback if text search syntax fails
    if (filter.$text) {
      delete filter.$text;
      total = await collection.countDocuments(filter);
    } else {
      throw err;
    }
  }

  const totalPages = Math.ceil(total / limit) || 1;
  const skip = (page - 1) * limit;

  const cursor = collection.find(filter).skip(skip).limit(limit);

  // Deterministic sort: text score first if search query, otherwise name ascending
  if (filter.$text) {
    cursor.sort({ score: { $meta: "textScore" }, name: 1 });
  } else {
    cursor.sort({ name: 1 });
  }

  const docs = (await cursor.toArray()) as ApiDocument[];
  const items = docs.map(toApiItem);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/**
 * Looks up a single API catalog document by ID (ObjectId hex string or URL/name fallback)
 * and fetches its latest health check result if one exists.
 */
export async function getApiById(id: string): Promise<SingleApiResult | null> {
  if (!id || typeof id !== "string" || id.trim() === "") {
    return null;
  }

  const trimmedId = id.trim();
  const collection = await getApisCollection();
  let doc: ApiDocument | null = null;

  // 1. If valid 24-hex ObjectId, look up by _id
  if (ObjectId.isValid(trimmedId)) {
    doc = (await collection.findOne({ _id: new ObjectId(trimmedId) })) as ApiDocument | null;
  }

  // 2. Fallback: look up by url or exact name if not found by ObjectId
  if (!doc) {
    doc = (await collection.findOne({
      $or: [{ url: trimmedId }, { name: trimmedId }],
    })) as ApiDocument | null;
  }

  if (!doc) {
    return null;
  }

  // Fetch latest health check for this API if any exists
  const healthCollection = await getHealthChecksCollection();
  const latestCheckDoc = (await healthCollection.findOne(
    { apiId: doc._id },
    { sort: { checkedAt: -1 } }
  )) as HealthCheckDocument | null;

  const latestHealthCheck = latestCheckDoc ? toHealthCheckResult(latestCheckDoc) : null;

  return {
    api: toApiItem(doc),
    latestHealthCheck,
  };
}
