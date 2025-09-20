import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data: glyphs, error } = await supabase
      .from("glyphs")
      .select("*");

    if (error) throw error;

    return res.status(200).json(glyphs);
  } catch (err: any) {
    console.error("Error fetching glyphs:", err.message);
    return res.status(500).json({ error: "Failed to fetch glyphs" });
  }
}
