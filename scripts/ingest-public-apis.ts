#!/usr/bin/env node
/**
 * scripts/ingest-public-apis.ts
 *
 * Ingestion script: fetches the public-apis catalog, normalizes it,
 * validates it, deduplicates it, and upserts into MongoDB.
 *
 * Usage:
 *   npm run ingest:apis              # real ingestion
 *   npm run ingest:apis -- --dry-run # dry run (no DB writes)
 *
 * Requires MONGODB_URI and MONGODB_DATABASE in .env.local
 *
 * ⚠️  Never runs automatically during dev/build/start.
 * ⚠️  Server-side only.
 */

// ── Now safe to import modules that read process.env ─────────────────
// (MONGODB_URI was loaded by node --env-file=.env.local before this script ran)

import { fetchPublicApis } from "../lib/ingest/fetchPublicApis";
import { normalizeApiEntry, normalizeUrl } from "../lib/ingest/normalizeApi";
import { validateApiEntry } from "../lib/ingest/validateApi";
import { upsertApis } from "../lib/ingest/upsertApis";
import { getApisCollection } from "../lib/mongodb";
import { initializeDatabase } from "../lib/db/initDb";

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const startTime = Date.now();

  console.log("\nRequestly — Public API Catalog Ingestion");
  console.log("=========================================");
  if (DRY_RUN) console.log("Mode: DRY RUN (no database writes)");
  console.log("");

  // ── 1. Ensure database indexes exist ────────────────────────────
  if (!DRY_RUN) {
    console.log("[Ingest] Verifying database indexes…");
    await initializeDatabase();
  }

  // ── 2. Fetch source ─────────────────────────────────────────────
  const { entries: rawEntries, fetchedAt } = await fetchPublicApis();
  console.log(`[Ingest] Source records received: ${rawEntries.length}`);

  // ── 3. Normalize + validate + deduplicate ───────────────────────
  const now = fetchedAt;
  const seenUrls = new Set<string>();

  let validCount = 0;
  let invalidCount = 0;
  let duplicateCount = 0;

  const validDocs = [];
  const invalidReasons: Array<{ index: number; reason: string }> = [];

  for (let i = 0; i < rawEntries.length; i++) {
    const raw = rawEntries[i];

    // Normalize
    const doc = normalizeApiEntry(raw, now);
    if (!doc) {
      invalidCount++;
      invalidReasons.push({
        index: i + 1,
        reason: "normalization failed (missing required field)",
      });
      continue;
    }

    // Validate
    const validation = validateApiEntry(doc);
    if (!validation.valid) {
      invalidCount++;
      invalidReasons.push({
        index: i + 1,
        reason: validation.reason ?? "validation failed",
      });
      continue;
    }

    // Deduplicate within this run (url is the identity key)
    const normalizedUrl = normalizeUrl(doc.url);
    if (!normalizedUrl || seenUrls.has(normalizedUrl)) {
      duplicateCount++;
      continue;
    }

    seenUrls.add(normalizedUrl);
    validCount++;
    validDocs.push(doc);
  }

  console.log(`[Ingest] Valid records:              ${validCount}`);
  console.log(`[Ingest] Invalid records:            ${invalidCount}`);
  console.log(`[Ingest] Duplicates removed (run):   ${duplicateCount}`);

  if (invalidReasons.length > 0) {
    console.log("\n[Ingest] Invalid record details:");
    for (const { index, reason } of invalidReasons.slice(0, 20)) {
      console.log(`  Record #${index}: ${reason}`);
    }
    if (invalidReasons.length > 20) {
      console.log(
        `  … and ${invalidReasons.length - 20} more (truncated for brevity)`
      );
    }
    console.log("");
  }

  if (validDocs.length === 0) {
    console.error("[Ingest] No valid records to process. Aborting.");
    process.exit(1);
  }

  // ── 4. Upsert into MongoDB ───────────────────────────────────────
  console.log(
    `[Ingest] ${DRY_RUN ? "Simulating upsert of" : "Upserting"} ${validDocs.length} records…`
  );

  const collection = await getApisCollection();
  const stats = await upsertApis(collection, validDocs, DRY_RUN);

  // ── 5. Report ────────────────────────────────────────────────────
  const durationMs = Date.now() - startTime;
  const durationSec = (durationMs / 1000).toFixed(1);

  console.log("\n─────────────────────────────────────────");
  console.log("Requestly API Catalog Ingestion Report");
  console.log("─────────────────────────────────────────");
  console.log(`Source:             public-apis (github.com/public-apis/public-apis)`);
  console.log(`Fetched at:         ${fetchedAt.toISOString()}`);
  console.log(`Source records:     ${rawEntries.length}`);
  console.log(`Valid:              ${validCount}`);
  console.log(`Invalid:            ${invalidCount}`);
  console.log(`Duplicates removed: ${duplicateCount}`);
  console.log(`Inserted:           ${stats.inserted}`);
  console.log(`Updated:            ${stats.updated}`);
  console.log(`Unchanged:          ${stats.unchanged}`);
  console.log(`Failed writes:      ${stats.failed}`);
  console.log(`Database:           ${process.env.MONGODB_DATABASE ?? "requestly"}`);
  console.log(`Collection:         apis`);
  console.log(`Execution time:     ${durationSec}s`);
  if (DRY_RUN) {
    console.log(`\n⚠️  DRY RUN — no data was written to MongoDB.`);
  }
  console.log("─────────────────────────────────────────\n");

  // ── 6. Post-run verification (real runs only) ─────────────────────
  if (!DRY_RUN) {
    const finalCount = await collection.countDocuments();
    console.log(`[Ingest] MongoDB apis collection total: ${finalCount} documents`);

    // Duplicate URL verification
    const dupPipeline = [
      { $group: { _id: "$url", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $count: "duplicates" },
    ];
    const dupResult = await collection.aggregate(dupPipeline).toArray();
    const dupCount = dupResult[0]?.duplicates ?? 0;

    if (dupCount > 0) {
      console.error(
        `[Ingest] ⚠️  Found ${dupCount} duplicate URL(s) in MongoDB! This must be investigated.`
      );
      process.exit(1);
    } else {
      console.log("[Ingest] ✓ No duplicate URLs in MongoDB.");
    }
  }

  if (stats.failed > 0) {
    console.error(
      `[Ingest] ⚠️  ${stats.failed} record(s) failed to write. Review logs above.`
    );
    process.exit(1);
  }

  console.log("[Ingest] Ingestion complete.\n");
  process.exit(0);
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`\n[Ingest] Fatal error: ${message}\n`);
  process.exit(1);
});
