"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "@/styles/test/test.module.css";

// Adapte ce chemin à l'emplacement réel de Carte3D.
import Carte3D from "@/app/components/3dCardFlipAnimation";

import PythonIcon from "@/public/icon/pythonIconGrey.png";
import PythonIconBlack from "@/public/icon/pythonIconBlack.png";
import HTMLIcon from "@/public/icon/htmlIconGrey.png";
import HTMLIconBlack from "@/public/icon/htmlIconBlack.png";
import CSSIcon from "@/public/icon/cssIconGrey.png";
import CSSIconBlack from "@/public/icon/cssIconBlack.png";
import JSIcon from "@/public/icon/javascriptIconGrey.png";
import JSIconBlack from "@/public/icon/javascriptIconBlack.png";
import NextJsIcon from "@/public/icon/nextJsIconGrey.png";
import NextJsIconBlack from "@/public/icon/nextJsIconBlack.png";
import CanvaIcon from "@/public/icon/canvaIconGrey.png";
import CanvaIconBlack from "@/public/icon/canvaIconBlack.png";

import BitcoinPrice from "@/public/projects/bitcoinPrice.png";
import BusinessCardAB from "@/public/projects/businessCardAB.png";
import BusinessCardABDev from "@/public/projects/businessCardABDev.png";
import MnemonicShield from "@/public/projects/mnemonicShield.png";
import ViceVersa from "@/public/projects/viceversa.png";
import MyVisionBoard from "@/public/projects/myVisionBoard.png";
import CDOMuliservices from "@/public/projects/CDOMultiservices.png";
import HaumanaBienEtre from "@/public/projects/haumanaBienEtre.png";

const skills = [
  {
    id: "frontend",
    number: "01",
    category: "Front-end",
    description:
      "Des interfaces modernes, responsives et accessibles pour le web.",
    items: [
      { name: "HTML", value: 100 },
      { name: "CSS", value: 95 },
      { name: "JavaScript", value: 85 },
      { name: "React", value: 70 },
      { name: "Next.js", value: 85 },
    ],
  },
  {
    id: "backend",
    number: "02",
    category: "Back-end & développement",
    description:
      "Des scripts, de la logique applicative et l'intégration de services.",
    items: [
      { name: "Python", value: 80 },
      { name: "Node.js", value: 60 },
      { name: "Supabase", value: 70 },
      { name: "PostgreSQL", value: 60 },
    ],
  },
  {
    id: "blockchain",
    number: "03",
    category: "Blockchain",
    description:
      "Exploration des technologies blockchain et des contrats intelligents.",
    items: [{ name: "Solidity", value: 10, note: "En apprentissage" }],
  },
  {
    id: "tools",
    number: "04",
    category: "Outils & design",
    description: "Les outils de développement, de conception et d'intégration.",
    items: [
      { name: "VS Code", value: 100 },
      { name: "Git / GitHub", value: 90 },
      { name: "Terminal / CLI", value: 60 },
      { name: "Canva", value: 85 },
      { name: "Figma / UI Design", value: 10 },
      { name: "Framer Motion", value: 70 },
      { name: "Resend", value: 80 },
      { name: "Vercel — déploiement", value: 75 },
    ],
  },
];

