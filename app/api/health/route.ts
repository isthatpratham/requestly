/**
 * app/api/health/route.ts
 *
 * GET /api/health
 *
 * dual-mode health check endpoint:
 *  1. Catalog API Health Check (when `apiId` or `url` query params are provided):
 *     Per docs/API.md §15 — Safely health checks a trusted catalog API, persists
 *     the result in MongoDB `healthChecks`, and returns normalized health status.
 *
 *  2. System / DB Connectivity Check (when no query params are provided):
 *     Maintains Phase 7 database connection ping capability.
 *
 * ⚠️  Never exposes raw credentials, connection strings, or internal errors.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { performHealthCheckByIdentifier } from "@/lib/healthCheck";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiId = searchParams.get("apiId") ?? undefined;
  const url = searchParams.get("url") ?? undefined;

  // ── Mode 1: Catalog API Health Check (if apiId or url is supplied) ────────
  if (apiId !== undefined || url !== undefined) {
    try {
      const result = await performHealthCheckByIdentifier({ apiId, url });

      if (!result) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "The requested API was not found in the catalog.",
            },
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: result.healthCheck,
        },
        { status: 200 }
      );
    } catch (err) {
      const safeDiagnostic = err instanceof Error ? err.message : "Unknown error";
      console.error("[Requestly] GET /api/health catalog check error:", safeDiagnostic);

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred while checking API health.",
          },
        },
        { status: 500 }
      );
    }
  }

  // ── Mode 2: System / Database Connectivity Check (no params) ─────────────
  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });

    return NextResponse.json(
      {
        success: true,
        status: "healthy",
        database: "connected",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {
    console.error("[Requestly] /api/health: MongoDB connectivity check failed.");

    return NextResponse.json(
      {
        success: false,
        status: "unhealthy",
        database: "unreachable",
        error: "Unable to connect to the database. Please try again.",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
