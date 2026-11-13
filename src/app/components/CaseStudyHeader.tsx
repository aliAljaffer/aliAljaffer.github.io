import Link from "next/link";
import { ViewTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import type { CaseStudy } from "@/app/types";
import { tagToSlug } from "@/data/case-study-tags";
import { SITE_URL } from "@/lib/site";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function CaseStudyHeader({
  caseStudy,
  readingMinutes,
}: {
  caseStudy: CaseStudy;
  readingMinutes: number;
}) {
  const formattedDate = dateFormat.format(new Date(caseStudy.date));

  const postUrl = `${SITE_URL}/case-study/${caseStudy.caseStudyId}/`;
  const shareText = `"${caseStudy.name}" - ${caseStudy.description} (${readingMinutes} min read)`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <header className="pb-6">
      <ViewTransition name={`title-${caseStudy.caseStudyId}`} share="morph">
      <h1 className="text-balance leading-tight text-terminal-accent text-[2rem] md:text-[length:var(--brand-h1-size)]">
        {caseStudy.name}
      </h1>
      </ViewTransition>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mt-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
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
                    className="brand-tag hover:underline hover:text-fg"
                  >
                    #{tagToSlug(tag)}
                  </Link>
                ))}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <span className="mr-1">Share</span>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            className="inline-flex size-7 items-center justify-center hover:text-fg"
          >
            <FontAwesomeIcon icon={faXTwitter} className="size-3.5" />
          </a>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex size-7 items-center justify-center hover:text-fg"
          >
            <FontAwesomeIcon icon={faLinkedin} className="size-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
