import { ImageResponse } from "next/og";
import { getCaseStudiesByTag } from "@/lib/case-studies";
import { CASE_STUDY_TAGS, tagFromSlug, tagToSlug } from "@/data/case-study-tags";
import { loadRobotoMono, loadRomanesco } from "@/lib/og-font";

export const alt = "Tag archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CASE_STUDY_TAGS.filter(
    (tag) => getCaseStudiesByTag(tag).length > 0,
  ).map((tag) => ({ tag: tagToSlug(tag) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: slug } = await params;
  const tag = tagFromSlug(slug) ?? slug;
  const count = tagFromSlug(slug) ? getCaseStudiesByTag(tagFromSlug(slug)!).length : 0;
  const subtitle = `${count} ${count === 1 ? "post" : "posts"}  ·  #${slug}`;

  const metaText = `~/ali-aljaffer${tag}${subtitle}`;
  const [regular, romanesco] = await Promise.all([
    loadRobotoMono(metaText, 400),
    loadRomanesco(tag),
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
            style={{ display: "flex", fontFamily: "Romanesco", fontSize: 88 }}
          >
            {tag}
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>
            {subtitle}
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
