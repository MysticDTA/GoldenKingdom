#!/bin/bash
# === GoldenKingdom Preview Branch Lister ===
# Shows all preview branches locally and on GitHub

echo "🔎 Checking local preview branches..."
git branch | grep "preview-" || echo "❌ No local preview branches"

echo ""
echo "🌍 Checking remote preview branches on GitHub..."
git fetch --prune > /dev/null 2>&1
git branch -r | grep "origin/preview-" || echo "❌ No remote preview branches"
