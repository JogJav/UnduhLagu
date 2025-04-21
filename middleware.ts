import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This middleware doesn't modify the request
  // It's here to ensure proper routing for Vercel-specific paths
  return NextResponse.next()
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // Don't run middleware on Vercel system routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - _vercel (Vercel system files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|_vercel).*)",
  ],
}
