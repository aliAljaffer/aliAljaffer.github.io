import { getCaseStudiesByTag } from "@/lib/case-studies";
import { CASE_STUDY_TAGS, tagFromSlug, tagToSlug } from "@/data/case-study-tags";
import { brandCard, ogSize } from "@/lib/og";

export const alt = "Tag archive";
export const size = ogSize;
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

  return brandCard({ title: tag, subtitle });
}
