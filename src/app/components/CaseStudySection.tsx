import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import ScrollableList from "@/app/components/ScrollableList";
import SectionLabel from "@/app/components/SectionLabel";
import { DEV_MODE } from "@/lib/case-studies";

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
        className="space-y-4 max-h-[40vh] md:max-h-[85%] overflow-y-auto overflow-x-hidden scrollbar-hidden"
      >
        {items.map((item) => {
          const cta = ctaLabel || "Read article";
          return (
            <Link
              key={item.caseStudyId}
              href={`/case-study/${item.caseStudyId}`}
              aria-label={`${item.name} — ${cta}`}
              className="group flex items-start justify-between gap-3 border border-terminal-border px-3 py-2 transition active:scale-[0.99] hover:border-terminal-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold leading-snug">{item.name}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
              <span
                className="md:hidden shrink-0 mt-0.5 text-sm font-bold transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
              <span
                className="hidden md:block shrink-0 mt-0.5 text-xs font-bold whitespace-nowrap"
                aria-hidden="true"
              >
                [
                <span className="inline-flex items-center gap-1">
                  read
                  <span className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    →
                  </span>
                </span>
                ]
              </span>
            </Link>
          );
        })}
      </ScrollableList>
    </section>
  );
}
