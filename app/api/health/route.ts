import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Phase 1 Foundation — Health checks not yet implemented.",
      },
    },
    { status: 501 }
  );
}
