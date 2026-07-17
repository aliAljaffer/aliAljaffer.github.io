import { ImageResponse } from "next/og";
import { getCaseStudy, getAllCaseStudyIds } from "@/lib/case-studies";
import { getMarkdownContent } from "@/lib/markdown-loader";
import { estimateReadingMinutes } from "@/lib/reading-time";
import { loadRobotoMono, loadRomanesco } from "@/lib/og-font";

export const alt = "Case study preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCaseStudyIds().map((id) => ({ id }));
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
  // Mirrors CaseStudyHeader.tsx's on-page meta line: date · reading time · Tags: a, b, c
  const metaParts = [
    formattedDate,
    `${readingMinutes} min read`,
    ...(tags.length > 0
      ? [`Tags: ${tags.map((t) => t.toLowerCase()).join(", ")}`]
      : []),
  ];
  const titleText = caseStudy?.name ?? "";
  const descriptionText = caseStudy?.description ?? "";
  const metaText = `~/ali-aljaffer${descriptionText}${metaParts.join(" · ")}`;

  const [regular, romanesco] = await Promise.all([
    loadRobotoMono(metaText, 400),
    loadRomanesco(titleText),
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
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Romanesco",
              fontSize: 84,
              lineHeight: 1.2,
            }}
          >
            {titleText}
          </div>
          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              fontSize: 28,
              lineHeight: 1.4,
              opacity: 0.85,
            }}
          >
            {descriptionText}
          </div>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.7 }}>
            {metaParts.join("  ·  ")}
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
