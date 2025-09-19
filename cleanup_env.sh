#!/bin/bash
# 🚨 Cleanup script for Supabase secrets

echo "🔒 Cleaning environment files and configs..."

# 0. Abort if real Supabase keys are found in repo
if grep -R "eyJhbGci" . --exclude-dir=node_modules --quiet; then
  echo "❌ ERROR: A real Supabase key was found in the repository!"
  echo "   Remove it before committing/pushing."
  exit 1
fi

# 1. Remove any env.js files
find . -name "env.js" -exec rm -f {} \;
echo "✅ Removed all env.js files"

# 2. Rewrite .env.example with safe placeholders
cat > platform/.env.example <<EOL
# Supabase project URL (public)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase anon key (safe for frontend, replace in .env.local with your real one)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase service role key (server-only, never commit real one)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOL
echo "✅ Rewrote platform/.env.example with placeholders"

# 3. Fix supabaseClient.ts if it incorrectly uses service key
SUPABASE_CLIENT="platform/src/lib/supabaseClient.ts"
if grep -q "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_CLIENT"; then
  cat > "$SUPABASE_CLIENT" <<EOL
import { createClient } from "@supabase/supabase-js";

// ✅ Use only anon key for frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
EOL
  echo "✅ Fixed supabaseClient.ts to use anon key only"
else
  echo "✅ supabaseClient.ts already safe (anon key only)"
fi

# 4. Ensure .gitignore has correct rules
if ! grep -q ".env.local" .gitignore; then
  echo ".env.local" >> .gitignore
  echo "platform/.env.local" >> .gitignore
  echo "✅ Added .env.local rules to .gitignore"
else
  echo "✅ .gitignore already ignores .env.local"
fi

echo "🎉 Cleanup complete. Repo is safe to commit and push now."
