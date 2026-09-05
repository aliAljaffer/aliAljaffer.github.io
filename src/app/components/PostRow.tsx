import Link from "next/link";
import type { CaseStudy } from "@/app/types";

// Dotted-leader list row for a post/project link. Shared by the home blog
// list, related posts, the archive, and tag pages. `index` renders the
// zero-padded position number (home blog list only).
export default function PostRow({
  item,
  index,
  ctaLabel = "read more",
}: {
  item: CaseStudy;
  index?: number;
  ctaLabel?: string;
}) {
  const date = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <Link
      href={`/case-study/${item.caseStudyId}`}
      aria-label={`${item.name} - ${ctaLabel}`}
      className="group flex items-baseline gap-2.5 text-sm min-w-0"
    >
      {typeof index === "number" && (
        <span className="shrink-0 w-6 text-xs text-neutral-600 dark:text-neutral-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className="min-w-0 truncate group-hover:underline underline-offset-2">
        <span className="md:hidden">{item["short-title"] ?? item.name}</span>
        <span className="hidden md:inline">{item.name}</span>
      </span>
      <span
        aria-hidden="true"
        className="flex-1 min-w-4 self-center border-b border-dotted border-neutral-400 dark:border-neutral-600"
      />
      <span className="shrink-0 text-xs text-neutral-600 dark:text-neutral-400">
        {date}
      </span>
    </Link>
  );
}
