import "./globals.css";
// import IonIconsLoader from "@/app/lib/ionIconLoader";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "../components/header/header";
import StarBackground from "../components/starBackground";
import Footer from "../components/footer/footer";
// import StarBackground from "./components/starBackground";
export const metadata = {
  title: "Arthur Barraud - Portfolio",
  description:
    "Développeur web et créateur de solutions logicielles. Découvrez mes projets en développement web, bots et logiciels.",
  icons: [
    { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    { url: "/favicon180.png", sizes: "180x180", type: "image/png" },
    { url: "/favicon192.png", sizes: "192x192", type: "image/png" },
    { url: "/favicon512.png", sizes: "512x512", type: "image/png" },
  ],
  keywords: [
    "Création de sites",
    "Développeur web",
    "Bots",
    "Designer web",
    "Logiciels sur mesure",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Arthur Barraud" }],
  openGraph: {
    title: {
      default: "Arthur Barraud - Portfolio",
      template: "%s | Arthur Barraud",
    },
    description: "Développeur web et créateur de solutions logicielles.",
    metadataBase: new URL("https://arthurbarraud.me"),
    url: "https://www.arthurbarraud.me",
    siteName: "Arthur Barraud - Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aperçu portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Barraud - Portfolio",
    description: "Développeur web et créateur de solutions logicielles.",
    images: ["/og-image.png"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return (
    <html lang={locale}>
      {/* <IonIconsLoader /> */}
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-JWV4VVPDX3`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JWV4VVPDX3');
          `}
        </Script>
        <NextIntlClientProvider>
          <StarBackground />
          <Header />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
