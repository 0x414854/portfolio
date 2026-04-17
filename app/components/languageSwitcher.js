"use client";

import styles from "@/styles/components/languageSwitcher.module.css";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // enlève la locale actuelle du path
  const pathWithoutLocale = pathname.replace(`/${locale}`, "");

  return (
    <div className={styles.languages}>
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${pathWithoutLocale}`}
          className={styles.language}
          style={{
            fontWeight: locale === lang.code ? "bold" : "normal",
            opacity: locale === lang.code ? 1 : 0.6,
          }}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
