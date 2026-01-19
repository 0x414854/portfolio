import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Client Supabase serveur (SANS cookies, SANS auth)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY // 🔐 serveur uniquement
);

// =========================
// POST – Ajouter une entrée
// =========================
export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase.from("draw_entries").insert([body]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// =========================
// GET – Récupérer les entrées
// =========================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("draw_entries")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
