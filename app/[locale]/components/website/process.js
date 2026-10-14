import styles from "@/styles/website/processSection.module.css";
import { useTranslations } from "next-intl";

// ajouter animation sur le 1er rendering (defilé de gauche vers la droite)

function StepIcon({ type }) {
  const commonProps = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "message":
      return (
        <svg {...commonProps}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 4a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
        </svg>
      );

    case "code":
      return (
        <svg {...commonProps}>
          <path d="m8 17-5-5 5-5" />
          <path d="m16 7 5 5-5 5" />
          <path d="m14 4-4 16" />
        </svg>
      );

    case "check":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16.5 9" />
        </svg>
      );

    case "rocket":
      return (
        <svg {...commonProps}>
          <path d="M4.5 16.5c-1.5 1.3-2 4-2 4s2.7-.5 4-2c.7-.8.7-2 0-2.7a2 2 0 0 0-2 0.7Z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.5A12.5 12.5 0 0 1 22 2c0 2.7-.8 7.5-6.5 11a22 22 0 0 1-3.5 2Z" />
          <path d="m9 12-4 1 1-4" />
          <path d="m12 15-1 4 4-1" />
          <circle cx="16" cy="8" r="1.5" />
        </svg>
      );

    default:
      return null;
  }
}

export default function ProcessSection() {
  const t = useTranslations("Homepage.Process");

  const steps = [
    {
      number: "01",
      title: t("steps.title_1"),
      description: t("steps.description_1"),
      icon: "message",
    },
    {
      number: "02",
      title: t("steps.title_2"),
      description: t("steps.description_2"),
      icon: "code",
    },
    {
      number: "03",
      title: t("steps.title_3"),
      description: t("steps.description_3"),
      icon: "check",
    },
    {
      number: "04",
      title: t("steps.title_4"),
      description: t("steps.description_4"),
      icon: "rocket",
    },
  ];
  return (
    <section
      className={styles.processSection}
      id="processus"
      aria-labelledby="process-title"
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t("eyebrow")}
          </span>

          <h2 id="process-title" className={styles.sectionTitle}>
            {t.rich("title", {
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p className={styles.sectionDescription}>{t("description")}</p>
        </div>

        <div className={styles.processTimeline}>
          {steps.map((step, index) => (
            <article className={styles.processStep} key={step.number}>
              <div className={styles.stepVisual}>
                <div className={styles.stepIcon}>
                  <StepIcon type={step.icon} />
                </div>

                <span className={styles.stepNumber}>{step.number}</span>
              </div>

              {index < steps.length - 1 && (
                <div className={styles.stepConnector} aria-hidden="true">
                  <span />
                </div>
              )}

              <div className={styles.stepContent}>
                <span className={styles.stepLabel}>
                  {t("stepLabel")} {step.number}
                </span>

                <h3 className={styles.stepTitle}>{step.title}</h3>

                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* <div className={styles.processCta}>
          <div className={styles.ctaText}>
            <span className={styles.ctaAccent}>Votre projet commence ici.</span>
            <p>Parlons de vos idées et donnons-leur vie.</p>
          </div>

          <a href="#contact" className={styles.ctaButton}>
            Lancer mon projet
            <span className={styles.ctaArrow} aria-hidden="true">
              ↗
            </span>
          </a>
        </div> */}
      </div>
    </section>
  );
}
