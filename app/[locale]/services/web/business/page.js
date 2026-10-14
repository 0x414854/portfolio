import { Link } from "@/i18n/navigation";
import styles from "@/styles/page/croissance.module.css";
import Globe from "@/app/[locale]/components/worldParticlesAnimation";
import { useTranslations } from "next-intl";

export default function EssentielPage() {
  const t = useTranslations("WebPage.Business");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/services" className={styles.backLink}>
          <span aria-hidden="true">←</span> {t("backLink")}
        </Link>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <p className={styles.sectionIndex}>
              <span className={styles.statusDot} />
              {t("eyebrow")}
            </p>

            <h1>
              {t.rich("title", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h1>

            <p className={styles.description}>{t("description")}</p>

            <div className={styles.badges}>
              {/* <span className={styles.badge}> {t("badges.badge_1")}</span> */}
              <span className={styles.badge}> {t("badges.badge_2")}</span>
            </div>
          </div>
          <Globe />
        </header>

        <div className={styles.columns}>
          <section className={styles.mainColumn}>
            <h2>{t("features.title")}</h2>

            <ul className={styles.featuresList}>
              <li>{t("features.feature_1")}</li>
              <li>{t("features.feature_2")}</li>
              <li>{t("features.feature_3")}</li>
              <li>{t("features.feature_4")}</li>
              <li>{t("features.feature_5")}</li>
              <li>{t("features.feature_6")}</li>
              <li>{t("features.feature_7")}</li>
              <li>{t("features.feature_8")}</li>
              <li>{t("features.feature_9")}</li>
              <li>{t("features.feature_10")}</li>
              <li>{t("features.feature_11")}</li>
              <li>{t("features.feature_12")}</li>
              <li>{t("features.feature_13")}</li>
              <li>{t("features.feature_14")}</li>
              <li>{t("features.feature_15")}</li>
              <li>{t("features.feature_16")}</li>
              <li>{t("features.feature_17")}</li>
              <li>{t("features.feature_18")}</li>
              <li>{t("features.feature_19")}</li>
              <li>{t("features.feature_20")}</li>
              <li>{t("features.feature_21")}</li>
              <li>{t("features.feature_22")}</li>
            </ul>

            {/* <p className={styles.note}>
              *Délai indicatif à compter de la réception de tous les contenus
              nécessaires et de la validation du projet.
            </p> */}
          </section>

          <aside className={styles.sideColumn}>
            <div className={styles.infoCard}>
              <p className={styles.cardLabel}>{t("forLabel")}</p>

              <div className={styles.tags}>
                {[
                  t("tags.tag_1"),
                  t("tags.tag_2"),
                  t("tags.tag_3"),
                  t("tags.tag_4"),
                  t("tags.tag_5"),
                  t("tags.tag_6"),
                  t("tags.tag_7"),
                  t("tags.tag_8"),
                  t("tags.tag_9"),
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.infoCard}>
              <p className={styles.cardLabel}>{t("goalLabel")}</p>
              <p className={styles.cardText}>{t("goal")}</p>
            </div>

            <div className={styles.priceCard}>
              <p className={styles.cardLabel}>{t("priceLabel")} </p>
              <p className={styles.price}>{t("price")} </p>
              <p className={styles.priceCaption}>{t("priceCaption")}</p>
            </div>
          </aside>
        </div>

        <section className={styles.ctaSection}>
          <div>
            <h2>{t("cta.title")} </h2>
            <p>{t("cta.subtitle")} </p>
          </div>

          <Link href="/horaire-et-contact#form" className={styles.ctaButton}>
            {t("cta.cta")} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
