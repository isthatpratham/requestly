import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Phase 1 Foundation — Health checks reserved for Phase 3.",
      },
    },
    { status: 501 }
  );
}
