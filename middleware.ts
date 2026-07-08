import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, isValidToken } from "@/lib/auth";

// Protect the admin dashboard and admin APIs behind the login cookie.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = isValidToken(req.cookies.get(COOKIE)?.value);

  // Admin API (except login) → 401 JSON when not authed.
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    if (!authed) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin pages (except the login page) → redirect to login when not authed.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Already logged in and visiting the login page → send to dashboard.
  if (pathname === "/admin/login" && authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
