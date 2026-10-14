"use client";
import styles from "@/styles/components/worldAnimation.module.css";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
export default function WorldAnimation() {
  const t = useTranslations("WebPage.Croissance");
  const words = [
    t("visual.tags.tag_1"),
    t("visual.tags.tag_2"),
    t("visual.tags.tag_3"),
    t("visual.tags.tag_4"),
    t("visual.tags.tag_5"),
    t("visual.tags.tag_6"),
    t("visual.tags.tag_7"),
    t("visual.tags.tag_8"),
    t("visual.tags.tag_9"),
    t("visual.tags.tag_10"),
    t("visual.tags.tag_11"),
    t("visual.tags.tag_12"),
    t("visual.tags.tag_13"),
    t("visual.tags.tag_14"),
    t("visual.tags.tag_15"),
    t("visual.tags.tag_16"),
    t("visual.tags.tag_17"),
    t("visual.tags.tag_18"),
    t("visual.tags.tag_19"),
    t("visual.tags.tag_20"),
    t("visual.tags.tag_21"),
    t("visual.tags.tag_22"),
    t("visual.tags.tag_23"),
    t("visual.tags.tag_24"),
    t("visual.tags.tag_25"),
  ];

  return (
    <motion.div
      className={styles.tagcloudWrapper}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <ul
        className={styles.tagcloud}
        style={{ "--num-elements": words.length }}
      >
        {words.map((word, index) => (
          <li
            key={index}
            className={styles.tagcloudTag}
            style={{ "--index": index + 1 }}
          >
            <span>{word}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
