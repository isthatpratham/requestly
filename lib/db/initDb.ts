/**
 * lib/db/initDb.ts
 *
 * Database initialization: creates required indexes on first run.
 * Idempotent — safe to call on every server startup.
 *
 * Per docs/DATABASE.md §7 (apis indexes) and §8 (healthChecks).
 *
 * ⚠️  Server-side only.
 */

import { getApisCollection, getHealthChecksCollection } from "@/lib/mongodb";

/**
 * Creates all required MongoDB indexes for the Requestly database.
 * MongoDB's createIndex is idempotent — it will not recreate existing indexes.
 *
 * Call this once from a server initialization path, not on every request.
 */
export async function initializeDatabase(): Promise<void> {
  try {
    const apis = await getApisCollection();
    const healthChecks = await getHealthChecksCollection();

    // ── apis indexes (DATABASE.md §7) ──────────────────────────────
    // Support: category filtering, URL identity lookup, name search
    await Promise.all([
      apis.createIndex({ category: 1 }),
      apis.createIndex({ url: 1 }, { unique: true }),
      apis.createIndex({ name: 1 }),
      // Text index for name + description search
      apis.createIndex({ name: "text", description: "text" }),
    ]);

    // ── healthChecks indexes ──────────────────────────────────────
    // Support: lookup by apiId, most-recent checks per API
    await Promise.all([
      healthChecks.createIndex({ apiId: 1 }),
      healthChecks.createIndex({ apiId: 1, checkedAt: -1 }),
    ]);

    console.log("[Requestly] MongoDB indexes verified.");
  } catch (err) {
    // Log safe diagnostic — never expose connection strings or credentials
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Requestly] MongoDB index initialization error:", message);
    throw err;
  }
}
