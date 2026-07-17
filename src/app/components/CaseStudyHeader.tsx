import type { CaseStudy } from "@/app/types";
import { RiSeparator } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SITE_URL } from "@/lib/site";

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

  const postUrl = `${SITE_URL}/case-study/${caseStudy.caseStudyId}/`;
  const shareText = `"${caseStudy.name}" - ${caseStudy.description} (${readingMinutes} min read)`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <div className="mb-4 pb-2 border-b border-terminal-border">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-terminal-accent">
        {caseStudy.name}
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
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
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={xShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
          </a>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
