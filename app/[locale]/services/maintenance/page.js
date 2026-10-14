import styles from "@/styles/page/maintenance.module.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const plans = [
  { id: "essentiel", featured: false },
  { id: "evolution", featured: true },
  { id: "premium", featured: false },
];

const includedItems = ["item_1", "item_2", "item_3", "item_4"];

const extraItems = ["item_1", "item_2", "item_3", "item_4", "item_5", "item_6"];

const faqs = ["faq_1", "faq_2", "faq_3", "faq_4", "faq_5"];

function CheckIcon() {
  return (
    <span className={styles.checkIcon} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="m5 10.5 3.2 3.2L15.5 6.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrowIcon}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 10h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MaintenancePage() {
  const t = useTranslations("WebPage.Maintenance");

  // Facilite l'utilisation des clés de traduction dynamiques.
  const tr = (key) => t(key);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/services" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          {t("backLink")}
        </Link>

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.statusDot} />
              {t("hero.eyebrow")}
            </p>

            <h1>
              {t.rich("hero.title", {
                br: () => <br />,
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h1>

            <p className={styles.heroText}>{t("hero.description")}</p>

            <div className={styles.heroActions}>
              <Link href="#forfaits" className={styles.primaryButton}>
                {t("hero.actions.plans")}
                <ArrowIcon />
              </Link>

              <Link href="#hors-forfait" className={styles.secondaryButton}>
                {t("hero.actions.included")}
              </Link>
            </div>

            <div className={styles.trustRow}>
              <span>
                <CheckIcon />
                {t("hero.trust.item_1")}
              </span>
              <span>
                <CheckIcon />
                {t("hero.trust.item_2")}
              </span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualGlow} />
            <div className={styles.visualRing} />
            <div className={styles.visualRingInner} />

            <div className={styles.visualCore}>
              <div className={styles.coreIcon}>
                <svg viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 5 39 11v11c0 10-6.4 16.8-15 21-8.6-4.2-15-11-15-21V11L24 5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m17 23 5 5 10-11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span>{t("hero.visual.site")}</span>
              <strong>{t("hero.visual.status")}</strong>
            </div>

            <div className={`${styles.floatCard} ${styles.floatTop}`}>
              <span className={styles.floatIcon}>✓</span>
              <div>
                <strong>{t("hero.visual.card_1_title")}</strong>
                <small>{t("hero.visual.card_1_text")}</small>
              </div>
            </div>

            <div className={`${styles.floatCard} ${styles.floatBottom}`}>
              <span className={styles.floatPulse} />
              <div>
                <strong>{t("hero.visual.card_2_title")}</strong>
                <small>{t("hero.visual.card_2_text")}</small>
              </div>
            </div>

            <span className={`${styles.spark} ${styles.sparkOne}`} />
            <span className={`${styles.spark} ${styles.sparkTwo}`} />
            <span className={`${styles.spark} ${styles.sparkThree}`} />
          </div>
        </section>

        {/* BÉNÉFICES */}
        <section className={styles.benefitsStrip}>
          {[1, 2, 3].map((number) => {
            const key = `item_${number}`;

            return (
              <div key={key}>
                <span className={styles.benefitNumber}>
                  {String(number).padStart(2, "0")}
                </span>
                <p>{tr(`benefits.${key}.title`)}</p>
                <small>{tr(`benefits.${key}.text`)}</small>
              </div>
            );
          })}
        </section>

        {/* FORFAITS */}
        <section id="forfaits" className={styles.pricingSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("pricing.eyebrow")}</p>

            <h2>
              {t.rich("pricing.title", {
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>

            <p>{t("pricing.description")}</p>
          </div>

          <div className={styles.pricingGrid}>
            {plans.map((plan, index) => {
              const planKey = `pricing.plans.${plan.id}`;

              return (
                <article
                  id={plan.id}
                  key={plan.id}
                  className={`${styles.planCard} ${
                    plan.featured ? styles.featuredPlan : ""
                  }`}
                  style={{ "--card-index": index }}
                >
                  {plan.featured && (
                    <div className={styles.popularLabel}>
                      <span className={styles.popularDot} />
                      {t("pricing.popular")}
                    </div>
                  )}

                  <div className={styles.planTop}>
                    <p className={styles.planName}>{tr(`${planKey}.name`)}</p>

                    <p className={styles.planTarget}>
                      {tr(`${planKey}.target`)}
                    </p>

                    <p className={styles.planDescription}>
                      {tr(`${planKey}.description`)}
                    </p>
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.priceCurrency}>€</span>
                    <span className={styles.priceValue}>
                      {tr(`${planKey}.price`)}
                    </span>
                    <span className={styles.pricePeriod}>
                      {t("pricing.pricePeriod")}
                    </span>
                  </div>

                  <p className={styles.priceNote}>{t("pricing.priceNote")}</p>

                  <Link
                    href="/horaire-et-contact#form"
                    className={
                      plan.featured
                        ? styles.planButtonPrimary
                        : styles.planButton
                    }
                  >
                    {tr(`${planKey}.cta`)}
                    <ArrowIcon />
                  </Link>

                  <div className={styles.planDivider} />

                  <p className={styles.listHeading}>
                    {t("pricing.featuresTitle")}
                  </p>

                  <ul className={styles.featureList}>
                    {Array.from({ length: 7 }, (_, featureIndex) => {
                      const featureKey = `feature_${featureIndex + 1}`;

                      return (
                        <li key={featureKey}>
                          <CheckIcon />
                          <span>{tr(`${planKey}.features.${featureKey}`)}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className={styles.planFootnote}>
                    <span className={styles.footnoteIcon}>i</span>
                    <p>{t("pricing.footnote")}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className={styles.pricingDisclaimer}>{t("pricing.disclaimer")}</p>
        </section>

        {/* INCLUS / NON INCLUS */}
        <section id="hors-forfait" className={styles.scopeSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("scope.eyebrow")}</p>

            <h2>
              {t.rich("scope.title", {
                br: () => <br />,
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>

            <p>{t("scope.description")}</p>
          </div>

          <div className={styles.scopeGrid}>
            <article className={styles.scopeCard}>
              <div className={styles.scopeCardHeader}>
                <span className={styles.scopeIconIncluded}>
                  <CheckIcon />
                </span>

                <div>
                  <h3>{t("scope.included.title")}</h3>
                  <p>{t("scope.included.subtitle")}</p>
                </div>
              </div>

              <ul className={styles.scopeList}>
                {includedItems.map((itemKey) => (
                  <li key={itemKey}>
                    <CheckIcon />
                    <div>
                      <strong>
                        {t(`scope.included.items.${itemKey}.title`)}
                      </strong>
                      <p>{t(`scope.included.items.${itemKey}.text`)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className={styles.scopeFootnote}>
                {t("scope.included.footnote")}
              </p>
            </article>

            <article className={`${styles.scopeCard} ${styles.extraCard}`}>
              <div className={styles.scopeCardHeader}>
                <span className={styles.scopeIconExtra}>+</span>

                <div>
                  <h3>{t("scope.extra.title")}</h3>
                  <p>{t("scope.extra.subtitle")}</p>
                </div>
              </div>

              <ul className={styles.scopeList}>
                {extraItems.map((itemKey) => (
                  <li key={itemKey}>
                    <span className={styles.extraBullet}>+</span>
                    <div>
                      <strong>{t(`scope.extra.items.${itemKey}.title`)}</strong>
                      <p>{t(`scope.extra.items.${itemKey}.text`)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className={styles.scopeFootnote}>
                {t("scope.extra.footnote")}
              </p>
            </article>
          </div>

          <div className={styles.exampleBar}>
            <div className={styles.exampleMark}>↗</div>

            <div>
              <strong>{t("scope.example.title")}</strong>
              <p>{t("scope.example.text")}</p>
            </div>

            <Link href="/horaire-et-contact#form" className={styles.textLink}>
              {t("scope.example.cta")}
              <ArrowIcon />
            </Link>
          </div>
        </section>

        {/* PROCESS */}
        <section className={styles.processSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{t("process.eyebrow")}</p>

            <h2>
              {t.rich("process.title", {
                br: () => <br />,
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>
          </div>

          <div className={styles.processGrid}>
            {[1, 2, 3].map((number) => {
              const key = `step_${number}`;

              return (
                <article className={styles.processItem} key={key}>
                  <span className={styles.processNumber}>
                    {String(number).padStart(2, "0")}
                  </span>

                  <h3>{tr(`process.steps.${key}.title`)}</h3>
                  <p>{tr(`process.steps.${key}.text`)}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.faqIntro}>
            <p className={styles.eyebrow}>{t("faq.eyebrow")}</p>

            <h2>
              {t.rich("faq.title", {
                br: () => <br />,
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>

            <p>{t("faq.description")}</p>

            <Link href="/horaire-et-contact#form" className={styles.textLink}>
              {t("faq.cta")}
              <ArrowIcon />
            </Link>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faqKey, index) => (
              <details className={styles.faqItem} key={faqKey}>
                <summary>
                  <span className={styles.faqIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.faqQuestion}>
                    {t(`faq.items.${faqKey}.question`)}
                  </span>

                  <span className={styles.faqToggle} aria-hidden="true">
                    +
                  </span>
                </summary>

                <div className={styles.faqAnswer}>
                  <p>{t(`faq.items.${faqKey}.answer`)}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.finalCta}>
          <div className={styles.ctaGlow} aria-hidden="true" />

          <div className={styles.ctaContent}>
            <p className={styles.eyebrow}>{t("finalCta.eyebrow")}</p>

            <h2>
              {t.rich("finalCta.title", {
                br: () => <br />,
                highlight: (chunks) => <span>{chunks}</span>,
              })}
            </h2>

            <p>{t("finalCta.description")}</p>
          </div>

          <div className={styles.ctaActions}>
            <Link
              href="/horaire-et-contact#form"
              className={styles.primaryButton}
            >
              {t("finalCta.cta")}
              <ArrowIcon />
            </Link>

            <span>{t("finalCta.note")}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
