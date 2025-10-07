import {NextRequest, NextResponse} from "next/server";

const protectedPaths = ["/cart"];

function handleToken(req: NextRequest,) {
  const pathname = req.nextUrl.pathname;
  const redirect = req.nextUrl.searchParams.get("redirect");

  const token = req.cookies.get("token")?.value;

  if (token) {
    return NextResponse.next();

  }

  // Skip middleware for login
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected) {

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }
  return null

}

export function middleware(req: NextRequest) {
  const middlewares = [handleToken];

  for (const middleware of middlewares) {
    const response = middleware(req);
    if (response) return response;
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/cart/:path*", "/login/:path*"],
};
