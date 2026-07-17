import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import { caseStudyIcons } from "@/data/case-study-icons";

// Shared card used by both the homepage Blog/Projects lists and the
// end-of-article related posts section.
export default function CaseStudyCard({
  item,
  ctaLabel,
  showType = false,
}: {
  item: CaseStudy;
  ctaLabel: string;
  showType?: boolean;
}) {
  const cta = ctaLabel || "Read article";
  const Icon = item.icon ? caseStudyIcons[item.icon] : undefined;

  return (
    <Link
      href={`/case-study/${item.caseStudyId}`}
      aria-label={`${item.name} - ${cta}`}
      className="group flex items-start justify-between gap-3 border border-terminal-border px-3 py-2 transition active:scale-[0.99] hover:border-terminal-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && <Icon className="w-7 h-7 shrink-0" aria-hidden="true" />}
        <div className="min-w-0">
          {showType && (
            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              [{item.type}]
            </p>
          )}
          <p className="text-sm font-bold leading-snug">{item.name}</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
            {item.description}
          </p>
        </div>
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
}
