import { Resend } from "resend";
import EmailTemplateContact from "@/app/components/emailTemplateContact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname } = body;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // peut être custom plus tard
      to: "arthur.barraud@proton.me", // ton adresse Proton
      subject: `Nouveau message de ${fullname}`,
      react: <EmailTemplateContact {...body} />,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Erreur envoi mail:", error);
    return Response.json({ success: false, error });
  }
}
