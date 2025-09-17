#!/bin/bash
# check_netlify_assets.sh
# Checks live URLs of public folder assets on Netlify

# Replace with your Netlify site URL
NETLIFY_URL="https://your-site-name.netlify.app"

echo "⏳ Checking live Netlify assets at $NETLIFY_URL ..."

# Function to check each file
check_file() {
    local file_path="$1"
    local url="$NETLIFY_URL/${file_path#public/}"
    status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
    if [[ "$status" == "200" ]]; then
        echo "[OK]     $file_path"
    else
        echo "[MISSING] $file_path returned HTTP $status"
    fi
}

# Check HTML files
echo -e "\n=== Scrolls (.html) ==="
find public -type f -name "*.html" | sort | while read f; do check_file "$f"; done

# Check JSON files
echo -e "\n=== Glyph JSON Files (.json) ==="
find public -type f -name "*.json" | sort | while read f; do check_file "$f"; done

# Check SVG files
echo -e "\n=== SVG Assets (.svg) ==="
find public -type f -name "*.svg" | sort | while read f; do check_file "$f"; done

echo -e "\n✅ Check complete."
