#!/usr/bin/env bash
# reorganize_repo.sh
# Reorganize GoldenKingdom repo and fix all asset paths

set -e

echo "🔹 Starting repo reorganization..."

# 1️⃣ Move all SVGs into functions/svg
mkdir -p netlify/functions/svg
mv public/svg/*.svg netlify/functions/svg/ 2>/dev/null || true
mv svg/*.svg netlify/functions/svg/ 2>/dev/null || true
echo "✅ SVG files moved to netlify/functions/svg"

# 2️⃣ Move DTA assets to public/DTA_assets
mkdir -p public/DTA_assets
mv DTA_release_png/* public/DTA_assets/ 2>/dev/null || true
echo "✅ DTA assets moved to public/DTA_assets"

# 3️⃣ Remove empty folders
rm -rf DTA_release_png svg public/svg
echo "✅ Removed old empty folders"

# 4️⃣ Fix paths in HTML, JS, and CSS
echo "🔄 Updating asset paths in HTML, JS, CSS..."
FILES=$(find public -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \))

for file in $FILES; do
    echo "✏️  Processing $file ..."

    # Remove 'public/' prefix from paths
    sed -i 's#public/##g' "$file"

    # Update JSON/ZIP references to new DTA_assets folder
    sed -i 's#\(IgnisVow.json\|chakraGlyph.json\|glyphRegistry.json\|svg-4-1.zip\)#DTA_assets/\1#g' "$file"

    # Update SVG references to new location
    sed -i 's#svg/\(.*\.svg\)#/netlify/functions/svg/\1#g' "$file"
done
echo "✅ Asset paths updated"

# 5️⃣ Cleanup old temporary or unnecessary files
rm -rf *.log *.DS_Store
echo "✅ Cleaned up temporary files"

echo "🎉 Repo reorganization complete! Review files, then commit changes:"
echo "git add . && git commit -m 'Reorganized repo and fixed asset paths'"
