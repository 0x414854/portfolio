import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "@/styles/page/politique-de-confidentialite.module.css";

const confidentialite = {
  entreprise: "Simplitech",
  responsable: "Arthur BARRAUD - Simplitech",
  email: "arthur.barraud@proton.me",
  adresse: "18 rue des bergers 01220 Gex, France",
  dateMiseAJour: "24 Octobre 2026",
  destinatairesFormulaire:
    "Responsable de Simplitech et prestataire de messagerie utilisé pour recevoir les demandes",
  outilsAudience:
    "À compléter après vérification des outils d’analyse, de mesure d’audience et de suivi réellement installés sur le site.",
  dureeDemandes:
    "Le temps nécessaire au traitement de la demande et des échanges qui en découlent. Si la demande n’aboutit pas à une relation contractuelle, les données peuvent être conservées pendant une durée maximale de trois ans à compter de la collecte ou du dernier contact émanant du prospect, sauf obligation légale ou motif légitime justifiant une durée différente.",
};

export async function generateMetadata() {
  const t = await getTranslations("PrivacyPolicy");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function PolitiqueDeConfidentialitePage() {
  const t = await getTranslations("PrivacyPolicy");

  const sections = [
    {
      id: "responsable",
      numero: "01",
      titre: t("sections.controller.title"),
      contenu: (
        <>
          <p>
            {t("sections.controller.intro", {
              company: confidentialite.entreprise,
            })}
          </p>

          <dl className={styles.details}>
            <div>
              <dt>{t("fields.controller")}</dt>
              <dd>{confidentialite.responsable}</dd>
            </div>

            <div>
              <dt>{t("fields.address")}</dt>
              <dd>{confidentialite.adresse}</dd>
            </div>

            <div>
              <dt>{t("fields.dataContact")}</dt>
              <dd>
                <a href={`mailto:${confidentialite.email}`}>
                  {confidentialite.email}
                </a>
              </dd>
            </div>
          </dl>

          <p>
            {t("sections.controller.legalIntro")}{" "}
            <Link href="/mentions-legales" className={styles.inlineLink}>
              {t("sections.controller.legalLink")}
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "donnees",
      numero: "02",
      titre: t("sections.data.title"),
      contenu: (
        <>
          <p>{t("sections.data.intro")}</p>

          <ul>
            {["identity", "contact", "project", "exchanges", "technical"].map(
              (key) => (
                <li key={key}>
                  <strong>{t(`sections.data.items.${key}.label`)}</strong>{" "}
                  {t(`sections.data.items.${key}.text`)}
                </li>
              ),
            )}
          </ul>

          <p>{t("sections.data.warning")}</p>
        </>
      ),
    },
    {
      id: "finalites",
      numero: "03",
      titre: t("sections.purposes.title"),
      contenu: (
        <>
          <p>{t("sections.purposes.intro")}</p>

          <ul>
            {[
              "contact",
              "quote",
              "followUp",
              "contract",
              "security",
              "legal",
            ].map((key) => (
              <li key={key}>{t(`sections.purposes.items.${key}`)}</li>
            ))}
          </ul>

          <p>{t("sections.purposes.outro")}</p>
        </>
      ),
    },
    {
      id: "bases",
      numero: "04",
      titre: t("sections.legalBases.title"),
      contenu: (
        <>
          <p>{t("sections.legalBases.intro")}</p>

          <ul>
            {[
              "precontractual",
              "legitimateInterest",
              "legalObligation",
              "consent",
            ].map((key) => (
              <li key={key}>
                <strong>{t(`sections.legalBases.items.${key}.label`)}</strong>{" "}
                {t(`sections.legalBases.items.${key}.text`)}
              </li>
            ))}
          </ul>

          <p>{t("sections.legalBases.outro")}</p>
        </>
      ),
    },
    {
      id: "conservation",
      numero: "05",
      titre: t("sections.retention.title"),
      contenu: (
        <>
          <p>{t("sections.retention.intro")}</p>

          <dl className={styles.details}>
            <div>
              <dt>{t("sections.retention.contactTitle")}</dt>
              <dd>{confidentialite.dureeDemandes}</dd>
            </div>

            <div>
              <dt>{t("sections.retention.clientTitle")}</dt>
              <dd>{t("sections.retention.clientText")}</dd>
            </div>

            <div>
              <dt>{t("sections.retention.technicalTitle")}</dt>
              <dd>{t("sections.retention.technicalText")}</dd>
            </div>
          </dl>

          <p>{t("sections.retention.outro")}</p>
        </>
      ),
    },
    {
      id: "destinataires",
      numero: "06",
      titre: t("sections.recipients.title"),
      contenu: (
        <>
          <p>{t("sections.recipients.intro")}</p>

          <ul>
            {["company", "providers", "authorities"].map((key) => (
              <li key={key}>
                <strong>{t(`sections.recipients.items.${key}.label`)}</strong>{" "}
                {t(`sections.recipients.items.${key}.text`)}
              </li>
            ))}
          </ul>

          <p>{t("sections.recipients.outro")}</p>

          <p>
            <strong>{t("sections.recipients.confirmationLabel")}</strong>{" "}
            {confidentialite.destinatairesFormulaire}
          </p>
        </>
      ),
    },
    {
      id: "transferts",
      numero: "07",
      titre: t("sections.transfers.title"),
      contenu: (
        <>
          <p>{t("sections.transfers.paragraph1")}</p>
          <p>{t("sections.transfers.paragraph2")}</p>

          <p>
            {t("sections.transfers.paragraph3")}{" "}
            <Link href="/mentions-legales" className={styles.inlineLink}>
              {t("sections.transfers.legalLink")}
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "droits",
      numero: "08",
      titre: t("sections.rights.title"),
      contenu: (
        <>
          <p>{t("sections.rights.intro")}</p>

          <ul>
            {[
              "access",
              "rectification",
              "erasure",
              "restriction",
              "objection",
              "portability",
              "withdrawal",
            ].map((key) => (
              <li key={key}>{t(`sections.rights.items.${key}`)}</li>
            ))}
          </ul>

          <p>
            {t("sections.rights.contactIntro")}{" "}
            <a href={`mailto:${confidentialite.email}`}>
              {confidentialite.email}
            </a>{" "}
            {t("sections.rights.contactOutro")}
          </p>

          <p>{t("sections.rights.responseTime")}</p>

          <p>
            {t("sections.rights.complaintIntro")}{" "}
            <a
              href="https://www.cnil.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("sections.rights.cnilLink")}
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "securite",
      numero: "09",
      titre: t("sections.security.title"),
      contenu: <p>{t("sections.security.content")}</p>,
    },
    {
      id: "cookies",
      numero: "10",
      titre: t("sections.cookies.title"),
      contenu: (
        <>
          <p>{t("sections.cookies.paragraph1")}</p>
          <p>{t("sections.cookies.paragraph2")}</p>
          <p>{confidentialite.outilsAudience}</p>
          <p>{t("sections.cookies.paragraph3")}</p>
        </>
      ),
    },
    {
      id: "modifications",
      numero: "11",
      titre: t("sections.changes.title"),
      contenu: <p>{t("sections.changes.content")}</p>,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>

          <h1>
            {t("hero.title")} <span>{t("hero.titleAccent")}</span>
          </h1>

          <p className={styles.intro}>
            {t("hero.intro", { company: confidentialite.entreprise })}
          </p>

          <p className={styles.updated}>
            {t("hero.updated", { date: confidentialite.dateMiseAJour })}
          </p>
        </header>

        <div className={styles.documentLayout}>
          <aside className={styles.sidebar}>
            <nav
              className={styles.toc}
              aria-label={t("navigation.tocAriaLabel")}
            >
              <p className={styles.tocTitle}>{t("navigation.tocTitle")}</p>

              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span className={styles.tocNumber}>{section.numero}</span>
                      <span className={styles.tocText}>{section.titre}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className={styles.sections}>
            {sections.map((section) => (
              <section
                className={styles.card}
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <div className={styles.cardNumber} aria-hidden="true">
                  {section.numero}
                </div>

                <div className={styles.cardContent}>
                  <h2 id={`${section.id}-title`}>{section.titre}</h2>
                  <div className={styles.prose}>{section.contenu}</div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <div>
            <p className={styles.footerTitle}>{t("footer.title")}</p>
            <p className={styles.footerText}>{t("footer.text")}</p>
          </div>

          <Link href="/horaire-et-contact" className={styles.contactLink}>
            {t("footer.contactLink")}
          </Link>
        </footer>

        <p className={styles.legalLink}>
          {t("footer.legalIntro")}{" "}
          <Link href="/mentions-legales" className={styles.inlineLink}>
            {t("footer.legalLink")}
          </Link>
        </p>
      </div>
    </main>
  );
}
