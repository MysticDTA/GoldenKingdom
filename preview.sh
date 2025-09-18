#!/bin/bash
# === GoldenKingdom Preview Deploy Script ===

# Step 1: generate a branch name with timestamp
BRANCH="preview-$(date +%Y%m%d-%H%M%S)"

# Step 2: create new branch from current main
git checkout main
git pull origin main
git checkout -b $BRANCH

# Step 3: stage & commit all changes
git add .
git commit -m "Preview deploy: $BRANCH"

# Step 4: push branch to GitHub
git push origin $BRANCH

# Step 5: switch back to main
git checkout main

# Step 6: show the expected Netlify preview URL
echo ""
echo "🚀 Preview branch pushed: $BRANCH"
echo "👉 Your preview will be available at:"
echo "   https://$BRANCH--goldenkingdom.netlify.app"
echo ""
echo "✅ You're now back on main branch locally"
echo "(Netlify will take a couple minutes to finish building the preview)"
