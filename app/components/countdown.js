"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/components/countdown.module.css";

/* 📅 Dates clés */
const REGISTRATION_END = new Date("2026-02-14T20:00:00").getTime();
const DRAW_DATE = new Date("2026-02-15T20:00:00").getTime();
const DRAW_DURATION = 1 * 60 * 1000; // 30 secondes de tirage

/* 🔁 Utils */
const format = (value) => String(value).padStart(2, "0");
const getTimeLeft = (target) => {
  const distance = target - Date.now();
  if (distance <= 0) return null;
  return {
    days: format(Math.floor(distance / 86400000)),
    hours: format(Math.floor((distance / 3600000) % 24)),
    minutes: format(Math.floor((distance / 60000) % 60)),
    seconds: format(Math.floor((distance / 1000) % 60)),
  };
};

const getStatus = (now) => {
  if (now < REGISTRATION_END) return "OPEN";
  if (now >= REGISTRATION_END && now < DRAW_DATE) return "CLOSED";
  if (now >= DRAW_DATE && now < DRAW_DATE + DRAW_DURATION) return "DRAWING";
  return "DONE";
};

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [winners, setWinners] = useState([]);
  const [tirageDone, setTirageDone] = useState(false);

  const status = getStatus(now);

  // Met à jour le timer toutes les secondes
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Tirage automatique
  useEffect(() => {
    const doDraw = async () => {
      try {
        const res = await fetch("/api/draw-winners", {
          method: "POST",
        });
        const data = await res.json();
        if (data.winners) {
          setWinners(data.winners);
          setTirageDone(true); // empêche les appels répétés
        }
      } catch (err) {
        console.error("Erreur tirage :", err);
      }
    };

    if (status === "DRAWING" && !tirageDone) {
      doDraw();
    }
  }, [status, tirageDone]);

  // Récupérer les gagnants si le tirage est déjà fait
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await fetch("/api/draw-winners");
        const data = await res.json();
        if (data.winners) setWinners(data.winners);
      } catch (err) {
        console.error("Erreur récupération gagnants :", err);
      }
    };

    if (status === "DONE" && winners.length === 0) {
      fetchWinners();
    }
  }, [status, winners.length]);

  /* 🦴 Skeleton SSR-safe */
  if (!mounted) {
    return (
      <div className={styles.skeleton}>
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  /* 🔓 INSCRIPTIONS OUVERTES */
  if (status === "OPEN") {
    const timeLeft = getTimeLeft(REGISTRATION_END);
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.label}>⏳ Inscriptions ouvertes</h3>
        <CountdownUI timeLeft={timeLeft} />
      </div>
    );
  }

  /* 🔒 INSCRIPTIONS TERMINÉES */
  if (status === "CLOSED") {
    const timeLeft = getTimeLeft(DRAW_DATE);
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.label}>❌ Inscriptions terminées</h3>
        <p className={styles.subLabel}>🎲 Tirage le 7 février à 20h</p>
        <CountdownUI timeLeft={timeLeft} />
      </div>
    );
  }

  /* ⏳ TIRAGE EN COURS */
  if (status === "DRAWING") {
    return (
      <div className={styles.drawing}>
        <Hourglass />
        <h3 className={styles.label}>🎲 Tirage en cours…</h3>
      </div>
    );
  }

  /* 🏆 TIRAGE TERMINÉ */
  return (
    <div className={styles.results}>
      <h3 className={styles.label}>🎉 Les gagnants ont été tirés au sort</h3>
      <ul className={styles.winners}>
        {winners.map((winner) => (
          <li key={winner.compagny_id} className={styles.winner}>
            <span className={styles.rank}>{winner.rank}</span>
            <p className={styles.compagny}>{winner.compagny_name}</p>
            <p className={styles.prize}>{winner.prize}</p>
          </li>
        ))}
      </ul>
      <p>📩 Les gagnants seront contactés le 9 février</p>
    </div>
  );
}

/* ⏱ UI Countdown */
function CountdownUI({ timeLeft }) {
  if (!timeLeft) return null;
  return (
    <div className={styles.time}>
      <span>
        <strong>{timeLeft.days}</strong>J
      </span>
      <span>
        <strong>{timeLeft.hours}</strong>H
      </span>
      <span>
        <strong>{timeLeft.minutes}</strong>M
      </span>
      <span>
        <strong>{timeLeft.seconds}</strong>S
      </span>
    </div>
  );
}

/* ⌛ Sablier animé */
function Hourglass() {
  return <div className={styles.hourglass} />;
}
