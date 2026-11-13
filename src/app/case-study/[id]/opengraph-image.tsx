import { getCaseStudy, getAllCaseStudyIds } from "@/lib/case-studies";
import { getMarkdownContent } from "@/lib/markdown-loader";
import { estimateReadingMinutes } from "@/lib/reading-time";
import { brandCard, ogSize } from "@/lib/og";
import { tagToSlug } from "@/data/case-study-tags";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export const alt = "Case study preview";
export const size = ogSize;
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
    ? dateFormat.format(new Date(caseStudy.date))
    : "";
  const tags = caseStudy?.tags ?? [];
  // Mirrors CaseStudyHeader.tsx's on-page meta line: date - reading time - #tag1 #tag2
  const metaParts = [
    formattedDate,
    `${readingMinutes} min read`,
    ...(tags.length > 0
      ? [tags.map((t) => `#${tagToSlug(t)}`).join(" ")]
      : []),
  ];
  const titleText = caseStudy?.name ?? "";
  const descriptionText = caseStudy?.description ?? "";
  return brandCard({ title: titleText, subtitle: descriptionText, meta: metaParts.join("  ·  ") });
}
