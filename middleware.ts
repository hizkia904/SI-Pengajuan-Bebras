import { NextRequest, NextResponse } from "next/server";
import { lucia, validateRequest } from "./app/auth";

export async function middleware(request: NextRequest) {
  const sessId = request.cookies.get("auth_session")?.value;
  let role = undefined;
  if (sessId) {
    const jsonObject = JSON.stringify({ sessId });
    const getRole = await fetch(
      new URL("/api/checkRole", request.nextUrl.origin),
      {
        method: "POST",
        body: jsonObject,
      }
    );
    const value = await getRole.json();
    role = value.role;
  }

  if (
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (role) {
      if (role == "BIRO") {
        return NextResponse.redirect(
          new URL("/biro/bebras_task/pengajuan?p=1", request.url)
        );
      } else if (role == "ADMIN") {
        return NextResponse.redirect(new URL("/admin/categories", request.url));
      } else if (role == "TIM NASIONAL") {
        return NextResponse.redirect(
          new URL("/tim_nasional/bebras_task/pengajuan?p=1", request.url)
        );
      }
    } else {
      return NextResponse.next();
    }
  }
  if (request.nextUrl.pathname.startsWith("/biro")) {
    if (role) {
      if (role == "BIRO") {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/not_authorized", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (role) {
      if (role == "ADMIN") {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/not_authorized", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/tim_nasional")) {
    if (role) {
      if (role == "TIM NASIONAL") {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/not_authorized", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
