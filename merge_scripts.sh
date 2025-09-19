#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "🔄 Starting merge of platform/ into root..."

# === Merge scripts/ ===
if [ -d "platform/scripts" ]; then
  echo "➡ Merging platform/scripts into scripts/..."
  mkdir -p scripts

  EXTRA_FILES=("check-env.js" "debug-env.js" "pre-push-scan.sh" "test-supabase.js")

  for file in "${EXTRA_FILES[@]}"; do
    if [ -f "platform/scripts/$file" ]; then
      if [ -f "scripts/$file" ]; then
        echo "⚠️  Skipping $file (already exists in scripts/)"
      else
        cp "platform/scripts/$file" scripts/
        echo "✅ Copied $file from platform/scripts/"
      fi
    fi
  done

  if [ -f "platform/scripts/optimise-glyphs.ts" ]; then
    cp -f "platform/scripts/optimise-glyphs.ts" scripts/optimise-glyphs.ts
    echo "✅ Replaced optimise-glyphs.ts with Node.js version (from platform/)"
  fi
fi

# === Merge docs/ ===
if [ -d "platform/docs" ]; then
  echo "➡ Merging platform/docs into docs/..."
  mkdir -p docs

  for file in platform/docs/*; do
    fname=$(basename "$file")
    if [ -f "docs/$fname" ]; then
      echo "⚠️  Skipping $fname (already exists in docs/)"
    else
      cp "$file" docs/
      echo "✅ Copied $fname from platform/docs/"
    fi
  done
fi

# === Remove the entire platform/ folder ===
if [ -d "platform" ]; then
  rm -rf platform
  echo "🗑️  Deleted platform/ folder after merge."
fi

echo "🎉 Merge complete!"
echo "📂 Final contents of scripts/:"
ls -1 scripts || echo "No scripts folder"
echo
echo "📂 Final contents of docs/:"
ls -1 docs || echo "No docs folder"
