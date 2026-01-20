"use client";

import { useEffect, useRef } from "react";

export default function Fireworks() {
  const canvasRef = useRef(null);
  const explosionsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createExplosion = (x, y) => {
      const colors = [
        "#ffffff",
        "#ff0000",
        "#ffd700",
        "#ff69b4",
        "#00ffff",
        "#ff7f50",
      ];
      const particleCount = 80; // plus de particules
      const maxSpeed = 8;

      for (let i = 0; i < particleCount; i++) {
        explosionsRef.current.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * maxSpeed + 2,
          size: Math.random() * 3 + 1,
          life: Math.random() * 40 + 20,
          decay: Math.random() * 0.03 + 0.015, // vitesse de disparition
          friction: 0.95, // ralentissement
        });
      }
    };

    const animate = (time) => {
      //   ctx.fillStyle = "rgba(0,0,0,0)"; // trace de mouvement
      //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = explosionsRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Dessiner les particules sous forme de petites lignes
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(0, 0, p.size * 2, p.size / 2); // forme rectangulaire
        ctx.restore();

        // Mise à jour de la particule
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 0.5; // gravité
        p.speed *= p.friction; // ralentissement
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Générer plusieurs explosions simultanées
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width;
        const y = (Math.random() * canvas.height) / 2;
        createExplosion(x, y);
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "95%",
        pointerEvents: "none",
        borderRadius: "16px",
        background: "transparent",
      }}
    />
  );
}
