#!/usr/bin/env bash
# merge_dta_release_cleanup.sh
# Merge DTA_release_png into GoldenKingdom main, fix paths, and remove old branches

set -e

# 1️⃣ Backup current DTA release
echo "🔖 Tagging current DTA release..."
git tag -a DTA_release_backup -m "Backup before merging DTA release"
git push origin DTA_release_backup || echo "Tag pushed or already exists"

# 2️⃣ Move files to proper locations
echo "📂 Moving DTA files into main structure..."
[ -f "DTA_release_png/index.html" ] && mv DTA_release_png/index.html public/dta-index.html
[ -f "DTA_release_png/glyphs.json" ] && mv DTA_release_png/glyphs.json public/glyphs.json

if [ -d "DTA_release_png/svg" ]; then
    mkdir -p netlify/functions/svg
    mv DTA_release_png/svg/* netlify/functions/svg/
fi
rm -rf DTA_release_png

# 3️⃣ Update asset paths in HTML, JS, CSS
echo "🛠 Updating paths in HTML, JS, and CSS..."
files=$(find public -type f -name "*.html" -o -name "*.js" -o -name "*.css")
files="$files $(find . -maxdepth 1 -type f -name "*.html" -o -name "*.js" -o -name "*.css")"

for f in $files; do
    sed -i 's|DTA_release_png/||g' "$f"
    sed -i 's|/svg/|/netlify/functions/svg/|g' "$f"
done

# 4️⃣ Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Merge DTA release into GoldenKingdom main, move assets, fix paths"

# 5️⃣ Push to main
echo "🚀 Pushing to main..."
git push origin main

# 6️⃣ Delete old branches locally and remotely
echo "🗑 Removing old branches..."
OLD_BRANCHES=("dta" "sovereign" "merge-dta" "merge-sovereign" "main-local")
for branch in "${OLD_BRANCHES[@]}"; do
    if git show-ref --quiet refs/heads/$branch; then
        git branch -D $branch
        echo "Deleted local branch $branch"
    fi
    if git ls-remote --exit-code origin $branch &>/dev/null; then
        git push origin --delete $branch
        echo "Deleted remote branch $branch"
    fi
done

echo "✅ Merge complete. Old branches removed. GoldenKingdom main is clean and ready!"
