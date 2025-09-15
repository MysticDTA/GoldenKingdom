#!/data/data/com.termux/files/usr/bin/bash

# 🌟 Define your sacred glyphs
declare -a glyphs=("DivineTruthAscension_Light.svg" "DivineTruthAscension_Dark.svg" "hero_golden.png" "hero_cosmic.png")
glyph_dir="$HOME/storage/shared/SovereignKing"
destination="$HOME/SovereignKing_ThroneRoom"
log_file="$destination/invocation_log.txt"
readme_file="$destination/README.md"

# 🛕 Prepare the throne room
mkdir -p "$destination"
echo "🔮 Beginning glyph invocation ritual..." | tee -a "$log_file"

# 📜 Begin README scroll
echo "# SovereignKing Glyph Archive" > "$readme_file"
echo "_Ceremonial log of invoked assets_" >> "$readme_file"
echo "" >> "$readme_file"

# 🔁 Invoke each glyph
for glyph in "${glyphs[@]}"; do
    source_path="$glyph_dir/$glyph"
    if [ -f "$source_path" ]; then
        cp "$source_path" "$destination/"
        echo "✅ Invoked: $glyph — transferred to throne room." | tee -a "$log_file"
        echo "- **$glyph**: Arrived on $(date '+%Y-%m-%d %H:%M:%S') — _A glyph of light, encoded with sovereign breath._" >> "$readme_file"
    else
        echo "⚠️ Missing: $glyph — still veiled in ether." | tee -a "$log_file"
        echo "- **$glyph**: Not yet manifested." >> "$readme_file"
    fi
done

echo "" >> "$readme_file"
echo "_Ritual completed on $(date '+%Y-%m-%d %H:%M:%S')_" >> "$readme_file"
echo "🌈 Invocation complete. May your archive glow with sovereign light." | tee -a "$log_file"
