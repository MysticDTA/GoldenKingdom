// scripts/check-env.js

// Required environment variables
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
];

const missing = requiredVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
  console.error("👉 Check your .env.local for the full list of required variables.");
  process.exit(1);
}

console.log("✅ All required environment variables are set.");
