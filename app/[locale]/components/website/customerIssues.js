"use client";

import styles from "@/styles/website/customerIssues.module.css";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Revoir animation de l'agrandissement de la bulle
// Ajuster postion 'X' '-' et alignement du texte
// Ajuster css (espacement, couleur, animation)

export default function ProblemSection() {
  const t = useTranslations("Homepage.CustomerIssues");
  const [activeId, setActiveId] = useState(null);

  const problems = [
    {
      id: 1,
      question: t("problems.question_1"),
      description: t("problems.answer_1"),
      position: "topLeft",
    },
    {
      id: 2,
      question: t("problems.question_2"),
      description: t("problems.answer_2"),
      position: "topRight",
    },
    {
      id: 3,
      question: t("problems.question_3"),
      description: t("problems.answer_3"),
      position: "middleLeft",
    },
    {
      id: 4,
      question: t("problems.question_4"),
      description: t("problems.answer_4"),
      position: "middleRight",
    },
    {
      id: 5,
      question: t("problems.question_5"),
      description: t("problems.answer_5"),
      position: "bottomLeft",
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="problem-title">
      <div className={styles.container}>
        <div className={styles.visual}>
          <div className={styles.centerContent}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} />
              {t("eyebrow")}
            </span>

            <h2 id="problem-title">
              {t.rich("title", {
                tag: (chunks) => <span>{chunks}</span>,
              })}
            </h2>

            <p className={styles.intro}>{t("intro")}</p>

            <span className={styles.prompt}>{t("prompt")}</span>
          </div>

          <div className={styles.bubbles}>
            {problems.map((problem) => {
              const isActive = activeId === problem.id;

              return (
                <div
                  key={problem.id}
                  className={`${styles.bubbleMotion} ${
                    styles[problem.position]
                  }`}
                >
                  <button
                    type="button"
                    className={`${styles.bubble} ${
                      isActive ? styles.active : ""
                    }`}
                    aria-expanded={isActive}
                    aria-controls={`problem-description-${problem.id}`}
                    onMouseEnter={() => setActiveId(problem.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(problem.id)}
                    onBlur={() => setActiveId(null)}
                    onClick={() =>
                      setActiveId((current) =>
                        current === problem.id ? null : problem.id,
                      )
                    }
                  >
                    <span className={styles.bubbleQuestion}>
                      <span className={styles.bubbleNumber}>0{problem.id}</span>

                      <span>{problem.question}</span>

                      <span className={styles.bubbleIcon} aria-hidden="true">
                        {isActive ? "−" : "+"}
                      </span>
                    </span>

                    <span
                      className={styles.bubbleDescription}
                      id={`problem-description-${problem.id}`}
                    >
                      {problem.description}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.transition}>
          <span className={styles.transitionLabel}>
            {" "}
            {t("transition.label")}
          </span>

          <p>{t("transition.solution")}</p>

          <Link className={styles.cta} href="/services">
            {t("transition.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
