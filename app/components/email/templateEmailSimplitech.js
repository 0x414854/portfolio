import * as React from "react";

/* ========================================
   CONFIGURATION
======================================== */

const COLORS = {
  background: "#f4f2ed",
  surface: "#ffffff",
  text: "#242321",
  muted: "#706e68",
  border: "#e5e1d8",
  gold: "#c5a052",
  goldLight: "#f8f2e5",
  footer: "#f9f8f5",
};

const FONT = "Arial, Helvetica, sans-serif";

const SERVICE_LABELS = {
  Web: "Développement web",
  Software: "Développement logiciel",
  Consulting: "Conseil et accompagnement",
  Other: "Autre besoin",
};

const BUDGET_LABELS = {
  "": "À discuter",
  "under-1000": "Moins de 1 000 €",
  "1000-5000": "1 000 € – 5 000 €",
  "5000-10000": "5 000 € – 10 000 €",
  "over-10000": "Plus de 10 000 €",
};

const TIMELINE_LABELS = {
  "": "À définir",
  Urgent: "Dès que possible",
  Month: "Dans le mois",
  Quarter: "Dans les 3 mois",
  Flexible: "Flexible",
};

function formatDate(sentAt) {
  const date = sentAt ? new Date(sentAt) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "Date indisponible";
  }

  return date.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "short",
  });
}

/* ========================================
   COMPOSANT COMMUN
======================================== */

