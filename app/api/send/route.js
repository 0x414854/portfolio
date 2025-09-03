import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname, email, message } = body;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // peut être custom plus tard
      to: "ath.tes@proton.me", // ton adresse Proton
      subject: `Nouveau message de ${fullname}`,
      reply_to: email,
      text: message,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
