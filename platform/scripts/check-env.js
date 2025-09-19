// platform/scripts/check-env.js

// Env vars always required
const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
];

// Only enforce Service Role in production (Netlify sets NODE_ENV=production)
if (process.env.NODE_ENV === "production") {
  required.push("SUPABASE_SERVICE_ROLE_KEY");
}

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error("❌ Missing environment variables:", missing.join(", "));
  process.exit(1);
}

console.log("✅ All required environment variables are set.");
