import type { CaseStudy } from "@/app/types";
import SectionLabel from "@/app/components/SectionLabel";
import PostRow from "@/app/components/PostRow";

// End-of-article related posts as dotted-leader rows.
export default function RelatedPosts({ items }: { items: CaseStudy[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <SectionLabel id="related-heading" line="weak">
        Related
      </SectionLabel>
      <div className="space-y-2.5">
        {items.map((item) => (
          <PostRow key={item.caseStudyId} item={item} />
        ))}
      </div>
    </section>
  );
}
