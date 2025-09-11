#!/data/data/com.termux/files/usr/bin/bash

# 🌟 Ritual Invocation: DivineTruthAscension Entry Check

PROJECT_DIR="/storage/emulated/0/TermuxProjects/DTA"
HTML_FILE="$PROJECT_DIR/index.html"
CSS_FILE="$PROJECT_DIR/style.css"
LOG_FILE="$PROJECT_DIR/invocation.log"

echo "🔮 Checking homepage invocation files..."

# 🔍 Verify index.html
if [ -f "$HTML_FILE" ]; then
  echo "✅ index.html found at: $HTML_FILE"
  echo "   Last modified: $(stat -c %y "$HTML_FILE")"
else
  echo "❌ index.html not found. Check your path or glyph placement."
fi

# 🔍 Verify style.css
if [ -f "$CSS_FILE" ]; then
  echo "✅ style.css found at: $CSS_FILE"
  echo "   Last modified: $(stat -c %y "$CSS_FILE")"
else
  echo "❌ style.css not found. Check your elemental styling."
fi

# 📝 Log the invocation
echo "$(date '+%Y-%m-%d %H:%M:%S') — Homepage ritual checked" >> "$LOG_FILE"

# ✨ Optional: Open in editor
read -p "Open index.html in nano? (y/n): " OPEN_HTML
if [ "$OPEN_HTML" = "y" ]; then
  nano "$HTML_FILE"
fi

read -p "Open style.css in nano? (y/n): " OPEN_CSS
if [ "$OPEN_CSS" = "y" ]; then
  nano "$CSS_FILE"
fi

echo "🌈 Ritual complete. The veil is ready."
