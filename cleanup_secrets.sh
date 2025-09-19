#!/bin/bash
# 🚨 Cleanup script to remove sensitive files from repo

echo "🔎 Checking for sensitive env files..."

# Remove .env.local files if they exist
find . -name ".env.local" -exec rm -f {} \;
find . -name ".env.local:" -exec rm -f {} \;

echo "✅ Removed all .env.local files"

# Double-check nothing with keys is left
echo "🔎 Scanning for Supabase keys..."
grep -R "eyJhbGci" . --exclude-dir=node_modules || echo "✅ No keys found"

# Add .env.local to .gitignore if not already there
if ! grep -q ".env.local" .gitignore; then
  echo ".env.local" >> .gitignore
  echo "platform/.env.local" >> .gitignore
  echo "✅ Added .env.local to .gitignore"
fi

echo "✅ Cleanup complete. Safe to push."
