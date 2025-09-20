#!/bin/bash
echo "🔎 Cleaning repo from personal/system files..."

# 1. Append ignores to .gitignore if missing
cat <<EOF >> .gitignore

# Ignore personal/system files
.bashrc
.bash_logout
.profile
.ssh/
.npm/
.npmrc
.wget-hsts
EOF

echo "✅ Updated .gitignore with system file ignores."

# 2. Remove from Git index (stop tracking, but keep files safe in ~)
git rm -r --cached --ignore-unmatch .bashrc .bash_logout .profile .ssh .npm .npmrc .wget-hsts

echo "✅ Removed system files from Git index."

# 3. Show status so user can confirm
git status

echo "🎉 Cleanup complete. You can now commit the .gitignore update."
