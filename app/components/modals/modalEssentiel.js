"use client";

import styles from "@/styles/components/modal/modalEssentiel.module.css";

export default function ModalEssentiel({ onClose }) {
  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-essentiel-title"
        aria-describedby="modal-essentiel-description"
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>

        <div className={styles.modalContent}>
          <header className={styles.modalHeader}>
            <p className={styles.sectionIndex}>OFFRE 01 — SITE WEB</p>

            <h2 id="modal-essentiel-title">
              Site web <span>Essentiel</span>
            </h2>

            <p id="modal-essentiel-description" className={styles.description}>
              Une présence professionnelle en ligne pour lancer votre activité
              rapidement.
            </p>

            <div className={styles.badges}>
              <span className={styles.badge}>
                Livraison sous 5 jours ouvrés*
              </span>
              <span className={styles.badge}>Design responsive</span>
            </div>
          </header>

          <div className={styles.modalColumns}>
            <div className={styles.mainColumn}>
              <h3>Ce qui est inclus</h3>

              <ul className={styles.featuresList}>
                <li>Site web professionnel et moderne</li>
                <li>Jusqu’à 3 pages personnalisées</li>
                <li>Design adapté aux mobiles, tablettes et ordinateurs</li>
                <li>Présentation de votre entreprise et de vos services</li>
                <li>Coordonnées et horaires d’ouverture</li>
                <li>Formulaire de contact</li>
                <li>Boutons d’appel et de prise de contact</li>
                <li>Intégration de Google Maps</li>
                <li>Liens vers vos réseaux sociaux</li>
                <li>Optimisation SEO de base</li>
                <li>Mise en ligne du site</li>
              </ul>

              <p className={styles.note}>
                *Délai indicatif à compter de la réception de tous les contenus
                nécessaires et de la validation du projet.
              </p>
            </div>

            <aside className={styles.sideColumn}>
              <div className={styles.infoCard}>
                <p className={styles.cardLabel}>Idéal pour</p>

                <div className={styles.audienceTags}>
                  <span>Artisans</span>
                  <span>Indépendants</span>
                  <span>Commerces</span>
                  <span>Restaurants</span>
                  <span>Bars</span>
                  <span>Coiffeurs</span>
                  <span>Professionnels locaux</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <p className={styles.cardLabel}>L’objectif</p>
                <p className={styles.cardText}>
                  Présenter votre activité clairement, rassurer vos visiteurs et
                  faciliter la prise de contact.
                </p>
              </div>

              <div className={styles.priceCard}>
                <p className={styles.cardLabel}>Tarif de l’offre</p>
                <p className={styles.price}>500 €</p>
                <p className={styles.priceCaption}>
                  Prix de départ pour un site jusqu’à 3 pages.
                </p>
              </div>
            </aside>
          </div>
        </div>

        <footer className={styles.modalFooter}>
          <div className={styles.footerText}>
            <strong>Prêt à lancer votre site ?</strong>
            <span>Parlons de votre projet.</span>
          </div>

          <a
            className={styles.ctaButton}
            href="/horaire-et-contact"
            onClick={onClose}
          >
            Demander un devis <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </div>
  );
}
