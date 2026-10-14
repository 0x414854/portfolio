import styles from "@/styles/page/horaire_et_contact.module.css";
import contact from "@/app/config/config";
import StarBackground from "../components/starBackground";
import ContactSchedule from "../components/contactSchedule";
import ContactForm from "../components/form/contactForm";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Horaires et contact | Simplitech",
  description:
    "Contactez Simplitech pour vos projets web, vos besoins numériques et vos demandes de renseignements.",
};

function toTelHref(value) {
  if (!value) return "";
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function ContactCard({ label, title, description, children }) {
  return (
    <section className={styles.card}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        {label}
      </p>
      <h2 className={styles.cardTitle}>{title}</h2>
      {description && <p className={styles.cardDescription}>{description}</p>}
      {children}
    </section>
  );
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  const phones = contact.phones.filter((phone) => phone.number);
  const socials = contact.socialLinks.filter((social) => social.href);

  const socialIcons = {
    LinkedIn: FaLinkedin,
    Instagram: FaInstagram,
    GitHub: FaGithub,
  };

  return (
    <main className={styles.page}>
      <StarBackground />

      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span className={styles.statusDot} />
            {t("hero.eyebrow")}
          </p>

          <h1 className={styles.heroTitle}>
            {t.rich("hero.title", {
              highlight: (chunks) => <span>{chunks}</span>,
            })}
          </h1>

          <p className={styles.heroDescription}>{t("hero.description")}</p>

          <a className={styles.primaryLink} href="#contact-form">
            {t("hero.cta")}
          </a>
        </header>

        <div className={styles.layout}>
          <div className={styles.details}>
            <ContactCard
              label={t("cards.email.label")}
              title={t("cards.email.title")}
              description={t("cards.email.description")}
            >
              {contact.email ? (
                <a
                  className={styles.contactLink}
                  href={`mailto:${contact.email}`}
                >
                  <span className={styles.linkIcon} aria-hidden="true">
                    @
                  </span>
                  <span className={styles.linkContent}>
                    <strong>{contact.email}</strong>
                    <small>{t("cards.email.linkLabel")}</small>
                  </span>
                </a>
              ) : (
                <p className={styles.mutedText}>
                  {t("cards.email.unavailable")}
                </p>
              )}
            </ContactCard>

            <ContactCard
              label={t("cards.phone.label")}
              title={t("cards.phone.title")}
              description={t("cards.phone.description")}
            >
              {phones.length > 0 ? (
                <ul className={styles.phoneList}>
                  {phones.map((phone) => (
                    <li key={phone.label}>
                      <span className={styles.phoneLabel}>{phone.label}</span>
                      <a
                        className={styles.contactLink}
                        href={toTelHref(phone.href || phone.number)}
                      >
                        <strong>{phone.number}</strong>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.mutedText}>
                  {t("cards.phone.unavailable")}
                </p>
              )}
            </ContactCard>

            <ContactCard
              label={t("cards.location.label")}
              title={`${contact.location.city}, ${contact.location.region}`}
              description={contact.location.country}
            >
              <p className={styles.locationTimezone}>
                {t("cards.location.timezoneLabel")}
                <br />
                <strong>{contact.location.timezone}</strong>
              </p>
            </ContactCard>

            <ContactCard
              label={t("cards.socials.label")}
              title={t("cards.socials.title")}
              description={t("cards.socials.description")}
            >
              {socials.length > 0 ? (
                <ul className={styles.socialList}>
                  {socials.map((social) => {
                    const SocialIcon = socialIcons[social.label];

                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("cards.socials.ariaLabel", {
                            label: social.label,
                          })}
                        >
                          <span>{social.label}</span>

                          {SocialIcon && (
                            <SocialIcon
                              className={styles.socialIcon}
                              aria-hidden="true"
                              focusable="false"
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={styles.mutedText}>
                  {t("cards.socials.unavailable")}
                </p>
              )}
            </ContactCard>

            <ContactSchedule
              localTimezone={contact.location.timezone}
              schedule={contact.schedule}
            />
          </div>

          <section
            className={styles.formSection}
            id="contact-form"
            aria-labelledby="contact-form-title"
          >
            <div className={styles.formIntro}>
              <p className={styles.eyebrow}>
                <span className={styles.statusDot} />
                {t("form.eyebrow")}
              </p>

              <h2 className={styles.formTitle} id="contact-form-title">
                {t("form.title")}
              </h2>

              <p className={styles.cardDescription}>{t("form.description")}</p>
            </div>

            <ContactForm />

            <p className={styles.privacyNote}>
              {t.rich("form.privacyNote", {
                privacyLink: (chunks) => (
                  <a href={contact.privacyUrl}>{chunks}</a>
                ),
              })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
