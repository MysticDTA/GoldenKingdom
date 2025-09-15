#!/data/data/com.termux/files/usr/bin/bash
# DivineTruthAscension — Glyph Scroll Renderer

glyphs_file="glyphs.json"

if [ ! -f "$glyphs_file" ]; then
  echo "❌ No glyphs.json found. The sanctuary is silent."
  exit 1
fi

echo "📜 DivineTruthAscension Glyph Scroll"
echo "─────────────────────────────────────"

jq -r '
  .glyphs[] |
  "🌀 \(.filename)\n   Role: \(.role)\n   State: \(.state)\n   Energy: \(.energy)\n   Usage: " + (.usage | join(", ")) + "\n"
' "$glyphs_file"
