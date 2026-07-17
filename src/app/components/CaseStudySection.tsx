import type { CaseStudy } from "@/app/types";
import ScrollableList from "@/app/components/ScrollableList";
import SectionLabel from "@/app/components/SectionLabel";
import CaseStudyCard from "@/app/components/CaseStudyCard";
import { DEV_MODE } from "@/lib/case-studies";

// Shared section for the Blog and Projects lists - same markup, differing only
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
  if (DEV_MODE) {
    items = [...items, ...items, ...items];
  }
  return (
    <section
      aria-labelledby={id}
      className={`px-6 md:flex md:flex-col md:min-h-0 md:overflow-hidden ${className}`}
    >
      <SectionLabel id={id}>{title}</SectionLabel>
      <ScrollableList
        fitToContent
        className="space-y-4 max-h-[40vh] md:max-h-full overflow-y-auto overflow-x-hidden scrollbar-hidden"
      >
        {items.map((item) => (
          <CaseStudyCard key={item.caseStudyId} item={item} ctaLabel={ctaLabel} />
        ))}
      </ScrollableList>
    </section>
  );
}
