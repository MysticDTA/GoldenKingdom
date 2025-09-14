#!/bin/bash
set -euo pipefail

# ---------------- CONFIG ----------------
REPO_DIR="$HOME/storage/shared/SovereignKing"
REMOTE_NAME="origin"
REMOTE_URL="git@github.com:MysticDTA/SovereignKing.git"
BRANCH="main"
COMMIT_MSG="${1:-"Update SovereignKing files"}"

# ---------------- SCRIPT ----------------
# Go to repo
cd "$REPO_DIR" || { echo "Repo folder not found: $REPO_DIR"; exit 1; }

# Initialize Git if not already
if [ ! -d ".git" ]; then
    git init
    git branch -m "$BRANCH"
    echo "Initialized new Git repo and set branch to $BRANCH"
fi

# Check if remote exists
if ! git remote | grep -q "^$REMOTE_NAME$"; then
    git remote add "$REMOTE_NAME" "$REMOTE_URL"
    echo "Added remote $REMOTE_NAME -> $REMOTE_URL"
fi

# Stage all files
git add .

# Commit
git commit -m "$COMMIT_MSG" || echo "Nothing to commit"

# Push
git push -u "$REMOTE_NAME" "$BRANCH"

echo "✅ All done. Files pushed to $REMOTE_URL on branch $BRANCH."
