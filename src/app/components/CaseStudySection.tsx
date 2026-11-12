import type { CaseStudy } from "@/app/types";
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
  className = "",
}: {
  id: string;
  title: string;
  items: CaseStudy[];
  className?: string;
}) {
  if (DEV_MODE) {
    items = [...items, ...items, ...items];
  }
  return (
    <section
      aria-labelledby={id}
      className={`py-4 ${className}`}
    >
      <SectionLabel id={id}>{title}</SectionLabel>
      <div className="space-y-2.5">
        {items.map((item) => (
          <PostRow key={item.caseStudyId} item={item} showIcon />
        ))}
      </div>
    </section>
  );
}
