import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Redirect non-www to www for llacademy.org
  if (host.startsWith("llacademy.org") && !host.startsWith("www.")) {
    const domain = host.split(":")[0];
    return NextResponse.redirect(
      `https://www.${domain}${pathname}${search}`,
      { status: 301 }
    );
  }

  // Redirect non-www to www for lightandlifeacademy.in
  if (host.startsWith("lightandlifeacademy.in") && !host.startsWith("www.")) {
    const domain = host.split(":")[0];
    return NextResponse.redirect(
      `https://www.${domain}${pathname}${search}`,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
