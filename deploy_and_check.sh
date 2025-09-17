#!/bin/bash

# === CONFIG ===
SITE_URL="https://your-netlify-site.netlify.app"  # Replace with your Netlify URL
WAIT_TIME=15  # seconds to wait after pushing before checking

# === PUSH LOCAL CHANGES ===
echo "🌀 Pushing local changes..."
git add .
git commit -m "Update scrolls, glyphs, and SVGs"
git push

echo "⏳ Waiting $WAIT_TIME seconds for Netlify to start deployment..."
sleep $WAIT_TIME

# === FILES TO CHECK ===
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

echo -e "\n🔍 Checking live Netlify assets..."
for f in "${FILES[@]}"; do
  # Encode spaces in URL
  URL="$SITE_URL/$(echo "$f" | sed 's/ /%20/g')"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$STATUS" = "200" ]; then
    echo "[OK] $f is live"
  else
    echo "[MISSING] $f returned HTTP $STATUS"
  fi
done

echo -e "\n✅ Check complete."
