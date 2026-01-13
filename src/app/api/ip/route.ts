import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp =
    forwardedFor?.split(",")[0] === "::1" 
    ? "127.0.0.1" 
    : forwardedFor?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  return NextResponse.json({ ip: realIp });
}
