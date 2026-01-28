import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("admin_session");
  const { pathname } = req.nextUrl;

  // Autorise toutes les requêtes qui ne sont pas /admin
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Si cookie admin_session existe → ok
  if (session) return NextResponse.next();

  // Sinon, laisse passer la page /admin, le composant se charge et affiche le formulaire
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
