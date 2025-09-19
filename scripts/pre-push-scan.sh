#!/usr/bin/env bash
# scripts/pre-push-scan.sh
# 🔒 Prevent accidental pushes with Supabase keys

echo "🔒 Running pre-push secret scan..."

# Pattern to detect JWT-like Supabase keys
PATTERN="eyJhbGci"

# Run grep only on tracked files, ignoring scanner scripts
if git ls-files | grep -v "scripts/pre-push-scan.sh" | grep -v "cleanup_secrets.sh" | xargs grep -q "$PATTERN"; then
  echo "❌ ERROR: Possible Supabase key found in tracked code!"
  echo "   Remove it before pushing."
  exit 1
fi

echo "✅ No secrets detected, safe to push."
exit 0
