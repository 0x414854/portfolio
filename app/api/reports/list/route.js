import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from("mail reports").list();

    if (error) throw error;

    const files = await Promise.all(
      data.map(async (file) => {
        const { data, error } = await supabase.storage
          .from("mail reports")
          .createSignedUrl(file.name, 60 * 60); // URL valable 1h

        if (error) console.error("Erreur URL  :", error);

        const url = data.signedUrl;

        const sizeInKB = file.metadata?.size
          ? (file.metadata.size / 1024).toFixed(2)
          : null;

        const date = file.updated_at
          ? new Date(file.updated_at).toISOString()
          : null;

        return {
          name: file.name,
          url: url,
          size: sizeInKB,
          date,
        };
      })
    );
    // console.log(files);

    return new Response(JSON.stringify({ files }), { status: 200 });
  } catch (err) {
    console.error("Erreur GET /reports/list:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
