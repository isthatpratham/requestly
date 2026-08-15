/**
 * models/HealthCheckDocument.ts
 *
 * MongoDB document type for the `healthChecks` collection.
 * Per docs/DATABASE.md §8 — health check document schema.
 *
 * ⚠️  Server-side only. Never import into Client Components.
 */

import { ObjectId } from "mongodb";

/** Normalized Requestly health classification (DATABASE.md §9). */
export type HealthStatus = "operational" | "unavailable" | "error" | "timeout";

/**
 * Raw MongoDB document shape for the `healthChecks` collection.
 */
export interface HealthCheckDocument {
  _id: ObjectId;

  /** Reference to the API in the `apis` collection. */
  apiId: ObjectId;

  /**
   * The URL that was actually checked.
   * Retained because an API's configured endpoint may change
   * independently of the catalog.
   */
  url: string;

  /** Normalized Requestly health classification. */
  status: HealthStatus;

  /**
   * HTTP response status code when one was received.
   * null if the request failed before an HTTP response was received.
   */
  statusCode: number | null;

  /**
   * Time taken to receive the response, in milliseconds.
   * null if no response was received.
   */
  responseTime: number | null;

  /** Timestamp of the health check. */
  checkedAt: Date;

  /**
   * Structured error information for failed checks.
   * Must not expose secrets, credentials, or internal infrastructure details.
   */
  error: {
    type: string;
    message: string;
  } | null;
}

/**
 * Shape used when inserting a new health check document.
 */
export type InsertHealthCheckDocument = Omit<HealthCheckDocument, "_id">;
