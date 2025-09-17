#!/bin/bash

# Replace with your live Netlify site URL
SITE_URL="https://your-netlify-site.netlify.app"

# List of key files to check
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

echo "Checking live Netlify assets..."

for f in "${FILES[@]}"; do
  URL="$SITE_URL/$f"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$STATUS" = "200" ]; then
    echo "[OK] $f is live"
  else
    echo "[MISSING] $f returned HTTP $STATUS"
  fi
done
