import styles from "@/styles/website/whyMeSection.module.css";
import { useTranslations } from "next-intl";

function AdvantageIcon({ type }) {
  const props = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "speed":
      return (
        <svg {...props}>
          <path d="m13 2-3 8h7L9 22l2-9H5l8-11Z" />
        </svg>
      );

    case "responsive":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <rect x="16" y="9" width="5" height="9" rx="1" />
        </svg>
      );

    case "growth":
      return (
        <svg {...props}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 3 3 6-7" />
          <path d="M15 6h5v5" />
        </svg>
      );

    case "evolution":
      return (
        <svg {...props}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="m5.64 5.64 2.83 2.83" />
          <path d="m15.53 15.53 2.83 2.83" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m5.64 18.36 2.83-2.83" />
          <path d="m15.53 8.47 2.83-2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );

    default:
      return null;
  }
}

export default function WhyMeSection() {
  const t = useTranslations("Homepage.WhyMe");
  const advantages = [
    {
      number: "01",
      icon: "speed",
      title: t("advantages.title_1"),
      description: t("advantages.description_1"),
    },
    {
      number: "02",
      icon: "responsive",
      title: t("advantages.title_2"),
      description: t("advantages.description_2"),
    },
    {
      number: "03",
      icon: "growth",
      title: t("advantages.title_3"),
      description: t("advantages.description_3"),
    },
    {
      number: "04",
      icon: "evolution",
      title: t("advantages.title_4"),
      description: t("advantages.description_4"),
    },
  ];
  return (
    <section
      className={styles.whyMeSection}
      id="avantages"
      aria-labelledby="why-me-title"
    >
      <div className={styles.sectionContainer}>
        <header className={styles.sectionIntro}>
          <span className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("eyebrow")}
          </span>

          <h2 id="why-me-title" className={styles.sectionTitle}>
            {t.rich("title", {
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h2>

          <p className={styles.sectionDescription}>{t("description")}</p>
        </header>

        <div className={styles.advantagesGrid}>
          {advantages.map((advantage) => (
            <article className={styles.advantageCard} key={advantage.number}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <AdvantageIcon type={advantage.icon} />
                </div>

                <span className={styles.cardNumber}>{advantage.number}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{advantage.title}</h3>

                <p className={styles.cardDescription}>
                  {advantage.description}
                </p>
              </div>

              <span className={styles.cardAccent} aria-hidden="true" />
            </article>
          ))}
        </div>

        <p className={styles.sectionFootnote}>
          <span className={styles.footnoteLine} />
          <span>{t("footerNote")}</span>
          <span className={styles.footnoteLine} />
        </p>
      </div>
    </section>
  );
}
