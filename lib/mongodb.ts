/**
 * lib/mongodb.ts
 *
 * Server-only MongoDB connection module.
 * Uses the official MongoDB Node.js driver (v6).
 *
 * Pattern: cached client promise for Next.js hot-reload safety
 * and Vercel serverless compatibility.
 *
 * ⚠️  NEVER import this file from a Client Component.
 * ⚠️  NEVER expose MONGODB_URI to the browser.
 */

import { Collection, MongoClient, MongoClientOptions } from "mongodb";
import type { ApiDocument } from "@/models/ApiDocument";
import type { HealthCheckDocument } from "@/models/HealthCheckDocument";

// ── Environment validation ──────────────────────────────────────────
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE ?? "requestly";

if (!uri) {
  throw new Error(
    "[Requestly] MongoDB configuration error: MONGODB_URI environment variable is not set. " +
      "Add MONGODB_URI to your .env.local file."
  );
}

// ── Client options ──────────────────────────────────────────────────
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5_000,
  socketTimeoutMS: 45_000,
};

// ── Singleton / hot-reload-safe connection cache ─────────────────────
//
// In development, Next.js hot-reloads modules on every file change.
// Without this pattern each reload would create a new MongoClient,
// quickly exhausting the Atlas free-tier connection limit.
//
// We attach the client promise to `globalThis` in development so the
// existing connection is reused across hot-reloads.

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production each serverless invocation gets its own module scope.
  // The runtime will reuse warm instances where possible.
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Returns the connected MongoClient.
 * Await this in server-side code (Route Handlers, Server Actions).
 */
export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Returns the Requestly application database.
 * Centralises the database name — never repeat client.db("requestly").
 */
export async function getDatabase() {
  const client = await getMongoClient();
  return client.db(dbName);
}

/**
 * Typed collection accessors — import in Route Handlers / lib only.
 * Never import in Client Components.
 */
export async function getApisCollection(): Promise<Collection<ApiDocument>> {
  const db = await getDatabase();
  return db.collection<ApiDocument>("apis");
}

export async function getHealthChecksCollection(): Promise<Collection<HealthCheckDocument>> {
  const db = await getDatabase();
  return db.collection<HealthCheckDocument>("healthChecks");
}

// Re-export the promise for use in files that need the raw client.
export default clientPromise;
