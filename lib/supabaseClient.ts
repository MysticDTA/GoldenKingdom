import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Named export (recommended)
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
