import { ImageResponse } from "next/og";
import { getTagCounts } from "@/lib/case-studies";
import { tagToSlug } from "@/data/case-study-tags";
import { loadRobotoMono, loadRomanesco } from "@/lib/og-font";

export const dynamic = "force-static";
export const alt = "Browse tags";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const tagCounts = getTagCounts();
  const topTags = tagCounts
    .slice(0, 10)
    .map(({ tag }) => `#${tagToSlug(tag)}`)
    .join("  ");
  const subtitle = `${tagCounts.length} tags in use`;

  const metaText = `~/ali-aljafferTags${subtitle}${topTags}`;
  const [regular, romanesco] = await Promise.all([
    loadRobotoMono(metaText, 400),
    loadRomanesco("Tags"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          backgroundColor: "#171717",
          color: "#f5f5f5",
          fontFamily: "Roboto Mono",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, opacity: 0.7 }}>
          ~/ali-aljaffer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{ display: "flex", fontFamily: "Romanesco", fontSize: 96 }}
          >
            Tags
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>
            {subtitle}
          </div>
          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontSize: 24,
              lineHeight: 1.6,
              opacity: 0.7,
            }}
          >
            {topTags}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Roboto Mono", data: regular, weight: 400, style: "normal" },
        { name: "Romanesco", data: romanesco, weight: 400, style: "normal" },
      ],
    },
  );
}
