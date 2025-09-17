#!/usr/bin/env bash
# fix_asset_paths.sh
# Automatically updates asset paths in HTML, JS, and CSS

echo "🔄 Updating asset paths to match new structure..."

# List of file types to scan
FILES=$(find public -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \))

# Replace 'public/' references with correct paths
for file in $FILES; do
    echo "✏️  Processing $file ..."
    
    # Remove 'public/' prefix
    sed -i 's#public/##g' "$file"
    
    # Optional: Update DTA assets references
    # If you moved JSON/ZIP to public/DTA_assets/, update paths
    sed -i 's#\(IgnisVow.json\|chakraGlyph.json\|glyphRegistry.json\|svg-4-1.zip\)#DTA_assets/\1#g' "$file"
done

echo "✅ Asset paths updated. Review files in public/ to ensure correctness."
