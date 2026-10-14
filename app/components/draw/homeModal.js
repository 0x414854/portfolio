"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/components/homeModal.module.css";
import Countdown from "./countdown";

export default function HomeModal({ isActive, onClose }) {
  //   useEffect(() => {
  //     const today = new Date().toDateString();
  //     const lastSeen = localStorage.getItem("contestModalSeen");

  //     // Afficher le modal si pas encore vu aujourd'hui
  //     if (lastSeen !== today) {
  //       const timer = setTimeout(() => {
  //         setIsActive(true);
  //         localStorage.setItem("contestModalSeen", today);
  //       }, 800);

  //       return () => clearTimeout(timer);
  //     }
  //   }, []);

  // Fermeture du modal
  const closeModal = () => {
    onClose();
  };

  return (
    <div
      className={`${styles.modalContainer} ${isActive ? styles.active : ""}`}
      onClick={closeModal}
    >
      <section
        className={`${styles.modal} ${isActive ? styles.active : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeModal} onClick={closeModal}>
          &times;
        </button>

        <h1 className={styles.title}>🎉 Grand tirage au sort</h1>
        <h2 className={styles.subtitle}>
          <span>Gagne une récompense</span> pour ton entreprise
        </h2>

        <ul className={styles.rewards}>
          <li className={`${styles.reward} ${styles.gold}`}>
            <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s4}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s5}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s6}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s7}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s8}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s9}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s10}`}>✦</span>
            <span className={`${styles.sparkle} ${styles.s11}`}>✦</span>

            <div className={styles.contentContainer}>
              <div className={styles.medal}>🥇</div>
              <h3 className={styles.rewardTitle}>1er prix</h3>
              <p className={styles.rewardText}>
                <span className={styles.highlight}>
                  Site web professionnel clé en main
                </span>{" "}
                , avec les fonctionnalités essentielles pour lancer votre
                activité
              </p>
            </div>
          </li>

          <li className={`${styles.reward} ${styles.silver}`}>
            <div className={styles.medal}>🥈</div>
            <h3 className={styles.rewardTitle}>2e prix</h3>
            <p className={styles.rewardText}>
              <span className={styles.highlight}>–50 %</span> sur votre site web
              professionnel sur mesure
            </p>
          </li>

          <li className={`${styles.reward} ${styles.bronze}`}>
            <div className={styles.medal}>🥉</div>
            <h3 className={styles.rewardTitle}>3e prix</h3>
            <p className={styles.rewardText}>
              <span className={styles.highlight}>–30 %</span> sur votre site web
              professionnel sur mesure
            </p>
          </li>
        </ul>

        <div className={styles.countdown}>
          <Countdown targetDate="2026-02-06T20:00:00" />
        </div>

        <section className={styles.buttons}>
          <Link href="/draw" className={styles.button}>
            Plus d'informations
          </Link>
          <Link href="/draw#form" className={styles.ctaButton}>
            Participer au tirage
          </Link>
        </section>

        <p className={styles.note}>⏳ Offre limitée – 3 gagnants seulement</p>
      </section>
    </div>
  );
}
