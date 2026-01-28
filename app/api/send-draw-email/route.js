import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  return NextResponse.json({
    message: "Cette route accepte uniquement les requêtes POST.",
  });
}

export async function POST(req) {
  const startTime = Date.now();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📨 Nouvelle requête /send-draw-email");
  console.log("🕒", new Date().toISOString());

  try {
    const body = await req.json();
    const { secret, mode } = body;

    console.log("🔎 Mode reçu :", mode);

    // 🔐 Vérification sécurité
    if (secret !== process.env.ADMIN_SECRET) {
      console.warn("⛔ Tentative d'accès non autorisée");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🔐 Authentification validée");

    if (mode === "prod" && process.env.NODE_ENV !== "production") {
      console.warn("🚫 Tentative d'envoi PROD en environnement non production");
      return NextResponse.json(
        { error: "Prod disabled in dev environment" },
        { status: 403 }
      );
    }

    let emails = [];

    // 🧪 MODE TEST
    if (mode === "test") {
      console.log("🧪 MODE TEST ACTIVÉ");

      emails = [
        "ath.barraud@gmail.com",
        "ath.tes@proton.me",
        "arthur.barraud@proton.me",
      ];
    }

    // 🚀 MODE PRODUCTION
    else if (mode === "prod") {
      console.log("🚀 MODE PRODUCTION ACTIVÉ");
      console.log("📥 Récupération des prospects en base...");

      const { data: prospects, error } = await supabase
        .from("prospects")
        .select("email")
        .not("email", "is", null)
        .eq("draw_email_send", false);

      if (error) {
        console.error("❌ Erreur récupération prospects :", error.message);
        throw error;
      }

      emails = prospects.map((p) => p.email);

      console.log("📊 Prospects trouvés :", emails.length);
    } else {
      console.warn("⚠️ Mode invalide :", mode);
      return NextResponse.json({ error: "Mode invalide" }, { status: 400 });
    }

    if (emails.length === 0) {
      console.warn("⚠️ Aucun email à envoyer");
      return NextResponse.json({
        success: true,
        message: "Aucun email à envoyer",
      });
    }

    console.log("📦 Emails à envoyer :", emails);

    let success = 0;
    let failed = 0;
    let details = [];

    // 🔁 Envoi des emails
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];

      console.log(`➡️ [${i + 1}/${emails.length}] Envoi à ${email}`);

      try {
        const response = await resend.emails.send({
          from: "Arthur BARRAUD <contact@arthurbarraud.me>",
          to: email,
          subject:
            "Et si 2026 commençait avec un nouveau site web pour votre entreprise ?",
          template: { id: "4b7445b1-45ac-4a3d-96f0-55550be2bfd3" },
        });

        console.log(`✅ Succès pour ${email} | Resend ID:`, response.data?.id);

        // 🔥 Update DB uniquement en prod
        if (mode === "prod") {
          const { error: updateError } = await supabase
            .from("prospects")
            .update({
              draw_email_send: true,
              draw_email_sent_at: new Date(),
              draw_email_resend_id: response.data?.id,
            })
            .eq("email", email);

          if (updateError) {
            console.error(
              `⚠️ Email envoyé mais erreur update DB pour ${email}:`,
              updateError.message
            );
          } else {
            console.log(`🗄 DB mise à jour pour ${email}`);
          }
        }

        success++;

        details.push({
          email,
          status: "sent",
          resendId: response.data?.id || null,
          error: null,
        });

        // Respect rate limit
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (err) {
        console.error(`❌ Échec pour ${email}:`, err.message);
        failed++;

        details.push({
          email,
          status: "failed",
          resendId: null,
          error: err.message,
        });
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 RAPPORT FINAL");
    console.log("Mode :", mode);
    console.log("Total :", emails.length);
    console.log("Envoyés :", success);
    console.log("Échecs :", failed);
    console.log("⏱ Temps total :", duration, "secondes");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return NextResponse.json({
      mode,
      total: emails.length,
      sent: success,
      failed,
      duration: `${duration}s`,
      details,
    });
  } catch (error) {
    console.error("💥 ERREUR GLOBALE :", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
