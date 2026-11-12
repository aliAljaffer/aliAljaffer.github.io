#!/bin/sh
# Vendor the theme from the main branch of the branding repo (export/ only).
set -eu
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
gh repo clone aliAljaffer/branding "$tmp/branding" -- --quiet --depth 1 --branch main --filter=blob:none --sparse
git -C "$tmp/branding" sparse-checkout set export
src="$tmp/branding/export"
rm -rf src/brand public/brand
mkdir -p src/brand/fonts public/brand
cp "$src/brand.json" "$src/portfolio.css" src/brand/
cp "$src"/fonts/*.ttf "$src"/fonts/OFL-*.txt src/brand/fonts/
cp "$src/plate-day.webp" "$src/plate-night.webp" "$src/icon.svg" "$src/icon-reversed.svg" public/brand/
cp "$src/icon.svg" src/app/icon.svg
echo "brand vendored from branding main ($(git -C "$tmp/branding" rev-parse --short HEAD))"
