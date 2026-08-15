/**
 * lib/ingest/validateApi.ts
 *
 * Validation layer for normalized API entries before MongoDB insertion.
 * Per docs/DATABASE.md §19.
 *
 * ⚠️  Server-side only.
 */

import type { InsertApiDocument } from "@/models/ApiDocument";

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates a normalized InsertApiDocument.
 * Returns { valid: true } if the document is acceptable for insertion.
 * Returns { valid: false, reason } with a safe diagnostic if not.
 */
export function validateApiEntry(doc: InsertApiDocument): ValidationResult {
  // name — required, non-empty
  if (!doc.name || typeof doc.name !== "string" || doc.name.length === 0) {
    return { valid: false, reason: "missing or empty name" };
  }

  // description — required, non-empty
  if (
    !doc.description ||
    typeof doc.description !== "string" ||
    doc.description.length === 0
  ) {
    return { valid: false, reason: "missing or empty description" };
  }

  // url — required, valid format
  if (!doc.url || typeof doc.url !== "string" || doc.url.length === 0) {
    return { valid: false, reason: "missing URL" };
  }

  if (!doc.url.startsWith("http://") && !doc.url.startsWith("https://")) {
    return { valid: false, reason: "URL does not use http or https protocol" };
  }

  try {
    new URL(doc.url);
  } catch {
    return { valid: false, reason: "malformed URL" };
  }

  // category — required, non-empty
  if (
    !doc.category ||
    typeof doc.category !== "string" ||
    doc.category.length === 0
  ) {
    return { valid: false, reason: "missing or empty category" };
  }

  // https — must be boolean
  if (typeof doc.https !== "boolean") {
    return { valid: false, reason: "https field is not a boolean" };
  }

  // cors — must be one of the approved values
  const validCors = ["yes", "no", "unknown", null];
  if (!validCors.includes(doc.cors)) {
    return { valid: false, reason: `invalid cors value: ${doc.cors}` };
  }

  // source — must have provider and sourceUrl
  if (
    !doc.source ||
    typeof doc.source.provider !== "string" ||
    !doc.source.provider
  ) {
    return { valid: false, reason: "missing source.provider" };
  }

  return { valid: true };
}
