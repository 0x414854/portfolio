"use client";

import styles from "@/styles/components/countdown.module.css";
import { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const target = new Date(targetDate).getTime();

    const updateTime = () => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
          2,
          "0"
        ),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [mounted, targetDate]);

  /* 🔹 Skeleton SSR-safe */
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

  /* 🔹 Countdown terminé */
  if (!timeLeft) {
    return (
      <p>
        <strong>🎉 Tirage en cours ou terminé !</strong>
      </p>
    );
  }

  return (
    <>
      {/* <p>Tirage dans :</p> */}
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
    </>
  );
}
