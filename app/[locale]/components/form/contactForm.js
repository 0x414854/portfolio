"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/components/form/contactForm.module.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

export default function ContactForm({
  privacyUrl = "/politique-de-confidentialite",
}) {
  const t = useTranslations("Contact.form");

  const services = [
    {
      key: "web",
      options: ["refonte", "essentiel", "croissance", "business"],
    },
    {
      key: "automation",
      options: ["simple", "simple", "simple"],
    },
    {
      key: "maintenance",
      options: ["essentiel", "evolution", "premium"],
    },
    {
      key: "consulting",
      options: ["refonte"],
    },
    {
      key: "other",
      options: ["other"],
    },
  ];

  const [form, setForm] = useState(initialForm);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          consent,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setForm(initialForm);
      setConsent(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status !== "success" && status !== "error") return;

    const timeout = setTimeout(() => {
      setStatus("idle");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-busy={status === "loading"}
      id="form"
    >
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="name">{t("fields.name.label")}</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("fields.name.placeholder")}
            value={form.name}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">{t("fields.email.label")}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("fields.email.placeholder")}
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">{t("fields.phone.label")}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("fields.phone.placeholder")}
            value={form.phone}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="service">{t("fields.service.label")}</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {t("fields.service.placeholder")}
            </option>

            {services.map((group, i) => (
              <optgroup
                key={`${group.key}-${i}`}
                label={t(`services.${group.key}.label`)}
              >
                {group.options.map((option, j) => (
                  <option
                    key={`${group.key}-${option}-${j}`}
                    value={t(`services.${group.key}.options.${option}.value`)}
                  >
                    {t(`services.${group.key}.options.${option}.label`)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="budget">{t("fields.budget.label")}</label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          >
            <option value="">{t("fields.budget.options.discuss")}</option>
            <option value="under-1000">
              {t("fields.budget.options.under1000")}
            </option>
            <option value="1000-5000">
              {t("fields.budget.options.1000to5000")}
            </option>
            <option value="5000-10000">
              {t("fields.budget.options.5000to10000")}
            </option>
            <option value="over-10000">
              {t("fields.budget.options.over10000")}
            </option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="timeline">{t("fields.timeline.label")}</label>
          <select
            id="timeline"
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
          >
            <option value="">{t("fields.timeline.options.define")}</option>
            <option value="Urgent">
              {t("fields.timeline.options.urgent")}
            </option>
            <option value="Month">{t("fields.timeline.options.month")}</option>
            <option value="Quarter">
              {t("fields.timeline.options.quarter")}
            </option>
            <option value="Flexible">
              {t("fields.timeline.options.flexible")}
            </option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">{t("fields.message.label")}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          placeholder={t("fields.message.placeholder")}
          onChange={handleChange}
          minLength={10}
          maxLength={5000}
          required
        />
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">{t("fields.website.label")}</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div className={styles.consentGroup}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
          />

          <span>
            {t.rich("consentText", {
              privacyLink: (chunks) => (
                <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
            })}
          </span>
        </label>
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? t("submit.loading") : t("submit.label")}
      </button>

      {status === "success" && (
        <div
          className={`${styles.statusToast} ${styles.statusToastSuccess}`}
          role="status"
          aria-live="polite"
        >
          <span>{t("status.success")}</span>
        </div>
      )}

      {status === "error" && (
        <p className={`${styles.status} ${styles.statusError}`} role="alert">
          {t("status.error")}
        </p>
      )}

      <p className={styles.required}>{t("requiredNote")}</p>
    </form>
  );
}
