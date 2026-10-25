import styles from "@/styles/website/whyDeveloperSection.module.css";
// import Link from "next/link";
import { useTranslations } from "next-intl";

function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    minus: <path d="M5 12h14" />,
    arrow: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    gauge: (
      <>
        <path d="M3.5 16a9 9 0 1 1 17 0" />
        <path d="m12 13 4-4" />
        <path d="M5 19h14" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    workflow: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h3a2 2 0 0 1 2 2v5.5" />
        <path d="M12 17.5h2" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    growth: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 5-5 4 4 5-7" />
        <path d="M15 6h6v6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

const comparisons = [
  {
    title: "Stratégie & conversion",
    description:
      "Des pages structurées autour de vos objectifs, avec des messages clairs et des appels à l’action réfléchis.",
    icon: "target",
  },
  {
    title: "Qualité technique",
    description:
      "Un code contrôlé, des performances optimisées et une expérience adaptée au mobile comme au desktop.",
    icon: "gauge",
  },
  {
    title: "Sécurité & fiabilité",
    description:
      "Des formulaires, dépendances et accès vérifiés selon les besoins de votre projet.",
    icon: "shield",
  },
  {
    title: "Gestion de projet",
    description:
      "Un interlocuteur qui prend en charge les choix techniques, les tests et les corrections convenues.",
    icon: "workflow",
  },
  {
    title: "Identité sur mesure",
    description:
      "Un design et un contenu pensés pour votre activité, vos clients et votre positionnement.",
    icon: "layers",
  },
  {
    title: "Évolution à long terme",
    description:
      "Une base maintenable, conçue pour faciliter les modifications et les futures fonctionnalités.",
    icon: "growth",
  },
];

const aiLimits = [
  "Une base parfois générique",
  "Une stratégie de conversion à définir",
  "Du code à contrôler et à tester",
  "Une sécurité peu fiable",
  "Des corrections à prendre en charge",
  "Une maintenance à anticiper",
];

const developerBenefits = [
  "Une expérience adaptée à votre cible",
  "Un parcours pensé pour convertir",
  "Des performances vérifiées",
  "Des contrôles de sécurité adaptés",
  "Des tests et corrections encadrés",
  "Une structure pensée pour évoluer",
];

export default function WhyDeveloperSection() {
  const t = useTranslations("Homepage.WhyDev");

  const comparisons = [
    {
      title: t("comparisons.title_1"),
      description: t("comparisons.description_1"),
      icon: "target",
    },
    {
      title: t("comparisons.title_2"),
      description: t("comparisons.description_2"),
      icon: "gauge",
    },
    {
      title: t("comparisons.title_3"),
      description: t("comparisons.description_3"),
      icon: "shield",
    },
    {
      title: t("comparisons.title_4"),
      description: t("comparisons.description_4"),
      icon: "workflow",
    },
    {
      title: t("comparisons.title_5"),
      description: t("comparisons.description_5"),
      icon: "layers",
    },
    {
      title: t("comparisons.title_6"),
      description: t("comparisons.description_6"),
      icon: "growth",
    },
  ];

  const aiLimits = [
    t("aiLimits.limit_1"),
    t("aiLimits.limit_2"),
    t("aiLimits.limit_3"),
    t("aiLimits.limit_4"),
    t("aiLimits.limit_5"),
    t("aiLimits.limit_6"),
  ];

  const developerBenefits = [
    t("devBenefits.benefit_1"),
    t("devBenefits.benefit_2"),
    t("devBenefits.benefit_3"),
    t("devBenefits.benefit_4"),
    t("devBenefits.benefit_5"),
    t("devBenefits.benefit_6"),
  ];

  return (
    <section
      className={styles.section}
      id="pourquoi-un-developpeur"
      aria-labelledby="why-developer-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowStatusDot} />
            {t("eyebrow")}
          </span>
          <h2 id="why-developer-title" className={styles.title}>
            {t.rich("title", {
              br: () => <br />,
              highlight: (chunks) => (
                <span className={styles.titleAccent}>{chunks}</span>
              ),
            })}
          </h2>

          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div className={styles.comparison}>
          <article className={styles.comparisonCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <span className={styles.statusDot} />
                {t("comparisonCard.card_ia.label")}
              </span>

              <h3 className={styles.cardTitle}>
                {t("comparisonCard.card_ia.title")}
              </h3>

              <p className={styles.cardDescription}>
                {t("comparisonCard.card_ia.description")}
              </p>
            </div>

            <ul className={styles.comparisonList}>
              {aiLimits.map((item) => (
                <li key={item} className={styles.comparisonItem}>
                  <span className={styles.minusIcon} aria-hidden="true">
                    <Icon name="minus" size={15} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.cardFooter}>
              <span className={styles.footerMark}>01</span>
              <span>{t("comparisonCard.card_ia.footer")}</span>
            </div>
          </article>

          <article
            className={`${styles.comparisonCard} ${styles.featuredCard}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <span className={styles.featuredDot} />
                DÉVELOPPEMENT PROFESSIONNEL
              </span>

              <h3 className={styles.cardTitle}>
                Un site pensé pour performer.
              </h3>

              <p className={styles.cardDescription}>
                Une démarche structurée qui associe stratégie, conception,
                développement et vérifications avant la mise en ligne.
              </p>
            </div>

            <ul className={styles.comparisonList}>
              {developerBenefits.map((item) => (
                <li key={item} className={styles.comparisonItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Icon name="check" size={15} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.cardFooter}>
              <span className={styles.footerMark}>02</span>
              <span>Chaque choix a un objectif.</span>
            </div>
          </article>
        </div>

        <div className={styles.benefitsHeader}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {t("benefitsHeader.eyebrow")}
          </span>

          <h3 className={styles.benefitsTitle}>{t("benefitsHeader.title")}</h3>

          <p className={styles.benefitsSubtitle}>
            {t("benefitsHeader.description")}
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {comparisons.map(({ title, description, icon }, index) => (
            <article className={styles.benefit} key={title}>
              <div className={styles.benefitTop}>
                <span className={styles.benefitIcon}>
                  <Icon name={icon} size={21} />
                </span>

                <span className={styles.benefitNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className={styles.benefitTitle}>{title}</h4>

              <p className={styles.benefitDescription}>{description}</p>
            </article>
          ))}
        </div>

        {/* <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>
              VOTRE PROJET MÉRITE MIEUX QU’UN MODÈLE
            </span>

            <h3 className={styles.ctaTitle}>
              Faisons de votre site un véritable atout.
            </h3>

            <p className={styles.ctaDescription}>
              Parlons de vos objectifs et construisons une solution adaptée à
              votre activité, à vos clients et à vos ambitions.
            </p>
          </div>

          <Link href="/horaire-et-contact" className={styles.ctaButton}>
            Parlons de votre projet
            <Icon name="arrow" size={17} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
