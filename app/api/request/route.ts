/**
 * app/api/request/route.ts
 *
 * POST /api/request
 * Request Execution Engine API Route
 *
 * Per docs/API.md §8-14 contract:
 *  - Accepts request configuration (method, url, query, headers, auth, body)
 *  - Validates inputs & SSRF security controls
 *  - Executes outbound HTTP request server-side
 *  - Returns normalized response (status, statusText, responseTime, headers, body, rawBody, contentType)
 *
 * ⚠️  Server-side only. Never logs secrets, passwords, or authorization tokens.
 */

import { NextRequest, NextResponse } from "next/server";
import { executeApiRequest } from "@/lib/requestEngine";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_BODY",
            message: "Malformed JSON payload in request execution call.",
          },
        },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Request payload must be a valid JSON object.",
          },
        },
        { status: 400 }
      );
    }

    const result = await executeApiRequest(body as Record<string, unknown>);

    if (!result.success && result.error) {
      let status = 400;
      if (result.error.code === "BLOCKED_DESTINATION") status = 403;
      if (result.error.code === "UPSTREAM_TIMEOUT") status = 504;

      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const safeDiagnostic = err instanceof Error ? err.message : "Unknown error";
    console.error("[Requestly] POST /api/request execution error:", safeDiagnostic);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred while executing the API request.",
        },
      },
      { status: 500 }
    );
  }
}
