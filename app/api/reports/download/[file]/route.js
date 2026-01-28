import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  try {
    const { file } = req.nextUrl.pathname.split("/").slice(-1)[0];

    if (!file)
      return new Response(JSON.stringify({ error: "File not specified" }), {
        status: 400,
      });

    const { data, error } = await supabase.storage
      .from("mail reports")
      .download(file);

    if (error) throw error;

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch (err) {
    console.error("Erreur GET /reports/download:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
