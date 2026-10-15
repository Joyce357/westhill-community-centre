import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "westhill_admin_session";

function getJwtSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || "westhill-super-secure-session-secret-key-2026";
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run proxy on /admin routes
  if (pathname.startsWith("/admin")) {
    // Allow public access to login page
    if (pathname === "/admin/login") {
      // Security: Strip any sensitive query parameters immediately
      if (
        request.nextUrl.searchParams.has("email") ||
        request.nextUrl.searchParams.has("password")
      ) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, getJwtSecret());
          // If already authenticated, redirect to /admin dashboard
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Token invalid, allow accessing login page
        }
      }
      return NextResponse.next();
    }

    // For all other /admin/* routes, require verified token
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
