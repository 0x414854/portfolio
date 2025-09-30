import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IonIconsLoader from "./lib/ionIconLoader";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    title: "Arthur Barraud - Portfolio",
    description: "Développeur web et créateur de solutions logicielles.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <IonIconsLoader />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
