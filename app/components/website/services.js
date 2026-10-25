"use client";

import styles from "@/styles/website/servicesSection.module.css";
import Link from "next/link";
import { useRef } from "react";
import { useTranslations } from "next-intl";

function WebVisual() {
  return (
    <div className={`${styles.visual} ${styles.webVisual}`} aria-hidden="true">
      <div className={styles.browser}>
        <div className={styles.browserTop}>
          <span />
          <span />
          <span />
          <div className={styles.browserAddress} />
        </div>

        <div className={styles.browserBody}>
          <div className={styles.mockNav}>
            <span className={styles.mockLogo} />
            <span />
            <span />
            <span />
          </div>

          <div className={styles.mockHero}>
            <div className={styles.mockCopy}>
              <span className={styles.mockEyebrow} />
              <span className={styles.mockHeading} />
              <span className={styles.mockHeadingShort} />
              <span className={styles.mockDescription} />
              <span className={styles.mockButton} />
            </div>

            <div className={styles.mockArtwork}>
              <div className={styles.artCircle} />
              <div className={styles.artShape} />
              <div className={styles.artDot} />
            </div>
          </div>

          <div className={styles.mockBottom}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className={styles.floatingBadge}>
        <span className={styles.statusDot} />
        Design responsive
      </div>
    </div>
  );
}

function AutomationVisual() {
  const t = useTranslations("Homepage.Services");

  return (
    <div
      className={`${styles.visual} ${styles.automationVisual}`}
      aria-hidden="true"
    >
      <div className={styles.flowGrid} />

      <div className={`${styles.flowNode} ${styles.nodeStart}`}>
        <span className={styles.nodeIcon}>01</span>
        <span className={styles.nodeText}>
          <i />
          {t("automationVisual.step_1")}
        </span>
        <span className={styles.nodeStatus}>
          {t("automationVisual.statusStep_1")}
        </span>
      </div>

      <div className={`${styles.flowLine} ${styles.lineOne}`}>
        <span />
      </div>

      <div className={`${styles.flowNode} ${styles.nodeMiddle}`}>
        <span className={styles.nodeIcon}>02</span>
        <span className={styles.nodeText}>
          <i />
          {t("automationVisual.step_2")}
        </span>
        <span className={styles.nodeStatus}>
          {t("automationVisual.statusStep_2")}
        </span>
      </div>

      <div className={`${styles.flowLine} ${styles.lineTwo}`}>
        <span />
      </div>

      <div className={`${styles.flowNode} ${styles.nodeEnd}`}>
        <span className={styles.nodeIcon}>03</span>
        <span className={styles.nodeText}>
          <i />
          {t("automationVisual.step_3")}
        </span>
        <span className={styles.nodeStatus}>
          {t("automationVisual.statusStep_3")}
        </span>
      </div>

      <div className={styles.automationOrb} />
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations("Homepage.Services");

  const sectionRef = useRef(null);

  const services = [
    {
      id: "web",
      number: "01",
      category: t("services.service_1.category"),
      title: t("services.service_1.title"),
      description: t("services.service_1.description"),
      price: "500",
      features: [
        t("services.service_1.features.feature_1"),
        t("services.service_1.features.feature_2"),
        t("services.service_1.features.feature_3"),
        t("services.service_1.features.feature_4"),
      ],
      href: "/services",
      cta: t("services.service_1.cta"),
    },
    {
      id: "automation",
      number: "02",
      category: t("services.service_2.category"),
      title: t("services.service_2.title"),
      description: t("services.service_2.description"),
      price: "250",
      features: [
        t("services.service_2.features.feature_1"),
        t("services.service_2.features.feature_2"),
        t("services.service_2.features.feature_3"),
        t("services.service_2.features.feature_4"),
      ],
      href: "/services/automatisations",
      cta: t("services.service_2.cta"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={styles.servicesSection}
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("section.eyebrow")}
          </span>

          <h2 id="services-title" className={styles.sectionTitle}>
            {t.rich("section.title", {
              br: () => <br />,
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p className={styles.sectionDescription}>{t("section.subtitle")}</p>
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article
              key={service.id}
              className={`${styles.serviceCard} ${
                service.id === "automation" ? styles.automationCard : ""
              }`}
            >
              <div className={styles.cardTop}>
                <span className={styles.serviceNumber}>
                  {service.number}
                  <span className={styles.numberLine} />
                  {service.category}
                </span>

                <span className={styles.cardArrow} aria-hidden="true">
                  +
                </span>
              </div>

              {service.id === "web" ? <WebVisual /> : <AutomationVisual />}

              <div className={styles.cardContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>

                <p className={styles.serviceDescription}>
                  {service.description}
                </p>

                <ul className={styles.featureList}>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <span className={styles.check} aria-hidden="true">
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardBottom}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceLabel}>
                      {t("section.priceLabel")}
                    </span>
                    <p className={styles.price}>
                      {service.price}
                      <span> €</span>
                    </p>
                  </div>

                  <Link href={service.href} className={styles.serviceCta}>
                    <span>{service.cta}</span>
                    <span className={styles.ctaArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.bottomNote}>
          <span className={styles.statusDot} />
          {t("section.bottomNote")}
        </p>
      </div>
    </section>
  );
}
