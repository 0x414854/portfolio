import styles from "@/styles/page/automatisations.module.css";
import { useTranslations } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("WebPage.Automations");

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <section className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span>{t("eyebrow")}</span>
        </div>

        <h1 className={styles.title}>
          {t("title.line1")}
          <br />
          {t("title.line2")}{" "}
          <span className={styles.highlight}>{t("title.highlight")}</span>
        </h1>

        <p className={styles.description}>
          {t("description.line1")}
          <br className={styles.desktopBreak} />
          {t("description.line2")}
        </p>

        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span>{t("status")}</span>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} />
        </div>

        <span className={styles.footer}>
          <span>{t("footer.conception")}</span>
          <span className={styles.footerSeparator}>/</span>
          <span>{t("footer.development")}</span>
          <span className={styles.footerSeparator}>/</span>
          <span>{t("footer.soon")}</span>
        </span>
      </section>

      <span className={styles.cornerLabel} aria-hidden="true">
        {t("projectLabel")}
      </span>
    </main>
  );
}
