import { ImageResponse } from "next/og";
import { getCaseStudy, getAllCaseStudyIds } from "@/lib/case-studies";
import { getMarkdownContent } from "@/lib/markdown-loader";
import { estimateReadingMinutes } from "@/lib/reading-time";

export const alt = "Case study preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCaseStudyIds().map((id) => ({ id }));
}

// ImageResponse (Satori) needs a raw ttf/otf buffer, not woff/woff2, so the
// glyphs actually needed for this card are fetched at build time. Node's
// default fetch UA (no browser UA header) is what gets Google to serve
// truetype instead of a compressed woff2 build.
async function loadRobotoMono(
  text: string,
  weight: 400 | 700,
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Could not resolve a Roboto Mono font file");
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);
  const content = (await getMarkdownContent(id)) ?? "";
  const readingMinutes = estimateReadingMinutes(content);
  const formattedDate = caseStudy
    ? new Date(caseStudy.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const tags = caseStudy?.tags ?? [];

  const text = `~/ali-aljaffer${caseStudy?.name ?? ""}${formattedDate}${readingMinutes} min read${tags.map((t) => `[${t}]`).join("")}`;
  const [regular, bold] = await Promise.all([
    loadRobotoMono(text, 400),
    loadRobotoMono(text, 700),
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
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {caseStudy?.name}
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 26,
              opacity: 0.7,
            }}
          >
            <div style={{ display: "flex" }}>{formattedDate}</div>
            <div style={{ display: "flex" }}>{readingMinutes} min read</div>
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
              {tags.map((tag) => (
                <div key={tag} style={{ display: "flex" }}>
                  [{tag}]
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Roboto Mono", data: regular, weight: 400, style: "normal" },
        { name: "Roboto Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
