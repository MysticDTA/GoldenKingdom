#!/bin/bash
# === GoldenKingdom Merge + Cleanup Script ===
# Usage: ./merge-preview.sh preview-20250918-153200

if [ -z "$1" ]; then
  echo "❌ Please provide the preview branch name"
  echo "👉 Example: ./merge-preview.sh preview-20250918-153200"
  exit 1
fi

BRANCH=$1

# Step 1: make sure we’re on main
git checkout main
git pull origin main

# Step 2: merge the preview branch
git merge --no-ff $BRANCH -m "Merge preview branch $BRANCH into main"

# Step 3: push updated main
git push origin main

# Step 4: delete the preview branch locally
git branch -d $BRANCH

# Step 5: delete the preview branch remotely
git push origin --delete $BRANCH

echo ""
echo "✅ Preview branch $BRANCH merged into main and cleaned up"
echo "🌍 Production site will update once Netlify builds main"
