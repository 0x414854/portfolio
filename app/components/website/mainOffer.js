"use client";

import styles from "@/styles/website/mainOffer.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

function GrowthVisual() {
  const t = useTranslations("Homepage.MainOffer");
  return (
    <div
      className={styles.growthVisual}
      aria-label="Illustration de la croissance d'une activité"
    >
      <div className={styles.growthTopline}>
        <div>
          <span className={styles.growthEyebrow}>
            {t("growVisual.eyebrow")}
          </span>
          <h4> {t("growVisual.title_1")}</h4>
          <h4 className={styles.growthGold}>{t("growVisual.title_2")}</h4>
        </div>

        <div className={styles.growthOrb}>
          <span>+</span>
        </div>
      </div>

      <div className={styles.growthDashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <span className={styles.dashboardLabel}>
              {t("growVisual.dashboard.label")}
            </span>
            <strong>{t("growVisual.dashboard.strong")}</strong>
          </div>

          <span className={styles.dashboardStatus}>
            <i />
            {t("growVisual.dashboard.status")}
          </span>
        </div>

        <div className={styles.growthChart}>
          <div className={styles.chartGrid}>
            <span />
            <span />
            <span />
            <span />
          </div>

          <svg
            className={styles.chartSvg}
            viewBox="0 0 360 150"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="growthLine" x1="0" y1="0" x2="360" y2="0">
                <stop offset="0%" stopColor="#9f8748" />
                <stop offset="100%" stopColor="#f1d88e" />
              </linearGradient>

              <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="150">
                <stop offset="0%" stopColor="#e8c96f" stopOpacity=".23" />
                <stop offset="100%" stopColor="#e8c96f" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 126 C28 121 36 108 63 112 S103 93 127 99 S166 74 193 82 S230 54 255 61 S301 29 326 37 S347 20 360 12 L360 150 L0 150 Z"
              fill="url(#growthArea)"
            />

            <path
              d="M0 126 C28 121 36 108 63 112 S103 93 127 99 S166 74 193 82 S230 54 255 61 S301 29 326 37 S347 20 360 12"
              stroke="url(#growthLine)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle cx="255" cy="61" r="5" fill="#f1d88e" />
            <circle
              cx="255"
              cy="61"
              r="11"
              stroke="#f1d88e"
              strokeOpacity=".35"
            />

            <circle cx="360" cy="12" r="4" fill="#f7e4a9" />
          </svg>

          <div className={styles.chartCaption}>
            <span>{t("growVisual.dashboard.chartCaptions.span_1")}</span>
            <span>{t("growVisual.dashboard.chartCaptions.span_2")}</span>
            <span>{t("growVisual.dashboard.chartCaptions.span_3")}</span>
          </div>
        </div>

        <div className={styles.dashboardDivider} />

        <div className={styles.growthSteps}>
          <div className={styles.growthStep}>
            <span className={styles.stepIcon}>◎</span>
            <span className={styles.stepText}>
              <strong>{t("growVisual.dashboard.growSteps.strong_1")}</strong>
              <small>{t("growVisual.dashboard.growSteps.small_1")}</small>
            </span>
            <span className={styles.stepArrow}>↗</span>
          </div>

          <div className={styles.growthStep}>
            <span className={styles.stepIcon}>⌁</span>
            <span className={styles.stepText}>
              <strong>{t("growVisual.dashboard.growSteps.strong_2")}</strong>
              <small>{t("growVisual.dashboard.growSteps.small_2")}</small>
            </span>
            <span className={styles.stepArrow}>↗</span>
          </div>

          <div className={styles.growthStep}>
            <span className={styles.stepIcon}>↗</span>
            <span className={styles.stepText}>
              <strong>{t("growVisual.dashboard.growSteps.strong_3")}</strong>
              <small>{t("growVisual.dashboard.growSteps.small_3")}</small>
            </span>
            <span className={styles.stepArrow}>↗</span>
          </div>
        </div>
      </div>

      <div className={styles.growthFloatingCard}>
        <span className={styles.floatingIcon}>✳</span>
        <span>
          <strong>{t("growVisual.dashboard.growSteps.strong_4")}</strong>
          <small>{t("growVisual.dashboard.growSteps.small_4")}</small>
        </span>
      </div>

      <div className={styles.growthDecoration}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function MainOfferSection() {
  const t = useTranslations("Homepage.MainOffer");

  const features = [
    t("section.features.feature_1"),
    t("section.features.feature_2"),
    t("section.features.feature_3"),
    t("section.features.feature_4"),
    t("section.features.feature_5"),
    t("section.features.feature_6"),
    t("section.features.feature_7"),
    t("section.features.feature_8"),
    t("section.features.feature_9"),
    t("section.features.feature_10"),
    // "Statistiques de fréquentation",
  ];

  return (
    <section
      className={styles.offerSection}
      id="offre-principale"
      aria-labelledby="main-offer-title"
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("section.eyebrow")}
          </span>

          <h2 id="main-offer-title">
            {t.rich("section.title", {
              br: () => <br className={styles.desktopBreak} />,
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p>{t("section.subtitle")}</p>
        </div>

        <article className={styles.offerCard}>
          <div className={styles.cardAura} />

          <div className={styles.offerContent}>
            <div className={styles.offerTopline}>
              <span className={styles.popularBadge}>
                <span className={styles.star}>✦</span>
                {t("section.popularBadge")}
              </span>

              <span className={styles.offerNumber}>01 / 01</span>
            </div>

            <div className={styles.offerHeading}>
              <span className={styles.offerKicker}>
                {t("section.offer.kicker")}
              </span>
              <h3>{t("section.offer.title")}</h3>
              <p>{t("section.offer.description")}</p>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>
                {t("section.offer.priceLabel")}
              </span>
              <div className={styles.price}>
                <span>790</span>
                <span className={styles.currency}>€</span>
              </div>
              <span className={styles.priceNote}>
                {t("section.offer.priceNote")}
              </span>
            </div>

            <div className={styles.offerDivider} />

            <div className={styles.featuresHeading}>
              <h4>{t("section.offer.featuresTitle")}</h4>
              <span>{t("section.offer.includedNumber")}</span>
            </div>

            <ul className={styles.featuresList}>
              {features.map((feature) => (
                <li key={feature}>
                  <span className={styles.featureCheck} aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 8.2 6.4 11l6.1-6.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Groupe de deux boutons */}
            <div className={styles.offerCtaGroup}>
              <Link
                href="/services/web/croissance"
                className={styles.offerSecondaryCta}
              >
                {t("section.offer.primaryCTA")}
                {/* <span aria-hidden="true">↗</span> */}
              </Link>

              <Link href="/horaire-et-contact#form" className={styles.offerCta}>
                <span>{t("section.offer.secondaryCTA")}</span>
                {/* <span className={styles.ctaArrow} aria-hidden="true">
                  ↗
                </span> */}
              </Link>
            </div>

            <p className={styles.reassurance}>
              {t("section.offer.reassurance")}
            </p>
          </div>

          <div className={styles.offerVisual}>
            <div className={styles.visualLabel}>
              <span className={styles.visualLabelDot} />
              {t("section.visualLabel")}
            </div>

            <GrowthVisual />

            <div className={styles.visualFooter}>
              <div>
                <span className={styles.visualFooterIcon}>↗</span>
                <span>
                  <strong>{t("section.footer.strong_1")}</strong>
                  <small>{t("section.footer.small_1")}</small>
                </span>
              </div>

              <div>
                <span className={styles.visualFooterIcon}>◎</span>
                <span>
                  <strong>{t("section.footer.strong_2")}</strong>
                  <small>{t("section.footer.small_2")}</small>
                </span>
              </div>
            </div>

            <div className={styles.visualIndex}>
              <span>BUILT FOR GROWTH</span>
              <span>2026 — WEB EXPERIENCE</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
