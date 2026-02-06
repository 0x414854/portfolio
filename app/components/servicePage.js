"use client";

import styles from "@/styles/page/servicePage.module.css";
import Image from "next/image";
import FAQ from "@/app/components/faq";
import { motion } from "framer-motion";

export default function ServicePage({
  title,
  subtitle,
  image,
  benefits,
  steps,
  testimonials,
  cta,
  faq,
}) {
  //   const positionClasses = ["one", "two", "three", "four", "five"];
  //   const [activeStep, setActiveStep] = useState(0);
  //   const stepsRef = useRef([]);

  //   useEffect(() => {
  //     if (window.innerWidth < 1024) return;

  //     const observers = [];

  //     stepsRef.current.forEach((step, index) => {
  //       const observer = new IntersectionObserver(
  //         (entries) => {
  //           entries.forEach((entry) => {
  //             if (entry.isIntersecting) {
  //               setActiveStep(index);
  //             }
  //           });
  //         },
  //         {
  //           root: null,
  //           threshold: 0.6, // déclenche quand 60% visible
  //         }
  //       );

  //       if (step) observer.observe(step);
  //       observers.push(observer);
  //     });

  //     return () => {
  //       observers.forEach((observer) => observer.disconnect());
  //     };
  //   }, []);

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <motion.h1
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {subtitle}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -40, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.cta}
          >
            {cta.button}
          </motion.button>
        </div>
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image src={image} alt={title} />
        </motion.div>
      </section>

      {/* Steps / Process Section */}
      <section className={styles.stepSection}>
        <motion.h2
          initial={{ opacity: 0, y: 100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Notre processus
        </motion.h2>
        <ul className={styles.steps}>
          {steps.map((step, i) => (
            <li key={i} className={styles.step} style={{ "--i": i }}>
              <span className={styles.stepNumber}>{String(i + 1)}</span>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsContainer}>
        <div className={styles.benefits}>
          <motion.h2
            initial={{ opacity: 0, y: 100, scale: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Ce que ce service apporte à votre entreprise
          </motion.h2>
          <ul>
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {b}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.clients}>
        <motion.h2
          initial={{ opacity: 0, y: 100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Ils nous ont fait confiance
        </motion.h2>

        {/* Slider Logos */}
        <div className={styles.slider}>
          <div className={styles.slideTrack}>
            {[
              ...testimonials.logos,
              ...testimonials.logos,
              ...testimonials.logos,
              ...testimonials.logos,
            ].map((logo, i) => (
              <div key={i} className={styles.slide}>
                <img src={logo} alt="Client logo" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          className={styles.featuredTestimonial}
          initial={{ opacity: 0, y: 100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.quote}>“{testimonials.featured.content}”</p>
          <div className={styles.author}>
            <strong>{testimonials.featured.name}</strong>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <FAQ title={`Questions fréquentes sur ${title}`} items={faq} />
      )}

      {/* Final CTA */}
      <motion.section
        className={styles.finalCta}
        initial={{ opacity: 0, y: 100, scale: 0 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {cta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {cta.p}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: -100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {cta.button}
        </motion.button>
      </motion.section>
    </main>
  );
}
