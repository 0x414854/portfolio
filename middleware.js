import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1. Vérifier si une locale est déjà présente
  const hasLocale = routing.locales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );

  // 2. Si PAS de locale → détection automatique
  if (!hasLocale) {
    const acceptLanguage = req.headers.get("accept-language");

    let locale = routing.defaultLocale;

    if (acceptLanguage) {
      if (acceptLanguage.includes("fr")) locale = "fr";
      else if (acceptLanguage.includes("it")) locale = "it";
      else if (acceptLanguage.includes("en")) locale = "en";
    }

    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
  }

  // 3. Appliquer next-intl (UNE FOIS que la locale est bonne)
  const response = intlMiddleware(req);

  // 4. Protection admin (compatible avec /fr/admin, /en/admin, etc.)
  const segments = pathname.split("/");
  const isAdminRoute = segments.includes("admin");

  if (isAdminRoute) {
    const session = req.cookies.get("admin_session");

    if (!session) {
      const url = req.nextUrl.clone();

      // 👉 redirection propre avec locale conservée
      const currentLocale = segments[1];
      url.pathname = `/${currentLocale}/admin`; // ou /login

      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
