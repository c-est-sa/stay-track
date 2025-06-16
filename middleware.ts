// https://nextjs.org/docs/app/building-your-application/routing/middleware
// https://nextjs.org/docs/app/api-reference/file-conventions/middleware
// https://supabase.com/docs/guides/auth/server-side/nextjs

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
