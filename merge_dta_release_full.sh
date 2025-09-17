#!/usr/bin/env bash
# merge_dta_release_full.sh
# Merge DTA_release_png into GoldenKingdom main and fix all asset paths

set -e

# 1️⃣ Backup current DTA release
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

# 3️⃣ Update asset paths in HTML, JS, CSS
echo "🛠 Updating paths in HTML, JS, and CSS files..."

# All HTML, JS, CSS files in public and root
files=$(find public -type f -name "*.html" -o -name "*.js" -o -name "*.css")
files="$files $(find . -maxdepth 1 -type f -name "*.html" -o -name "*.js" -o -name "*.css")"

for f in $files; do
    # Remove 'DTA_release_png/' prefix if exists
    sed -i 's|DTA_release_png/||g' "$f"

    # Fix SVG references to netlify/functions/svg/
    sed -i 's|/svg/|/netlify/functions/svg/|g' "$f"
done

# 4️⃣ Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Merge DTA release into GoldenKingdom main, move assets and fix all paths"

# 5️⃣ Push to main
echo "🚀 Pushing to main..."
git push origin main

echo "✅ DTA release merged and paths fixed successfully!"
