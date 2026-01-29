"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/page/admin.module.css";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("test"); // mode par défaut
  const [pdfReports, setPdfReports] = useState([]);

  // Vérifie si admin_session existe au chargement
  useEffect(() => {
    const cookie = document.cookie.includes("admin_session=true");
    if (cookie) setAuthorized(true);
  }, []);

  // -------- LOGIN --------
  const handleLogin = async () => {
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    document.cookie = `admin_session=true; path=/; max-age=${60 * 60 * 24}`;
    setAuthorized(true);
  };

  // -------- LOGOUT --------
  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    setAuthorized(false);
    setReport(null);
    setPassword("");
    setPdfReports([]);
  };

  // -------- ENVOI EMAILS --------
  const sendEmails = async () => {
    setLoading(true);
    setReport(null);

    const res = await fetch("/api/send-draw-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert("Erreur : " + (data.error || "Unknown error"));
    } else {
      setReport(data);
    }

    setLoading(false);
  };

  // -------- EXPORT PDF --------
  const exportReport = async () => {
    if (!report) return;

    const res = await fetch("/api/reports/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`PDF sauvegardé ! 📄`);
      fetchReports(); // rafraîchit la liste
    } else {
      alert("Erreur lors de la génération du PDF : " + data.error);
    }
  };

  // Export automatique du PDF dès qu'un report est généré
  useEffect(() => {
    if (report) {
      exportReport();
    }
  }, [report]);

  // -------- FETCH PDF HISTORY --------
  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports/list");
      if (!res.ok) throw new Error("Erreur récupération PDF");
      const data = await res.json();
      setPdfReports(data.files);
    } catch (err) {
      console.error("Erreur récupération PDF :", err);
    }
  };

  useEffect(() => {
    if (authorized) fetchReports();
  }, [authorized]);

  // -------- DELETE PDF --------
  const handleDeletePdf = async (fileName) => {
    if (!confirm(`Voulez-vous vraiment supprimer ${fileName} ?`)) return;

    try {
      const res = await fetch(
        `/api/reports/delete?file=${encodeURIComponent(fileName)}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur suppression PDF");
      }

      // Mettre à jour la liste après suppression
      setPdfReports((prev) => prev.filter((file) => file.name !== fileName));
    } catch (err) {
      alert("Erreur lors de la suppression : " + err.message);
      console.error(err);
    }
  };

  // -------- PAGE LOGIN --------
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

  // -------- PAGE DASHBOARD --------
  return (
    <main className={styles.adminPage}>
      <section className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1>📊 Dashboard Campagne Email</h1>
          <div className={styles.adminStatus}>
            <div className={styles.statusContainer}>
              <p>
                <span className={styles.connectedIndicator}></span> Connecté
              </p>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>

            <div className={styles.modeSelector}>
              <label htmlFor="mode">Mode :</label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="test">TEST</option>
                <option value="prod">PRODUCTION</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={sendEmails}
          disabled={loading}
          className={styles.sendButton}
        >
          {loading
            ? "Envoi en cours..."
            : `Lancer la campagne (${mode.toUpperCase()})`}
        </button>

        {/* {report && (
          <button onClick={exportReport} className={styles.sendButton}>
            Exporter PDF
          </button>
        )} */}

        <div className={styles.pdfList}>
          <h2>📁 Historique des rapports PDF</h2>
          {pdfReports.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Aucun rapport disponible pour le moment.</p>
            </div>
          ) : (
            <div className={styles.pdfCardsContainer}>
              {pdfReports.map((file) => {
                // Convertir la taille en KB/MB
                const sizeInKB = file.size;
                const date = file.date;

                return (
                  <div key={file.name} className={styles.pdfCard}>
                    <div className={styles.pdfInfo}>
                      <p className={styles.pdfName}>{file.name}</p>
                      <p className={styles.pdfMeta}>
                        {sizeInKB} KB • {date}
                      </p>
                    </div>
                    <div className={styles.pdfActions}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewButton}
                        download={file.name} // force le téléchargement si nécessaire
                      >
                        Voir
                      </a>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeletePdf(file.name)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <ul>
            {pdfReports.map((file) => (
              <li key={file.name}>
                <a
                  href={`/api/reports/download?file=${encodeURIComponent(
                    file.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul> */}

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
      </section>
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
