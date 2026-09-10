import { NextResponse, type NextRequest } from "next/server";

/**
 * Detect country from request headers.
 * Supports Vercel, Netlify, Cloudflare, and AWS CloudFront.
 */
function getCountryFromRequest(req: NextRequest): string | null {
  // Vercel
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry) return vercelCountry;

  // Netlify
  const netlifyCountry = req.headers.get("x-country");
  if (netlifyCountry) return netlifyCountry;

  // Cloudflare
  const cfCountry = req.headers.get("cf-ipcountry");
  if (cfCountry) return cfCountry;

  // AWS CloudFront
  const awsCountry = req.headers.get("cloudfront-viewer-country");
  if (awsCountry) return awsCountry;

  return null;
}

/**
 * Lightweight middleware - no auth checks here.
 * Auth is handled by route group layouts for better performance.
 * This middleware only sets cookies for geo detection and referral tracking,
 * and only on the home page. Every other route (guides, compliance, faq,
 * transparency) is a static prerender that never reads these cookies, so it
 * must not carry Set-Cookie or it stops being shared-cacheable at the edge.
 * The `config.matcher` below keeps those routes out of the middleware
 * entirely; the early return here guards direct callers (tests) the same way.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  if (pathname !== "/" && pathname !== "") {
    return response;
  }

  // Set referral cookie when visiting home with ?ref= (for waitlist signup)
  const ref = req.nextUrl.searchParams.get("ref");
  if (ref && /^[A-Za-z0-9]{1,20}$/.test(ref)) {
    response.cookies.set("waitlist_ref", ref.toUpperCase(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });
  }

  // Set geo cookie for client-side geo-restriction banner
  let country = getCountryFromRequest(req);

  // In development, check for ?geo= query param to simulate geo
  if (!country && process.env.NODE_ENV === "development") {
    const geoParam = req.nextUrl.searchParams.get("geo");
    if (geoParam) {
      country = geoParam.toUpperCase();
    }
  }

  if (country) {
    response.cookies.set("geo-country", country, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
  }

  return response;
}

export const config = {
  /*
   * Only the home page needs middleware: it is the sole route that sets the
   * referral and geo cookies. Static content routes are deliberately excluded
   * so their responses stay free of Set-Cookie and remain edge-cacheable.
   */
  matcher: ["/"],
};