function EmailTemplateBase({
  fullname,
  name,
  email,
  phone = "",
  service = "",
  budget = "",
  timeline = "",
  message,
  sentAt,
  backupEmail,
  showBackupNotice = false,
}) {
  const clientName = fullname || name || "Client";
  const createdAt = formatDate(sentAt);

  const serviceLabel = SERVICE_LABELS[service] || service || "Non renseigné";

  const budgetLabel = Object.prototype.hasOwnProperty.call(
    BUDGET_LABELS,
    budget,
  )
    ? BUDGET_LABELS[budget]
    : budget || "Non renseigné";

  const timelineLabel = Object.prototype.hasOwnProperty.call(
    TIMELINE_LABELS,
    timeline,
  )
    ? TIMELINE_LABELS[timeline]
    : timeline || "Non renseigné";

  const details = [
    { label: "Nom complet", value: clientName },
    { label: "Adresse e-mail", value: email },
    { label: "Téléphone", value: phone || "Non renseigné" },
    { label: "Service souhaité", value: serviceLabel },
    { label: "Budget estimé", value: budgetLabel },
    { label: "Délai souhaité", value: timelineLabel },
  ];

  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nouvelle demande de contact — Simplitech</title>
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: COLORS.background,
          color: COLORS.text,
          fontFamily: FONT,
          WebkitTextSizeAdjust: "100%",
        }}
      >
        {/* Fond extérieur */}
        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border="0"
          style={{
            width: "100%",
            backgroundColor: COLORS.background,
          }}
        >
          <tbody>
            <tr>
              <td
                align="center"
                style={{
                  padding: "24px 12px",
                }}
              >
                {/* Conteneur principal responsive */}
                <table
                  role="presentation"
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  border="0"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    {/* En-tête */}
                    <tr>
                      <td
                        style={{
                          padding: "28px 20px",
                          backgroundColor: "#171613",
                          borderBottom: `3px solid ${COLORS.gold}`,
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 8px",
                            color: COLORS.gold,
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                          }}
                        >
                          SIMPLITECH
                        </p>

                        <h1
                          style={{
                            margin: 0,
                            color: "#ffffff",
                            fontSize: "23px",
                            lineHeight: 1.4,
                            fontWeight: "700",
                          }}
                        >
                          Nouvelle demande de contact
                        </h1>

                        <p
                          style={{
                            margin: "10px 0 0",
                            color: "#d0cec8",
                            fontSize: "14px",
                            lineHeight: 1.6,
                          }}
                        >
                          Vous avez reçu une nouvelle demande depuis votre site
                          web.
                        </p>
                      </td>
                    </tr>

                    {/* Contenu */}
                    <tr>
                      <td
                        style={{
                          padding: "24px 20px",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 20px",
                            fontSize: "15px",
                            lineHeight: 1.7,
                          }}
                        >
                          Nouvelle demande de{" "}
                          <strong style={{ color: COLORS.gold }}>
                            {clientName}
                          </strong>
                          .
                        </p>

                        {/* Informations client */}
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "8px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                colSpan="2"
                                style={{
                                  padding: "14px 14px",
                                  backgroundColor: COLORS.goldLight,
                                  borderBottom: `1px solid ${COLORS.border}`,
                                }}
                              >
                                <h2
                                  style={{
                                    margin: 0,
                                    fontSize: "15px",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  Informations du client
                                </h2>
                              </td>
                            </tr>

                            {details.map((item, index) => (
                              <tr key={item.label}>
                                <td
                                  width="38%"
                                  valign="top"
                                  style={{
                                    width: "38%",
                                    padding: "12px 10px 12px 14px",
                                    borderBottom:
                                      index === details.length - 1
                                        ? "none"
                                        : `1px solid ${COLORS.border}`,
                                    color: COLORS.muted,
                                    fontSize: "13px",
                                    lineHeight: 1.6,
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  {item.label}
                                </td>

                                <td
                                  valign="top"
                                  style={{
                                    padding: "12px 14px 12px 8px",
                                    borderBottom:
                                      index === details.length - 1
                                        ? "none"
                                        : `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    fontSize: "13px",
                                    lineHeight: 1.6,
                                    fontWeight: "600",
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  {item.label === "Adresse e-mail" ? (
                                    <a
                                      href={`mailto:${email}`}
                                      style={{
                                        color: COLORS.text,
                                        textDecoration: "underline",
                                        overflowWrap: "anywhere",
                                      }}
                                    >
                                      {item.value}
                                    </a>
                                  ) : (
                                    item.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Message du client */}
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            marginTop: "20px",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "8px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "14px",
                                  backgroundColor: COLORS.goldLight,
                                  borderBottom: `1px solid ${COLORS.border}`,
                                }}
                              >
                                <h2
                                  style={{
                                    margin: 0,
                                    fontSize: "15px",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  Message du client
                                </h2>
                              </td>
                            </tr>

                            <tr>
                              <td
                                style={{
                                  padding: "16px 14px",
                                  fontSize: "14px",
                                  lineHeight: 1.8,
                                  color: COLORS.text,
                                  whiteSpace: "pre-wrap",
                                  overflowWrap: "anywhere",
                                  wordBreak: "break-word",
                                }}
                              >
                                {message || "Aucun message renseigné."}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Note réservée à l'email principal */}
                        {showBackupNotice && backupEmail && (
                          <table
                            role="presentation"
                            width="100%"
                            cellPadding="0"
                            cellSpacing="0"
                            border="0"
                            style={{
                              width: "100%",
                              marginTop: "20px",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    padding: "14px",
                                    backgroundColor: COLORS.goldLight,
                                    border: `1px solid ${COLORS.gold}`,
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    lineHeight: 1.7,
                                    overflowWrap: "anywhere",
                                  }}
                                >
                                  <strong>Copie de sauvegarde</strong>
                                  <br />
                                  Une copie de cette demande a été envoyée à{" "}
                                  <a
                                    href={`mailto:${backupEmail}`}
                                    style={{
                                      color: COLORS.text,
                                      fontWeight: "700",
                                      textDecoration: "underline",
                                      overflowWrap: "anywhere",
                                    }}
                                  >
                                    {backupEmail}
                                  </a>
                                  .
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}

                        {/* Date d'envoi */}
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border="0"
                          style={{
                            width: "100%",
                            marginTop: "24px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  padding: "14px 10px",
                                  backgroundColor: COLORS.footer,
                                  borderRadius: "8px",
                                  color: COLORS.muted,
                                  fontSize: "12px",
                                  lineHeight: 1.7,
                                }}
                              >
                                Message envoyé le
                                <br />
                                <strong
                                  style={{
                                    color: COLORS.text,
                                    fontSize: "14px",
                                  }}
                                >
                                  {createdAt}
                                </strong>
                                <br />
                                <span>Heure de Paris — Europe/Paris</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Pied de page */}
                    <tr>
                      <td
                        align="center"
                        style={{
                          padding: "20px",
                          borderTop: `1px solid ${COLORS.border}`,
                          color: COLORS.muted,
                          fontSize: "11px",
                          lineHeight: 1.7,
                        }}
                      >
                        <p style={{ margin: "0 0 5px" }}>
                          Notification automatique du formulaire de contact
                          Simplitech.
                        </p>

                        <p style={{ margin: 0 }}>
                          Merci de ne pas répondre directement à cet e-mail
                          automatique.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p
                  style={{
                    margin: "16px 0 0",
                    color: COLORS.muted,
                    fontSize: "11px",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  Simplitech — Notification de contact
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

/* ========================================
   TEMPLATE 1 : EMAIL PRINCIPAL
   Inclut la note concernant le backup
======================================== */

export function EmailTemplateContact(props) {
  return <EmailTemplateBase {...props} showBackupNotice={true} />;
}

/* ========================================
   TEMPLATE 2 : EMAIL DE BACKUP
   Même design, sans la note de backup
======================================== */

export function EmailTemplateContactBackup(props) {
  return <EmailTemplateBase {...props} showBackupNotice={false} />;
}

export default EmailTemplateContact;
