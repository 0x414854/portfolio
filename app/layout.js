import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IonIconsLoader from "./lib/ionIconLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arthur - Portfolio",
  description: "Portoflio by Arthur BARRAUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <IonIconsLoader />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
