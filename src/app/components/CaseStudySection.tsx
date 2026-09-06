import type { CaseStudy } from "@/app/types";
import ScrollableList from "@/app/components/ScrollableList";
import SectionLabel from "@/app/components/SectionLabel";
import PostRow from "@/app/components/PostRow";
import { DEV_MODE } from "@/lib/case-studies";

// Home page blog list: all posts and projects in one merged, date-sorted,
// scrollable list of dotted-leader rows. Takes the remaining height on md+
// screens so the whole page fits one screen.
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
      className={`py-4 flex-1 min-h-0 flex flex-col ${className}`}
    >
      <SectionLabel
        id={id}
        // note={`${items.length} ${items.length === 1 ? "post" : "posts"} · scrolls`}
      >
        {title}
      </SectionLabel>
      <ScrollableList
        fitToContent
        className="space-y-2.5 max-h-[40vh] md:max-h-full overflow-y-auto overflow-x-hidden scrollbar-hidden"
      >
        {items.map((item) => (
          <PostRow
            key={item.caseStudyId}
            item={item}
            showIcon
            ctaLabel={ctaLabel}
          />
        ))}
      </ScrollableList>
    </section>
  );
}
