import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: "Missing Supabase env vars" });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Simple test: get auth settings (safe endpoint)
  const { data: _data, error } = await supabase.auth.getSession();

  res.status(200).json({
    supabaseUrl,
    projectRef: supabaseUrl.split("https://")[1].split(".supabase.co")[0],
    connected: error ? false : true,
    error,
  });
}
