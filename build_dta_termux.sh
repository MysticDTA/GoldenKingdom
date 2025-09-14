#!/data/data/com.termux/files/usr/bin/bash
# DivineTruthAscension — Termux Full PNG Builder + Composites + Favicons + PWA
# Usage:
#   ./build_dta_termux.sh
#   ./build_dta_termux.sh --push "git@github.com:USER/REPO.git" "main"

set -euo pipefail

# ------------ CONFIG ------------
LIGHT_SVG="DivineTruthAscension_Light.svg"
DARK_SVG="DivineTruthAscension_Dark.svg"
HERO_GOLDEN="hero_golden.png"
HERO_COSMIC="hero_cosmic.png"

OUT="DTA_release_png"
PKG_ZIP="DivineTruthAscension_PNG_Full.zip"

SIZES=(4096 2048 1024 512 256)
SF_SIZES=(512 256)

SQ=3000          # Square composite
HDR_W=3000       # Header width
HDR_H=1000       # Header height
IG=1080          # Instagram square

GLOW_ALPHA=0.60
BLUR_SQ=12
BLUR_HD=11
BLUR_IG=10

# ------------ DEP CHECKS ------------
need() { command -v "$1" >/dev/null 2>&1; }
die() { echo "Error: $1" >&2; exit 1; }

if need magick; then IM="magick"; else need convert || die "ImageMagick not found"; IM="convert"; fi
if need inkscape; then RASTERIZER="inkscape"; elif need rsvg-convert; then RASTERIZER="rsvg"; else die "Need inkscape or rsvg-convert"; fi
need zip || die "zip not found"

[[ -f "$LIGHT_SVG"  ]] || die "Missing $LIGHT_SVG"
[[ -f "$DARK_SVG"   ]] || die "Missing $DARK_SVG"
[[ -f "$HERO_GOLDEN" ]] || die "Missing $HERO_GOLDEN"
[[ -f "$HERO_COSMIC" ]] || die "Missing $HERO_COSMIC"

# ------------ PREP ------------
rm -rf "$OUT" "$PKG_ZIP"
mkdir -p "$OUT/png/light" "$OUT/png/dark" "$OUT/minimal" "$OUT/favicons" "$OUT/backgrounds" "$OUT/composites" "$OUT/pwa" "$OUT/_temp"
TEMP="$OUT/_temp"

# ------------ HELPERS ------------
svg2png() {
  local in="$1"
  local out="$2"
  local w="$3"
  local h="${4:-}"
  if [[ "$RASTERIZER" == "inkscape" ]]; then
    if [[ -n "$h" ]]; then
      inkscape "$in" --export-type=png --export-filename="$out" --export-width="$w" --export-height="$h" >/dev/null 2>&1
    else
      inkscape "$in" --export-type=png --export-filename="$out" --export-width="$w" >/dev/null 2>&1
    fi
  else
    if [[ -n "$h" ]]; then
      rsvg-convert -w "$w" -h "$h" -o "$out" "$in"
    else
      rsvg-convert -w "$w" -o "$out" "$in"
    fi
  fi
}

compose_with_glow() {
  # Arguments: bg.png logoWidth out.png blur alpha
  local bg="$1"
  local lw="$2"
  local out="$3"
  local blur="$4"
  local alpha="$5"
  local base="$TEMP/base.png"
  local logo="$TEMP/logo.png"
  local glow="$TEMP/glow.png"
  local prepbg="$TEMP/prepbg.png"

  case "$out" in
    *Square_*.png)
      $IM "$bg" -resize ${SQ}x${SQ}^ -gravity center -extent ${SQ}x${SQ} "$prepbg"
      ;;
    *Header_*x*.png)
      $IM "$bg" -resize ${HDR_W}x${HDR_H}^ -gravity center -extent ${HDR_W}x${HDR_H} "$prepbg"
      ;;
    *IG_*.png)
      $IM "$bg" -resize ${IG}x${IG}^ -gravity center -extent ${IG}x${IG} "$prepbg"
      ;;
    *)
      cp "$bg" "$prepbg"
      ;;
  esac

  svg2png "$DARK_SVG" "$logo" "$lw"
  $IM "$prepbg" "$logo" -gravity center -compose over -composite "$base"
  $IM "$logo" -blur 0x${blur} -alpha set -channel A -evaluate Multiply ${alpha} +channel "$glow"
  $IM "$base" "$glow" -gravity center -compose screen -composite "$out"
}

# ------------ EXPORT LOGOS ------------
echo "Exporting logo PNGs..."
for s in "${SIZES[@]}"; do
  svg2png "$LIGHT_SVG" "$OUT/png/light/DivineTruthAscension_Light_${s}.png" "$s"
  svg2png "$DARK_SVG"  "$OUT/png/dark/DivineTruthAscension_Dark_${s}.png"   "$s"
