import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  return NextResponse.json({ ip });
}
