import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import { tagToSlug } from "@/data/case-study-tags";
import { SITE_URL } from "@/lib/site";

export default function CaseStudyHeader({
  caseStudy,
  readingMinutes,
}: {
  caseStudy: CaseStudy;
  readingMinutes: number;
}) {
  const formattedDate = new Date(caseStudy.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const postUrl = `${SITE_URL}/case-study/${caseStudy.caseStudyId}/`;
  const shareText = `"${caseStudy.name}" - ${caseStudy.description} (${readingMinutes} min read)`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <header className="pb-6">
      <h1 className="leading-tight text-terminal-accent text-[2rem] md:text-[length:var(--brand-h1-size)]">
        {caseStudy.name}
      </h1>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mt-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
          <time dateTime={caseStudy.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes} min read</span>
          {caseStudy.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex flex-wrap gap-x-1.5 gap-y-1.5 font-mono">
                {caseStudy.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tagToSlug(tag)}/`}
                    className="brand-tag hover:underline hover:text-neutral-950 dark:hover:text-neutral-50"
                  >
                    #{tagToSlug(tag)}
                  </Link>
                ))}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
          <span>share</span>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            className="hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            x
          </a>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            className="hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            in
          </a>
        </div>
      </div>
    </header>
  );
}
