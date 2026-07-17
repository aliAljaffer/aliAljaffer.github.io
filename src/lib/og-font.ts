import "server-only";

// ImageResponse (Satori) needs a raw ttf/otf buffer, not woff/woff2, so the
// glyphs actually needed for a given card are fetched at build time. Node's
// default fetch UA (no browser UA header) is what gets Google to serve
// truetype instead of a compressed woff2 build.
async function loadGoogleFont(
  cssFamily: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${cssFamily}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error(`Could not resolve a ${cssFamily} font file`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export function loadRobotoMono(
  text: string,
  weight: 400 | 700,
): Promise<ArrayBuffer> {
  return loadGoogleFont("Roboto+Mono", weight, text);
}

// Romanesco only ships a single (regular) weight.
export function loadRomanesco(text: string): Promise<ArrayBuffer> {
  return loadGoogleFont("Romanesco", 400, text);
}
