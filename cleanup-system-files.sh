#!/bin/bash
echo "🔎 Cleaning repo from personal/system files..."

# 1. Append ignores to .gitignore only if missing
for entry in ".bashrc" ".bash_logout" ".profile" ".ssh/" ".npm/" ".npmrc" ".wget-hsts"
do
  if ! grep -qxF "$entry" .gitignore; then
    echo "$entry" >> .gitignore
    echo "➕ Added $entry to .gitignore"
  fi
done

echo "✅ .gitignore updated with system file ignores (only if missing)."

# 2. Remove from Git index (stop tracking, but keep files safe in ~)
git rm -r --cached --ignore-unmatch .bashrc .bash_logout .profile .ssh .npm .npmrc .wget-hsts

echo "✅ Removed system files from Git index."

# 3. Show status so user can confirm
git status

echo "🎉 Cleanup complete. You can now commit the .gitignore update."
