import type { CaseStudy } from "@/app/types";
import { RiSeparator } from "react-icons/ri";

export default function CaseStudyHeader({
  caseStudy,
  readingMinutes,
}: {
  caseStudy: CaseStudy;
  readingMinutes: number;
}) {
  const formattedDate = new Date(caseStudy.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-4 pb-2 border-b border-terminal-border">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-terminal-accent">
        {caseStudy.name}
      </h1>
      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-600 dark:text-neutral-400">
        <time dateTime={caseStudy.date}>{formattedDate}</time>
        <RiSeparator className="w-6 h-6 shrink-0" aria-hidden="true" />
        <span>{readingMinutes} min read</span>
        {caseStudy.tags.length > 0 && (
          <>
            <RiSeparator className="w-6 h-6 shrink-0" aria-hidden="true" />
            <span>
              Tags:{" "}
              {caseStudy.tags.map((tag) => tag.toLowerCase()).join(", ")}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
