#!/usr/bin/env bash
# merge_dta_release.sh
# Safely merge DTA_release_png into main GoldenKingdom structure

set -e

# 1️⃣ Backup current DTA release as a tag
echo "🔖 Tagging current DTA release..."
git tag -a DTA_release_backup -m "Backup before merging DTA release"
git push origin DTA_release_backup || echo "Tag pushed or already exists"

# 2️⃣ Move files to proper locations
echo "📂 Moving DTA files into main structure..."

# HTML
if [ -f "DTA_release_png/index.html" ]; then
    mv DTA_release_png/index.html public/dta-index.html
fi

# JSON
if [ -f "DTA_release_png/glyphs.json" ]; then
    mv DTA_release_png/glyphs.json public/glyphs.json
fi

# SVGs
if [ -d "DTA_release_png/svg" ]; then
    mkdir -p netlify/functions/svg
    mv DTA_release_png/svg/* netlify/functions/svg/
fi

# Remove empty folder
rm -rf DTA_release_png

# 3️⃣ Optional: Fix paths in HTML/JS to point to new locations
# (This example updates index.html for DTA folder)
echo "🛠 Updating paths in HTML/JS..."
# Example: replace 'DTA_release_png/' with correct relative paths
grep -rl 'DTA_release_png/' public/dta-index.html | while read file; do
    sed -i 's|DTA_release_png/||g' "$file"
done

# 4️⃣ Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Merge DTA release into GoldenKingdom main, move assets to proper folders"

# 5️⃣ Push to main
echo "🚀 Pushing to main..."
git push origin main

echo "✅ DTA release merged successfully!"
