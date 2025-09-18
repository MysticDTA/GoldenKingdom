#!/bin/bash
set -e

echo "🔹 Cleaning old build artifacts..."
rm -rf platform/.next platform/node_modules
rm -f platform/package-lock.json

echo "🔹 Installing fresh dependencies..."
cd platform
npm install
cd ..

echo "🔹 Verifying required source files..."
if [ ! -f "platform/src/lib/supabaseClient.ts" ]; then
  echo "❌ Missing: platform/src/lib/supabaseClient.ts"
  echo "👉 Please create this file before deploying."
  exit 1
fi

if [ ! -f "platform/src/components/GlyphCard.tsx" ]; then
  echo "❌ Missing: platform/src/components/GlyphCard.tsx"
  echo "👉 Please create this file before deploying."
  exit 1
fi

echo "✅ All required files exist."

echo "🔹 Adding clean Netlify config..."
git add netlify.toml platform/package.json platform/tsconfig.json platform/next.config.cjs
git commit -m "Clean build setup: reset cache, fix Netlify config" || echo "⚠️ Nothing new to commit"

echo "🔹 Pushing to remote..."
git push origin main

echo "🔹 Triggering Netlify clear-cache build..."
if command -v netlify >/dev/null 2>&1; then
  netlify build --context=production --clear-cache
else
  echo "⚠️ Netlify CLI not found. Please trigger 'Clear cache and deploy site' from the Netlify dashboard."
fi
