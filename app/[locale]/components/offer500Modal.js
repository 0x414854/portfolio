import styles from "@/styles/components/offer500Modal.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Ajuster sparkle pour chaque ecran >= pous en bas aussi
//  Ajuster tailler pour certain ecrans

export default function Offer500Modal({ isActive, onClose }) {
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
  const [countryCode, setCountryCode] = useState("FR");

  useEffect(() => {
    async function detectCountry() {
      try {
        const response = await fetch("https://ipapi.co/json/");

        if (!response.ok) {
          throw new Error("API error");
        }

        const data = await response.json();

        if (data.country_code) {
          setCountryCode(data.country_code);
        }
      } catch (error) {
        console.error("Country detection failed:", error);

        // On garde la valeur par défaut (FR)
        setCountryCode("FR");
      }
    }

    detectCountry();
  }, []);

  const prices = {
    FR: "499 €",
    BE: "499 €",
    LU: "499 €",
    CH: "549 CHF",
    AU: "$849 AUD",
    DEFAULT: "499 €",
  };

  const price = prices[countryCode] || prices.DEFAULT;

  return (
    <section
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

        <div className={styles.badge}>OFFRE STARTER</div>

        <h1 className={styles.title}>
          🚀 Votre site internet professionnel en 72 h
        </h1>

        <p className={styles.subtitle}>
          Lancez votre activité avec un <span>site moderne</span> optimisé pour
          Google et adapté à tous les écrans, dès{" "}
          <span className={styles.price}>{price}</span>.
        </p>

        <section className={styles.rewards}>
          <article className={styles.reward}>
            <div className={styles.contentContainer}>
              <div className={styles.icon}>⚡</div>

              <h3 className={styles.rewardTitle}>Livraison en 3 jours</h3>

              <p className={styles.rewardText}>
                Votre site est mis en ligne sous{" "}
                <span className={styles.highlight}>72 heures</span> après
                réception de vos contenus.
              </p>
            </div>
          </article>

          <article className={styles.reward}>
            <div className={styles.contentContainer}>
              <div className={styles.icon}>📱</div>

              <h3 className={styles.rewardTitle}>Tout l'essentiel inclus</h3>

              <p className={styles.rewardText}>
                Jusqu'à 5 pages, responsive, formulaire de contact, Google Maps,
                WhatsApp, SEO de base et certificat SSL.
              </p>
            </div>
          </article>

          <article className={styles.reward}>
            <div className={styles.contentContainer}>
              <div className={styles.icon}>💼</div>

              <h3 className={styles.rewardTitle}>Idéal pour les entreprises</h3>

              <p className={styles.rewardText}>
                Parfait pour les artisans, indépendants, commerces et PME
                souhaitant être visibles rapidement sur Internet.
              </p>
            </div>
          </article>
        </section>

        <section className={styles.buttons}>
          <Link href="/#contactForm" className={styles.ctaButton}>
            Je lance mon site
          </Link>

          <Link href="/offres" className={styles.button}>
            <span style={{ opacity: 0 }}>Plus d'informations</span>
          </Link>
        </section>

        <p className={styles.note}>
          ✓ Compatible mobile • ✓ Optimisé SEO • ✓ Hébergement possible • ✓
          Évolutif
        </p>
      </section>
    </section>
  );
}
