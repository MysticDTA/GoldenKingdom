#!/bin/bash
# Termux-friendly deploy script for GoldenKingdom

# 1️⃣ Ensure we are in repo root
cd ~/GoldenKingdom || { echo "Repo not found"; exit 1; }

# 2️⃣ Checkout merge-sovereign
git checkout merge-sovereign

# 3️⃣ Pull latest changes just in case
git pull origin merge-sovereign

# 4️⃣ Add and commit any new changes
git add .
git commit -m "Auto-commit before deploy" 2>/dev/null || echo "No changes to commit"

# 5️⃣ Push to GitHub
git push origin merge-sovereign

# 6️⃣ Wait for Netlify to detect Git push and deploy (adjust time if needed)
echo "⏳ Waiting 30 seconds for Netlify to start deployment..."
sleep 30

# 7️⃣ Check live assets using your existing script
if [ -f ./check_netlify.sh ]; then
    ./check_netlify.sh
else
    echo "❌ check_netlify.sh not found!"
fi

# 8️⃣ List all deployed assets for confirmation
echo -e "\n📂 Public folder structure:"
find public -type f | sort
