import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "@/styles/page/mentions-legales.module.css";

const entreprise = {
  nomCommercial: "Simplitech",
  nomResponsable: "Arthur BARRAUD",
  statut: "Entrepreneur individuel (micro-entreprise)",
  adresse: "18 rue des bergers 01220 Gex, France",
  siren: "992966879",
  siret: "99296687900015",
  tva: null,
  email: "arthur.barraud@proton.me",
  telephone: "+61411480676",
  directeurPublication: "Arthur Barraud- Simplitech",
  dateMiseAJour: "24 Octobre 2026",
};

const hebergeur = {
  nom: "Vercel Inc.",
  adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
  email: "privacy@vercel.com",
  telephone: "Non fournis",
};

export async function generateMetadata() {
  const t = await getTranslations("LegalNotices");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("LegalNotices");

  const sections = [
    {
      id: "editeur",
      numero: "01",
      titre: t("sections.publisher.title"),
      contenu: (
        <>
          <p>
            {t("sections.publisher.intro", {
              company: entreprise.nomCommercial,
            })}
          </p>

          <dl className={styles.details}>
            <div>
              <dt>{t("fields.fullName")}</dt>
              <dd>{entreprise.nomResponsable}</dd>
            </div>
            <div>
              <dt>{t("fields.tradeName")}</dt>
              <dd>{entreprise.nomCommercial}</dd>
            </div>
            <div>
              <dt>{t("fields.legalStatus")}</dt>
              <dd>{entreprise.statut}</dd>
            </div>
            <div>
              <dt>{t("fields.businessAddress")}</dt>
              <dd>{entreprise.adresse}</dd>
            </div>
            <div>
              <dt>{t("fields.siren")}</dt>
              <dd>{entreprise.siren}</dd>
            </div>
            <div>
              <dt>{t("fields.siret")}</dt>
              <dd>{entreprise.siret}</dd>
            </div>
            {entreprise.tva && (
              <div>
                <dt>{t("fields.vatNumber")}</dt>
                <dd>{entreprise.tva}</dd>
              </div>
            )}
            <div>
              <dt>{t("fields.email")}</dt>
              <dd>
                <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.phone")}</dt>
              <dd>{entreprise.telephone}</dd>
            </div>
            <div>
              <dt>{t("fields.publicationDirector")}</dt>
              <dd>{entreprise.directeurPublication}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "hebergement",
      numero: "02",
      titre: t("sections.hosting.title"),
      contenu: (
        <>
          <p>{t("sections.hosting.intro")}</p>

          <dl className={styles.details}>
            <div>
              <dt>{t("fields.host")}</dt>
              <dd>{hebergeur.nom}</dd>
            </div>
            <div>
              <dt>{t("fields.address")}</dt>
              <dd>{hebergeur.adresse}</dd>
            </div>
            <div>
              <dt>{t("fields.website")}</dt>
              <dd>
                <a
                  href={hebergeur.site}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hebergeur.site}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.contact")}</dt>
              <dd>
                <a href={`mailto:${hebergeur.email}`}>{hebergeur.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t("fields.phone")}</dt>
              <dd>{hebergeur.telephone}</dd>
            </div>
          </dl>
        </>
      ),
    },
    {
      id: "objet",
      numero: "03",
      titre: t("sections.purpose.title"),
      contenu: <p>{t("sections.purpose.content")}</p>,
    },
    {
      id: "propriete",
      numero: "04",
      titre: t("sections.intellectualProperty.title"),
      contenu: (
        <>
          <p>{t("sections.intellectualProperty.paragraph1")}</p>
          <p>{t("sections.intellectualProperty.paragraph2")}</p>
        </>
      ),
    },
    {
      id: "responsabilite",
      numero: "05",
      titre: t("sections.liability.title"),
      contenu: <p>{t("sections.liability.content")}</p>,
    },
    {
      id: "liens",
      numero: "06",
      titre: t("sections.externalLinks.title"),
      contenu: <p>{t("sections.externalLinks.content")}</p>,
    },
    {
      id: "donnees",
      numero: "07",
      titre: t("sections.personalData.title"),
      contenu: (
        <>
          <p>{t("sections.personalData.paragraph1")}</p>
          <p>{t("sections.personalData.paragraph2")}</p>
          <p>
            <Link
              href="/politique-de-confidentialite"
              className={styles.inlineLink}
            >
              {t("sections.personalData.privacyLink")}
            </Link>
          </p>
          <p>
            {t("sections.personalData.contactIntro")}{" "}
            <a href={`mailto:${entreprise.email}`}>{entreprise.email}</a>.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      numero: "08",
      titre: t("sections.cookies.title"),
      contenu: <p>{t("sections.cookies.content")}</p>,
    },
    {
      id: "droit",
      numero: "09",
      titre: t("sections.applicableLaw.title"),
      contenu: <p>{t("sections.applicableLaw.content")}</p>,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {t("hero.eyebrow")}
            </span>

            <span className={styles.documentType}>DOCUMENT JURIDIQUE</span>
          </div>

          <div className={styles.heroContent}>
            <p className={styles.heroIndex}>INFORMATIONS &amp; TRANSPARENCE</p>

            <h1>
              {t("hero.title")}
              <span>{t("hero.titleAccent")}</span>
            </h1>

            <p className={styles.intro}>
              {t("hero.intro", {
                company: entreprise.nomCommercial,
              })}
            </p>
          </div>

          <div className={styles.heroBottom}>
            <span className={styles.updatedLabel}>DERNIÈRE MISE À JOUR</span>
            <span className={styles.updated}>
              {t("hero.updated", {
                date: entreprise.dateMiseAJour,
              })}
            </span>
          </div>
        </header>

        <div className={styles.documentLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <p className={styles.tocLabel}>{t("navigation.tocTitle")}</p>

              <nav
                className={styles.toc}
                aria-label={t("navigation.tocAriaLabel")}
              >
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>
                        <span className={styles.tocNumber}>
                          {section.numero}
                        </span>
                        <span className={styles.tocText}>{section.titre}</span>
                        {/* <span className={styles.tocArrow} aria-hidden="true">
                          ↗
                        </span> */}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className={styles.sidebarNote}>
                <span className={styles.noteLine} />
                <p>
                  Une information juridique claire, accessible et transparente.
                </p>
              </div>
            </div>
          </aside>

          <div className={styles.sections}>
            {sections.map((section) => (
              <section
                className={styles.section}
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>{section.numero}</span>

                  <span className={styles.sectionCategory}>
                    MENTIONS LÉGALES
                  </span>

                  <span className={styles.sectionRule} />
                </div>

                <div className={styles.sectionContent}>
                  <h2 id={`${section.id}-title`}>{section.titre}</h2>

                  <div className={styles.prose}>{section.contenu}</div>
                </div>
              </section>
            ))}

            <footer className={styles.footer}>
              <div className={styles.footerContent}>
                <span className={styles.footerEyebrow}>UNE QUESTION ?</span>

                <p>{t("footer.question")}</p>
              </div>

              <Link href="/horaire-et-contact" className={styles.contactLink}>
                {t("footer.contactLink", {
                  company: entreprise.nomCommercial,
                })}
                {/* <span aria-hidden="true">↗</span> */}
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
