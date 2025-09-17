#!/usr/bin/env bash
# reorganize_goldenkingdom.sh
# Reorganize GoldenKingdom repo for clean structure and Netlify deploy

echo "📂 Starting repo reorganization..."

# Create necessary folders
mkdir -p public/svg
mkdir -p public/DTA_assets
mkdir -p netlify/functions/svg

# Move all standalone SVGs into public/svg
echo "🔹 Moving SVG assets to public/svg..."
mv svg/*.svg public/svg/ 2>/dev/null || echo "No SVGs in root svg/ folder"
mv DTA_release_png/svg/*.svg public/svg/ 2>/dev/null || echo "No SVGs in DTA_release_png/svg/"

# Move JSON and ZIP assets to public/DTA_assets
echo "🔹 Moving JSON and ZIP assets to public/DTA_assets..."
mv public/svg/*.zip public/DTA_assets/ 2>/dev/null
mv public/*.json public/DTA_assets/ 2>/dev/null
mv public/*.zip public/DTA_assets/ 2>/dev/null

# Move function-specific SVGs (if any) into netlify/functions/svg
echo "🔹 Moving function SVGs..."
mv netlify/functions/svg/*.svg netlify/functions/svg/ 2>/dev/null || echo "No function SVGs found"

# Remove empty folders
echo "🧹 Cleaning up empty folders..."
find svg DTA_release_png/svg DTA_release_png -type d -empty -delete

# Stage all changes
echo "💾 Staging changes for git..."
git add .

echo "✅ Reorganization complete. Review changes and commit as needed."
