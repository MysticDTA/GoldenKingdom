#!/bin/bash
# === GoldenKingdom Preview Deploy Script ===

# Step 1: generate a branch name with timestamp
BRANCH="preview-$(date +%Y%m%d-%H%M%S)"

# Step 2: make sure main is up-to-date
git checkout main
git pull origin main

# Step 3: create preview branch
git checkout -b $BRANCH

# Step 4: stage & commit changes
git add .
git commit -m "Preview deploy: $BRANCH"

# Step 5: push branch to GitHub
git push origin $BRANCH

# Step 6: switch back to main
git checkout main

# Step 7: show the Netlify preview URL
echo ""
echo "🚀 Preview branch pushed: $BRANCH"
echo "👉 Preview URL:"
echo "   https://$BRANCH--goldenkingdom.netlify.app"
echo ""
echo "✅ You're back on main branch locally"
echo "(Netlify will take a few minutes to finish the preview build)"
