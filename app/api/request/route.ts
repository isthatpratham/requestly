import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Phase 1 Foundation — Outbound request engine not yet implemented.",
      },
    },
    { status: 501 }
  );
}
