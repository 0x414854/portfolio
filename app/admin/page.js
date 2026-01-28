"use client";

import { useState } from "react";
import styles from "@/styles/page/admin.module.css";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setAuthorized(true);
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const sendEmails = async () => {
    setLoading(true);
    setReport(null);

    const res = await fetch("/api/send-draw-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: password,
        mode: "test", // change to "prod" pour la prod
      }),
    });

    const data = await res.json();
    setReport(data);
    setLoading(false);
  };

  if (!authorized) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginContainer}>
          <h1>Admin Login</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.button}>
            Se connecter
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <div className={styles.dashboardContainer}>
        <h1>📊 Dashboard Campagne Email</h1>

        <button
          onClick={sendEmails}
          disabled={loading}
          className={styles.sendButton}
        >
          {loading ? "Envoi en cours..." : "Lancer la campagne (TEST)"}
        </button>

        {report && (
          <>
            <div className={styles.cardsContainer}>
              <Card title="Mode" value={report.mode} />
              <Card title="Total" value={report.total} />
              <Card title="Envoyés" value={report.sent} color="green" />
              <Card title="Erreurs" value={report.failed} color="red" />
              <Card title="Durée" value={report.duration} />
            </div>

            <h2>Détail des envois</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Resend ID</th>
                    <th>Erreur</th>
                  </tr>
                </thead>
                <tbody>
                  {report.details.map((item, index) => (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td
                        className={
                          item.status === "sent"
                            ? styles.statusSent
                            : styles.statusFailed
                        }
                      >
                        {item.status}
                      </td>
                      <td>{item.resendId || "-"}</td>
                      <td>{item.error || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// ----------------------
// Card Component
const Card = ({ title, value, color }) => (
  <div className={styles.card}>
    <h4>{title}</h4>
    <p style={{ color: color || "#333" }}>{value}</p>
  </div>
);
