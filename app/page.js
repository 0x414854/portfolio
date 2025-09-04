"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

import styles from "./page.module.css";

import MyBitmoji from "@/public/myBitmoji.png";
import Bitmoji from "@/public/Bitmoji1.png";
import BitmojiT from "@/public/Bitmoji2.png";

import IconDesign from "@/public/iconDesign.png";
import IconDev from "@/public/iconDev.png";
import IconSoftware from "@/public/iconSoftware.png";
import IconRedesign from "@/public/iconRedesign.png";
import IconDBranding from "@/public/iconBranding.png";
import IconPhoto from "@/public/iconPhoto.png";
import IconQuote from "@/public/iconQuote.png";
import TestProject from "@/public/testProject.jpg";
import BitcoinPrice from "@/public/bitcoinPrice.png";
import BusinessCardAB from "@/public/businessCardAB.png";
import MnemonicShield from "@/public/mnemonicShield.png";
import Logo from "@/public/noble.png";
import ViceVersaLogo from "@/public/viceVersaLogo.png";

// Modifier Projects (si pas link alors pas de link mais affiche un overlay avec un zoom (carte de visite))
// Map Clients
// Update style template mail

export default function Home() {
  // AVIS
  const testimonialsData = [
    {
      name: "Marina Smith",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: Bitmoji,
      date: "2025-09-02",
    },
    {
      name: "Gabriel Miller",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: BitmojiT,
      date: "2025-08-15",
    },
    {
      name: "Emily Evans",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: Bitmoji,
      date: "2025-07-30",
    },
    {
      name: "Henry Williams",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: BitmojiT,
      date: "2025-06-20",
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
      image: MnemonicShield,
      alt: "Mnemonic Shield -Secure mnemonic encoded as a cryptographic sigil",
      link: "https://github.com/0x414854/Mnemonic_Shield",
    },
    {
      title: "Bitcoin Price",
      category: "Web Development",
      image: BitcoinPrice,
      alt: "finance",
      link: "https://0x414854.github.io/Bitcoin_Price/",
    },
    {
      title: "Arthur BARRAUD",
      category: "Business Card",
      image: BusinessCardAB,
      alt: "Business Card Arthur BARRAUD",
      link: "#",
    },

    {
      title: "Brawlhalla",
      category: "Applications",
      image: TestProject,
      alt: "brawlhalla",
      link: "#",
    },
    {
      title: "DSM.",
      category: "Web Design",
      image: TestProject,
      alt: "dsm.",
      link: "#",
    },
    {
      title: "Metaspark",
      category: "Web Design",
      image: TestProject,
      alt: "metaspark",
      link: "#",
    },
    {
      title: "Summary",
      category: "Web Development",
      image: TestProject,
      alt: "summary",
      link: "#",
    },
    {
      title: "Task Manager",
      category: "Applications",
      image: TestProject,
      alt: "task manager",
      link: "#",
    },
    {
      title: "Arrival",
      category: "Web Development",
      image: TestProject,
      alt: "arrival",
      link: "#",
    },
  ];

  useEffect(() => {
    // --- Helper toggle
    const elementToggleFunc = (elem) => elem.classList.toggle(styles.active);

    // Sidebar
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
    }

    // Filter select
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

    // Filter buttons
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

    // Contact form
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

    // Navigation
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    navigationLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const targetPage = this.dataset.page; // le bouton cliqué
        console.log(targetPage);

        pages.forEach((page) => {
          if (targetPage === page.dataset.page) {
            page.classList.add(styles.active);
          } else {
            page.classList.remove(styles.active);
          }
        });

        // Reset toutes les classes actives sur les boutons
        navigationLinks.forEach((nav) => nav.classList.remove(styles.active));
        // Active uniquement le bouton cliqué
        this.classList.add(styles.active);

        window.scrollTo(0, 0);
      });
    });

    // Cleanup (important pour éviter les doublons quand React re-render)
    return () => {
      sidebarBtn?.removeEventListener("click", () =>
        elementToggleFunc(sidebar)
      );
      // modalCloseBtn?.removeEventListener("click", testimonialsModalFunc);
      // overlay?.removeEventListener("click", testimonialsModalFunc);
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
      setMessage("✅ Réservation envoyée avec succès.");
      e.target.reset(); // <-- Vider le formulaire
    } else {
      setMessage("❌ Une erreur est survenue. Veuillez réessayer.");
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); // 5 secondes

      return () => clearTimeout(timer); // nettoyage si message change avant 5 sec
    }
  }, [message]);

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar} data-sidebar>
        <div className={styles.sidebarInfo}>
          <figure className={styles.avatarBox}>
            <Image src={MyBitmoji} alt="avatar" width={150} height={150} />
          </figure>

          <div className={styles.infocontent}>
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

            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="calendar-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Anniversaire</p>

                <time dateTime="1982-06-23">11 Août, 1998</time>
              </div>
            </li>

            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Localisation</p>

                <address>Genève, Suisse</address>
              </div>
            </li>
          </ul>

          <div className={styles.separator}></div>

          <ul className={styles.socialList}>
            <li className={styles.socialItem}>
              <a href="#" className={styles.sociallink}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li className={styles.socialItem}>
              <a href="#" className={styles.sociallink}>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li className={styles.socialItem}>
              <a href="#" className={styles.sociallink}>
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li className={styles.socialItem}>
              <a
                href="https://github.com/0x414854"
                className={styles.sociallink}
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className={styles.maincontent}>
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
              à Genève, spécialisé dans la création de
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

            <ul className={styles.serviceList}>
              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconDesign} alt="icon" width="60" height={60} />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                    Conception Web
                  </h4>
                  <p className={styles.serviceItemText}>
                    Le design le plus moderne et de haute qualité, réalisé à un
                    niveau professionnel.
                  </p>
                </div>
              </li>

              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconDev} alt="icon" width="60" />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} {styles.service-item-title}`}>
                    Développement web
                  </h4>
                  <p className={styles.serviceItemText}>
                    Développement de sites web de haute qualité, à un niveau
                    professionnel.
                  </p>
                </div>
              </li>
              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconSoftware} alt="icon" width="60" />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                    Bots & Logiciels
                  </h4>
                  <p className={styles.serviceItemText}>
                    Automatisation intelligente et développement de solutions
                    sur mesure.
                  </p>
                </div>
              </li>
              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconRedesign} alt="icon" width="60" />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                    Refonte
                  </h4>
                  <p className={styles.serviceItemText}>
                    Modernisation et optimisation de sites existants.
                  </p>
                </div>
              </li>

              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconDBranding} alt="icon" width="60" />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                    Branding & Identité
                  </h4>
                  <p className={styles.serviceItemText}>
                    Création d’identités de marque uniques et mémorables, des
                    logos et cartes de visite jusqu’aux chartes graphiques
                    complètes.
                  </p>
                </div>
              </li>

              <li className={styles.serviceItem}>
                <div className={styles.serviceIconBox}>
                  <Image src={IconPhoto} alt="icon" width="60" />
                </div>

                <div className={styles.serviceContentBox}>
                  <h4 className={`${styles.h4} ${styles.serviceItemTitle}`}>
                    Photography
                  </h4>
                  <p className={styles.serviceItemText}>
                    Je réalise des photos de haute qualité, dans toutes les
                    catégories, à un niveau professionnel.
                  </p>
                </div>
              </li>
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
                    />
                  </figure>
                  <Image src={IconQuote} alt="quote icon" />
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
              <li className={styles.clientsItem}>
                <Link href="https://viceversa-atelier.com" target="_blank">
                  <Image
                    src={ViceVersaLogo}
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              </li>

              <li className={styles.clientsItem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={300} height={200} />
                </a>
              </li>

              <li className={styles.clientsItem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsItem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsItem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsItem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>
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
                  <Link href={project.link} target="_blank">
                    <figure className={styles.projectImg}>
                      <div className={styles.projectItemIconBox}>
                        <ion-icon name="eye-outline"></ion-icon>
                      </div>
                      <Image
                        src={project.image}
                        alt={project.alt}
                        loading="lazy"
                      />
                    </figure>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectCategory}>{project.category}</p>
                  </Link>
                </li>
              ))}
            </ul>
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
            <h3 className={`${styles.h3} ${styles.formTitle}`}>Contact Form</h3>

            <form onSubmit={handleSubmit} className={styles.form} data-form>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullname"
                  className={styles.formInput}
                  placeholder="Full name"
                  required
                  data-form-input
                />
                <input
                  type="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="Email Address"
                  required
                  data-form-input
                />
              </div>

              <textarea
                name="message"
                className={styles.formInput}
                placeholder="Your Message"
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
                <span>Send Message</span>
              </button>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}
