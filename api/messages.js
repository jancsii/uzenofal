import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { content } = req.body;

    const { data, error } = await supabase
      .from("messages")
      .insert([{ content }]);

    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    const { error } = await supabase.from("messages").delete().eq("id", id);

    return res.status(200).json({ success: true });
  }
}
