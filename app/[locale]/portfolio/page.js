"use client";

import styles from "@/styles/page/portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Carte3D from "../components/3dCardFlipAnimation";

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
    items: [
      { key: "html", value: 100 },
      { key: "css", value: 95 },
      { key: "javascript", value: 85 },
      { key: "react", value: 70 },
      { key: "nextjs", value: 85 },
    ],
  },
  {
    id: "backend",
    number: "02",
    items: [
      { key: "python", value: 80 },
      { key: "nodejs", value: 60 },
      { key: "supabase", value: 70 },
      { key: "postgresql", value: 60 },
    ],
  },
  {
    id: "blockchain",
    number: "03",
    items: [{ key: "solidity", value: 10, note: "learning" }],
  },
  {
    id: "tools",
    number: "04",
    items: [
      { key: "vscode", value: 100 },
      { key: "git", value: 90 },
      { key: "terminal", value: 60 },
      { key: "canva", value: 85 },
      { key: "figma", value: 10 },
      { key: "framerMotion", value: 70 },
      { key: "resend", value: 80 },
      { key: "vercel", value: 75 },
    ],
  },
];

export default function PortfolioSection() {
  const t = useTranslations("Portfolio");

  const [activeFilter, setActiveFilter] = useState("all");
  const [isDark, setIsDark] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const filterOptions = useMemo(
    () => [
      { id: "all", label: t("filters.all") },
      // { id: "design", label: t("filters.design") },
      { id: "dev", label: t("filters.dev") },
      { id: "software", label: t("filters.software") },
      { id: "card", label: t("filters.card") },
    ],
    [t],
  );

  const projects = useMemo(
    () => [
      {
        id: "mnemonic-shield",
        categoryId: "software",
        image: MnemonicShield,
        technologies: [
          { name: "Python", light: PythonIcon, dark: PythonIconBlack },
        ],
        link: "https://github.com/0x414854/Mnemonic_Shield",
        linkLabelKey: "projectDetails.mnemonic-shield.linkLabel",
      },
      {
        id: "bitcoin-price",
        categoryId: "dev",
        image: BitcoinPrice,
        technologies: [
          { name: "HTML", light: HTMLIcon, dark: HTMLIconBlack },
          { name: "CSS", light: CSSIcon, dark: CSSIconBlack },
          { name: "JavaScript", light: JSIcon, dark: JSIconBlack },
        ],
        link: "https://0x414854.github.io/Bitcoin_Price/",
        linkLabelKey: "projectDetails.bitcoin-price.linkLabel",
      },
      {
        id: "business-card",
        categoryId: "card",
        image: BusinessCardAB,
        technologies: [
          { name: "Canva", light: CanvaIcon, dark: CanvaIconBlack },
        ],
        rectoImg: "/businessCard/AB/recto.png",
        versoImg: "/businessCard/AB/verso.png",
      },
      {
        id: "business-card-dev",
        categoryId: "card",
        image: BusinessCardABDev,
        technologies: [
          { name: "Canva", light: CanvaIcon, dark: CanvaIconBlack },
        ],
        rectoImg: "/businessCard/AB/rectoDev.png",
        versoImg: "/businessCard/AB/versoDev.png",
      },
      {
        id: "vice-versa",
        categoryId: "dev",
        image: ViceVersa,
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        link: "https://www.viceversa-atelier.com",
        linkLabelKey: "common.visitSite",
      },
      {
        id: "my-vision-board",
        categoryId: "dev",
        image: MyVisionBoard,
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        link: "https://www.myvisionboard.life",
        linkLabelKey: "common.visitSite",
      },
      {
        id: "cdo-multiservices",
        categoryId: "dev",
        image: CDOMuliservices,
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        link: "https://www.cdo-multiservices.ch",
        linkLabelKey: "common.visitSite",
      },
      {
        id: "haumana-bien-etre",
        categoryId: "dev",
        image: HaumanaBienEtre,
        technologies: [
          { name: "Next.js", light: NextJsIcon, dark: NextJsIconBlack },
        ],
        link: "https://www.haumana-bien-etre.com",
        linkLabelKey: "common.visitSite",
      },
    ],
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (event) => setIsDark(event.matches);

    setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    if (!selectedCard) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedCard(null);
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
        <section
          className={styles.projectsSection}
          aria-labelledby="projects-title"
        >
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              {t("projects.eyebrow")}
            </span>

            <h2 id="projects-title" className={styles.sectionTitle}>
              {t("projects.titleLine1")}
              <br />
              <span>{t("projects.titleLine2")}</span>
            </h2>

            <p className={styles.sectionDescription}>
              {t("projects.description")}
            </p>
          </header>

          <div className={styles.filterBar}>
            <div
              className={styles.filterList}
              role="group"
              aria-label={t("filters.ariaLabel")}
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
              <span className={styles.srOnly}>{t("filters.selectLabel")}</span>
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
            {t("projects.resultsCount", { count: visibleProjects.length })}
          </p>

          <div className={styles.projectsGrid}>
            {visibleProjects.map((project, index) => {
              const projectContent = (
                <>
                  <div className={styles.projectVisual}>
                    <Image
                      src={project.image}
                      alt={t(`projectDetails.${project.id}.alt`)}
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
                        ? t("projects.viewCards")
                        : t("projects.discover")}
                    </span>

                    <span className={styles.projectNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.projectContent}>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectEyebrow}>
                        {t(`projectDetails.${project.id}.eyebrow`)}
                      </span>
                      <span className={styles.projectCategory}>
                        {t(`filters.${project.categoryId}`)}
                      </span>
                    </div>

                    <h3 className={styles.projectTitle}>
                      {t(`projectDetails.${project.id}.title`)}
                    </h3>

                    <p className={styles.projectDescription}>
                      {t(`projectDetails.${project.id}.description`)}
                    </p>

                    <div className={styles.projectFooter}>
                      <ul
                        className={styles.technologyList}
                        aria-label={t("projects.technologiesLabel")}
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
                      aria-label={t("projects.openCard", {
                        title: t(`projectDetails.${project.id}.title`),
                      })}
                    >
                      {projectContent}
                    </button>
                  ) : (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectAction}
                      aria-label={t("projects.openProject", {
                        action: t(project.linkLabelKey),
                        title: t(`projectDetails.${project.id}.title`),
                      })}
                    >
                      {projectContent}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

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
                  aria-label={t("modal.close")}
                  autoFocus
                >
                  ×
                </button>

                <span className={styles.eyebrow}>{t("modal.eyebrow")}</span>

                <h2
                  id="business-card-modal-title"
                  className={styles.modalTitle}
                >
                  {t(`projectDetails.${selectedCard.id}.title`)}
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

        <section
          className={styles.skillsSection}
          aria-labelledby="skills-title"
        >
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              {t("skills.eyebrow")}
            </span>

            <h2 id="skills-title" className={styles.sectionTitle}>
              {t("skills.titleLine1")}
              <br />
              <span>{t("skills.titleLine2")}</span>
            </h2>

            <p className={styles.sectionDescription}>
              {t("skills.description")}
            </p>
          </header>

          <div className={styles.skillsGrid}>
            {skills.map((group) => (
              <article className={styles.skillCard} key={group.id}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>
                    <span className={styles.numberLine} />
                    {group.number} / {t(`skillGroups.${group.id}.title`)}
                  </span>

                  <span className={styles.cardIndex} aria-hidden="true">
                    +
                  </span>
                </div>

                <h3 className={styles.skillGroupTitle}>
                  {t(`skillGroups.${group.id}.title`)}
                </h3>

                <p className={styles.skillGroupDescription}>
                  {t(`skillGroups.${group.id}.description`)}
                </p>

                <ul className={styles.skillList}>
                  {group.items.map((skill) => (
                    <li className={styles.skillItem} key={skill.key}>
                      <div className={styles.skillHeading}>
                        <h4 className={styles.skillName}>
                          {t(`skillItems.${skill.key}`)}
                        </h4>

                        {skill.note ? (
                          <span className={styles.learningBadge}>
                            {t("skills.learning")}
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
                        aria-label={t("skills.levelLabel", {
                          skill: t(`skillItems.${skill.key}`),
                        })}
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
            {t("skills.bottomNote")}
          </p>
        </section>
      </div>
    </main>
  );
}
