"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/app/components/countdown"; // ton composant countdown réutilisable
import DrawForm from "@/app/components/drawForm";
import styles from "@/styles/page/draw.module.css";

import BackArrowWhite from "@/public/icon/backArrowWhite.png";

export default function DrawPage() {
  const [showRules, setShowRules] = useState(false);
  // Exemple : récupérer les informations du tirage
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function fetchParticipants() {
      const res = await fetch("/api/draw");
      if (res.ok) {
        const data = await res.json();
        setParticipants(data);
      }
    }
    fetchParticipants();
  }, []);

  const handleOpenRules = () => {
    setShowRules(true);

    // scroll après que le DOM soit mis à jour
    setTimeout(() => {
      const rulesElement = document.getElementById("rules");
      if (rulesElement) {
        rulesElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // petit délai pour s'assurer que l'élément est rendu
  };

  return (
    <main className={styles.DrawPageContainer}>
      {/* Bouton de retour */}
      <section className={styles.nav}>
        <Link href="/" className={styles.backButton}>
          <Image src={BackArrowWhite} width={40} height={20} alt="test" />
          Retour à l'accueil
        </Link>
      </section>

      {/* Titre + sous-titre */}
      <section className={styles.titleContainer}>
        <h1 className={styles.title}>
          🎉 Grand Tirage au Sort pour Votre Entreprise
        </h1>
        <p className={styles.subtitle}>
          Gagnez un site web professionnel clé en main et boostez votre activité
        </p>
      </section>

      {/* Countdown */}
      <section className={styles.countdownSection}>
        <h2>⏳ Temps restant avant le tirage</h2>
        <Countdown targetDate="2026-02-06T20:00:00" />
      </section>

      {/* Récompenses */}
      <section className={styles.rewardsSection}>
        <h2>🏆 Récompenses du tirage</h2>
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
        <span className={`${styles.sparkle} ${styles.s12}`}>✦</span>
        <span className={`${styles.sparkle} ${styles.s13}`}>✦</span>
        <span className={`${styles.sparkle} ${styles.s14}`}>✦</span>
        <ul className={styles.rewards}>
          <li className={`${styles.reward} ${styles.gold}`}>
            <div className={styles.medal}>🥇</div>
            <p className={styles.rewardTitle}>1er prix</p>
            <p className={styles.rewardText}>
              <span className={styles.highlight}>
                Site web professionnel clé en main
              </span>
              , avec toutes les fonctionnalités essentielles pour lancer et
              développer votre entreprise.
            </p>
          </li>
          <li className={`${styles.reward} ${styles.silver}`}>
            <div className={styles.medal}>🥈</div>
            <p className={styles.rewardTitle}>2e prix</p>
            <p className={styles.rewardText}>
              <span className={styles.highlight}>–50 %</span> sur la création de
              votre site web professionnel sur mesure.
            </p>
          </li>
          <li className={`${styles.reward} ${styles.bronze}`}>
            <div className={styles.medal}>🥉</div>
            <p className={styles.rewardTitle}>3e prix</p>
            <p className={styles.rewardText}>
              <span className={styles.highlight}>–30 %</span> sur la création de
              votre site web professionnel sur mesure.
            </p>
          </li>
        </ul>
      </section>

      {/* Description / valeur */}
      <section className={styles.description}>
        <h2>Pourquoi participer ?</h2>
        <p>
          Ce tirage au sort offre à votre entreprise une opportunité unique de
          gagner un{" "}
          <span className={styles.ctaText}>
            site web professionnel sur mesure
          </span>
          , pensé pour{" "}
          <span className={styles.ctaText}>générer vos premiers clients</span>,{" "}
          <span className={styles.ctaText}>renforcer votre crédibilité</span> et{" "}
          <span className={styles.ctaText}>
            développer votre visibilité en ligne
          </span>
          . Ne laissez pas passer cette chance d’obtenir une{" "}
          <span className={styles.ctaText}>
            vitrine digitale moderne et performante
          </span>
          , parfaitement{" "}
          <span className={styles.ctaText}>adaptée à votre activité</span>.
        </p>
      </section>

      {/* Règlement */}

      <section className={styles.ctaForm}>
        <DrawForm showRules={handleOpenRules} />
      </section>

      {/* CTA pour formulaire */}
      {/* <section className={styles.rulesButton}>
        <button
          className={styles.ctaButton}
          onClick={() => setShowRules(!showRules)}
        >
          {showRules ? "Masquer le règlement" : "Afficher le règlement"}
        </button>
      </section> */}
      {showRules && (
        <section className={styles.rules} id="rules">
          <h2>📜 Règlement du tirage au sort</h2>
          <p>
            Le présent tirage au sort est organisé afin de permettre à des
            entreprises de remporter l’un des{" "}
            <span className={styles.ctaText}>trois lots professionnels</span>{" "}
            dédiés à la création de leur site web.
          </p>

          <ul>
            <li>
              La participation est{" "}
              <span className={styles.ctaText}> gratuite</span> et ouverte à
              toute entreprise ou professionnel disposant d’une activité
              déclarée.
            </li>

            <li>
              <span className={styles.ctaText}>
                Une seule participation est autorisée par entreprise
              </span>
              . Toute participation multiple entraînera l’annulation des
              inscriptions concernées.
            </li>

            <li>
              Les inscriptions sont ouvertes jusqu’au
              <span className={styles.ctaText}> 13 février à 20h</span>.
            </li>

            <li>
              Le tirage au sort aura lieu le
              <span className={styles.ctaText}> 14 février à 20h</span>, parmi
              l’ensemble des participations valides.
            </li>

            <li>
              <span className={styles.ctaText}>Trois gagnants</span> seront
              désignés :
              <ul className={styles.prices}>
                <li>
                  <strong>1er prix :</strong> un site web professionnel complet,
                  basé sur une structure standard adaptée aux besoins essentiels
                  de l’entreprise gagnante.
                </li>
                <li>
                  <strong>2e prix :</strong> 50 % de réduction sur la création
                  d’un site web professionnel.
                </li>
                <li>
                  <strong>3e prix :</strong> 30 % de réduction sur la création
                  d’un site web professionnel.
                </li>
              </ul>
            </li>

            <li>
              Les gagnants seront
              <span className={styles.ctaText}>
                {" "}
                contactés le 15 février
              </span>{" "}
              via les coordonnées fournies lors de l’inscription.
            </li>

            <li>
              En l’absence de réponse dans un délai raisonnable, l’organisateur
              se réserve le droit de procéder à
              <span className={styles.ctaText}> un nouveau tirage</span>.
            </li>

            <li>
              Le
              <span className={styles.ctaText}>
                {" "}
                périmètre du site web offert
              </span>{" "}
              (structure, pages, fonctionnalités) est défini selon une structure
              standard et pourra être ajusté en fonction des besoins réels de
              l’entreprise gagnante et des contraintes techniques.
            </li>

            <li>
              L’organisateur se réserve le droit de
              <span className={styles.ctaText}>
                {" "}
                modifier le présent règlement
              </span>{" "}
              ou les modalités du tirage si les circonstances l’exigent.
            </li>

            <li>
              Les lots sont
              <span className={styles.ctaText}>
                {" "}
                non échangeables, non cessibles
              </span>{" "}
              et ne peuvent donner lieu à aucune contrepartie financière.
            </li>

            <li>
              Les données collectées sont utilisées exclusivement dans le cadre
              du tirage au sort et de la prise de contact, conformément à la
              réglementation en vigueur.
            </li>
          </ul>

          <p className={styles.rulesNote}>
            Toute participation implique{" "}
            <span className={styles.ctaText}>
              l’acceptation pleine et entière
            </span>{" "}
            du présent règlement.
          </p>
        </section>
      )}
    </main>
  );
}
