#!/data/data/com.termux/files/usr/bin/bash
# 🌟 Ritual Invocation: DivineTruthAscension Entry Script

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
  echo "❌ index.html not found. Check your path!"
fi

# 🔍 Verify style.css
if [ -f "$CSS_FILE" ]; then
  echo "✅ style.css found at: $CSS_FILE"
  echo "   Last modified: $(stat -c %y "$CSS_FILE")"
else
  echo "❌ style.css not found. Check your path!"
fi

# 📝 Log invocation check
{
  echo "Invocation run at $(date)"
  [ -f "$HTML_FILE" ] && echo "index.html OK" || echo "index.html MISSING"
  [ -f "$CSS_FILE" ] && echo "style.css OK" || echo "style.css MISSING"
} >> "$LOG_FILE"

echo "✨ Invocation check complete. Log saved to $LOG_FILE"
