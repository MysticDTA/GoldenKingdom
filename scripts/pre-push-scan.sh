#!/bin/bash
echo "🔒 Running pre-push secret scan..."

if grep -R "eyJhbGci" . \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude=platform/.env.local \
  --exclude=platform/.env.example \
  --quiet; then
  echo "❌ ERROR: Possible Supabase key found in tracked code!"
  exit 1
fi

echo "✅ No secrets detected. Proceeding with push..."
exit 0
