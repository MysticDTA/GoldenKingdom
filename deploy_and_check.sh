#!/bin/bash

# 1️⃣ Push changes to GitHub
git add .
git commit -m "Update scrolls, glyphs, and SVGs"
git push

# 2️⃣ Wait a few seconds for Netlify to start the build
echo "Waiting 10 seconds for Netlify to start deployment..."
sleep 10

# 3️⃣ Check live assets
SITE_URL="https://your-netlify-site.netlify.app"

# List of key files on the live site
FILES=(
  "index.html"
  "sanctuary.html"
  "manifest.html"
  "IgnisVow.json"
  "chakraGlyph.json"
  "glyphRegistry.json"
  "CelestialGrid.svg"
  "IgnisVow.svg"
  "chakraGlyph.svg"
  "svg/glyph-preview.svg"
  "svg/glyph-preview2.svg"
  "svg/glyphConstellation.svg"
  "svg/h8vexsr01 (1).svg"
  "svg/logo (3) (1).svg"
  "svg/logo.svg"
  "svg/sanctuaryGlyph.svg"
)

echo -e "\nChecking live Netlify assets..."
for f in "${FILES[@]}"; do
  URL="$SITE_URL/$f"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$STATUS" = "200" ]; then
    echo "[OK] $f is live"
  else
    echo "[MISSING] $f returned HTTP $STATUS"
  fi
done
