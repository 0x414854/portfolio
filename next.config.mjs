// Quelques points importants :
// - 'unsafe-inline' autorise les scripts intégrés nécessaires à certaines configurations Next.js, mais réduit la protection contre les attaques XSS. Une politique basée sur des nonces est préférable pour une protection renforcée.
// - connect-src https: wss: permet les connexions HTTPS et WebSocket vers n'importe quel domaine. Pour une CSP plus stricte, remplace ces sources par les domaines précis utilisés par ton application, par exemple ton projet Supabase.
// - upgrade-insecure-requests demande au navigateur de convertir les requêtes HTTP en HTTPS. À conserver si ton site fonctionne entièrement en HTTPS.
// - frame-ancestors 'none' empêche l'intégration de ton site dans une iframe, ce qui est à adapter si cette fonctionnalité est nécessaire.

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https: wss:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only", //SEULEMENT EN TEST POUR VERIFIER LES DOMAINES NECESSAIRE
            value: csp,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
