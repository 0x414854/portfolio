"use client";

import { useEffect } from "react";
import * as THREE from "three";

export default function TubesCursor() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const touchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (reducedMotion || touchDevice) return;

    let animationFrame;
    let disposed = false;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      100,
    );

    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0";

    document.body.appendChild(canvas);

    const colors = ["#ff5c00", "#ff7a2f", "#ffb36b"];
    const trails = [];
    const trailLength = 22;

    const materials = [];

    for (let i = 0; i < colors.length; i++) {
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const coreMaterial = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      materials.push(glowMaterial, coreMaterial);

      const glowMesh = new THREE.Mesh(new THREE.BufferGeometry(), glowMaterial);

      const coreMesh = new THREE.Mesh(new THREE.BufferGeometry(), coreMaterial);

      glowMesh.visible = false;
      coreMesh.visible = false;

      scene.add(glowMesh, coreMesh);

      const points = Array.from(
        { length: trailLength },
        () => new THREE.Vector3(0, 0, 0),
      );

      trails.push({
        points,
        glowMesh,
        coreMesh,
        offset: (i - 1) * 9,
        z: i * 0.12,
        phase: i * 1.8,
      });
    }

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      pointer.x = event.clientX - window.innerWidth / 2;
      pointer.y = window.innerHeight / 2 - event.clientY;
      pointer.active = true;

      trails.forEach(({ glowMesh, coreMesh }) => {
        glowMesh.visible = true;
        coreMesh.visible = true;
      });
    }

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    function animate() {
      if (disposed) return;

      animationFrame = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      if (pointer.active) {
        trails.forEach((trail) => {
          const { points, glowMesh, coreMesh, offset, z, phase } = trail;

          const waveX = Math.sin(time * 1.7 + phase) * 10;
          const waveY = Math.cos(time * 1.3 + phase) * 8;

          points[0].x += (pointer.x + offset + waveX - points[0].x) * 0.32;

          points[0].y += (pointer.y + waveY - points[0].y) * 0.32;

          points[0].z = z;

          for (let i = 1; i < points.length; i++) {
            const previous = points[i - 1];
            const current = points[i];

            current.x += (previous.x - current.x) * 0.22;
            current.y += (previous.y - current.y) * 0.22;
            current.z += (previous.z - current.z) * 0.22;
          }

          const curve = new THREE.CatmullRomCurve3(points);

          const glowGeometry = new THREE.TubeGeometry(curve, 44, 4.5, 7, false);

          const coreGeometry = new THREE.TubeGeometry(
            curve,
            44,
            1.15,
            7,
            false,
          );

          glowMesh.geometry.dispose();
          coreMesh.geometry.dispose();

          glowMesh.geometry = glowGeometry;
          coreMesh.geometry = coreGeometry;
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      trails.forEach(({ glowMesh, coreMesh }) => {
        glowMesh.geometry.dispose();
        coreMesh.geometry.dispose();
      });

      materials.forEach((material) => material.dispose());

      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
}
