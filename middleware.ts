// https://nextjs.org/docs/app/building-your-application/routing/middleware
// https://nextjs.org/docs/app/api-reference/file-conventions/middleware
// https://supabase.com/docs/guides/auth/server-side/nextjs
// https://supabase.com/docs/guides/auth/server-side/creating-a-client

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

// import { type NextRequest } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
