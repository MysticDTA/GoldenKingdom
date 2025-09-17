#!/bin/bash

# 🌌 Define source glyphs
SOURCE1="logo-primary.svg"
SOURCE2="svg/crest-monochrome.svg"
OUTPUT="svg/DivineTruthAscension_Unified.svg"

# 🌀 Begin unified SVG
echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">' > "$OUTPUT"
echo '  <g id="DivineTruthAscension">' >> "$OUTPUT"

# 🔮 Embed first glyph
if [ -f "$SOURCE1" ]; then
  sed -n '/<svg[^>]*>/,/<\/svg>/p' "$SOURCE1" | sed '1d;$d' >> "$OUTPUT"
else
  echo "⚠️ Missing: $SOURCE1"
fi

# 🌙 Embed second glyph
if [ -f "$SOURCE2" ]; then
  sed -n '/<svg[^>]*>/,/<\/svg>/p' "$SOURCE2" | sed '1d;$d' >> "$OUTPUT"
else
  echo "⚠️ Missing: $SOURCE2"
fi

# 🧿 Close unified SVG
echo '  </g>' >> "$OUTPUT"
echo '</svg>' >> "$OUTPUT"

# 🕊️ Blessing
echo "✅ Unified glyph created: $OUTPUT"
