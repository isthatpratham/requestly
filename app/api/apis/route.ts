/**
 * app/api/apis/route.ts
 *
 * GET /api/apis
 * Catalog Search & Retrieval API
 *
 * Per docs/API.md §6 contract:
 *  - Query parameters: q, category, auth, https, cors, page, limit
 *  - Returns paginated catalog items + pagination metadata
 *  - Server-side, read-only
 *
 * ⚠️  Never exposes raw MongoDB credentials, stack traces, or operators.
 */

import { NextRequest, NextResponse } from "next/server";
import { CatalogValidationError, getApis } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const auth = searchParams.get("auth") ?? undefined;
    const https = searchParams.get("https") ?? undefined;
    const cors = searchParams.get("cors") ?? undefined;
    const page = searchParams.get("page") ?? undefined;
    const limit = searchParams.get("limit") ?? undefined;

    const result = await getApis({
      q,
      category,
      auth,
      https,
      cors,
      page,
      limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof CatalogValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: err.message,
          },
        },
        { status: 400 }
      );
    }

    // Safe error response for internal failures — never expose URI, stack trace, or driver errors
    const safeDiagnostic = err instanceof Error ? err.message : "Unknown error";
    console.error("[Requestly] GET /api/apis error:", safeDiagnostic);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred while querying the API catalog.",
        },
      },
      { status: 500 }
    );
  }
}
