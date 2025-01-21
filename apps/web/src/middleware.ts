import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  let route: string | undefined;

  if (search.includes("logout")) {
    (await cookies()).delete("token");

    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
  }

  if (token) {
    route = hasBlockedRoute({
      pathname,
      fallbackRoute: "/admin",
      blockedRoutes: ["/sign-in", "/sign-up", "/forgot-password"],
    });
  } else {
    route = hasBlockedRoute({
      pathname,
      fallbackRoute: `/sign-in?redirect_to=${encodeURIComponent(pathname + search)}`,
      blockedRoutes: ["/admin"],
    });
  }

  const url = route && new URL(route, request.url);

  if (url) return NextResponse.redirect(url);

  return NextResponse.next();
};

const hasBlockedRoute = ({
  pathname,
  fallbackRoute,
  blockedRoutes,
}: {
  pathname: string;
  fallbackRoute: string;
  blockedRoutes: string[];
}) => {
  const isBlocked = blockedRoutes.some((route) => pathname.startsWith(route));

  if (isBlocked) return fallbackRoute;

  return;
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
