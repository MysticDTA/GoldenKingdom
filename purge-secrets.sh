#!/bin/bash
set -e

echo "🚨 Starting Git history cleanup for sensitive files and large binaries..."

# === 1. Ensure git-filter-repo is installed ===
if ! command -v git-filter-repo &> /dev/null; then
  echo "❌ git-filter-repo not found. Install with:"
  echo "   pip install git-filter-repo"
  exit 1
fi

# === 2. Ensure git-lfs is installed (auto-install if missing) ===
if ! command -v git-lfs &> /dev/null; then
  echo "⚠️ git-lfs not found. Installing locally..."

  # Detect architecture
  ARCH=$(uname -m)
  case "$ARCH" in
    x86_64)
      LFS_PKG="git-lfs-linux-amd64-v3.5.1.tar.gz"
      ;;
    aarch64|arm64)
      LFS_PKG="git-lfs-linux-arm64-v3.5.1.tar.gz"
      ;;
    *)
      echo "❌ Unsupported architecture: $ARCH"
      exit 1
      ;;
  esac

  # Download and extract
  curl -LO "https://github.com/git-lfs/git-lfs/releases/download/v3.5.1/$LFS_PKG"
  tar -xvzf "$LFS_PKG"

  # Detect the extracted folder automatically
  DIR=$(tar -tzf "$LFS_PKG" | head -1 | cut -f1 -d"/")
  cd "$DIR" || exit 1

  mkdir -p ~/bin
  cp git-lfs ~/bin/
  cd ..
  rm -rf "$DIR" "$LFS_PKG"

  export PATH=$HOME/bin:$PATH
  echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc
  echo "✅ git-lfs installed locally in ~/bin"
fi

# === 3. Add sensitive dirs to .gitignore ===
for entry in ".ssh/" ".npm/"; do
  if ! grep -q "$entry" .gitignore 2>/dev/null; then
    echo "$entry" >> .gitignore
    echo "✅ Added $entry to .gitignore"
  fi
done
git add .gitignore || true

# === 4. Rewrite history to remove sensitive paths ===
echo "🧹 Rewriting history to drop sensitive paths..."
git filter-repo --path .ssh/ --path .npm/ --invert-paths --force

# === 5. Initialize Git LFS ===
git lfs install

# === 6. Track large file types ===
echo "🔍 Configuring Git LFS for common large file types..."
git lfs track "*.zip"
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.mp4"
git lfs track "*.mov"
git lfs track "*.psd"
git lfs track "*.wav"
git add .gitattributes
git commit -m "chore: track common binary formats with Git LFS" || true

# === 7. Retroactively migrate large files from history ===
echo "📦 Migrating existing large files in history to Git LFS..."
git lfs migrate import --include="*.zip,*.png,*.jpg,*.mp4,*.mov,*.psd,*.wav" --everything

# === 8. Force push cleaned history ===
echo "🚀 Force pushing cleaned branch to origin/main..."
git push origin main --force

echo "✅ Cleanup complete."
echo "⚠️ If an SSH private key was exposed, rotate it immediately."
