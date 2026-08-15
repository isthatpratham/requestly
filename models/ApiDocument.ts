/**
 * models/ApiDocument.ts
 *
 * MongoDB document type for the `apis` collection.
 * Per docs/DATABASE.md §4 — api document schema.
 *
 * ⚠️  Server-side only. Never import into Client Components.
 */

import { ObjectId } from "mongodb";

/**
 * Raw MongoDB document shape for the `apis` collection.
 * ObjectId is used at the database layer.
 * API route handlers convert _id to string before sending to the browser.
 */
export interface ApiDocument {
  _id: ObjectId;

  /** Display name of the API. Required. */
  name: string;

  /** Short description of what the API provides. Required. */
  description: string;

  /**
   * Primary API endpoint / base URL from the imported catalog.
   * Must be treated as untrusted external data when used for live requests.
   * Required.
   */
  url: string;

  /** Primary catalog category (e.g. "Weather"). Required. */
  category: string;

  /**
   * Authentication requirement from the source dataset.
   * Possible values: null | "apiKey" | "OAuth" | "X-Mashape-Key" | "User-Agent" | …
   */
  auth: string | null;

  /** Whether the API supports HTTPS. */
  https: boolean;

  /**
   * CORS support from the source dataset.
   * Normalized values: "yes" | "no" | "unknown"
   */
  cors: "yes" | "no" | "unknown" | null;

  /** Source attribution — where this catalog record originated. */
  source: {
    provider: string;
    sourceUrl: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Shape used when inserting a new API document (without _id — MongoDB generates it).
 */
export type InsertApiDocument = Omit<ApiDocument, "_id">;
