import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from("mail reports").list();

    if (error) throw error;

    // Retourne seulement le nom et l'URL publique
    const files = data.map((file) => {
      const { publicUrl } = supabase.storage
        .from("mail reports")
        .getPublicUrl(file.name);
      return { name: file.name, url: publicUrl };
    });

    return new Response(JSON.stringify({ files }), { status: 200 });
  } catch (err) {
    console.error("Erreur GET /reports/list:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
