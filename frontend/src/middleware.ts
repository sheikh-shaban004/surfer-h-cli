
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  return res;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - API routes (typically under /api/)
     * - data directory (for JSON files)
     * - logos directory (for SVG icons)
     * - fonts directory (for font files)
     * - manifest files (.webmanifest)
     * - Any static assets (png, jpg, jpeg, svg, gif, ico, webp, woff, woff2, ttf, otf)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest\\.webmanifest|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp|woff|woff2|ttf|otf)$|api/|data/|logos/|fonts/).*)",
  ],
};