export default function PortfolioSection() {
  const t = useTranslations("PortofolioPage");

  const [activeFilter, setActiveFilter] = useState("all");
  const [isDark, setIsDark] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const filterOptions = useMemo(
    () => [
      { id: "all", label: t("portfolioArticle.filter.all") },
      { id: "design", label: t("portfolioArticle.filter.design") },
      { id: "software", label: t("portfolioArticle.filter.software") },
      { id: "dev", label: t("portfolioArticle.filter.dev") },
      { id: "card", label: t("portfolioArticle.filter.card") },
    ],
    [t],
  );

  const projects = useMemo(
    () => [
      {
        id: "mnemonic-shield",
        title: "Mnemonic Shield",
        categoryId: "software",
        category: t("portfolioArticle.filter.software"),
        eyebrow: "PYTHON / SÉCURITÉ",
        description:
          "Un outil de sécurité conçu pour encoder une phrase mnémonique sous la forme d'un sigil cryptographique.",
        technologies: [
          { name: "Python", light: PythonIcon, dark: PythonIconBlack },
        ],
        image: MnemonicShield,
        alt: "Aperçu de Mnemonic Shield, projet Python de sécurité cryptographique",
        link: "https://github.com/0x414854/Mnemonic_Shield",
        linkLabel: "Voir le code source",
      },
      {
        id: "bitcoin-price",
        title: "Bitcoin Price",
        categoryId: "dev",
        category: t("portfolioArticle.filter.dev"),
        eyebrow: "HTML / CSS / JAVASCRIPT",
        description:
          "Une interface web dédiée à la consultation du prix du Bitcoin.",
        technologies: [
          { name: "HTML", light: HTMLIcon, dark: HTMLIconBlack },
          { name: "CSS", light: CSSIcon, dark: CSSIconBlack },
          { name: "JavaScript", light: JSIcon, dark: JSIconBlack },
        ],
        image: BitcoinPrice,
        alt: "Capture d'écran du projet web Bitcoin Price",
        link: "https://0x414854.github.io/Bitcoin_Price/",
        linkLabel: "Visiter le site",
      },
      {
        id: "business-card",
        title: "Arthur BARRAUD",
        categoryId: "card",
        categoryIds: ["card", "design"],
        category: t("portfolioArticle.filter.card"),
        eyebrow: "DESIGN / IDENTITÉ VISUELLE",
        description:
          "Une carte de visite professionnelle avec une présentation sobre et soignée.",
        technologies: [
          { name: "Canva", light: CanvaIcon, dark: CanvaIconBlack },
        ],
        image: BusinessCardAB,
        alt: "Aperçu de la carte de visite professionnelle Arthur BARRAUD",
        rectoImg: "/businessCard/AB/recto.png",
        versoImg: "/businessCard/AB/verso.png",
      },
      {
        id: "business-card-dev",
        title: "Arthur BARRAUD — Dev",
        categoryId: "card",
        categoryIds: ["card", "design"],
        category: t("portfolioArticle.filter.card"),
        eyebrow: "DESIGN / DÉVELOPPEMENT WEB",
        description:
          "Une variante de carte de visite dédiée à une identité de développeur web.",
        technologies: [
          { name: "Canva", light: CanvaIcon, dark: CanvaIconBlack },
        ],
        image: BusinessCardABDev,
        alt: "Aperçu de la carte de visite développeur Arthur BARRAUD",
        rectoImg: "/businessCard/AB/rectoDev.png",
        versoImg: "/businessCard/AB/versoDev.png",
      },
      {
        id: "vice-versa",
        title: "Vice Versa Atelier",
        categoryId: "dev",
        category: t("portfolioArticle.filter.dev"),
        eyebrow: "NEXT.JS / SITE WEB",
        description:
          "Un site web présentant l'univers et l'activité de Vice Versa Atelier.",
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        image: ViceVersa,
        alt: "Aperçu du site web Vice Versa Atelier",
        link: "https://www.viceversa-atelier.com",
        linkLabel: "Visiter le site",
      },
      {
        id: "my-vision-board",
        title: "MyVisionBoard",
        categoryId: "dev",
        category: t("portfolioArticle.filter.dev"),
        eyebrow: "NEXT.JS / APPLICATION WEB",
        description:
          "Une application web permettant d'organiser ses idées et de visualiser ses objectifs.",
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        image: MyVisionBoard,
        alt: "Aperçu de l'application web MyVisionBoard",
        link: "https://www.myvisionboard.life",
        linkLabel: "Visiter le site",
      },
      {
        id: "cdo-multiservices",
        title: "CDO Multiservices",
        categoryId: "dev",
        category: t("portfolioArticle.filter.dev"),
        eyebrow: "NEXT.JS / SITE VITRINE",
        description:
          "Un site vitrine pour présenter l'activité et les services de CDO Multiservices.",
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        image: CDOMuliservices,
        alt: "Aperçu du site vitrine CDO Multiservices",
        link: "https://www.cdo-multiservices.ch",
        linkLabel: "Visiter le site",
      },
      {
        id: "haumana-bien-etre",
        title: "Haumana Bien-Être",
        categoryId: "dev",
        category: t("portfolioArticle.filter.dev"),
        eyebrow: "NEXT.JS / SITE WEB",
        description:
          "Un site web présentant l'activité et l'univers de Haumana Bien-Être.",
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        image: HaumanaBienEtre,
        alt: "Aperçu du site web Haumana Bien-Être",
        link: "https://www.haumana-bien-etre.com",
        linkLabel: "Visiter le site",
      },
    ],
    [t],
  );

  /* Détection du thème système */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (event) => setIsDark(event.matches);

    setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  /* Fermeture de la modale avec Échap */
  useEffect(() => {
    if (!selectedCard) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCard(null);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCard]);

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) =>
          (project.categoryIds ?? [project.categoryId]).includes(activeFilter),
        );

  return (
    <main className={styles.portfolioSection}>
      <div className={styles.container}>
        {/* =====================================
            SECTION COMPÉTENCES
        ===================================== */}

        <section
          className={styles.skillsSection}
          aria-labelledby="skills-title"
        >
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              {t("skillsArticle.title")}
            </span>

            <h2 id="skills-title" className={styles.sectionTitle}>
              Les compétences
              <br />
              <span>au service de vos projets.</span>
            </h2>

            <p className={styles.sectionDescription}>
              Les technologies et les outils que j'utilise pour concevoir des
              expériences web et des solutions numériques.
            </p>
          </header>

          <div className={styles.skillsGrid}>
            {skills.map((group) => (
              <article className={styles.skillCard} key={group.id}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>
                    <span className={styles.numberLine} />
                    {group.number} / {group.category}
                  </span>

                  <span className={styles.cardIndex} aria-hidden="true">
                    +
                  </span>
                </div>

                <h3 className={styles.skillGroupTitle}>{group.category}</h3>

                <p className={styles.skillGroupDescription}>
                  {group.description}
                </p>

                <ul className={styles.skillList}>
                  {group.items.map((skill) => (
                    <li className={styles.skillItem} key={skill.name}>
                      <div className={styles.skillHeading}>
                        <h4 className={styles.skillName}>{skill.name}</h4>

                        {skill.note ? (
                          <span className={styles.learningBadge}>
                            {skill.note}
                          </span>
                        ) : (
                          <span className={styles.skillValue}>
                            {skill.value}%
                          </span>
                        )}
                      </div>

                      <div
                        className={styles.skillTrack}
                        role="progressbar"
                        aria-label={`Niveau autoévalué en ${skill.name}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={skill.value}
                      >
                        <span
                          className={styles.skillProgress}
                          style={{
                            "--skill-level": `${skill.value}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className={styles.bottomNote}>
            <span className={styles.statusDot} aria-hidden="true" />
            Les niveaux indiqués sont des estimations personnelles qui évoluent
            avec la pratique.
          </p>
        </section>

        {/* =====================================
            SECTION PORTFOLIO
        ===================================== */}

        <section
          className={styles.projectsSection}
          aria-labelledby="projects-title"
        >
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              PORTFOLIO / PROJETS
            </span>

            <h2 id="projects-title" className={styles.sectionTitle}>
              Des idées transformées
              <br />
              <span>en réalisations concrètes.</span>
            </h2>

            <p className={styles.sectionDescription}>
              Sites web, outils numériques et créations graphiques : découvrez
              une sélection de projets de développement et de design.
            </p>
          </header>

          {/* Filtres accessibles */}
          <div className={styles.filterBar}>
            <div
              className={styles.filterList}
              role="group"
              aria-label="Filtrer les projets"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`${styles.filterButton} ${
                    activeFilter === filter.id ? styles.filterButtonActive : ""
                  }`}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <label className={styles.filterSelectLabel}>
              <span className={styles.srOnly}>Catégorie de projet</span>

              <select
                className={styles.filterSelect}
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
              >
                {filterOptions.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className={styles.resultsCount} aria-live="polite">
            {visibleProjects.length}{" "}
            {visibleProjects.length > 1 ? "projets affichés" : "projet affiché"}
          </p>

          <div className={styles.projectsGrid}>
            {visibleProjects.map((project, index) => {
              const projectContent = (
                <>
                  <div className={styles.projectVisual}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw"
                      className={styles.projectImage}
                      priority={index < 2 && activeFilter === "all"}
                    />

                    <span
                      className={styles.projectOverlay}
                      aria-hidden="true"
                    />

                    <span className={styles.projectView} aria-hidden="true">
                      {project.categoryId === "card"
                        ? "Voir les cartes ↗"
                        : "Découvrir ↗"}
                    </span>

                    <span className={styles.projectNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.projectContent}>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectEyebrow}>
                        {project.eyebrow}
                      </span>

                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                    </div>

                    <h3 className={styles.projectTitle}>{project.title}</h3>

                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>

                    <div className={styles.projectFooter}>
                      <ul
                        className={styles.technologyList}
                        aria-label="Technologies utilisées"
                      >
                        {project.technologies.map((technology) => (
                          <li
                            key={technology.name}
                            className={styles.technology}
                          >
                            <Image
                              src={isDark ? technology.light : technology.dark}
                              alt=""
                              width={21}
                              height={21}
                            />
                            <span>{technology.name}</span>
                          </li>
                        ))}
                      </ul>

                      <span className={styles.projectArrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </div>
                </>
              );

              return (
                <article className={styles.projectCard} key={project.id}>
                  {project.categoryId === "card" ? (
                    <button
                      type="button"
                      className={styles.projectAction}
                      onClick={() => setSelectedCard(project)}
                      aria-label={`Afficher la carte de visite : ${project.title}`}
                    >
                      {projectContent}
                    </button>
                  ) : (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectAction}
                      aria-label={`${project.linkLabel} : ${project.title} (nouvel onglet)`}
                    >
                      {projectContent}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

          {/* Modale pour les cartes de visite */}
          {selectedCard && (
            <div
              className={styles.modalOverlay}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedCard(null);
                }
              }}
            >
              <section
                className={styles.modalContent}
                role="dialog"
                aria-modal="true"
                aria-labelledby="business-card-modal-title"
              >
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setSelectedCard(null)}
                  aria-label="Fermer la fenêtre"
                  autoFocus
                >
                  ×
                </button>

                <span className={styles.eyebrow}>APERÇU DU PROJET</span>

                <h2
                  id="business-card-modal-title"
                  className={styles.modalTitle}
                >
                  {selectedCard.title}
                </h2>

                <div className={styles.card3DWrap}>
                  <Carte3D
                    rectoImg={selectedCard.rectoImg}
                    versoImg={selectedCard.versoImg}
                    width={3}
                    height={2}
                  />
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
