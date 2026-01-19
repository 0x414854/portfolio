"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect, useRef } from "react";

import HomeModal from "./components/homeModal";

import styles from "./page.module.css";

import MyBitmoji from "@/public/bitmoji/myBitmoji.png";
import viceVersaBitmoji from "@/public/bitmoji/viceVersa.png";
import MyVisionBoardBitmoji from "@/public/bitmoji/myVisionBoard.png";
import CDOBitmoji from "@/public/bitmoji/CDOMultiservices.png";

import BitmojiT from "@/public/bitmoji/bitmoji2.png";

import IconDesign from "@/public/icon/iconDesign.png";
import IconDesignBlue from "@/public/icon/iconDesignBlue.png";
import IconDev from "@/public/icon/iconDev.png";
import IconDevBlue from "@/public/icon/iconDevBlue.png";
import IconSoftware from "@/public/icon/iconSoftware.png";
import IconSoftwareBlue from "@/public/icon/iconSoftwareBlue.png";

import IconRedesign from "@/public/icon/iconRedesign.png";
import IconRedesignBlue from "@/public/icon/iconRedesignBlue.png";
import IconBranding from "@/public/icon/iconBranding.png";
import IconBrandingBlue from "@/public/icon/iconBrandingBlue.png";
import IconPhoto from "@/public/icon/iconPhoto.png";
import IconPhotoBlue from "@/public/icon/iconPhotoBlue.png";

import IconQuote from "@/public/icon/iconQuote.png";
import IconQuoteBlue from "@/public/icon/iconQuoteBlue.png";
import GithubIcon from "@/public/icon/githubGrey.svg";
import GithubBlack from "@/public/icon/githubBlack.svg";
import LinkedinGrey from "@/public/icon/linkedinGrey.svg";
import LinkedinBlack from "@/public/icon/linkedinBlack.svg";
import XIcon from "@/public/icon/XGrey.svg";
import XIconBlack from "@/public/icon/XBlack.svg";
import CanvaIcon from "@/public/icon/canvaIconGrey.png";
import CanvaIconBlack from "@/public/icon/canvaIconBlack.png";

import PythonIcon from "@/public/icon/pythonIconGrey.png";
import PythonIconBlack from "@/public/icon/pythonIconBlack.png";
import HTMLIcon from "@/public/icon/htmlIconGrey.png";
import HTMLIconBlack from "@/public/icon/htmlIconBlack.png";
import CSSIcon from "@/public/icon/cssIconGrey.png";
import CSSIconBlack from "@/public/icon/cssIconBlack.png";
import JSIcon from "@/public/icon/javascriptIconGrey.png";
import JSIconBlack from "@/public/icon/javascriptIconBlack.png";
import NextJsIcon from "@/public/icon/nextJsIconGrey.png";
import NextJsIconBlack from "@/public/icon/nextJsIconBlack.png";

import TestProject from "@/public/projects/testProject.jpg";
import BitcoinPrice from "@/public/projects/bitcoinPrice.png";
import BusinessCardAB from "@/public/projects/businessCardAB.png";
import BusinessCardABDev from "@/public/projects/businessCardABDev.png";
import MnemonicShield from "@/public/projects/mnemonicShield.png";
import ViceVersa from "@/public/projects/viceversa.png";
import MyVisionBoard from "@/public/projects/myVisionBoard.png";
import CDOMuliservices from "@/public/projects/CDOMultiservices.png";

import Logo from "@/public/logo/noble.png";
import ViceVersaLogo from "@/public/logo/viceVersaLogo.png";
import MyVisionBoardLogo from "@/public/logo/myvisionboard.png";
import CDOMultiservicesLogo from "@/public/logo/CDOLogo.png";
import HaumanaLogo from "@/public/logo/haumana.png";

import Card3D from "./components/3dCardFlipAnimation.js";

// Modifier description service (trop repetitif)
// Numero portable suisse !!
// Update style template mail
// Ajouter description des projets du portfolio
// Ajouter avis de marina pour myvisionboard
// Ajouter un avis de CDO