done

# Small-format variants
echo "Creating small-format SVG variants..."
LIGHT_SF="$TEMP/Light_SF.svg"
DARK_SF="$TEMP/Dark_SF.svg"

sed -e 's/stop-opacity="0\.40"/stop-opacity="0.34"/' \
    -e 's/opacity="0\.97"/opacity="0.92"/' \
    -e 's/opac.*0\.36" stroke="#C7A44B" stroke-width="1\.8"/opacity="0.28" stroke="#C7A44B" stroke-width="1.4"/' \
    "$LIGHT_SVG" > "$LIGHT_SF" || cp "$LIGHT_SVG" "$LIGHT_SF"

sed -e 's/stop-opacity="0\.57"/stop-opacity="0.50"/' \
    -e 's/opacity="0\.98"/opacity="0.93"/' \
    -e 's/opac.*0\.42" stroke="#C7A44B" stroke-width="2\.0"/opacity="0.32" stroke="#C7A44B" stroke-width="1.6"/' \
    "$DARK_SVG" > "$DARK_SF" || cp "$DARK_SVG" "$DARK_SF"

echo "Exporting small-format PNGs..."
for s in "${SF_SIZES[@]}"; do
  svg2png "$LIGHT_SF" "$OUT/png/light/DivineTruthAscension_Light_${s}_SF.png" "$s"
  svg2png "$DARK_SF"  "$OUT/png/dark/DivineTruthAscension_Dark_${s}_SF.png"   "$s"
done

# ------------ BACKGROUNDS ------------
echo "Preparing backgrounds..."
$IM "$HERO_GOLDEN" -resize 4096x4096^ -gravity center -extent 4096x4096 "$OUT/backgrounds/hero_golden_4096.png"
$IM "$HERO_GOLDEN" -resize 2048x2048^ -gravity center -extent 2048x2048 "$OUT/backgrounds/hero_golden_2048.png"
$IM "$HERO_COSMIC" -resize 4096x4096^ -gravity center -extent 4096x4096 "$OUT/backgrounds/hero_cosmic_4096.png"
$IM "$HERO_COSMIC" -resize 2048x2048^ -gravity center -extent 2048x2048 "$OUT/backgrounds/hero_cosmic_2048.png"

# ------------ COMPOSITES ------------
echo "Compositing over heroes..."
compose_with_glow "$OUT/backgrounds/hero_golden_4096.png" 2400 "$OUT/composites/DTA_Composite_Golden_Square_${SQ}.png" $BLUR_SQ $GLOW_ALPHA
compose_with_glow "$OUT/backgrounds/hero_golden_4096.png" 1600 "$OUT/composites/DTA_Composite_Golden_Header_${HDR_W}x${HDR_H}.png" $BLUR_HD $GLOW_ALPHA
compose_with_glow "$OUT/backgrounds/hero_golden_4096.png" 900  "$OUT/composites/DTA_Composite_Golden_IG_${IG}.png" $BLUR_IG $GLOW_ALPHA

compose_with_glow "$OUT/backgrounds/hero_cosmic_4096.png" 2400 "$OUT/composites/DTA_Composite_Cosmic_Square_${SQ}.png" $BLUR_SQ $GLOW_ALPHA
compose_with_glow "$OUT/backgrounds/hero_cosmic_4096.png" 1600 "$OUT/composites/DTA_Composite_Cosmic_Header_${HDR_W}x${HDR_H}.png" $BLUR_HD $GLOW_ALPHA
compose_with_glow "$OUT/backgrounds/hero_cosmic_4096.png" 900  "$OUT/composites/DTA_Composite_Cosmic_IG_${IG}.png" $BLUR_IG $GLOW_ALPHA

# ------------ ZIP ------------
( cd "$OUT" && zip -r "../$PKG_ZIP" . >/dev/null )
echo "Done. Output folder: $OUT"
echo "ZIP created: $PKG_ZIP"

# ------------ OPTIONAL GITHUB PUSH ------------
if [[ "${1:-}" == "--push" ]]; then
  REPO_URL="${2:-}"
  BRANCH="${3:-main}"
  [[ -n "$REPO_URL" ]] || die "Provide repo URL: ./build_dta_termux.sh --push git@github.com:USER/REPO.git main"
  echo "Pushing $OUT to $REPO_URL ($BRANCH)..."
  if [[ ! -d ".git" ]]; then git init && git branch -m "$BRANCH"; fi
  git config user.name  "DTA-Automation" || true
  git config user.email "no-reply@example.com" || true
  git add "$OUT" "$PKG_ZIP" || true
  git commit -m "Add DivineTruthAscension PNG package and ZIP" || true
  git remote remove origin 2>/dev/null || true
  git remote add origin "$REPO_URL"
  git push -u origin "$BRANCH"
  echo "Pushed to $REPO_URL"
fi
