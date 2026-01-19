"use client";

import { useState } from "react";
import styles from "@/styles/components/drawForm.module.css";
import { createClient } from "@supabase/supabase-js";

// Init Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DrawForm({ showRules }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    sector: "",
    email: "",
    phone: "",
    hasWebsite: "",
    websiteUrl: "",
    websiteSatisfaction: "",
    mainGoal: "",
    rulesAccepted: false,
    consent: false,
  });
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // ✅ Supprimer l’erreur dès qu’on modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Merci de renseigner votre nom.";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Merci de renseigner votre prénom.";
    }
    if (!formData.company.trim()) {
      newErrors.compagny = "Merci de renseigner votre nom de société";
    }

    if (!formData.email) {
      newErrors.email = "Merci d’entrer une adresse email valide.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Merci d’entrer une adresse email valide.";
    }

    if (!formData.phone) {
      newErrors.phone = "Merci d’entrer un numéro de téléphone valide.";
    } else if (formData.phone.length < 8) {
      newErrors.phone = "Merci d’entrer un numéro de téléphone valide.";
    }

    // ❌ S'il y a des erreurs → on bloque
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ OK → on nettoie les erreurs et on passe à l’étape 2
    setErrors({});
    setStep(2);
  };

  const handleBack = () => setStep(step - 1);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.hasWebsite) {
      newErrors.hasWebsite = "Merci d’indiquer si vous avez déjà un site web.";
    }

    if (formData.hasWebsite === "oui") {
      if (!formData.websiteUrl) {
        newErrors.websiteUrl = "Merci d’indiquer l’URL de votre site web.";
      } else if (!isValidUrl(formData.websiteUrl)) {
        newErrors.websiteUrl =
          "L’URL du site web n’est pas valide (https://...).";
      }
    }
    if (!formData.websiteSatisfaction) {
      newErrors.websiteSatisfaction =
        "Merci d’indiquer votre niveau de satisfaction.";
    }

    if (!formData.mainGoal) {
      newErrors.mainGoal = "Merci de sélectionner votre objectif principal.";
    }

    if (!formData.rulesAccepted) {
      newErrors.rulesAccepted =
        "Vous devez accepter le règlement pour participer.";
    }

    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter les conditions pour participer.";
    }

    // ❌ S'il y a des erreurs → on affiche et on bloque
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Aucune erreur
    setSuccess(true);
    setErrors({});

    try {
      const res = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Erreur serveur");

      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        sector: "",
        email: "",
        phone: "",
        hasWebsite: "",
        websiteUrl: "",
        websiteSatisfaction: "",
        mainGoal: "",
        rulesAccepted: false,
        consent: false,
      });

      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Participez au grand tirage au sort !</h2>
        <p className={styles.subtitle}>
          Remplissez le formulaire ci-dessous pour tenter de gagner un site web
          clé en main.
        </p>{" "}
      </div>
      {/* --- Indicateur d'étape --- */}
      <form className={styles.drawForm} onSubmit={handleSubmit} id="form">
        {/* --- Partie 1 --- */}
        {step === 1 && (
          <div className={styles.step}>
            <div className={styles.infos}>
              <h2>Informations personnelles</h2>
              <p className={styles.stepIndicator}>{step} / 2</p>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  Nom*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? styles.inputError : styles.input}
                  required
                />
                {errors.lastName && (
                  <p className={styles.error}>{errors.lastName}</p>
                )}
              </div>
              <div className={styles.field}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  Prénom*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={
                    errors.firstName ? styles.inputError : styles.input
                  }
                  required
                />
                {errors.firstName && (
                  <p className={styles.error}>{errors.firstName}</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  Nom de la société*
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={errors.compagny ? styles.inputError : styles.input}
                />
                {errors.compagny && (
                  <p className={styles.error}>{errors.compagny}</p>
                )}
              </div>
              <div className={styles.field}>
                <label>Secteur d'activité</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.inputError : styles.input}
                  required
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
              <div className={styles.field}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  Téléphone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.inputError : styles.input}
                  required
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className={styles.nextBtn}
            >
              Suivant
            </button>
            <button
              type="button"
              className={styles.rulesLink}
              onClick={showRules}
            >
              Règlement du tirage au sort
            </button>
          </div>
        )}

        {/* --- Partie 2 --- */}
        {step === 2 && (
          <div className={styles.step}>
            <div className={styles.infos}>
              <h2>Votre entreprise et vos objectifs</h2>
              <p className={styles.stepIndicator}>{step} / 2</p>
            </div>
            {/* Récap partie 1 */}
            <div className={styles.recap}>
              <ul className={styles.recapInfos}>
                <li className={styles.recapRow}>
                  <p>
                    <strong>Nom :</strong> {formData.lastName}
                  </p>
                  <p>
                    <strong>Prénom :</strong> {formData.firstName}
                  </p>
                </li>

                <li className={styles.recapRow}>
                  <p>
                    <strong>Entreprise :</strong> {formData.company}
                  </p>
                  <p>
                    <strong>Secteur :</strong> {formData.sector || "-"}
                  </p>
                </li>

                <li className={styles.recapRow}>
                  <p>
                    <strong>Email :</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {formData.phone}
                  </p>
                </li>
              </ul>
            </div>

            <div className={styles.stepRow}>
              <label
                className={errors.lastName ? styles.labelError : styles.label}
              >
                Avez-vous déjà un site web ?
              </label>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={formData.hasWebsite === "oui" ? styles.active : ""}
                  onClick={() => {
                    setFormData({ ...formData, hasWebsite: "oui" });
                    setErrors((prev) => ({ ...prev, hasWebsite: undefined }));
                  }}
                >
                  Oui
                </button>
                <button
                  type="button"
                  className={formData.hasWebsite === "non" ? styles.active : ""}
                  onClick={() => {
                    setFormData({ ...formData, hasWebsite: "non" });
                    setErrors((prev) => ({ ...prev, hasWebsite: undefined }));
                  }}
                >
                  Non
                </button>
              </div>
              {errors.hasWebsite && (
                <p className={styles.error}>{errors.hasWebsite}</p>
              )}
            </div>

            {formData.hasWebsite === "oui" && (
              <div className={styles.stepRow}>
                <label
                  className={errors.lastName ? styles.labelError : styles.label}
                >
                  URL de votre site web
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://exemple.com"
                  className={
                    errors.websiteUrl ? styles.inputError : styles.input
                  }
                />
                {errors.websiteUrl && (
                  <p className={styles.error}>{errors.websiteUrl}</p>
                )}
              </div>
            )}

            <div className={styles.stepRow}>
              <label
                className={errors.lastName ? styles.labelError : styles.label}
              >
                Êtes-vous satisfait de votre site web ?
              </label>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={
                    formData.websiteSatisfaction === "oui" ? styles.active : ""
                  }
                  onClick={() => {
                    setFormData({ ...formData, websiteSatisfaction: "oui" });
                    setErrors((prev) => ({
                      ...prev,
                      websiteSatisfaction: undefined,
                    }));
                  }}
                >
                  Oui
                </button>
                <button
                  type="button"
                  className={
                    formData.websiteSatisfaction === "non" ? styles.active : ""
                  }
                  onClick={() => {
                    setFormData({ ...formData, websiteSatisfaction: "non" });
                    setErrors((prev) => ({
                      ...prev,
                      websiteSatisfaction: undefined,
                    }));
                  }}
                >
                  Non
                </button>
              </div>
              {errors.websiteSatisfaction && (
                <p className={styles.error}>{errors.websiteSatisfaction}</p>
              )}
            </div>

            <div className={styles.stepRow}>
              <label
                className={errors.lastName ? styles.labelError : styles.label}
              >
                Quel est votre objectif principal ?
              </label>
              <select
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleChange}
                className={errors.mainGoal ? styles.inputError : styles.input}
              >
                <option value="">Sélectionnez</option>
                <option value="augmenter le chiffre d'affaires">
                  Augmenter le chiffre d'affaires
                </option>
                <option value="Aquerir plus de clients">
                  Acquérir plus de clients
                </option>
                <option value="Ameliorer la visibilite">
                  Améliorer la visibilité
                </option>
                <option value="autre">Autre</option>
              </select>
              {errors.mainGoal && (
                <p className={styles.error}>{errors.mainGoal}</p>
              )}
            </div>
            <div className={styles.checkboxRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rulesAccepted"
                  checked={formData.rulesAccepted}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  J’ai pris connaissance et j’accepte le{" "}
                  <button
                    type="button"
                    className={styles.rulesLink}
                    onClick={showRules}
                  >
                    règlement du tirage au sort
                  </button>
                </span>
              </label>
              {errors.rulesAccepted && (
                <p className={styles.error}>{errors.rulesAccepted}</p>
              )}
            </div>

            {/* <div className={styles.row}>
              <label>
                <input
                  type="checkbox"
                  name="rulesAccepted"
                  checked={formData.rulesAccepted}
                  onChange={handleChange}
                />
                Je veux participer au tirage au sort
              </label>
            </div> */}

            <div className={styles.checkboxRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                J’accepte que mes données soient utilisées pour être
                recontacté(e)
              </label>
              {errors.consent && (
                <p className={styles.error}>{errors.consent}</p>
              )}
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.backBtn}
              >
                Retour
              </button>
              <button type="submit" className={styles.submitBtn}>
                Envoyer
              </button>
            </div>
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            🎉 Merci ! Votre participation au tirage au sort est bien
            enregistrée.
            <br />
            Les gagnants seront contactés prochainement.
          </div>
        )}
      </form>
    </section>
  );
}
