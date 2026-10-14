"use client";

import { useState } from "react";
import styles from "@/styles/components/faq.module.css";
import { motion } from "framer-motion";

export default function FAQ({ title = "FAQ", items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.wrapper}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {title}
        </motion.h2>
        <ul>
          {items.map((item, index) => (
            <motion.li
              key={index}
              className={styles.container}
              initial={{ opacity: 0, y: 100, scale: 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <button
                className={`${styles.question} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => toggle(index)}
              >
                {item.question}
                <span className={styles.icon}>+</span>
              </button>

              <div
                className={styles.answercont}
                style={{
                  maxHeight: activeIndex === index ? "500px" : "0px",
                }}
              >
                <div className={styles.answer}>{item.answer}</div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
