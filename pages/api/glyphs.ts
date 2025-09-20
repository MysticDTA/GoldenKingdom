import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data: glyphs, error } = await supabase
      .from("glyphs")
      .select("*");

    if (error) {
      // If Supabase returns an error, throw it to be caught below
      throw error;
    }

    // Success case
    return res.status(200).json(glyphs);

  } catch (error) {
    // Generic error handling
    console.error("Error fetching glyphs:", error);
    return res.status(500).json({ error: "Failed to fetch glyphs" });
  }
}
