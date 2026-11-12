#!/bin/sh
# Vendor the theme from the main branch of the branding repo (export/ only).
set -eu
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
gh repo clone aliAljaffer/branding "$tmp/branding" -- --quiet --depth 1 --branch main --filter=blob:none --sparse
# The partial clone fetches export/ lazily with plain git, so give this clone gh's credentials (GH_TOKEN in CI).
git -C "$tmp/branding" config credential.helper ''
git -C "$tmp/branding" config --add credential.helper '!gh auth git-credential'
git -C "$tmp/branding" sparse-checkout set export
src="$tmp/branding/export"
rm -rf src/brand public/brand
mkdir -p src/brand/fonts public/brand
cp "$src/brand.json" "$src/portfolio.css" src/brand/
cp "$src"/fonts/*.woff2 "$src"/fonts/OFL-*.txt src/brand/fonts/
cp "$src"/plate-*.webp "$src/icon.svg" "$src/icon-reversed.svg" public/brand/
cp "$src/favicon.svg" src/app/icon.svg
cp "$src/favicon.ico" src/app/favicon.ico
cp "$src/apple-touch-icon.png" "$src/icon-192.png" "$src/icon-512.png" public/icons/
node -e '
const fs = require("fs");
const brand = JSON.parse(fs.readFileSync("src/brand/brand.json", "utf8"));
const manifest = JSON.parse(fs.readFileSync("public/site.webmanifest", "utf8"));
manifest.background_color = brand.light.paper;
manifest.theme_color = brand.light.paper;
fs.writeFileSync("public/site.webmanifest", JSON.stringify(manifest, null, 2) + "\n");
'
echo "brand vendored from branding main ($(git -C "$tmp/branding" rev-parse --short HEAD))"
