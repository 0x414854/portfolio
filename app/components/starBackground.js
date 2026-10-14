"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import styles from "@/styles/components/startBackground.module.css";

export default function StarBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const container = containerRef.current;

    if (!container) return;

    const count = 80;
    const stars = [];

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");

      star.className = styles.star;

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      const isStatic = Math.random() < 0.3;
      const speed = isStatic ? 0 : 0.2 + Math.random() * 0.6;
      const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);

      star.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(star);

      stars.push({
        el: star,
        initialY: y,
        speed,
      });
    }

    lenis.on("scroll", ({ scroll, velocity }) => {
      const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.15, 4));

      stars.forEach((star) => {
        if (star.speed === 0) {
          star.el.style.transform = "scaleY(1)";
          return;
        }

        let pos = (star.initialY - scroll * star.speed * 0.05) % 100;

        if (pos < 0) pos += 100;

        star.el.style.top = `${pos}%`;
        star.el.style.transform = `scaleY(${stretch})`;
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div ref={containerRef} className={styles.starContainer} />;
}
