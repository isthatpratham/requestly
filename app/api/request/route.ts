import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Phase 1 Foundation — Request execution engine reserved for Phase 4.",
      },
    },
    { status: 501 }
  );
}
