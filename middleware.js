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

  // 2. Si aucune locale n'est présente, détecter la langue
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

    const response = NextResponse.redirect(url);

    // Configurer le cookie de locale si nécessaire
    const existingLocaleCookie = req.cookies.get("NEXT_LOCALE");

    if (existingLocaleCookie) {
      response.cookies.set("NEXT_LOCALE", existingLocaleCookie.value, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  }

  // 3. Appliquer next-intl
  const response = intlMiddleware(req);

  // Ajouter les attributs de sécurité au cookie NEXT_LOCALE
  const localeCookie = response.cookies.get("NEXT_LOCALE");

  if (localeCookie) {
    response.cookies.set("NEXT_LOCALE", localeCookie.value, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  // 4. Protection admin
  const segments = pathname.split("/");
  const isAdminRoute = segments.includes("admin");

  if (isAdminRoute) {
    const session = req.cookies.get("admin_session");

    if (!session) {
      const url = req.nextUrl.clone();
      const currentLocale = segments[1];
      url.pathname = `/${currentLocale}/admin`;

      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
