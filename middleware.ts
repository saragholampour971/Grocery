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

// function handleRedirectSearchParams(req: NextRequest) {
//   const redirectParam = req.nextUrl.searchParams.get("redirect"); // query param redirect
//   console.log(redirectParam, 'redirectParam');
//   if (redirectParam) {
//     const absoluteUrl = new URL(redirectParam, req.url);
//     return NextResponse.redirect(absoluteUrl);
//   }
//   return null
// }

export function middleware(req: NextRequest) {
  console.log('from middleware', req.nextUrl.pathname, req.nextUrl.searchParams.get('redirect'));
  const middlewares = [handleToken];

  for (const middleware of middlewares) {
    const response = middleware(req);
    if (response) return response;
  }

  return NextResponse.next();


}

export const config = {
  matcher: ["/cart/:path*", "/login/:path*"],
  // matcher: [
  //   '/((?!_next|api|static|public|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|gif|ico|css|js)).*)',
  // ]
};
