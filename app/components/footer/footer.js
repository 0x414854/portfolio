"use client";

import styles from "@/styles/components/footer/footer.module.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import Logo from "@/public/logo/logo.png";

// Creer mon logo et l'ajouter
// Modifier icone mail et telephone
// Changer les couleurs
// Configurer 'nxt-intl' correctement
// Ajouter italien dans les langues

const FOOTER_CONFIG = {
  logo: Logo,

  email: "arthur.barraud@proton.me",
  phone: "+61 411 480 676",
  abn: "12 811 348 685",

  timeZone: "Australia/Brisbane",

  socials: [
    { name: "Whatsapp", url: "https://wa.me/+33660988623" },
    { name: "Facebook", url: "" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arthur-barraud-3302a0139/",
    },
    { name: "Github", url: "https://github.com/0x414854" },
  ],

  openingHours: {
    monday: { open: "08:00", close: "20:00" },
    tuesday: { open: "08:00", close: "20:00" },
    wednesday: { open: "08:00", close: "20:00" },
    thursday: { open: "08:00", close: "20:00" },
    friday: { open: "08:00", close: "20:00" },
    saturday: null,
    sunday: null,
  },
};

function getBrisbaneTime() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: FOOTER_CONFIG.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return {
    weekday: values.weekday,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatHour(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return `${hours}h${minutes === 0 ? "" : String(minutes).padStart(2, "0")}`;
}

function getHoursLabel(hours) {
  if (!hours) return "Fermé";

  return `${formatHour(hours.open)} – ${formatHour(hours.close)}`;
}

function getGroupHours(days) {
  const firstHours = FOOTER_CONFIG.openingHours[days[0]];

  const areEqual = days.every((day) => {
    const hours = FOOTER_CONFIG.openingHours[day];

    return (
      hours?.open === firstHours?.open && hours?.close === firstHours?.close
    );
  });

  if (!areEqual) return "Horaires variables";

  return getHoursLabel(firstHours);
}

/* ==================================================
   FOOTER
================================================== */

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const DAY_KEYS = {
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thu: "thursday",
    Fri: "friday",
    Sat: "saturday",
    Sun: "sunday",
  };

  const DAY_NAMES = {
    Mon: t("scheduleSection.week.monday"),
    Tue: t("scheduleSection.week.tuesday"),
    Wed: t("scheduleSection.week.wednesday"),
    Thu: t("scheduleSection.week.thursday"),
    Fri: t("scheduleSection.week.friday"),
    Sat: t("scheduleSection.week.saturday"),
    Sun: t("scheduleSection.week.sunday"),
  };

  const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const WEEKEND = ["saturday", "sunday"];

  function changeLanguage(nextLocale) {
    if (nextLocale === locale) return;

    router.replace(pathname, {
      locale: nextLocale,
    });
  }
  const [brisbaneTime, setBrisbaneTime] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      setBrisbaneTime(getBrisbaneTime());

      setCurrentYear(
        new Intl.DateTimeFormat("en", {
          timeZone: FOOTER_CONFIG.timeZone,
          year: "numeric",
        }).format(new Date()),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 60_000);

    return () => clearInterval(interval);
  }, []);

  const todayKey = brisbaneTime ? DAY_KEYS[brisbaneTime.weekday] : null;

  const todayHours = todayKey ? FOOTER_CONFIG.openingHours[todayKey] : null;

  const isOpen =
    Boolean(todayHours) &&
    brisbaneTime !== null &&
    brisbaneTime.minutes >= timeToMinutes(todayHours.open) &&
    brisbaneTime.minutes < timeToMinutes(todayHours.close);

  const phoneHref = FOOTER_CONFIG.phone.replace(/[^\d+]/g, "");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Simplitech — Accueil"
          >
            <Image
              src={FOOTER_CONFIG.logo}
              alt="Simplitech"
              width={180}
              height={80}
              className={styles.logo}
            />
          </Link>

          <p className={styles.brandDescription}>{t("description")}</p>

          <div className={styles.contactDetails}>
            <a href={`mailto:${FOOTER_CONFIG.email}`}>
              <span aria-hidden="true">✉</span>
              {FOOTER_CONFIG.email}
            </a>

            <a href={`tel:${phoneHref}`}>
              <span aria-hidden="true">↗</span>
              {FOOTER_CONFIG.phone}
            </a>
          </div>

          <div className={styles.socials}>
            {FOOTER_CONFIG.socials
              .filter((social) => social.url.trim() !== "")
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
          </div>

          {/* Sélecteur de langue à connecter plus tard */}
          <div className={styles.languageSelector}>
            <button
              type="button"
              onClick={() => changeLanguage("fr")}
              className={
                locale === "fr" ? styles.languageActive : styles.languageButton
              }
              aria-pressed={locale === "fr"}
              aria-label="Passer en français"
            >
              FR
            </button>

            <span className={styles.languageDivider}>/</span>

            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={
                locale === "en" ? styles.languageActive : styles.languageButton
              }
              aria-pressed={locale === "en"}
              aria-label="Switch to English"
            >
              EN
            </button>

            <span className={styles.languageDivider}>/</span>

            <button
              type="button"
              onClick={() => changeLanguage("it")}
              className={
                locale === "it" ? styles.languageActive : styles.languageButton
              }
              aria-pressed={locale === "it"}
              aria-label="Cambiare in Italiano"
            >
              IT
            </button>
          </div>
        </div>

        {/* Services */}
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>{t("servicesSection.title")}</h2>

          <ul className={styles.linkList}>
            <li>
              <Link href="/services/web">{t("servicesSection.service_1")}</Link>
            </li>

            <li>
              <Link href="/services/maintenance">
                {t("servicesSection.service_2")}
              </Link>
            </li>

            <li>
              <Link href="/services/automatisation">
                {t("servicesSection.service_3")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Informations légales */}
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Entreprise</h2>

          <ul className={styles.linkList}>
            <li>
              <Link href="/horaire-et-contact">
                {" "}
                {t("compagnySection.link_1")}
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales">
                {" "}
                {t("compagnySection.link_2")}
              </Link>
            </li>

            <li>
              <Link href="/politique-confidentialite">
                {t("compagnySection.link_3")}
              </Link>
            </li>

            <li>
              <Link href="/conditions-generales-vente">
                {t("compagnySection.link_4")}
              </Link>
            </li>
          </ul>

          <p className={styles.abn}>ABN : {FOOTER_CONFIG.abn}</p>
        </div>

        {/* Horaires d'ouverture */}
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>{t("scheduleSection.title")}</h2>

          <div className={styles.statusRow} aria-live="polite">
            <span
              className={`${styles.statusDot} ${
                isOpen ? styles.statusOpen : styles.statusClosed
              }`}
            />

            <span
              className={
                isOpen ? styles.statusTextOpen : styles.statusTextClosed
              }
            >
              {isOpen
                ? t("scheduleSection.status.open")
                : t("scheduleSection.status.close")}
            </span>
          </div>

          <p className={styles.timeZoneLabel}>
            {t("scheduleSection.timeZoneLabel")}
          </p>

          <div className={styles.hoursList}>
            <div className={styles.hoursRow}>
              <span>{t("scheduleSection.hours.weekdays")}</span>
              <span>{getGroupHours(WEEKDAYS)}</span>
            </div>

            <div className={styles.hoursRow}>
              <span>{t("scheduleSection.hours.weekend")}</span>
              <span>{getGroupHours(WEEKEND)}</span>
            </div>
          </div>

          {brisbaneTime && todayKey && (
            <p className={styles.todayHours}>
              {t("scheduleSection.today")} ({DAY_NAMES[brisbaneTime.weekday]}) :{" "}
              {getHoursLabel(todayHours)}
            </p>
          )}
        </div>
      </div>

      {/* Bas de page */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {currentYear ?? new Date().getFullYear()} {t("copyright")}
        </p>

        <p className={styles.powered}>
          Powered with <span aria-label="cœur noir">🖤</span> by{" "}
          <Link href="/">Simplitech - Arthur BARRAUD</Link>
        </p>
      </div>
    </footer>
  );
}
