#!/usr/bin/env bash
# check_netlify_assets.sh
# Checks if all assets in the public folder are live on Netlify

# Set your Netlify site URL here
NETLIFY_URL="https://your-site-name.netlify.app"

echo "⏳ Checking live Netlify assets at $NETLIFY_URL ..."

# Function to check a file
check_file() {
    local file_path="$1"
    local url="$NETLIFY_URL/${file_path#public/}" # remove public/ prefix
    http_status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [[ "$http_status" == "200" ]]; then
        echo "[OK] $file_path is live"
    else
        echo "[MISSING] $file_path returned HTTP $http_status"
    fi
}

# Check HTML files
echo -e "\n=== Scrolls (.html) ==="
for file in $(find public -type f -name "*.html" | sort); do
    check_file "$file"
done

# Check JSON files
echo -e "\n=== Glyph JSON Files (.json) ==="
for file in $(find public -type f -name "*.json" | sort); do
    check_file "$file"
done

# Check SVG files
echo -e "\n=== SVG Assets (.svg) ==="
for file in $(find public -type f -name "*.svg" | sort); do
    check_file "$file"
done

echo -e "\n✅ Check complete."
