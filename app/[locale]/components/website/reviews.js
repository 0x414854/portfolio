"use client";

import styles from "@/styles/website/reviews.module.css";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// Changer l'icone de la fleche par une etoile ?
// Faire en sorte que les avis tourne en boucle (1-->2-->3-->1)

function getRandomReviews(allReviews) {
  const shuffled = [...allReviews];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 3);
}

export default function ClientReviews() {
  const t = useTranslations("Homepage.Reviews");
  const trackRef = useRef(null);

  const reviews = [
    {
      id: 1,
      quote: t("reviews.quotes.quote_1"),
      name: "My Vision Board",
      service: t("reviews.services.website"),
      initials: "MV",
    },
    {
      id: 2,
      quote: t("reviews.quotes.quote_2"),
      name: "ViceVersa Atelier",
      service: t("reviews.services.website"),
      initials: "VA",
    },
    {
      id: 3,
      quote: t("reviews.quotes.quote_3"),
      name: "CDO Multiservices",
      service: t("reviews.services.website"),
      initials: "CDO",
    },
    // {
    //   id: 4,
    //   quote: t("reviews.quotes.quote_4"),
    //   name: "Haumana Bien-Être ",
    //   service: t("reviews.services.website"),
    //   initials: "HB",
    // },
  ];

  // Même valeur initiale côté serveur et côté client.
  const [displayedReviews, setDisplayedReviews] = useState([]);

  // La sélection aléatoire se fait uniquement après le montage.
  useEffect(() => {
    if (reviews.length >= 4) {
      setDisplayedReviews(getRandomReviews(reviews));
    } else {
      setDisplayedReviews(reviews.slice(0, 3));
    }
  }, []);

  const scroll = (direction) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const card = track.querySelector(`.${styles.card}`);

    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

    const distance = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.reviewsSection} aria-label="Avis de nos clients">
      <div className={styles.container}>
        <div className={styles.sectionTop}>
          <p className={styles.label}>
            <span className={styles.labelLine} />
            {t("eyebrow")}
          </p>

          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => scroll(-1)}
              aria-label="Avis précédent"
              disabled={displayedReviews.length === 0}
            >
              <span aria-hidden="true">←</span>
            </button>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => scroll(1)}
              aria-label="Avis suivant"
              disabled={displayedReviews.length === 0}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className={styles.track} ref={trackRef}>
          {displayedReviews.map((review) => (
            <article key={review.id} className={styles.card}>
              <div className={styles.quoteIcon} aria-hidden="true">
                “
              </div>

              <blockquote className={styles.quote}>{review.quote}</blockquote>

              <div className={styles.cardFooter}>
                <div className={styles.avatar} aria-hidden="true">
                  {review.initials}
                </div>

                <div className={styles.clientInfo}>
                  <p className={styles.clientName}>{review.name}</p>

                  <p className={styles.service}>{review.service}</p>
                </div>

                <span className={styles.accentMark} aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {displayedReviews.length > 0 && (
          <div className={styles.mobileHint} aria-hidden="true">
            <span />
            {t("mobileHint")}
          </div>
        )}
      </div>
    </section>
  );
}
