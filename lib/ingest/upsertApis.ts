/**
 * lib/ingest/upsertApis.ts
 *
 * Batched idempotent upsert layer for the `apis` MongoDB collection.
 * Uses bulkWrite with updateOne+upsert keyed on `url` (the unique index).
 *
 * UPDATE SEMANTICS:
 *  - On insert: sets all fields including createdAt
 *  - On update: refreshes all mutable fields but preserves createdAt
 *
 * ⚠️  Server-side only.
 */

import type { Collection } from "mongodb";
import type { ApiDocument, InsertApiDocument } from "@/models/ApiDocument";

const BATCH_SIZE = 100;

export interface UpsertStats {
  inserted: number;
  updated: number;
  unchanged: number;
  failed: number;
}

/**
 * Performs batched idempotent upserts into the `apis` collection.
 * Keyed on `url` (unique index) per DATABASE.md §6.
 *
 * @param collection - the MongoDB `apis` collection
 * @param docs       - validated, normalized documents to upsert
 * @param dryRun     - if true, skips DB writes and simulates the result
 */
export async function upsertApis(
  collection: Collection<ApiDocument>,
  docs: InsertApiDocument[],
  dryRun = false
): Promise<UpsertStats> {
  const stats: UpsertStats = {
    inserted: 0,
    updated: 0,
    unchanged: 0,
    failed: 0,
  };

  if (dryRun) {
    // In dry-run mode, count existing vs new without touching the DB
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = docs.slice(i, i + BATCH_SIZE);
      const urls = batch.map((d) => d.url);
      const existing = await collection.countDocuments({
        url: { $in: urls },
      });
      stats.updated += existing;
      stats.inserted += batch.length - existing;
    }
    return stats;
  }

  const now = new Date();

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = docs.slice(i, i + BATCH_SIZE);

    const ops = batch.map((doc) => ({
      updateOne: {
        filter: { url: doc.url },
        update: {
          $set: {
            name: doc.name,
            description: doc.description,
            category: doc.category,
            auth: doc.auth,
            https: doc.https,
            cors: doc.cors,
            source: doc.source,
            updatedAt: now,
          },
          $setOnInsert: {
            url: doc.url,
            createdAt: now,
          },
        },
        upsert: true,
      },
    }));

    try {
      const result = await collection.bulkWrite(ops, { ordered: false });

      stats.inserted += result.upsertedCount ?? 0;
      stats.updated += result.modifiedCount ?? 0;

      // "Unchanged" = matched but not modified (document was already up to date)
      const matched = result.matchedCount ?? 0;
      const modified = result.modifiedCount ?? 0;
      stats.unchanged += Math.max(0, matched - modified);
    } catch (err) {
      const batchStart = i + 1;
      const batchEnd = Math.min(i + BATCH_SIZE, docs.length);
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        `[Ingest] bulkWrite failed for batch ${batchStart}–${batchEnd}: ${message}`
      );
      stats.failed += batch.length;
    }
  }

  return stats;
}
