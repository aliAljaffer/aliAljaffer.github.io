import { getTagCounts } from "@/lib/case-studies";
import { tagToSlug } from "@/data/case-study-tags";
import { brandCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Browse tags";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const tagCounts = getTagCounts();
  const topTags = tagCounts
    .slice(0, 10)
    .map(({ tag }) => `#${tagToSlug(tag)}`)
    .join("  ");
  const subtitle = `${tagCounts.length} tags in use`;

  return brandCard({ title: "Tags", subtitle, meta: topTags, subtitleLines: 1 });
}
