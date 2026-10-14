"use client";

import { useState } from "react";
import styles from "@/styles/page/services.module.css";

const blocks = [
  {
    id: "core",
    className: "architectureCore",
    label: "ST",
    detail: "DIGITAL",
  },
  {
    id: "web",
    className: "architectureWeb",
    label: "</>",
    detail: "WEB",
  },
  {
    id: "data",
    className: "architectureData",
    label: "↗",
    detail: "DATA",
  },
  {
    id: "flow",
    className: "architectureFlow",
    label: "01",
    detail: "FLOW",
  },
  {
    id: "system",
    className: "architectureSystem",
    label: "✳",
    detail: "SYSTEM",
  },
];

export default function ArchitectureVisual() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - y) * 12,
      y: (x - 0.5) * 16,
    });
  }

  function resetRotation() {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }

  return (
    <div
      className={`${styles.architectureVisual} ${
        isHovered ? styles.architectureHovered : ""
      }`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetRotation}
      onBlur={resetRotation}
      role="img"
      aria-label="Architecture numérique 3D composée de modules flottants représentant les services Simplitech"
      tabIndex={0}
    >
      <div className={styles.architectureGrid} aria-hidden="true" />
      <div className={styles.architectureGlow} aria-hidden="true" />

      <div
        className={styles.architectureScene}
        style={{
          "--rotate-x": `${rotation.x}deg`,
          "--rotate-y": `${rotation.y}deg`,
        }}
      >
        <div className={styles.architecturePlatform} />

        <div className={styles.architectureConnections}>
          <span className={styles.connectionLine} />
          <span className={styles.connectionLine} />
          <span className={styles.connectionLine} />
          <span className={styles.connectionLine} />
        </div>

        {blocks.map((block) => (
          <div
            key={block.id}
            className={`${styles.architectureBlock} ${styles[block.className]}`}
          >
            <div className={styles.blockFace}>
              <span className={styles.blockLabel}>{block.label}</span>
              <span className={styles.blockDetail}>{block.detail}</span>
            </div>
            <div className={styles.blockEdge} />
            <div className={styles.blockTop} />
          </div>
        ))}

        <div className={styles.architectureParticles}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.architectureCaption} aria-hidden="true">
        <span>
          <i className={styles.captionDot} />
          SYSTEM ONLINE
        </span>
        <span>ST / 001</span>
      </div>
    </div>
  );
}
