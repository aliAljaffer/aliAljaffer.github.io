import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import ScrollableList from "@/app/components/ScrollableList";
import SectionLabel from "@/app/components/SectionLabel";

// Shared section for the Blog and Projects lists — same markup, differing only
// in heading, items, and the screen-reader CTA on each link.
export default function CaseStudySection({
  id,
  title,
  items,
  ctaLabel,
  className = "",
}: {
  id: string;
  title: string;
  items: CaseStudy[];
  ctaLabel: string;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={`px-6 ${className}`}>
      <SectionLabel id={id}>{title}</SectionLabel>
      <ScrollableList className="space-y-4 md:max-h-[60vh] md:overflow-y-auto scrollbar-visible">
        {items.map((item) => (
          <Link
            key={item.caseStudyId}
            href={`/case-study/${item.caseStudyId}`}
            aria-label={`${item.name} — ${ctaLabel}`}
            className="flex justify-between items-start gap-4 group"
          >
            <div>
              <p className="text-sm font-bold leading-snug group-hover:underline">
                {item.name}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
                {item.description}
              </p>
            </div>
            <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </ScrollableList>
    </section>
  );
}
