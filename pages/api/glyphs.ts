import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import type { Database } from "../../types/supabase";

type Glyph = Database["public"]["Tables"]["glyphs"]["Row"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data: glyphs, error } = await supabase
      .from("glyphs")
      .select("*");

    if (error) throw error;

    res.status(200).json(glyphs as Glyph[]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
