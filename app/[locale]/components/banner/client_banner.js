"use client";

import styles from "@/styles/components/banner/client_banner.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import ViceVersaLogo from "@/public/logo/viceversaWhite.png";
import MyVisionBoardLogo from "@/public/logo/myvisionboard.png";
import CDOMultiservicesLogo from "@/public/logo/CDOLogo.png";
import HaumanaLogo from "@/public/logo/haumana.png";

const clients = [
  {
    name: "My Vision Board",
    logo: MyVisionBoardLogo,
    href: "https://myvisionboard.life",
  },
  {
    name: "ViceVersa Atelier",
    logo: ViceVersaLogo,
    href: "https://www.viceversa-atelier.com",
  },

  {
    name: "CDO Multiservices",
    logo: CDOMultiservicesLogo,
    href: "https://www.cdo-multiservices.ch",
  },
  {
    name: "Haumana Bien-Être",
    logo: HaumanaLogo,
    href: "https://www.haumana-bien-etre.com",
  },
];

export default function ClientsBanner() {
  const t = useTranslations("Homepage.ClientsBanner");

  return (
    <section
      className={styles.bannerSection}
      aria-labelledby="clients-banner-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className={styles.statusDot} />
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            id="clients-banner-title"
            className={styles.title}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.rich("title", {
              span: (chunks) => (
                <span className={styles.gradientText}>{chunks}</span>
              ),
            })}
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {t("description")}
          </motion.p>
        </header>

        <motion.div
          className={styles.marquee}
          aria-label={t("logosLabel")}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.track}>
            {clients.map((client) => (
              <Link
                key={client.name}
                href={client.href}
                className={styles.client}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  width={180}
                  height={80}
                  className={styles.logo}
                />
              </Link>
            ))}

            {/* Copie utilisée uniquement pour la boucle */}
            <div className={styles.clientGroup} aria-hidden="true">
              {clients.map((client) => (
                <Link
                  key={`duplicate-${client.name}`}
                  href={client.href}
                  className={styles.client}
                  tabIndex={-1}
                >
                  <Image
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    width={180}
                    height={80}
                    className={styles.logo}
                  />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
