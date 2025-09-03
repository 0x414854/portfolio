"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Resend } from "resend";
import Image from "next/image";
import styles from "./page.module.css";

import MyBitmoji from "@/public/myBitmoji.png";
import Bitmoji from "@/public/Bitmoji1.png";
import BitmojiT from "@/public/Bitmoji2.png";
import IconDesign from "@/public/iconDesign.png";
import IconDev from "@/public/iconDev.png";
import IconApp from "@/public/iconApp.png";
import IconPhoto from "@/public/iconPhoto.png";
import IconQuote from "@/public/iconQuote.png";
import TestProject from "@/public/testProject.jpg";
import Logo from "@/public/noble.png";
import ViceVersaLogo from "@/public/viceVersaLogo.png";
import Link from "next/link";

export default function Home() {
  // AVIS
  const testimonialsData = [
    {
      name: "Isabelle Breniaux",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: Bitmoji,
      date: "2025-09-02",
    },
    {
      name: "Jessica Miller",
      text: "Je voulais un site qui reflète le côté unique et sur mesure de mes robes. Arthur a parfaitement compris mon identité visuelle et a créé un site à la fois moderne et romantique. J’ai reçu énormément de compliments de mes clientes, certaines m’ont même dit qu’elles m’ont choisie grâce au site.",
      avatar: Bitmoji,
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
      avatar: Bitmoji,
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
        { name: "JavaScript", value: 75 },
        { name: "React", value: 70 },
        { name: "Next.js", value: 60 },
      ],
    },
    {
      category: "Back-end / General",
      items: [
        { name: "Python", value: 50 },
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
        { name: "Git / GitHub", value: 90 },
        { name: "Canva", value: 85 },
        { name: "Figma / UI Design", value: 10 },
      ],
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
      modalCloseBtn?.removeEventListener("click", testimonialsModalFunc);
      overlay?.removeEventListener("click", testimonialsModalFunc);
    };
  }, []);

  // SEND EMAIL FROM CONTACT

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
      alert("Message envoyé ✅");
    } else {
      alert("Erreur ❌");
    }
  };

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar} data-sidebar>
        <div className={styles.sidebarInfo}>
          <figure className={styles.avatarbox}>
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
            <span>Show Contacts</span>
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
                <p className={styles.contacttitle}>Phone</p>

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
                <p className={styles.contacttitle}>Birthday</p>

                <time dateTime="1982-06-23">11 Août, 1998</time>
              </div>
            </li>

            <li className={styles.contactItem}>
              <div className={styles.iconbox}>
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <div className={styles.contactInfo}>
                <p className={styles.contacttitle}>Location</p>

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
                data-page="about"
              >
                About
              </button>
            </li>
            <li className={styles.navbaritem}>
              <button
                className={styles.navbarlink}
                data-nav-link
                data-page="skills"
              >
                Skills
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
          data-page="about"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articletitle}`}>About me</h2>
          </header>

          <section className={styles.abouttext}>
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
            <h3 className={`${styles.h3} ${styles.servicetitle}`}>
              What I'm doing
            </h3>

            <ul className={styles.servicelist}>
              <li className={styles.serviceitem}>
                <div className={styles.serviceiconbox}>
                  <Image src={IconDesign} alt="icon" width="40" height={40} />
                </div>

                <div className={styles.servicecontentbox}>
                  <h4 className={`${styles.h4} ${styles.serviceitemtitle}`}>
                    Web Design
                  </h4>
                  <p className={styles.serviceitemtext}>
                    Le design le plus moderne et de haute qualité, réalisé à un
                    niveau professionnel.
                  </p>
                </div>
              </li>

              <li className={styles.serviceitem}>
                <div className={styles.serviceiconbox}>
                  <Image src={IconDev} alt="icon" width="40" />
                </div>

                <div className={styles.servicecontentbox}>
                  <h4 className={`${styles.h4} {styles.service-item-title}`}>
                    Web development
                  </h4>
                  <p className={styles.serviceitemtext}>
                    Développement de sites web de haute qualité, à un niveau
                    professionnel.
                  </p>
                </div>
              </li>

              <li className={styles.serviceitem}>
                <div className={styles.serviceiconbox}>
                  <Image src={IconApp} alt="icon" width="40" />
                </div>

                <div className={styles.servicecontentbox}>
                  <h4 className={`${styles.h4} ${styles.serviceitemtitle}`}>
                    Branding & Identity
                  </h4>
                  <p className={styles.serviceitemtext}>
                    Création d’identités de marque uniques et mémorables, des
                    logos et cartes de visite jusqu’aux chartes graphiques
                    complètes.
                  </p>
                </div>
              </li>

              <li className={styles.serviceitem}>
                <div className={styles.serviceiconbox}>
                  <Image src={IconPhoto} alt="icon" width="40" />
                </div>

                <div className={styles.servicecontentbox}>
                  <h4 className={`${styles.h4} ${styles.serviceitemtitle}`}>
                    Photography
                  </h4>
                  <p className={styles.serviceitemtext}>
                    Je réalise des photos de haute qualité, dans toutes les
                    catégories, à un niveau professionnel.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className={styles.testimonials}>
            <h3 className={`${styles.h3} ${styles.testimonialstitle}`}>
              Testimonials
            </h3>
            <ul className={`${styles.testimonialslist} ${styles.hasscrollbar}`}>
              {testimonialsData.map((t, index) => (
                <li key={index} className={styles.testimonialsitem}>
                  <div
                    className={styles.contentcard}
                    onClick={() => openModal(t)}
                    data-testimonials-item
                  >
                    <figure className={styles.testimonialsavatarbox}>
                      <Image
                        src={t.avatar}
                        alt="avatar"
                        width={70}
                        height={70}
                        data-testimonials-avatar
                      />
                    </figure>
                    <h4
                      className={`${styles.h4} ${styles.testimonialsitemtitle}`}
                      data-testimonials-title
                    >
                      {t.name}
                    </h4>
                    <div
                      className={styles.testimonialstext}
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
              className={`${styles.modalcontainer} ${
                isModalOpen ? styles.active : ""
              }`}
            >
              <div
                className={`${styles.overlay} ${
                  isModalOpen ? styles.active : ""
                }`}
                onClick={closeModal}
              ></div>
              <section className={styles.testimonialsmodal}>
                <button className={styles.modalclosebtn} onClick={closeModal}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>

                <div className={styles.modalimgwrapper}>
                  <figure className={styles.modalavatarbox}>
                    <Image
                      src={selectedTestimonial.avatar}
                      alt={selectedTestimonial.name}
                      width={80}
                    />
                  </figure>
                  <Image src={IconQuote} alt="quote icon" />
                </div>

                <div className={styles.modalcontent}>
                  <h4 className={`${styles.h3} ${styles.modaltitle}`}>
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

                  <div className={styles.modaltext}>
                    <p>{selectedTestimonial.text}</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          <section className={styles.clients}>
            <h3 className={`${styles.h3} ${styles.clientstitle}`}>Clients</h3>

            <ul className={`${styles.clientslist} ${styles.hasscrollbar}`}>
              <li className={styles.clientsitem}>
                <Link href="https://viceversa-atelier.com" target="_blank">
                  <Image
                    src={ViceVersaLogo}
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              </li>

              <li className={styles.clientsitem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={300} height={200} />
                </a>
              </li>

              <li className={styles.clientsitem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsitem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsitem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>

              <li className={styles.clientsitem}>
                <a href="#">
                  <Image src={Logo} alt="logo" width={200} height={200} />
                </a>
              </li>
            </ul>
          </section>
        </article>

        <article
          className={`${styles.resume} ${styles.article}`}
          data-page="skills"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articletitle}`}>My Skills</h2>
          </header>
          <section className={styles.skill}>
            {/* <h3 className={`${styles.h3} ${styles.skillstitle}`}>My Skills</h3> */}

            <ul className={`${styles.skillslist} ${styles.contentcard}`}>
              {skills.map((category) => (
                <React.Fragment key={category.category}>
                  <li className={styles.skillscategory}>{category.category}</li>

                  {category.items.map((skill) => (
                    <li key={skill.name} className={styles.skillsitem}>
                      <div className={styles.titlewrapper}>
                        <h5 className={styles.h5}>{skill.name}</h5>
                        <data value={skill.value}>{skill.value}%</data>
                        {skill.note && (
                          <div className={styles.skillnote}>
                            <small>{skill.note}</small>
                          </div>
                        )}
                      </div>

                      <div className={styles.skillsprogressbg}>
                        <div
                          className={styles.skillsprogressfill}
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
            <h2 className={`${styles.h2} ${styles.articletitle}`}>Portfolio</h2>
          </header>

          <section className={styles.projects}>
            <ul className={styles.filterlist}>
              <li className={styles.filteritem}>
                <button className={styles.active} data-filter-btn>
                  All
                </button>
              </li>
              <li className={styles.filteritem}>
                <button data-filter-btn>Web Design</button>
              </li>
              <li className={styles.filteritem}>
                <button data-filter-btn>Applications</button>
              </li>
              <li className={styles.filteritem}>
                <button data-filter-btn>Web Development</button>
              </li>
              <li className={styles.filteritem}>
                <button data-filter-btn>Business Card</button>
              </li>
            </ul>

            <div className={styles.filterselectbox}>
              <button className={styles.filterselect} data-select>
                <div className={styles.selectvalue} data-select-value>
                  Select Category
                </div>

                <div className={styles.selecticon}>
                  <ion-icon name="chevron-down"></ion-icon>
                </div>
              </button>

              <ul className={styles.selectlist}>
                <li className={styles.selectitem}>
                  <button data-select-item>All</button>
                </li>
                <li className={styles.selectitem}>
                  <button data-select-item>Web Design</button>
                </li>
                <li className={styles.selectitem}>
                  <button data-select-item>Applications</button>
                </li>
                <li className={styles.selectitem}>
                  <button data-select-item>Web Development</button>
                </li>
                <li className={styles.selectitem}>
                  <button data-select-item>Business Card</button>
                </li>
              </ul>
            </div>

            <ul className={styles.projectlist}>
              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web development"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="finance" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Finance</h3>
                  <p className={styles.projectcategory}>Web Development</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web development"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="orizon" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Orizon</h3>
                  <p className={styles.projectcategory}>Web Development</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web design"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="fundo" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Fundo</h3>
                  <p className={styles.projectcategory}>Web Design</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="applications"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="brawlhalla" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Brawlhalla</h3>
                  <p className={styles.projectcategory}>Applications</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web design"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="dsm." loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>DSM.</h3>
                  <p className={styles.projectcategory}>Web Design</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web design"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="metaspark" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Metaspark</h3>
                  <p className={styles.projectcategory}>Web Design</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web development"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="summary" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Summary</h3>
                  <p className={styles.projectcategory}>Web Development</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="applications"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image
                      src={TestProject}
                      alt="task manager"
                      loading="lazy"
                    />
                  </figure>

                  <h3 className={styles.projecttitle}>Task Manager</h3>
                  <p className={styles.projectcategory}>Applications</p>
                </a>
              </li>

              <li
                className={`${styles.projectitem} ${styles.active}`}
                data-filter-item
                data-category="web development"
              >
                <a href="#">
                  <figure className={styles.projectimg}>
                    <div className={styles.projectitemiconbox}>
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>

                    <Image src={TestProject} alt="arrival" loading="lazy" />
                  </figure>

                  <h3 className={styles.projecttitle}>Arrival</h3>
                  <p className={styles.projectcategory}>Web Development</p>
                </a>
              </li>
            </ul>
          </section>
        </article>

        <article
          className={`${styles.contact} ${styles.article}`}
          data-page="contact"
        >
          <header>
            <h2 className={`${styles.h2} ${styles.articletitle}`}>Contact</h2>
          </header>

          <section className={styles.mapbox} data-mapbox>
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

          <section className={styles.contactform}>
            <h3 className={`${styles.h3} ${styles.formtitle}`}>Contact Form</h3>

            <form onSubmit={handleSubmit} className={styles.form} data-form>
              <div className={styles.inputwrapper}>
                <input
                  type="text"
                  name="fullname"
                  className={styles.forminput}
                  placeholder="Full name"
                  required
                  data-form-input
                />
                <input
                  type="email"
                  name="email"
                  className={styles.forminput}
                  placeholder="Email Address"
                  required
                  data-form-input
                />
              </div>

              <textarea
                name="message"
                className={styles.forminput}
                placeholder="Your Message"
                required
                data-form-input=""
              ></textarea>

              <button
                className={styles.formbtn}
                type="submit"
                disabled
                data-form-btn
              >
                <ion-icon name="paper-plane"></ion-icon>
                <span>Send Message</span>
              </button>
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}
