#!/data/data/com.termux/files/usr/bin/bash

echo "🔍 Starting Termux Diagnostics..."

# Check Termux environment variables
echo -e "\n🌐 Environment Variables:"
echo "PREFIX: $PREFIX"
echo "HOME: $HOME"
echo "PATH: $PATH"

# Check storage access
echo -e "\n📁 Storage Access:"
ls ~/storage || echo "⚠️ Storage not initialized. Run: termux-setup-storage"

# Check essential commands
echo -e "\n🧰 Required Commands:"
for cmd in git curl node python bash; do
  which $cmd >/dev/null && echo "✅ $cmd found" || echo "❌ $cmd missing"
done

# Check file permissions in ~/GoldenKingdom
echo -e "\n🔐 File Permissions in ~/GoldenKingdom:"
find ~/GoldenKingdom -type f ! -perm -u=r -exec ls -l {} \;

# Check for broken symlinks
echo -e "\n🔗 Broken Symlinks:"
find ~/GoldenKingdom -xtype l -exec ls -l {} \;

# Check for missing index.html in public/
echo -e "\n📜 Homepage Scroll Check:"
if [ -f ~/GoldenKingdom/public/index.html ]; then
  echo "✅ index.html found in public/"
else
  echo "❌ index.html missing from public/"
fi

# Check for .html files not in public/
echo -e "\n📦 Misplaced Scrolls:"
find ~/GoldenKingdom -maxdepth 1 -name "*.html" -exec echo "⚠️ Scroll outside public/: {}" \;

# Check for UTF-8 BOM in scripts (can break shebangs)
echo -e "\n🧼 UTF-8 BOM Check:"
find ~/GoldenKingdom -name "*.sh" | while read file; do
  head -c 3 "$file" | od -An -tx1 | grep -q 'ef bb bf' && echo "⚠️ BOM detected in $file"
done

echo -e "\n✅ Diagnostics complete."
