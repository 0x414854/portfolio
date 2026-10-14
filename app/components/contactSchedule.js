"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page/horaire_et_contact.module.css";
import {
  getZonedParts,
  isValidTimeZone,
  zonedDateTimeToUtc,
} from "@/app/lib/timezones";

const BUSINESS_TIMEZONE = "Australia/Brisbane";
const FRANCE_TIMEZONE = "Europe/Paris";

const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function formatDate(date, timeZone) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(date);
}

function getWeekSchedule(now, displayTimezone, schedule) {
  // La semaine est déterminée à partir du calendrier australien.
  const businessParts = getZonedParts(now, BUSINESS_TIMEZONE);

  const businessDate = new Date(
    Date.UTC(businessParts.year, businessParts.month - 1, businessParts.day),
  );

  const dayOfWeek = businessDate.getUTCDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  const monday = new Date(businessDate);
  monday.setUTCDate(monday.getUTCDate() - daysSinceMonday);

  return DAYS.map((dayName, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    // Les heures d'ouverture sont définies en Australie.
    const start = zonedDateTimeToUtc(
      {
        year,
        month,
        day,
        hour: schedule.startHour,
        minute: 0,
      },
      BUSINESS_TIMEZONE,
    );

    const end = zonedDateTimeToUtc(
      {
        year,
        month,
        day,
        hour: schedule.endHour,
        minute: 0,
      },
      BUSINESS_TIMEZONE,
    );

    // Les instants obtenus sont ensuite affichés en France
    // ou dans le fuseau choisi par le visiteur.
    return {
      dayName,
      startDate: formatDate(start, displayTimezone),
      startTime: formatTime(start, displayTimezone),
      endDate: formatDate(end, displayTimezone),
      endTime: formatTime(end, displayTimezone),
    };
  });
}

function isBusinessOpen(now, schedule) {
  // On récupère l'heure et la date australiennes, jamais françaises.
  const parts = getZonedParts(now, BUSINESS_TIMEZONE);

  const businessDate = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day),
  );

  const businessDay = businessDate.getUTCDay();
  const businessMinutes = parts.hour * 60 + parts.minute;

  const isWorkingDay = schedule.workingDays.includes(businessDay);

  return (
    isWorkingDay &&
    businessMinutes >= schedule.startHour * 60 &&
    businessMinutes < schedule.endHour * 60
  );
}

export default function ContactSchedule({ localTimezone, schedule }) {
  const timezoneIsValid = isValidTimeZone(localTimezone);

  const displayTimezone = timezoneIsValid ? localTimezone : FRANCE_TIMEZONE;

  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return (
      <section
        className={styles.scheduleCard}
        aria-busy="true"
        aria-label="Chargement des horaires"
      >
        <p className={styles.mutedText}>Calcul des horaires…</p>
      </section>
    );
  }

  const isOpen = isBusinessOpen(now, schedule);
  const week = getWeekSchedule(now, displayTimezone, schedule);

  return (
    <section className={styles.scheduleCard}>
      <div className={styles.scheduleHeader}>
        <div>
          <p className={styles.eyebrow}>
            <span className={styles.statusDot} />
            Disponibilité
          </p>
          <h2 className={styles.cardTitle}>Horaires de contact</h2>
        </div>

        <span
          className={`${styles.status} ${
            isOpen ? styles.statusOpen : styles.statusClosed
          }`}
          aria-live="polite"
        >
          <span className={styles.statusDot} />
          {isOpen ? "Ouvert" : "Fermé"}
        </span>
      </div>

      <div className={styles.clockGrid}>
        <div className={styles.clockItem}>
          <span className={styles.clockLabel}>Australie — Cairns</span>
          <strong className={styles.clockTime}>
            {formatTime(now, BUSINESS_TIMEZONE)}
          </strong>
          <span className={styles.clockDate}>
            {formatDate(now, BUSINESS_TIMEZONE)}
          </span>
        </div>

        <div className={styles.clockItem}>
          <span className={styles.clockLabel}>France métropolitaine</span>
          <strong className={styles.clockTime}>
            {formatTime(now, FRANCE_TIMEZONE)}
          </strong>
          <span className={styles.clockDate}>
            {formatDate(now, FRANCE_TIMEZONE)}
          </span>
        </div>
      </div>

      <p className={styles.scheduleIntro}>
        Du lundi au vendredi, de <strong>{schedule.startHour} h</strong> à{" "}
        <strong>{schedule.endHour} h</strong>, heure australienne. Les horaires
        ci-dessous sont convertis dans le fuseau sélectionné.
      </p>

      <ul className={styles.scheduleList}>
        {week.map((item) => (
          <li className={styles.scheduleRow} key={item.dayName}>
            <span className={styles.scheduleDay}>{item.dayName}</span>

            <span className={styles.scheduleHours}>
              <span>
                {item.startTime} – {item.endTime}
              </span>

              <small>
                {item.startDate}
                {item.startDate !== item.endDate ? ` → ${item.endDate}` : ""}
              </small>
            </span>
          </li>
        ))}
      </ul>

      {!timezoneIsValid && (
        <p className={styles.errorText} role="alert">
          Le fuseau configuré n’est pas valide. L’affichage utilise
          temporairement le fuseau français.
        </p>
      )}

      <p className={styles.timezoneNote}>
        Horaires de référence : <code>{BUSINESS_TIMEZONE}</code>. Fuseau
        d’affichage : <code>{displayTimezone}</code>. Les conversions tiennent
        compte des changements d’heure.
      </p>
    </section>
  );
}
