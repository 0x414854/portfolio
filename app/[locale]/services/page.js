import { Link } from "@/i18n/navigation";
import styles from "@/styles/page/services.module.css";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ServicesPage",
  });

  const websitePlans = [
    {
      name: t("plans.plan_1.name"),
      price: t("plans.plan_1.price"),
      pages: t("plans.plan_1.pages"),
      description: t("plans.plan_1.description"),
      features: [
        t("plans.plan_1.features.feature_1"),
        t("plans.plan_1.features.feature_2"),
        t("plans.plan_1.features.feature_3"),
        t("plans.plan_1.features.feature_4"),
      ],
      href: "/services/web/essentiel",
    },
    {
      name: t("plans.plan_2.name"),
      price: t("plans.plan_2.price"),
      pages: t("plans.plan_2.pages"),
      description: t("plans.plan_2.description"),
      features: [
        t("plans.plan_2.features.feature_1"),
        t("plans.plan_2.features.feature_2"),
        t("plans.plan_2.features.feature_3"),
        t("plans.plan_2.features.feature_4"),
        t("plans.plan_2.features.feature_5"),
      ],
      href: "/services/web/croissance",
    },
    {
      name: t("plans.plan_3.name"),
      price: t("plans.plan_3.price"),
      pages: t("plans.plan_3.pages"),
      description: t("plans.plan_3.description"),
      features: [
        t("plans.plan_3.features.feature_1"),
        t("plans.plan_3.features.feature_2"),
        t("plans.plan_3.features.feature_3"),
        t("plans.plan_3.features.feature_4"),
        t("plans.plan_3.features.feature_5"),
        t("plans.plan_3.features.feature_6"),
      ],
      href: "/services/web/business",
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />

      <header className={styles.intro}>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} />
          {t("eyebrow")}
        </p>

        <h1>
          {t.rich("title", {
            br: () => <br />,
            highlight: (chunks) => <span>{chunks}</span>,
          })}
        </h1>

        <p className={styles.introText}>{t("description")} </p>
      </header>

      <section className={styles.webSection} aria-labelledby="web-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionIndex}>{t("web.eyebrow")}</p>
            <h2 id="web-title">
              {t.rich("web.title", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>
            <p className={styles.sectionDescription}>{t("web.description")}</p>
          </div>

          {/* <Link
            href={`/${locale}/services/sites-web`}
            className={styles.textLink}
          >
            Découvrir l’offre <span aria-hidden="true">↗</span>
          </Link> */}
        </div>

        <div className={styles.plansGrid}>
          {websitePlans.map((plan, index) => (
            <article
              className={`${styles.planCard} ${
                plan.featured ? styles.featuredPlan : ""
              }`}
              key={plan.name}
            >
              <div className={styles.planTop}>
                <div className={styles.planMeta}>
                  <span className={styles.planNumber}>0{index + 1}</span>
                  {plan.featured && (
                    <span className={styles.popular}>
                      {t("web.plans.popular")}
                    </span>
                  )}
                </div>

                <h3>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{plan.price}</p>
                <p className={styles.priceCaption}>
                  {t("web.plans.priceCaption")}
                </p>
                <p className={styles.pageCount}>{plan.pages}</p>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.planActions}>
                <Link href={plan.href} className={styles.detailsButton}>
                  {t("web.plans.ctaDiscover")}
                </Link>

                <Link
                  href="/horaire-et-contact"
                  className={
                    plan.featured
                      ? styles.primaryButton
                      : styles.secondaryButton
                  }
                >
                  {t("web.plans.ctaForm")} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.sectionFootnote}>{t("web.bottomNote")}</p>
      </section>

      <section className={styles.otherServices} aria-label="Autres services">
        <article className={styles.serviceCard}>
          <div className={styles.serviceVisual} aria-hidden="true">
            <div className={styles.browserWindow}>
              <div className={styles.browserBar}>
                <i />
                <i />
                <i />
                <span>{t("maintenance.browserURL")}</span>
              </div>
              <div className={styles.browserBody}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLineShort} />
                <div className={styles.skeletonButton} />
              </div>
            </div>
          </div>

          <div className={styles.serviceContent}>
            <p className={styles.sectionIndex}>{t("maintenance.eyebrow")}</p>
            <h2>
              {t.rich("maintenance.title", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>
            <p>{t("maintenance.description")}</p>

            <div className={styles.servicePrice}>
              <strong>{t("maintenance.price")}</strong>
              <span>{t("maintenance.period")}</span>
            </div>

            <Link href="/services/maintenance" className={styles.detailsButton}>
              {t("maintenance.cta")}
            </Link>
          </div>
        </article>

        <article className={`${styles.serviceCard} ${styles.automationCard}`}>
          <div className={styles.serviceVisual} aria-hidden="true">
            <div className={styles.flowDiagram}>
              <div className={`${styles.flowNode} ${styles.flowNodeFirst}`}>
                <span>01</span>
                <i />
              </div>
              <div className={styles.flowConnector}>
                <i />
              </div>
              <div className={`${styles.flowNode} ${styles.flowNodeSecond}`}>
                <span>02</span>
                <i />
              </div>
              <div className={styles.flowConnector}>
                <i />
              </div>
              <div className={`${styles.flowNode} ${styles.flowNodeThird}`}>
                <span>03</span>
                <i />
              </div>
            </div>
            <p className={styles.flowCaption}>{t("automation.flowCaption")}</p>
          </div>

          <div className={styles.serviceContent}>
            <p className={styles.sectionIndex}>{t("automation.eyebrow")}</p>
            <h2>
              {t.rich("automation.title", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>
            <p>{t("automation.description")}</p>

            <div className={styles.servicePrice}>
              <strong>{t("automation.price")}</strong>
            </div>

            <Link
              href={`/${locale}/services/automatisations`}
              className={styles.detailsButton}
            >
              {t("automation.cta")}
            </Link>
          </div>
        </article>
      </section>

      <div className={styles.bottomLine} aria-hidden="true">
        <span>SIMPLITECH</span>
        <span>{t("automation.bottomNote")}</span>
      </div>
    </main>
  );
}
