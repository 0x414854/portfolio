import styles from "@/styles/website/ctaSection.module.css";
import { useTranslations } from "next-intl";

export default function FinalCTA() {
  const t = useTranslations("Homepage.CTA");
  return (
    <section className={styles.ctaSection} id="contact">
      <div className={styles.ctaContainer}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaGrid} aria-hidden="true" />

        <div className={styles.ctaContent}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("eyebrow")}
          </span>

          <h2 className={styles.title}>
            {t.rich("title", {
              br: () => <br />,
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p className={styles.description}>
            {t.rich("description", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <div className={styles.actions}>
            <a href="/horaire-et-contact#form" className={styles.primaryButton}>
              {t("cta_1")}
            </a>

            <a href="/services" className={styles.secondaryButton}>
              {t("cta_2")}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className={styles.reassurance}>
            <span className={styles.reassuranceIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3.5 19 6v5.4c0 4.2-2.8 7.3-7 9.1-4.2-1.8-7-4.9-7-9.1V6l7-2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span>{t("bottomNote")} </span>
          </div>
        </div>

        <div className={styles.bottomLine}>
          <span>{t("footerQuestion")}</span>
          <span className={styles.bottomLineAccent}>{t("footerAnswer")}</span>
        </div>
      </div>
    </section>
  );
}
