// scripts/test-supabase.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });  // 👈 force load from current folder

import { createClient } from "@supabase/supabase-js";

// Grab variables
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("DEBUG URL:", url);
console.log("DEBUG ANON KEY:", anon ? "[SET]" : "[MISSING]");

if (!url || !anon) {
  console.error("❌ Missing env vars. Check your .env.local file.");
  process.exit(1);
}

const supabase = createClient(url, anon);

async function testConnection() {
  const { data, error } = await supabase.from("profiles").select("*").limit(1);

  if (error) {
    console.error("❌ Supabase connection failed:", error.message);
  } else {
    console.log("✅ Supabase connected successfully!");
    console.log("Sample data:", data);
  }
}

testConnection();
