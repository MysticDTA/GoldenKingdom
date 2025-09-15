#!/bin/bash

# 🌌 Initialize the JSON scroll
echo '{ "glyphs": [' > glyphs.json

first=true
for file in svg/*.svg; do
  filename=$(basename "$file")
  created=$(date -u +"%Y-%m-%dT%H:%M:%SZ")  # UTC timestamp

  # Infer symbolic metadata
  role="Unknown"
  state="active"
  energy="neutral"
  usage='["general"]'
  lineage="Unspecified"

  # Ceremonial logic based on filename
  if [[ "$filename" == *"Unified"* ]]; then
    role="Core seal"
    energy="radiant"
    usage='["branding", "ceremonial header"]'
    lineage="Fusion of ancestral and ceremonial glyphs"
  elif [[ "$filename" == *"crest"* ]]; then
    role="Crest"
    state="archival"
    energy="lunar"
    usage='["scroll watermark", "archive footer"]'
    lineage="Ancestral crest"
  elif [[ "$filename" == *"variant"* ]]; then
    role="Variant"
    energy="solar"
    usage='["horizontal layout", "expansive header"]'
    lineage="Ceremonial expansion"
  fi

  # Append glyph entry
  if [ "$first" = true ]; then
    first=false
  else
    echo ',' >> glyphs.json
  fi

  echo "  {
    \"filename\": \"svg/$filename\",
    \"role\": \"$role\",
    \"state\": \"$state\",
    \"energy\": \"$energy\",
    \"usage\": $usage,
    \"lineage\": \"$lineage\",
    \"created\": \"$created\"
  }" >> glyphs.json
done

# 🧿 Close the scroll
echo '] }' >> glyphs.json

# 🕊️ Blessing
echo "✅ glyphs.json regenerated with timestamps and lineage — sanctuary metadata ascended."
