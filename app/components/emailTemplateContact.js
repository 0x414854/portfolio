import * as React from "react";

export default function EmailTemplateContact(fullname, email, message) {
  const createdAt = now.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "short",
  });
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#333",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Nouveau message de <span style={{ color: "darkblue" }}>{fullname}</span>
      </h3>
      <p>
        <strong>Email :</strong>
        <a
          href={`mailto:${email}`}
          style={{ color: "#000", textDecoration: "underline" }}
        >
          {email}
        </a>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <strong>Message :</strong>

        <p>{message}</p>
      </div>
      <p
        style={{
          fontSize: "0.85em",
          color: "#666",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Message envoyé le : {createdAt}
      </p>
    </div>
  );
}
