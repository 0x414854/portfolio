import * as React from "react";

export default function EmailTemplateContact({ fullname, email, message }) {
  const now = new Date();
  const createdAt = now.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "100vw",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#333",
        // justifyContent: "flex-start",
        // alignItems: "center",
        gap: "40px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Nouveau message de{" "}
        <span style={{ color: "rgb(20, 20, 210)" }}>{fullname}</span>
      </h3>
      <div
        style={{
          border: "1px solid rgb(20, 20, 210)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "90%",
          margin: "auto auto",
          padding: "20px",
          borderRadius: "16px",
          // background: "yellow",
        }}
      >
        <p>
          <strong>Email : </strong>
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
