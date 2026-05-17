import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "change-this-secret";

function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const lastDot = decoded.lastIndexOf(`.${SESSION_SECRET}`);
    if (lastDot === -1) return false;

    const payload = JSON.parse(decoded.slice(0, lastDot));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthenticated = token ? verifySessionToken(token) : false;

  // /admin exact path → redirect based on auth status
  if (pathname === "/admin") {
    const dest = isAuthenticated ? "/admin/dashboard" : "/admin/login";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Already logged in but visiting /admin/login → send to dashboard
  if (pathname === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
