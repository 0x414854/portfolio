"use client";

import styles from "@/styles/website/hero.module.css";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

// Performances : Optimiser performance
// Section : Ajuster le padding de la section quand il y aura le header

export default function Hero() {
  const t = useTranslations("Homepage.Hero");
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      // filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      // filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const visualVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const features = [
    t("features.feature_1"),
    t("features.feature_2"),
    t("features.feature_3"),
    t("features.feature_4"),
  ];

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.grid} />

        {!shouldReduceMotion && (
          <>
            <div className={`${styles.glow} ${styles.glowOne}`} />

            <div className={`${styles.glow} ${styles.glowTwo}`} />
          </>
        )}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            {!shouldReduceMotion && (
              <motion.span
                className={styles.badgeSweep}
                animate={{
                  x: ["-100%", "500%"],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.1, 0.75, 1],
                }}
              />
            )}

            <motion.span
              className={styles.badgeIconWrapper}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 0.92, 1.12, 1],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.35, 0.5, 0.7],
              }}
            >
              <motion.span
                className={styles.badgeIcon}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, 120, 250, 360],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.35, 0.55, 1],
                }}
              >
                ✦
              </motion.span>
            </motion.span>

            <span className={styles.badgeText}>{t("badge")}</span>
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            {t.rich("title", {
              highlight: (chunks) => (
                <span className={styles.highlight}>{chunks}</span>
              ),
            })}
          </motion.h1>

          <motion.p className={styles.description} variants={itemVariants}>
            {t("description")}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <motion.a
              href="/services"
              className={styles.primaryButton}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              {t("ctaButtons.button_1")}
              <motion.span
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: [0, 4, 0],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.a>

            <motion.a
              href="/horaire-et-contact#form"
              className={styles.secondaryButton}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              {t("ctaButtons.button_2")}
            </motion.a>
          </motion.div>

          <motion.div className={styles.features} variants={containerVariants}>
            {features.map((feature) => (
              <motion.div
                key={feature}
                className={styles.feature}
                variants={itemVariants}
              >
                <motion.span
                  className={styles.check}
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  ✓
                </motion.span>

                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={styles.browser}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className={styles.browserHeader}>
              <div className={styles.dots}>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.addressBar}></div>
            </div>

            <div className={styles.browserContent}>
              <div className={styles.mockNav}>
                <div className={styles.mockLogo}>{t("mockup.logo")}</div>

                <div className={styles.mockLinks}>
                  <Link href="/" className={styles.mockLink}>
                    {t("mockup.nav.link_1")}
                  </Link>
                  <Link href="/services" className={styles.mockLink}>
                    {t("mockup.nav.link_2")}
                  </Link>
                  <Link
                    href="/horaire-et-contact#contact_form"
                    className={styles.mockLink}
                  >
                    {t("mockup.nav.link_3")}
                  </Link>
                </div>
              </div>

              <div className={styles.mockHero}>
                <div className={styles.mockText}>
                  <span className={styles.mockLabel}>{t("mockup.label")}</span>

                  <h2>
                    {t("mockup.title.1")}
                    <br />
                    <span>{t("mockup.title.2")}</span>
                  </h2>

                  <p>{t("mockup.subtitle")}</p>

                  <Link href="/services" className={styles.mockButton}>
                    {t("mockup.ctaButton")}
                    <span>→</span>
                  </Link>
                </div>

                <div className={styles.mockShape}>
                  <motion.div
                    className={styles.shapeCircle}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [1, 1.08, 1],
                            rotate: [0, 8, 0],
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className={styles.shapeSquare}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            rotate: [0, 15, 0],
                            y: [0, -10, 0],
                          }
                    }
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              <div className={styles.mockStats}>
                <div className={styles.mockStat}>
                  <span>01</span>
                  {t("mockup.stats.stat_1")}
                </div>

                <div className={styles.mockStat}>
                  <span>02</span>
                  {t("mockup.stats.stat_2")}
                </div>

                <div className={styles.mockStat}>
                  <span>03</span>
                  {t("mockup.stats.stat_3")}
                </div>
              </div>
            </div>
          </motion.div>

          <div className={`${styles.floatingCard} ${styles.performanceCard}`}>
            <div className={styles.cardIcon}>⚡</div>

            <div>
              <span className={styles.cardLabel}>
                {t("mockup.floatingCard.card_1")}
              </span>

              <strong>98+ / 100</strong>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.growthCard}`}>
            <div className={styles.growthIcon}>↗</div>

            <div>
              <span className={styles.cardLabel}>
                {t("mockup.floatingCard.card_2")}
              </span>

              <strong>+42%</strong>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.responsiveCard}`}>
            <span className={styles.deviceIcon}>◫</span>

            <div>
              <strong>100%</strong>

              <span className={styles.cardLabel}>
                {t("mockup.floatingCard.card_3")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
