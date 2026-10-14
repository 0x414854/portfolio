"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoundedBoxGeometry } from "three-stdlib";

export default function Carte3D({ rectoImg, versoImg, width = 3, height = 2 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene et caméra
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, // FOV
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    // Positionner légèrement en arrière pour voir toute la carte
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Loader textures
    const loader = new THREE.TextureLoader();

    // Recto
    const rectoTexture = loader.load(rectoImg, (t) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    // Verso
    const versoTexture = loader.load(versoImg, (t) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    // Matériaux
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // right
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // left
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // top
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // bottom
      new THREE.MeshBasicMaterial({ map: rectoTexture }), // front
      new THREE.MeshBasicMaterial({ map: versoTexture }), // back
    ];

    // PERMET D'AVOIR COIN ANGLE DROIT
    // const geometry = new THREE.BoxGeometry(width, height, 0.05);
    // RoundedBoxGeometry pour coins arrondis
    const width = 3;
    const height = width / 1.545; // 1.944
    const depth = 0.05;
    const radius = 0.5;
    const segments = 5;
    const geometry = new RoundedBoxGeometry(
      width,
      height,
      depth,
      segments,
      radius
    );

    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    renderer.setPixelRatio(window.devicePixelRatio);

    // Lumière
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [rectoImg, versoImg, width, height]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "400px", cursor: "grab" }}
    />
  );
}
