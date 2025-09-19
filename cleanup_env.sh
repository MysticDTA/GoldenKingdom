#!/bin/bash
echo "🧹 Cleaning up .env.example..."

EXAMPLE_FILE="platform/.env.example"

# If .env.example exists, replace any real values with placeholders
if [ -f "$EXAMPLE_FILE" ]; then
  sed -i \
    -e 's#NEXT_PUBLIC_SUPABASE_URL=.*#NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co#' \
    -e 's#NEXT_PUBLIC_SUPABASE_ANON_KEY=.*#NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here#' \
    -e 's#SUPABASE_SERVICE_ROLE_KEY=.*#SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here#' \
    "$EXAMPLE_FILE"

  echo "✅ .env.example cleaned with placeholders."
else
  echo "⚠️  No .env.example found at $EXAMPLE_FILE"
fi
