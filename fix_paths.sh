#!/bin/bash
# fix_paths.sh
# Removes 'public/' prefix from asset paths in HTML, CSS, and JS files

# Find all HTML, CSS, and JS files in the project
FILES=$(find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \))

echo "Fixing asset paths in ${#FILES[@]} files..."

for FILE in $FILES; do
    # Remove 'public/' prefix from href, src, or url() references
    sed -i -E 's|(href|src)=["'\'']public/|\1="/|g; s|url\(["'\'']?public/|url(/|g' "$FILE"
done

echo "All paths fixed!"
