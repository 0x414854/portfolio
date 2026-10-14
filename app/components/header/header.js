"use client";

import styles from "@/styles/components/header/header.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

import Logo from "@/public/logo/logo.png";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arthur-barraud-3302a0139/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.3H7v11.2H3.4V9.3Zm5.8 0h3.5v1.5h.1a3.9 3.9 0 0 1 3.5-1.9c3.7 0 4.4 2.4 4.4 5.5v6.1h-3.6v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.5H9.2V9.3Z"
        />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+33660988623",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.4 3.6A11.7 11.7 0 0 0 2 17.7L.5 23.2l5.7-1.5a11.7 11.7 0 0 0 14.2-18.1ZM12 21a9.6 9.6 0 0 1-4.9-1.3l-.4-.2-3.4.9.9-3.3-.2-.4A9.5 9.5 0 1 1 12 21Zm5.2-7.1c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-.9 1.1c-.2.2-.3.2-.7.1a7.8 7.8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.8 5 .8.3 1.4.5 1.9.6.8.3 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4Z"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/0x414854",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .9a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.1a10.7 10.7 0 0 1 5.6 0c2.1-1.4 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.3-5.3 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.2 11.2 0 0 0 12 .9Z"
        />
      </svg>
    ),
  },
];

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
];

function SocialLinks({ className = "" }) {
  return (
    <div className={`${styles.socialLinks} ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visiter mon profil ${social.label}`}
          title={social.label}
          className={styles.socialLink}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

function LanguageSwitcher({ className = "", onChange }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);

  const currentLanguage =
    languages.find((language) => language.code === locale) ?? languages[0];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!switcherRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const changeLocale = (nextLocale) => {
    setOpen(false);
    if (nextLocale === locale) return;

    onChange?.();
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      ref={switcherRef}
      className={`${styles.languageSwitcher} ${className}`}
    >
      <button
        type="button"
        className={styles.languageButton}
        aria-label={`Langue actuelle : ${currentLanguage.label}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{currentLanguage.code.toUpperCase()}</span>
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={`${styles.languageChevron} ${
            open ? styles.languageChevronOpen : ""
          }`}
        >
          <path
            d="m4 6 4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className={styles.languageOptions}
          role="group"
          aria-label="Choisir une langue"
        >
          {languages.map((language) => {
            const isActive = language.code === locale;

            return (
              <button
                key={language.code}
                type="button"
                className={`${styles.languageOption} ${
                  isActive ? styles.languageOptionActive : ""
                }`}
                aria-pressed={isActive}
                onClick={() => changeLocale(language.code)}
              >
                <span>{language.label}</span>
                <span className={styles.languageCode}>
                  {language.code.toUpperCase()}
                </span>
                {isActive && (
                  <span className={styles.languageCheck} aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const links = [
    { label: t("link_1"), href: "/services" },
    { label: t("link_2"), href: "/horaire-et-contact" },
    { label: t("link_3"), href: "/portfolio" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
      if (mediaQuery.matches) setMenuOpen(false);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {menuOpen && (
        <button
          type="button"
          className={styles.menuOverlay}
          onClick={closeMenu}
          aria-label="Fermer le menu"
          tabIndex={-1}
        />
      )}

      <nav className={styles.navbar} aria-label="Navigation principale">
        <Link
          href="/"
          className={styles.logo}
          aria-label="Simplitech — Accueil"
          onClick={closeMenu}
        >
          <span className={styles.logoMark} aria-hidden="true">
            <Image
              src={Logo}
              // width={28}
              // height={28}
              alt="Logo Simplitech - Création de site web et automatisation pour faire grandir votre entreprise"
              className={styles.image}
            />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoName}>SIMPLITECH</span>
            <span className={styles.logoSub}>{t("logoSub")}</span>
          </span>
        </Link>

        <div
          id="mobile-navigation"
          className={`${styles.navigation} ${
            menuOpen ? styles.navigationOpen : ""
          }`}
          aria-hidden={!isDesktop && !menuOpen}
          inert={!isDesktop && !menuOpen}
        >
          <div className={styles.mobileMenuLabel}>
            <span>{t("mobileMenuLabel")}</span>
            <span className={styles.menuLabelLine} />
          </div>

          {links.map((link, index) => {
            const isActive =
              pathname === link.href ||
              pathname.endsWith(link.href) ||
              pathname.includes(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
                style={{ "--link-index": index }}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                {/* <span className={styles.mobileArrow} aria-hidden="true">
                  ↗
                </span> */}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={styles.mobileCta}
            onClick={closeMenu}
          >
            {t("mobileCTA")}
            {/* <span aria-hidden="true">↗</span> */}
          </Link>

          <div className={styles.mobileLanguageBlock}>
            <span className={styles.mobileSocialLabel}>
              {t("mobileLanguageLabel")}
            </span>
            <LanguageSwitcher
              className={styles.mobileLanguageSwitcher}
              onChange={closeMenu}
            />
          </div>

          <div className={styles.mobileSocialBlock}>
            <span className={styles.mobileSocialLabel}>
              {t("mobileSocialLabel")}
            </span>
            <SocialLinks className={styles.mobileSocialLinks} />
          </div>
        </div>

        <div className={styles.navActions}>
          <LanguageSwitcher className={styles.desktopLanguageSwitcher} />
          <SocialLinks className={styles.desktopSocialLinks} />

          <button
            type="button"
            className={`${styles.menuToggle} ${
              menuOpen ? styles.menuToggleOpen : ""
            }`}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
