#!/data/data/com.termux/files/usr/bin/bash

# 🌟 Define your sacred glyphs
declare -a glyphs=("DivineTruthAscension_Light.svg" "DivineTruthAscension_Dark.svg" "hero_golden.png" "hero_cosmic.png")
glyph_dir="$HOME/storage/shared/SovereignKing"
destination="$HOME"

echo "🔮 Beginning glyph invocation ritual..."

for glyph in "${glyphs[@]}"; do
    source_path="$glyph_dir/$glyph"
    if [ -f "$source_path" ]; then
        echo "✨ Glyph found: $glyph — preparing for ceremonial transfer..."
        mv "$source_path" "$destination" && echo "✅ Moved: $glyph to throne room."
    else
        echo "⚠️ Glyph missing: $glyph — still veiled in ether. Awaiting manifestation."
    fi
done

echo "🌈 Ritual complete. May your archive glow with sovereign light."
