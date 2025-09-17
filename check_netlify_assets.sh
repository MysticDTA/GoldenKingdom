#!/usr/bin/env bash
# check_netlify_assets.sh
# Checks if all assets in the public folder are live on Netlify

# Set your Netlify site URL here
NETLIFY_URL="https://your-site-name.netlify.app"

echo "⏳ Checking live Netlify assets at $NETLIFY_URL ..."

# Function to check a file
check_file() {
    local file=$1
    local url="$NETLIFY_URL/${file#public/}"  # remove 'public/' prefix
    http_status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [[ "$http_status" == "200" ]]; then
        echo "[OK] $file is live"
    else
        echo "[MISSING] $file returned HTTP $http_status"
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

# Optional: other static assets
echo -e "\n✅ Check complete."
