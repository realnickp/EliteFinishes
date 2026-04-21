import { NextRequest, NextResponse } from "next/server";

const SESSION_SEED = "bb-dashboard-v1";

/**
 * Verifies the session cookie using Web Crypto API (Edge Runtime compatible).
 * Must produce the same result as generateSessionToken() in src/lib/auth.ts.
 */
async function verifySession(
  cookieValue: string,
  password: string
): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(cookieValue)) return false;
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(SESSION_SEED)
    );
    const expected = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return cookieValue === expected;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/dashboard/login")
  ) {
    const password = process.env.DASHBOARD_PASSWORD;
    if (!password) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }

    const session = request.cookies.get("dashboard_session");
    const valid = session
      ? await verifySession(session.value, password)
      : false;

    if (!valid) {
      // Send to the role chooser so the user picks admin vs canvasser;
      // the chooser forwards to /dashboard/login with the same redirect.
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      loginUrl.searchParams.set("role", "admin");
      return NextResponse.redirect(loginUrl);
    }
  }

  if (
    pathname.startsWith("/canvasser") &&
    !pathname.startsWith("/canvasser/login")
  ) {
    // Edge runtime can't hit the DB or run bcrypt on every request. Middleware
    // does a cheap shape-check; real auth happens inside route handlers via
    // requireCanvasser() in src/lib/canvasser-auth.ts.
    const cookie = request.cookies.get("canvasser_session")?.value;
    const valid = !!cookie && /^[0-9a-f-]{36}\.[0-9a-f]{64}$/.test(cookie);

    if (!valid) {
      // Canvassers go straight to their login (they're on a phone, at the door
      // — no time for a chooser). Admin lands on the chooser via the dashboard
      // branch above.
      const loginUrl = new URL("/canvasser/login", request.url);
      if (pathname !== "/canvasser/login") {
        loginUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/canvasser/:path*"],
};
