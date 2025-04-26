import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access-token");

  const protectedRoutes = ["/"];

  // Redirect to login with redirect parameter if not authenticated
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if token exists and accessing login/register
  if (["/login", "/register"].includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
