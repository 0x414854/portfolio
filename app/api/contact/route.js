import { NextResponse } from "next/server";
import { jsx } from "react/jsx-runtime";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import {
  EmailTemplateContact,
  EmailTemplateContactBackup,
} from "@/app/components/email/templateEmailSimplitech";

// --------------------------------------------------
// Configuration
// --------------------------------------------------

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "simplitech:contact",
    })
  : null;

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_BACKUP_EMAIL = process.env.CONTACT_BACKUP_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const SITE_URL = process.env.SITE_URL;

// Codes autorisés par le formulaire

const ALLOWED_SERVICES = [
  "web_refonte",
  "web_essentiel",
  "web_croissance",
  "web_business",
  "automation_simple",
  "maintenance_essentiel",
  "maintenance_evolution",
  "maintenance_premium",
  "consulting_refonte",
  "other_other",
];

const ALLOWED_BUDGETS = [
  "",
  "under-1000",
  "1000-5000",
  "5000-10000",
  "over-10000",
];

const ALLOWED_TIMELINES = ["", "Urgent", "Month", "Quarter", "Flexible"];

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function jsonError(message, status) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function cleanString(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request) {
  // Vercel fournit généralement x-forwarded-for.
  // On prend uniquement la première adresse de la liste.
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isAllowedOrigin(request) {
  if (!SITE_URL) return false;

  const origin = request.headers.get("origin");

  // Certains clients peuvent ne pas envoyer Origin.
  // Si Origin est présent, il doit correspondre à SITE_URL.
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(SITE_URL).origin;
  } catch {
    return false;
  }
}

// --------------------------------------------------
// POST /api/contact
// --------------------------------------------------

export async function POST(request) {
  try {
    // 1. Vérification de la configuration serveur
    if (
      !process.env.RESEND_API_KEY ||
      !CONTACT_TO_EMAIL ||
      !CONTACT_FROM_EMAIL ||
      !SITE_URL
    ) {
      console.error("Configuration contact incomplète.");

      return jsonError(
        "Le service de contact est temporairement indisponible.",
        500,
      );
    }

    // 2. Vérification de l'origine de la requête
    if (!isAllowedOrigin(request)) {
      return jsonError("Origine non autorisée.", 403);
    }

    // 3. Vérification du type de contenu
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonError("Le format de la requête doit être JSON.", 415);
    }

    // 4. Limitation du nombre de requêtes
    if (!ratelimit) {
      console.error("Upstash Redis n'est pas configuré.");

      return jsonError(
        "Le service de contact est temporairement indisponible.",
        500,
      );
    }

    const ip = getClientIp(request);
    const { success: withinLimit } = await ratelimit.limit(ip);

    if (!withinLimit) {
      return jsonError(
        "Trop de tentatives. Réessaie dans quelques minutes.",
        429,
      );
    }

    // 5. Lecture et validation du corps JSON
    let body;

    try {
      body = await request.json();
    } catch {
      return jsonError("Le corps de la requête est invalide.", 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonError("Les données envoyées sont invalides.", 400);
    }
    if (cleanString(body.website, 200)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = cleanString(body.name, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 40);
    const service = cleanString(body.service, 50);
    const budget = cleanString(body.budget, 50);
    const timeline = cleanString(body.timeline, 50);
    const message = cleanString(body.message, 5000);
    const consent = body.consent;

    // 6. Champs obligatoires
    if (!name || !email || !service || !message) {
      return jsonError("Merci de remplir tous les champs obligatoires.", 400);
    }

    if (name.length < 2) {
      return jsonError("Le nom doit contenir au moins 2 caractères.", 400);
    }

    if (!isValidEmail(email)) {
      return jsonError("L'adresse e-mail n'est pas valide.", 400);
    }

    if (!ALLOWED_SERVICES.includes(service)) {
      return jsonError("Le service sélectionné n'est pas valide.", 400);
    }

    if (!ALLOWED_BUDGETS.includes(budget)) {
      return jsonError("Le budget sélectionné n'est pas valide.", 400);
    }

    if (!ALLOWED_TIMELINES.includes(timeline)) {
      return jsonError("Le délai sélectionné n'est pas valide.", 400);
    }

    if (message.length < 10) {
      return jsonError("Le message doit contenir au moins 10 caractères.", 400);
    }

    if (consent !== true) {
      return jsonError(
        "Le consentement est obligatoire pour envoyer le formulaire.",
        400,
      );
    }

    // 7. Préparation des données des e-mails
    const sentAt = new Date();

    const templateProps = {
      name,
      fullname: name,
      email,
      phone,
      service,
      budget,
      timeline,
      message,
      sentAt,
      date: sentAt,
      backupEmail: CONTACT_BACKUP_EMAIL,
    };

    const subject = `Nouveau message Simplitech — ${name}`;

    // 8. Envoi de l'e-mail principal
    const primaryResult = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject,
      react: jsx(EmailTemplateContact, {
        ...templateProps,
      }),
    });

    if (primaryResult.error) {
      console.error("Échec de l'envoi de l'e-mail principal :", {
        message: primaryResult.error.message,
      });

      return jsonError("Impossible d'envoyer le message pour le moment.", 502);
    }

    // 9. Envoi de la copie de secours, si configurée
    if (
      CONTACT_BACKUP_EMAIL &&
      CONTACT_BACKUP_EMAIL.toLowerCase() !== CONTACT_TO_EMAIL.toLowerCase()
    ) {
      const backupResult = await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_BACKUP_EMAIL],
        replyTo: email,
        subject: `[BACKUP] ${subject}`,
        react: jsx(EmailTemplateContactBackup, {
          ...templateProps,
        }),
      });

      if (backupResult.error) {
        // L'e-mail principal est déjà envoyé :
        // ne pas répondre comme si tout l'envoi avait échoué.
        console.error("Échec de l'envoi de l'e-mail de secours :", {
          message: backupResult.error.message,
          primaryEmailId: primaryResult.data?.id,
        });

        return NextResponse.json(
          {
            success: true,
            warning:
              "Le message principal a été envoyé, mais la copie de secours a échoué.",
          },
          { status: 200 },
        );
      }
    }

    // 10. Confirmation au frontend
    return NextResponse.json(
      {
        success: true,
        message: "Votre message a été envoyé avec succès.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur API contact :", error);

    return jsonError(
      "Une erreur interne est survenue. Merci de réessayer plus tard.",
      500,
    );
  }
}
