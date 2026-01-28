import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return new Response(JSON.stringify({ error: "No file specified" }), {
      status: 400,
    });
  }

  try {
    const { error } = await supabase.storage
      .from("mail reports")
      .remove([fileName]);
    if (error) throw error;

    return new Response(JSON.stringify({ message: "File deleted" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
