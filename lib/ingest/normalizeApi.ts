/**
 * lib/ingest/normalizeApi.ts
 *
 * Normalization logic for raw public-apis entries.
 * Transforms RawApiEntry → InsertApiDocument.
 *
 * Rules (per docs/DATABASE.md §5 and §15):
 *  - Trim all string fields
 *  - Normalize auth: empty string / "null" / "" → null
 *  - Normalize https: "Yes"/"yes"/true → true, everything else → false
 *  - Normalize cors: "yes"→"yes", "no"→"no", everything else→"unknown"
 *  - Normalize category: trim
 *  - Source attribution preserved
 *
 * ⚠️  Server-side only.
 */

import type { RawApiEntry } from "./fetchPublicApis";
import type { InsertApiDocument } from "@/models/ApiDocument";

/**
 * Normalizes the auth field.
 * The source uses empty string or "null" for no auth.
 */
function normalizeAuth(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.toLowerCase() === "null" || trimmed === "No") {
    return null;
  }
  return trimmed;
}

/**
 * Normalizes HTTPS field.
 * Source values: "Yes" | "No"
 */
function normalizeHttps(raw: string): boolean {
  return raw.trim().toLowerCase() === "yes";
}

/**
 * Normalizes CORS field.
 * Source values: "yes" | "no" | "unknown"
 * Anything unrecognized → "unknown"
 */
function normalizeCors(raw: string): "yes" | "no" | "unknown" {
  const lower = raw.trim().toLowerCase();
  if (lower === "yes") return "yes";
  if (lower === "no") return "no";
  return "unknown";
}

/**
 * Normalizes category name — trims whitespace.
 * Does NOT aggressively transform since categories come from the official source.
 */
function normalizeCategory(raw: string): string {
  return raw.trim();
}

/**
 * Normalizes a URL:
 *  - Trims whitespace
 *  - Must begin with http:// or https://
 *  - Returns null if invalid
 */
export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Must be http or https
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return null;
  }

  // Validate via URL constructor
  try {
    const parsed = new URL(trimmed);
    // Return the normalized href — preserves the original path, query, etc.
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Transforms a RawApiEntry into a MongoDB InsertApiDocument.
 * Returns null if the entry is invalid and should be skipped.
 */
export function normalizeApiEntry(
  raw: RawApiEntry,
  now: Date
): InsertApiDocument | null {
  const name = raw.name.trim();
  const description = raw.description.trim();
  const category = normalizeCategory(raw.category);
  const url = normalizeUrl(raw.url);
  const auth = normalizeAuth(raw.auth);
  const https = normalizeHttps(raw.https);
  const cors = normalizeCors(raw.cors);

  // Required field check (will be caught by validateApiEntry too,
  // but we return null here to keep normalize/validate separation clean)
  if (!name || !description || !url || !category) return null;

  return {
    name,
    description,
    url,
    category,
    auth,
    https,
    cors,
    source: {
      provider: raw.sourceProvider,
      sourceUrl: raw.sourceUrl,
    },
    createdAt: now,
    updatedAt: now,
  };
}
