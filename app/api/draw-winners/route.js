import { createClient } from "@supabase/supabase-js";

// ⚠️ Clé serveur uniquement
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* 🔹 GET → récupérer les gagnants */
export async function GET() {
  const { data, error } = await supabase
    .from("winners")
    .select("compagny_id, compagny_name, rank, prize")
    .order("rank", { ascending: true });

  if (error) {
    return Response.json(
      { error: "Erreur récupération gagnants" },
      { status: 500 }
    );
  }

  return Response.json({ winners: data });
}

export async function POST() {
  try {
    // 1️⃣ Vérifier si le tirage a déjà eu lieu
    const { data: existingWinners, error: existingError } = await supabase
      .from("winners")
      .select("*");

    if (existingError) throw existingError;

    if (existingWinners && existingWinners.length > 0) {
      return Response.json(
        { message: "Tirage déjà effectué" },
        { status: 400 }
      );
    }

    // 2️⃣ Récupérer les participants avec le nom de leur entreprise
    const { data: participants, error } = await supabase
      .from("draw_entries")
      .select("id, company"); // <- récupère le nom ici

    if (error) throw error;
    if (!participants || participants.length < 3) {
      return Response.json(
        { error: "Participants insuffisants pour le tirage" },
        { status: 400 }
      );
    }

    // 3️⃣ Mélange aléatoire (Fisher-Yates)
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, 3); // 3 gagnants

    // 4️⃣ Attribution des prix par rang
    const prizes = [
      { rank: 1, prize: "Site web clé en main" },
      { rank: 2, prize: "50 % sur un site web" },
      { rank: 3, prize: "30 % sur un site web" },
    ];

    // 5️⃣ Préparer les gagnants à insérer
    const winnersToInsert = selected.map((winner, index) => ({
      compagny_id: winner.id,
      compagny_name: winner.company, // nom de l'entreprise
      rank: prizes[index].rank,
      prize: prizes[index].prize,
      created_at: new Date(),
    }));

    // 6️⃣ Insérer les gagnants dans la table
    const { error: insertError } = await supabase
      .from("winners")
      .insert(winnersToInsert);

    if (insertError) throw insertError;

    // 7️⃣ Retourner les gagnants au front
    return Response.json({
      message: "Tirage effectué avec succès",
      winners: winnersToInsert,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err.message || "Erreur lors du tirage" },
      { status: 500 }
    );
  }
}