export default function Home() {
  // IS DARK ?
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // SERVICES
  const services = [
    {
      icon: {
        light: IconDesign,
        dark: IconDesignBlue,
      },
      title: "Conception Web",
      description:
        "Création de designs élégants, modernes et adaptés à votre image, avec une attention particulière aux détails et à l’expérience utilisateur.",
    },
    {
      icon: {
        light: IconDev,
        dark: IconDevBlue,
      },
      title: "Développement web",
      description:
        "Création de designs élégants, modernes et adaptés à votre image, avec une attention particulière aux détails et à l’expérience utilisateur.",
    },
    {
      icon: {
        light: IconSoftware,
        dark: IconSoftwareBlue,
      },
      title: "Bots & Logiciels",
      description:
        "Automatisation intelligente et développement de solutions sur mesure.",
    },
    {
      icon: {
        light: IconRedesign,
        dark: IconRedesignBlue,
      },
      title: "Refonte",
      description: "Modernisation et optimisation de sites existants.",
    },
    {
      icon: {
        light: IconBranding,
        dark: IconBrandingBlue,
      },
      title: "Branding & Identité",
      description:
        "Création d’identités de marque uniques et mémorables, des logos et cartes de visite jusqu’aux chartes graphiques complètes.",
    },
    {
      icon: {
        light: IconPhoto,
        dark: IconPhotoBlue,
      },
      title: "Photographie",
      description:
        "Réalisation de photographies professionnelles, de haute qualité, adaptées à tous les styles et besoins.",
    },
  ];

  //    HOVER OVERLAY EFFECT
  const overlayRefs = useRef([]);
  const containerRef = useRef(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setCanHover(mediaQuery.matches);

    const handler = (e) => setCanHover(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handlePointerMove = (e, index) => {
    if (!canHover) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const overlay = overlayRefs.current[index];
    if (overlay) {
      overlay.style.setProperty("--x", `${x}px`);
      overlay.style.setProperty("--y", `${y}px`);
      overlay.style.setProperty("--opacity", 1);
    }
  };

  const handlePointerLeave = (index) => {
    if (!canHover) return;
    const overlay = overlayRefs.current[index];
    if (overlay) {
      overlay.style.setProperty("--opacity", 0);
    }
  };
  // AVIS
  const testimonialsData = [
    {
      name: "Isabelle Breniaux - Vice Versa",
      text: "J'ai fait appel à M. Arthur Barraud pour refaire le site internet de notre atelier. Je suis extrêmement satisfaite du résultat qui a dépassé nos attentes. Conseils avisés et très professionnels. Rapidité de construction et de mise en ligne. Je recommande vivement cette toute jeune entreprise!",
      avatar: viceVersaBitmoji,
      date: "2025-10-01",
    },
    {
      name: "My Vision Board",
      text: "Franchement j’adore cette appli! Super pratique, surtout en complément d’une vision board classique. Je peux noter mes idées dès qu’elles me viennent, modifier mes objectifs à tout moment et suivre ma progression facilement. Tout reste toujours à portée de main, et voir la courbe ainsi que le nombre d’objectifs atteints, c’est hyper motivant! Simple, claire et vraiment utile au quotidien.",
      avatar: MyVisionBoardBitmoji,
      date: "2025-10-01",
    },
    {
      name: "CDO Multiservices",
      text: "Une création de site web rapide, professionnelle et parfaitement maîtrisée. CDO Multiservices dispose désormais d’un site clair, moderne et efficace, conçu pour inspirer confiance et valoriser notre savoir-faire. Un travail de qualité livré dans des délais courts, avec un vrai sens du service et du détail.”",
      avatar: CDOBitmoji,
      date: "2026-01-14",
    },
    {
      name: "Haumana Bien-être",
      text: "En cours de developpement",
      avatar: viceVersaBitmoji,
      date: "2026-01-14",
    },
  ];

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
  };

  // CLIENTS
  const clients = [
    {
      src: ViceVersaLogo,
      alt: "Logo du site Vice Versa Atelier - Styliste de robe de marié et accesoires",
      link: "https://viceversa-atelier.com",
      width: 200,
      height: 200,
    },
    {
      src: MyVisionBoardLogo,
      alt: "Logo du site MyVisionBoard - My Vision Board",
      link: "https://www.myvisionboard.life",
      width: 180,
      height: 80,
    },
    {
      src: CDOMultiservicesLogo,
      alt: "Logo du site CDO Multiservices - Entreprise de nettoyage en Suisse",
      link: "https://www.cdo-multiservices.ch",
      width: 300,
      height: 120,
    },
    {
      src: Logo,
      alt: "Logo Client 3",
      link: "#",
      width: 200,
      height: 200,
    },
    {
      src: Logo,
      alt: "Logo Client 4",
      link: "#",
      width: 200,
      height: 200,
    },
    {
      src: Logo,
      alt: "Logo Client 5",
      link: "#",
      width: 200,
      height: 200,
    },
  ];

  // SKILLS

  const skills = [
    {
      category: "Front-end",
      items: [
        { name: "HTML", value: 100 },
        { name: "CSS", value: 90 },
        { name: "JavaScript", value: 80 },
        { name: "React", value: 70 },
        { name: "Next.js", value: 70 },
      ],
    },
    {
      category: "Back-end / General",
      items: [
        { name: "Python", value: 80 },
        { name: "Node.js", value: 50 },
      ],
    },
    {
      category: "Blockchain",
      items: [
        { name: "Solidity", value: 10, note: "Learning" }, // ajout du champ note
      ],
    },
    {
      category: "Tools & Design",
      items: [
        { name: "VS Code", value: 100 },
        { name: "Git / GitHub", value: 90 },
        { name: "Terminal / CLI", value: 60 },
        { name: "Canva", value: 85 },
        { name: "Figma / UI Design", value: 10 },
        { name: "Framer Motion", value: 70 },
        { name: "Resend", value: 80 },
      ],
    },
  ];

  // PROJECTS
  const projects = [
    {
      title: "Mnemonic Shield",
      category: "Software / Python",
      logos: {
        light: [PythonIcon],
        dark: [PythonIconBlack],
      },
      image: MnemonicShield,
      alt: "Mnemonic Shield -Secure mnemonic encoded as a cryptographic sigil",
      link: "https://github.com/0x414854/Mnemonic_Shield",
    },
    {
      title: "Bitcoin Price",
      category: "Web Development",
      logos: {
        light: [HTMLIcon, CSSIcon, JSIcon],
        dark: [HTMLIconBlack, CSSIconBlack, JSIconBlack],
      },
      image: BitcoinPrice,
      alt: "finance",
      link: "https://0x414854.github.io/Bitcoin_Price/",
    },
    {
      title: "Arthur BARRAUD",
      category: "Business Card",
      logos: {
        light: [CanvaIcon],
        dark: [CanvaIconBlack],
      },
      image: BusinessCardAB,
      alt: "Business Card Arthur BARRAUD",
      rectoImg: "/businessCard/AB/recto.png",
      versoImg: "/businessCard/AB/verso.png",
    },

    {
      title: "Arthur BARRAUD",
      category: "Business Card",
      logos: {
        light: [CanvaIcon],
        dark: [CanvaIconBlack],
      },
      image: BusinessCardABDev,
      alt: "Business Card Arthur BARRAUD",
      rectoImg: "/businessCard/AB/rectoDev.png",
      versoImg: "/businessCard/AB/versoDev.png",
    },
    {
      title: "Vice Versa Atelier",
      category: "Web Development",
      logos: {
        light: [NextJsIcon],
        dark: [NextJsIconBlack],
      },
      image: ViceVersa,
      alt: "Vice Versa Atelier",
      link: "https://www.viceversa-atelier.com",
    },
    {
      title: "MyVisionBoard",
      category: "Web Development",
      logos: {
        light: [NextJsIcon],
        dark: [NextJsIconBlack],
      },
      image: MyVisionBoard,
      alt: "MyVisionBoard image - My Vision Board",
      link: "https://www.myvisionboard.life",
    },
    {
      title: "CDO Multiservices",
      category: "Web Development",
      logos: {
        light: [NextJsIcon],
        dark: [NextJsIconBlack],
      },
      image: CDOMuliservices,
      alt: "CDO Multiservices image",
      link: "https://www.cdo-multiservices.ch",
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedCard(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setModalOpen(false);
  };
  useEffect(() => {
    // --- HELPER TOGGLE
    const elementToggleFunc = (elem) => elem.classList.toggle(styles.active);

    // SIDEBAR
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
    }

    // FILTER SELECT
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-select-value]");
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    const filterFunc = (selectedValue) => {
      filterItems.forEach((item) => {
        if (
          selectedValue === "all" ||
          selectedValue === item.dataset.category
        ) {
          item.classList.add(styles.active);
        } else {
          item.classList.remove(styles.active);
        }
      });
    };

    select?.addEventListener("click", () => elementToggleFunc(select));
    selectItems.forEach((item) => {
      item.addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });

    // FILTER BUTTONS
    let lastClickedBtn = filterBtn[0];
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn?.classList.remove(styles.active);
        this.classList.add(styles.active);
        lastClickedBtn = this;
      });
    });

    // CONTACT FORM
    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");

    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });

    // NAVIGATION
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    navigationLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const targetPage = this.dataset.page;
        console.log(targetPage);

        pages.forEach((page) => {
          if (targetPage === page.dataset.page) {
            page.classList.add(styles.active);
          } else {
            page.classList.remove(styles.active);
          }
        });

        navigationLinks.forEach((nav) => nav.classList.remove(styles.active));

        this.classList.add(styles.active);

        window.scrollTo(0, 0);
      });
    });

    return () => {
      sidebarBtn?.removeEventListener("click", () =>
        elementToggleFunc(sidebar)
      );
    };
  }, []);

  // SEND EMAIL FROM CONTACT
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      setMessage("✅ Message envoyé avec succès.");
      e.target.reset(); // <-- Vider le formulaire
    } else {
      setMessage("❌ Une erreur est survenue. Veuillez réessayer.");
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // RAFFLE MODAL

  const [isRaffleModalOpen, setIsRaffleModalOpen] = useState(false);
  useEffect(() => {
    const today = new Date().toDateString();
    const lastSeen = localStorage.getItem("contestModalSeen");

    if (lastSeen !== today) {
      setTimeout(() => {
        setIsRaffleModalOpen(true);
        localStorage.setItem("contestModalSeen", today);
      }, 800);
    }
  }, []);

  return (
    <main className={styles.main}>
      {/* Modal */}
      <HomeModal
        isActive={isRaffleModalOpen}
        onClose={() => setIsRaffleModalOpen(false)}
      />
      <aside className={styles.sidebar} data-sidebar>
        <div className={styles.sidebarInfo}>
          <figure className={styles.avatarBox}>
            <Image src={MyBitmoji} alt="avatar" width={150} height={150} />
          </figure>

          <div className={styles.infoContent}>
            <h1 className={styles.name} title="Arthur BARRAUD">
              Arthur BARRAUD
            </h1>
            <div className={styles.tag}>
              {" "}
              <p className={styles.title}>Web Developer</p>
              {/* <p className={styles.title}>Web Designer</p>
              <p className={styles.title}>Blockchain Developer</p> */}
            </div>
          </div>

          <button
            className={styles.modalButton}
            onClick={() => setIsRaffleModalOpen(true)}
          >
            <span>Tirage au sort</span>
            <ion-icon name="trophy"></ion-icon>
          </button>

          <button className={styles.infoMoreBtn} data-sidebar-btn>
            <span>Afficher les contacts</span>
            <ion-icon name="chevron-down"></ion-icon>
          </button>
        </div>

        <div className={styles.sidebarInfoMore}>
          <div className={styles.separator}></div>

          <ul className={styles.contactslist}>
            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Email</p>

                <Link
                  href="mailto:arthur.barraud@proton.me"
                  className={styles.contactLink}
                >
                  arthur.barraud@proton.me
                </Link>
              </div>
            </li>

            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="phone-portrait-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Téléphone</p>

                <a href="tel:+33660988623" className={styles.contactLink}>
                  +33 (0)6 60 98 86 23
                </a>
              </div>
            </li>

            {/* <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="calendar-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Anniversaire</p>

                <time dateTime="1982-06-23">11 Août, 1998</time>
              </div>
            </li> */}

            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Localisation</p>

                <address>
                  Bassin lémanique -<br /> Suisse & France
                </address>
              </div>
            </li>
          </ul>

          <div className={styles.separator}></div>

          <ul className={styles.socialList}>
            {/* <li className={styles.socialItem}>
              <a href="#" className={styles.sociallink}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li> */}
            <li className={styles.socialItem}>
              <Link
                href="https://x.com/from0toBitcoin"
                className={styles.sociallink}
                target="_blank"
              >
                <Image
                  src={isDark ? XIcon : XIconBlack}
                  width={28}
                  height={28}
                  alt="X (Twitter) Icon"
                  className={styles.socialIcon}
                  loading="lazy"
                />
              </Link>
            </li>
            <li className={styles.socialItem}>
              <Link
                href="https://github.com/0x414854"
                className={styles.sociallink}
                target="_blank"
              >
                <Image
                  src={isDark ? GithubIcon : GithubBlack}
                  width={28}
                  height={28}
                  alt="Github Icon"
                  className={styles.socialIcon}
                  loading="lazy"
                />
              </Link>
            </li>
            <li className={styles.socialItem}>
              <Link
                href="https://www.linkedin.com/in/arthur-barraud-3302a0139/"
                className={styles.sociallink}
                target="_blank"
              >
                <Image
                  src={isDark ? LinkedinGrey : LinkedinBlack}
                  width={28}
                  height={28}
                  alt="Linkedin Icon"
                  className={styles.socialIcon}
                  loading="lazy"
                />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className={styles.maincontent}>
        <button
          className={styles.mainModalButton}
          onClick={() => setIsRaffleModalOpen(true)}
        >
          <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s4}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.s5}`}>✦</span>
          <span>Tirage au sort</span>
        </button>
        <nav className={styles.navbar}>
          <ul className={styles.navbarlist}>
            <li className={styles.navbaritem}>
              <button
                className={`${styles.navbarlink} ${styles.active}`}
                data-nav-link
                data-page="a propos"
              >
                A propos
              </button>
            </li>
            <li className={styles.navbaritem}>
              <button
                className={styles.navbarlink}
                data-nav-link
                data-page="compétences"
              >
                Compétences
              </button>
            </li>
            <li className={styles.navbaritem}>
              <button
                className={styles.navbarlink}
                data-nav-link
                data-page="portfolio"
              >
                Portfolio
              </button>
            </li>
            <li className={styles.navbaritem}>
              <button
                className={styles.navbarlink}
                data-nav-link
                data-page="contact"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        <article
          className={`${styles.article} ${styles.about} ${styles.active}`}
          data-page="a propos"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articleTitle}`}>
              À propos de moi
            </h2>
          </header>

          <section className={styles.aboutText}>
            <p>
              Je suis un <b>designer créatif</b> et <b>développeur web</b> basé
              à Genève, spécialisé dans la création de{" "}
              <b>sites modernes, intuitifs et esthétiques</b> ainsi que dans le{" "}
              <b>design graphique</b> (cartes de visite, flyers, supports
              visuels).
            </p>
            <p>
              Je me spécialise dans les projets liés au{" "}
              <b>secteur de la bouche</b> (restaurants, traiteurs, boulangeries,
              bars, etc.), où l’image et l’expérience client sont essentielles.
            </p>
            <p>
              Mais ma créativité ne s’arrête pas là : je conçois également des
              solutions pour <b>tous types de métiers et d’entreprises</b>, en
              adaptant chaque projet à son identité et à ses besoins
              spécifiques.
            </p>
            <p>
              Mon objectif : construire des sites à la fois{" "}
              <b>fonctionnels, attractifs et mémorables</b>, qui mettent en
              valeur votre activité et transmettent votre message de la façon la
              plus <b>impactante et créative possible.</b> ✨
            </p>
          </section>

          <section className={styles.service}>
            <h3 className={`${styles.h3} ${styles.serviceTitle}`}>
              Ce que je fais
            </h3>

            <ul className={styles.serviceList} ref={containerRef}>
              {services.map((service, index) => (
                <li
                  key={index}
                  className={styles.serviceItem}
                  onPointerMove={(e) => handlePointerMove(e, index)}
                  onPointerLeave={() => handlePointerLeave(index)}
                >
                  {/* Overlay div */}
                  <div
                    ref={(el) => (overlayRefs.current[index] = el)}
                    className={styles.serviceOverlay}
                  />
                  <div className={styles.serviceIconBox}>
                    <Image
                      src={isDark ? service.icon.light : service.icon.dark}
                      alt="icon"
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.serviceContentBox}>
                    <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                      {service.title}
                    </h4>
                    <p className={styles.serviceItemText}>
                      {service.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.testimonials}>
            <h3 className={`${styles.h3} ${styles.testimonialsTitle}`}>
              Témoignages
            </h3>
            <ul className={`${styles.testimonialsList} ${styles.hasScrollbar}`}>
              {testimonialsData.map((t, index) => (
                <li key={index} className={styles.testimonialsItem}>
                  <div
                    className={styles.contentCard}
                    onClick={() => openModal(t)}
                    data-testimonials-item
                  >
                    <figure className={styles.testimonialsAvatarBox}>
                      <Image
                        src={t.avatar}
                        alt="avatar"
                        width={70}
                        height={70}
                        data-testimonials-avatar
                        loading="lazy"
                      />
                    </figure>
                    <h4
                      className={`${styles.h4} ${styles.testimonialsItemTitle}`}
                      data-testimonials-title
                    >
                      {t.name}
                    </h4>
                    <div
                      className={styles.testimonialsText}
                      data-testimonials-text
                    >
                      <p>{t.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {isModalOpen && selectedTestimonial && (
            <div
              className={`${styles.modalContainer} ${
                isModalOpen ? styles.active : ""
              }`}
            >
              <div
                className={`${styles.overlay} ${
                  isModalOpen ? styles.active : ""
                }`}
                onClick={closeModal}
              ></div>
              <section className={styles.testimonialsModal}>
                <button className={styles.modalCloseBtn} onClick={closeModal}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>

                <div className={styles.modalImgWrapper}>
                  <figure className={styles.modalAvatarBox}>
                    <Image
                      src={selectedTestimonial.avatar}
                      alt={selectedTestimonial.name}
                      width={80}
                      loading="lazy"
                    />
                  </figure>
                  <Image
                    src={isDark ? IconQuote : IconQuoteBlue}
                    alt="quote icon"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>

                <div className={styles.modalContent}>
                  <h4 className={`${styles.h3} ${styles.modalTitle}`}>
                    {selectedTestimonial.name}
                  </h4>
                  <time dateTime={selectedTestimonial.date}>
                    {new Date(selectedTestimonial.date).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </time>

                  <div className={styles.modalText}>
                    <p>{selectedTestimonial.text}</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          <section className={styles.clients}>
            <h3 className={`${styles.h3} ${styles.clientsTitle}`}>Clients</h3>

            <ul className={`${styles.clientsList} ${styles.hasScrollbar}`}>
              {clients.map((client, index) => (
                <li key={index} className={styles.clientsItem}>
                  <Link href={client.link} target="_blank">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={client.width}
                      height={client.height}
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <article
          className={`${styles.resume} ${styles.article}`}
          data-page="compétences"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articleTitle}`}>
              Mes Compétences
            </h2>
          </header>
          <section className={styles.skill}>
            {/* <h3 className={`${styles.h3} ${styles.skillstitle}`}>My Skills</h3> */}

            <ul className={`${styles.skillslist} ${styles.contentCard}`}>
              {skills.map((category) => (
                <React.Fragment key={category.category}>
                  <li className={styles.skillsCategory}>{category.category}</li>

                  {category.items.map((skill) => (
                    <li key={skill.name} className={styles.skillsItem}>
                      <div className={styles.titleWrapper}>
                        <h5 className={styles.h5}>{skill.name}</h5>
                        <data value={skill.value}>{skill.value}%</data>
                        {skill.note && (
                          <div className={styles.skillNote}>
                            <small>{skill.note}</small>
                          </div>
                        )}
                      </div>

                      <div className={styles.skillsProgressBg}>
                        <div
                          className={styles.skillsProgressFill}
                          style={{ "--target-width": skill.value + "%" }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </section>
        </article>

        <article
          className={`${styles.portfolio} ${styles.article}`}
          data-page="portfolio"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articleTitle}`}>Portfolio</h2>
          </header>

          <section className={styles.projects}>
            <ul className={styles.filterList}>
              <li className={styles.filterItem}>
                <button className={styles.active} data-filter-btn>
                  All
                </button>
              </li>
              <li className={styles.filterItem}>
                <button data-filter-btn>Web Design</button>
              </li>
              <li className={styles.filterItem}>
                <button data-filter-btn>Software / Python</button>
              </li>
              <li className={styles.filterItem}>
                <button data-filter-btn>Web Development</button>
              </li>
              <li className={styles.filterItem}>
                <button data-filter-btn>Business Card</button>
              </li>
            </ul>

            <div className={styles.filterSelectBox}>
              <button className={styles.filterSelect} data-select>
                <div className={styles.selectValue} data-select-value>
                  Select Category
                </div>

                <div className={styles.selecticon}>
                  <ion-icon name="chevron-down"></ion-icon>
                </div>
              </button>

              <ul className={styles.selectList}>
                <li className={styles.selectItem}>
                  <button data-select-item>All</button>
                </li>
                <li className={styles.selectItem}>
                  <button data-select-item>Web Design</button>
                </li>
                <li className={styles.selectItem}>
                  <button data-select-item>Software / Python</button>
                </li>
                <li className={styles.selectItem}>
                  <button data-select-item>Web Development</button>
                </li>
                <li className={styles.selectItem}>
                  <button data-select-item>Business Card</button>
                </li>
              </ul>
            </div>

            <ul className={styles.projectList}>
              {projects.map((project, index) => (
                <li
                  key={index}
                  className={`${styles.projectItem} ${styles.active}`}
                  data-filter-item
                  data-category={project.category.toLowerCase()}
                >
                  {project.category === "Business Card" ? (
                    <div
                      className={styles.projectClickable}
                      onClick={() => handleOpenModal(project)}
                    >
                      <figure className={styles.projectImg}>
                        <div className={styles.projectItemIconBox}>
                          <ion-icon name="eye-outline"></ion-icon>
                        </div>
                        <Image
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          className={styles.projectImage}
                        />
                      </figure>
                      <div className={styles.projectInfos}>
                        <div>
                          <h3 className={styles.projectTitle}>
                            {project.title}
                          </h3>
                          <p className={styles.projectCategory}>
                            {project.category}
                          </p>
                        </div>
                        <div className={styles.projectLogos}>
                          {(isDark
                            ? project.logos.light
                            : project.logos.dark
                          ).map((logo, i) => (
                            <Image
                              key={i}
                              src={logo}
                              alt={`${project.title} logo ${i + 1}`}
                              loading="lazy"
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={project.link} target="_blank">
                      <figure className={styles.projectImg}>
                        <div className={styles.projectItemIconBox}>
                          <ion-icon name="eye-outline"></ion-icon>
                        </div>
                        <Image
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          className={styles.projectImage}
                        />
                      </figure>
                      <div className={styles.projectInfos}>
                        <div>
                          <h3 className={styles.projectTitle}>
                            {project.title}
                          </h3>
                          <p className={styles.projectCategory}>
                            {project.category}
                          </p>
                        </div>
                        <div className={styles.projectLogos}>
                          {(isDark
                            ? project.logos.light
                            : project.logos.dark
                          ).map((logo, i) => (
                            <Image
                              key={i}
                              src={logo}
                              alt={`${project.title} logo ${i + 1}`}
                              loading="lazy"
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {modalOpen && selectedCard && (
              <div className={styles.modalOverlay} onClick={handleCloseModal}>
                <div
                  className={styles.modalContentCard}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.modalCloseBtn}
                    onClick={handleCloseModal}
                  >
                    ×
                  </button>
                  <h2>{selectedCard.title}</h2>

                  <Card3D
                    rectoImg={selectedCard.rectoImg}
                    versoImg={selectedCard.versoImg}
                    width={3}
                    height={2}
                  />
                </div>
              </div>
            )}
          </section>
        </article>

        <article
          className={`${styles.contact} ${styles.article}`}
          data-page="contact"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articleTitle}`}>Contact</h2>
          </header>

          <section className={styles.mapBox} data-mapbox>
            <figure>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44180.52394803417!2d6.143038949999999!3d46.20483005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c650693d0e2eb%3A0xa0b695357b0bbc39!2zR2Vuw6h2ZSwgU3Vpc3Nl!5e0!3m2!1sfr!2sfr!4v1756828274218!5m2!1sfr!2sfr"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </figure>
          </section>

          <section className={styles.contactForm}>
            <h3 className={`${styles.h3} ${styles.formTitle}`}>
              Contactez moi
            </h3>

            <form onSubmit={handleSubmit} className={styles.form} data-form>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullname"
                  className={styles.formInput}
                  placeholder="Nom Complet"
                  required
                  data-form-input
                />
                <input
                  type="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="Adresse Email"
                  required
                  data-form-input
                />
              </div>

              <textarea
                name="message"
                className={styles.formInput}
                placeholder="Ton Message"
                required
                data-form-input=""
              ></textarea>

              <button
                className={styles.formBtn}
                type="submit"
                disabled
                data-form-btn
              >
                <ion-icon name="paper-plane"></ion-icon>
                <span>Envoyer un message</span>
              </button>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}
