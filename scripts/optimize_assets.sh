#!/usr/bin/env bash
# Optimize images and videos in-place (writes into an `optimized/` mirror)
# Usage: ./scripts/optimize_assets.sh [--dry-run] [--images-only] [--videos-only]

set -euo pipefail

ROOT="$(pwd)"
OUT_DIR="$ROOT/optimized"
DRY_RUN=0
IMAGES_ONLY=0
VIDEOS_ONLY=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift;;
    --images-only) IMAGES_ONLY=1; shift;;
    --videos-only) VIDEOS_ONLY=1; shift;;
    -h|--help)
      sed -n '1,200p' "$0";
      exit 0;;
    *) shift;;
  esac
done

mkdir -p "$OUT_DIR"

echo "Root: $ROOT"
echo "Out: $OUT_DIR"
if [[ $DRY_RUN -eq 1 ]]; then
  echo "DRY RUN: no files will be written"
fi

# Find images and videos
mapfile -t IMGS < <(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -not -path "./node_modules/*" -not -path "./dist/*")
mapfile -t VIDS < <(find . -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.webm" \) -not -path "./node_modules/*" -not -path "./dist/*")

echo "Images found: ${#IMGS[@]}"
echo "Videos found: ${#VIDS[@]}"

if [[ $IMAGES_ONLY -eq 1 ]]; then
  VIDS=()
fi
if [[ $VIDEOS_ONLY -eq 1 ]]; then
  IMGS=()
fi

# Utilities: commands used
CMD_FFMPEG=$(command -v ffmpeg || true)
CMD_CWEBP=$(command -v cwebp || true)
CMD_AVIFENC=$(command -v avifenc || true)

echo "ffmpeg: ${CMD_FFMPEG:-not-found}, cwebp: ${CMD_CWEBP:-not-found}, avifenc: ${CMD_AVIFENC:-not-found}"

process_image() {
  local src="$1"
  local rel=${src#./}
  local base="$OUT_DIR/$(dirname "$rel")"
  mkdir -p "$base"

  # target names
  local name=$(basename "$src")
  local noext="${name%.*}"
  local webp="$base/${noext}.webp"
  local avif="$base/${noext}.avif"
  local jpg="$base/${noext}.jpg"

  echo "[IMG] $rel -> webp,avif,jpg (max-width 1920, q=80, strip metadata)"
  if [[ $DRY_RUN -eq 1 ]]; then return; fi

  # Resize and convert to jpg baseline (strip metadata)
  if [[ -n "$CMD_FFMPEG" ]]; then
    # Use ffmpeg to resize, strip metadata and re-encode as jpg (visually lossless-ish)
    "$CMD_FFMPEG" -y -i "$src" -vf "scale='min(1920,iw)':-2" -q:v 2 -map_metadata -1 "$jpg"
  else
    echo "  ffmpeg not found; skipping jpg intermediary for $rel"
  fi

  # webp via cwebp if available, else via ffmpeg
  if [[ -n "$CMD_CWEBP" ]]; then
    # use quality 80
    if [[ -f "$jpg" ]]; then
      "$CMD_CWEBP" -q 80 "$jpg" -o "$webp"
    else
      "$CMD_CWEBP" -q 80 "$src" -o "$webp"
    fi
  elif [[ -n "$CMD_FFMPEG" ]]; then
    "$CMD_FFMPEG" -y -i "$src" -vf "scale='min(1920,iw)':-2" -map_metadata -1 -quality 80 "$webp"
  fi

  # avif via avifenc if present, else try ffmpeg
  if [[ -n "$CMD_AVIFENC" ]]; then
    if [[ -f "$jpg" ]]; then
      "$CMD_AVIFENC" --min 0 --max 63 -q 63 "$jpg" -o "$avif"
    else
      "$CMD_AVIFENC" --min 0 --max 63 -q 63 "$src" -o "$avif"
    fi
  elif [[ -n "$CMD_FFMPEG" ]]; then
    # ffmpeg av1 encode (may be slow)
    "$CMD_FFMPEG" -y -i "$src" -vf "scale='min(1920,iw)':-2" -map_metadata -1 -c:v libaom-av1 -crf 30 -b:v 0 "$avif" || true
  fi

  # remove intermediate jpg to save space
  if [[ -f "$jpg" ]]; then rm -f "$jpg"; fi
}

process_video() {
  local src="$1"
  local rel=${src#./}
  local base="$OUT_DIR/$(dirname "$rel")"
  mkdir -p "$base"

  local name=$(basename "$src")
  local noext="${name%.*}"
  local mp4="$base/${noext}.mp4"
  local webm="$base/${noext}.webm"
  local poster="$base/${noext}_poster.jpg"

  echo "[VID] $rel -> mp4(h264), webm(vp9), poster (720p if appropriate)"
  if [[ $DRY_RUN -eq 1 ]]; then return; fi

  if [[ -z "$CMD_FFMPEG" ]]; then
    echo "  ffmpeg not installed; skipping video: $rel"
    return
  fi

  # probe width to decide resize
  width=$($CMD_FFMPEG -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$src" || echo 0)
  target_w=1280
  target_h=720
  if [[ -n "$width" && "$width" -le 1280 ]]; then
    # keep original resolution
    scale_filter="scale=iw:ih"
  else
    scale_filter="scale=${target_w}:-2"
  fi

  # MP4 H.264 progressive
  "$CMD_FFMPEG" -y -i "$src" -vf "$scale_filter" -c:v libx264 -preset slow -crf 23 -b:v 1500k -c:a aac -b:a 128k -movflags +faststart -map_metadata -1 "$mp4"

  # WebM VP9
  "$CMD_FFMPEG" -y -i "$src" -vf "$scale_filter" -c:v libvpx-vp9 -b:v 0 -crf 30 -c:a libopus -b:a 96k -map_metadata -1 "$webm"

  # Poster
  "$CMD_FFMPEG" -y -ss 00:00:01 -i "$src" -frames:v 1 -q:v 2 "$poster" || true
}

for img in "${IMGS[@]}"; do
  process_image "$img"
done

for vid in "${VIDS[@]}"; do
  process_video "$vid"
done

echo "Done. Optimized files in: $OUT_DIR"
