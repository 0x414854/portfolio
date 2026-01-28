import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { report } = await req.json();
  if (!report)
    return new Response(JSON.stringify({ error: "No report provided" }), {
      status: 400,
    });

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const timesFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    let y = 750;

    page.drawText("Rapport Campagne Email", {
      x: 50,
      y,
      size: 18,
      font: timesFont,
    });
    y -= 30;
    page.drawText(`Mode: ${report.mode}`, {
      x: 50,
      y,
      size: 12,
      font: timesFont,
    });
    y -= 20;
    page.drawText(`Total: ${report.total}`, {
      x: 50,
      y,
      size: 12,
      font: timesFont,
    });
    y -= 20;
    page.drawText(`Envoyés: ${report.sent}`, {
      x: 50,
      y,
      size: 12,
      font: timesFont,
    });
    y -= 20;
    page.drawText(`Erreurs: ${report.failed}`, {
      x: 50,
      y,
      size: 12,
      font: timesFont,
    });
    y -= 20;
    page.drawText(`Durée: ${report.duration}`, {
      x: 50,
      y,
      size: 12,
      font: timesFont,
    });
    y -= 30;

    report.details.forEach((item) => {
      page.drawText(
        `${item.email} | ${item.status} | ${item.resendId || "-"} | ${item.error || "-"}`,
        { x: 50, y, size: 10, font: timesFont }
      );
      y -= 15;
      if (y < 50) y = 750; // nouvelle page si besoin
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `rapport_email_${Date.now()}.pdf`;

    const { error } = await supabase.storage
      .from("mail reports")
      .upload(fileName, pdfBytes, { contentType: "application/pdf" });

    if (error) throw error;

    const { publicUrl } = supabase.storage
      .from("mail reports")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({ message: "PDF généré", url: publicUrl }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
