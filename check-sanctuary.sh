#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Beginning sanctuary diagnostic..."

# Navigate to platform directory
cd ~/GoldenKingdom/platform || {
  echo "❌ platform directory not found."
  exit 1
}

# Check for core Node.js files
echo "📦 Checking Node.js artifacts..."
for file in package.json package-lock.json next.config.js next.config.cjs tsconfig.json netlify.toml; do
  if [ -f "$file" ]; then
    echo "✅ $file found"
  else
    echo "❌ $file missing"
  fi
done

# Check for node_modules folder
[ -d node_modules ] && echo "✅ node_modules/ present" || echo "❌ node_modules/ missing"

# Check for path alias in tsconfig.json
echo "📜 Checking tsconfig.json for alias..."
grep '"@/*":' tsconfig.json >/dev/null && echo "✅ Path alias '@/*' configured" || echo "❌ Path alias '@/*' missing"

# Check for ES module type
echo "📜 Checking package.json for module type..."
grep '"type": "module"' package.json >/dev/null && echo "✅ ES module mode enabled" || echo "❌ ES module mode not set"

# Check for required folders and files
echo "🗂️ Checking src structure..."
for path in \
  src/app/page.tsx \
  src/app/login/page.tsx \
  src/app/glyphs/page.tsx \
  src/components/GlyphCard.tsx \
  src/components/GlyphIndex.tsx \
  src/lib/supabaseClient.ts \
  assets/glyphs.json; do
  if [ -f "$path" ]; then
    echo "✅ $path exists"
  else
    echo "❌ $path missing"
  fi
done

# Check for Tailwind and PostCSS config
echo "🎨 Checking Tailwind and PostCSS..."
[ -f tailwind.config.js ] && echo "✅ tailwind.config.js found" || echo "⚠️ tailwind.config.js missing"
[ -f postcss.config.js ] && echo "✅ postcss.config.js found" || echo "⚠️ postcss.config.js missing"

# Check for Supabase env variables
echo "🔐 Checking Supabase environment variables..."
for var in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY; do
  if grep "$var" .env 2>/dev/null || grep "$var" .env.local 2>/dev/null; then
    echo "✅ $var found in .env"
  else
    echo "⚠️ $var not found in .env"
  fi
done

echo "🌿 Sanctuary diagnostic complete."
