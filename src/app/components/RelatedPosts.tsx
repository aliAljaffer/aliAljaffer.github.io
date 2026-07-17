import type { CaseStudy } from "@/app/types";
import CaseStudyCard from "@/app/components/CaseStudyCard";

export default function RelatedPosts({ items }: { items: CaseStudy[] }) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-10 pt-6 border-t border-terminal-border"
    >
      <h2
        id="related-heading"
        className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-neutral-600 dark:text-neutral-400"
      >
        Related
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <CaseStudyCard
            key={item.caseStudyId}
            item={item}
            ctaLabel="read more"
            showType
          />
        ))}
      </div>
    </section>
  );
}
