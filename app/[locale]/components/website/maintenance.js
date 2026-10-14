"use client";

import styles from "@/styles/website/maintenanceSection.module.css";
import { useTranslations } from "next-intl";

export default function MaintenanceSection() {
  const t = useTranslations("Homepage.Maintenance");

  const plans = [
    {
      id: "essential",
      name: t("plans.plan_1.name"),
      price: "27",
      description: t("plans.plan_1.description"),
      features: [
        t("plans.plan_1.features.feature_1"),
        t("plans.plan_1.features.feature_2"),
        t("plans.plan_1.features.feature_3"),
      ],
      featured: false,
      label: t("plans.plan_1.label"),
      href: "/services/maintenance#essentiel",
    },
    {
      id: "evolution",
      name: t("plans.plan_2.name"),
      price: "57",
      description: t("plans.plan_2.description"),
      features: [
        t("plans.plan_2.features.feature_1"),
        t("plans.plan_2.features.feature_2"),
        t("plans.plan_2.features.feature_3"),
        t("plans.plan_2.features.feature_4"),
      ],
      featured: true,
      label: t("plans.plan_2.label"),
      href: "/services/maintenance#evolution",
    },
    {
      id: "premium",
      name: t("plans.plan_3.name"),
      price: "97",
      description: t("plans.plan_3.description"),
      features: [
        t("plans.plan_3.features.feature_1"),
        t("plans.plan_3.features.feature_2"),
        t("plans.plan_3.features.feature_3"),
      ],
      featured: false,
      label: t("plans.plan_3.label"),
      href: "/services/maintenance#premium",
    },
  ];
  return (
    <section id="maintenance" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("eyebrow")}
          </span>

          <h2 className={styles.title}>
            {t.rich("title", {
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p className={styles.subtitle}>{t("description")}</p>
        </div>

        <div className={styles.plans}>
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`${styles.card} ${
                plan.featured ? styles.featured : ""
              }`}
            >
              {plan.featured && (
                <div className={styles.popularBadge}>
                  <span className={styles.badgeDot} />
                  {plan.label}
                </div>
              )}

              <div className={styles.cardHeader}>
                <span
                  className={`${styles.planDot} ${
                    plan.featured
                      ? styles.goldDot
                      : plan.id === "premium"
                        ? styles.purpleDot
                        : styles.greenDot
                  }`}
                />

                <span className={styles.planLabel}>
                  {plan.featured ? t("planLabel") : plan.label}
                </span>
              </div>

              <h3 className={styles.planName}>{plan.name}</h3>

              <div className={styles.price}>
                <span className={styles.currency}>€</span>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>{t("period")}</span>
              </div>

              <p className={styles.planDescription}>{plan.description}</p>

              <div className={styles.cardDivider} />

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.check} aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="m5 10 3.2 3.2L15 6.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={
                  plan.featured ? styles.primaryButton : styles.secondaryButton
                }
              >
                {plan.featured ? "Choisir Évolution" : `Découvrir ${plan.name}`}
                <span aria-hidden="true">↗</span>
              </a>

              {plan.featured && (
                <p className={styles.cardFootnote}>{t("footerNote")}</p>
              )}
            </article>
          ))}
        </div>

        <div className={styles.bottomNote}>
          <span className={styles.noteIcon} aria-hidden="true">
            ✳
          </span>
          <p>
            {t.rich("bottomNote", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
