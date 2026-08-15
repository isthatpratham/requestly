/**
 * app/api/apis/[id]/route.ts
 *
 * GET /api/apis/[id]
 * Single API Catalog Lookup API
 *
 * Per docs/API.md §7 contract:
 *  - Path parameter: id (ObjectId string or URL/name lookup)
 *  - Returns single API document + latest health check (or null)
 *  - Server-side, read-only
 *
 * ⚠️  Never exposes raw MongoDB credentials, stack traces, or operators.
 */

import { NextRequest, NextResponse } from "next/server";
import { getApiById } from "@/lib/catalog";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    if (!id || typeof id !== "string" || id.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Missing or invalid API identifier.",
          },
        },
        { status: 400 }
      );
    }

    const result = await getApiById(id);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: `API with identifier '${id}' was not found.`,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (err) {
    const safeDiagnostic = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Requestly] GET /api/apis/${params.id} error:`, safeDiagnostic);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred while looking up the API.",
        },
      },
      { status: 500 }
    );
  }
}
