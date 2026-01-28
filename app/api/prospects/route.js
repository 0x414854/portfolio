import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Côté serveur seulement
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("prospects")
      .select("email")
      .not("email", "is", null); // seulement les emails valides

    if (error) throw error;

    const emails = data.map((e) => e.email);
    console.log("Emails récupérés :", emails);

    console.log("📋 Emails récupérés depuis Supabase :");
    emails.forEach((email, index) => {
      console.log(`${index + 1}. ${email}`);
    });

    console.log(`Total: ${emails.length} emails`);

    return NextResponse.json({ emails });
  } catch (err) {
    console.error("Erreur récupération prospects :", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
