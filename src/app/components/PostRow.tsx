import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import { postIcons, defaultPostIcon } from "@/data/post-icons";

// Dotted-leader list row for a post/project link. Shared by the home blog
// list, related posts, the archive, and tag pages. `showIcon` renders the
// post's brand icon in the leading slot (home blog list only).
export default function PostRow({
  item,
  showIcon = false,
  ctaLabel = "read more",
}: {
  item: CaseStudy;
  showIcon?: boolean;
  ctaLabel?: string;
}) {
  const date = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const Icon = postIcons[item.caseStudyId] ?? defaultPostIcon;
  return (
    <Link
      href={`/case-study/${item.caseStudyId}`}
      aria-label={`${item.name} - ${ctaLabel}`}
      className="group flex items-baseline gap-2.5 text-sm min-w-0"
    >
      {showIcon && (
        <span className="shrink-0 w-6 self-center flex items-center text-neutral-600 dark:text-neutral-400">
          <Icon className="w-4 h-4" aria-hidden="true" />
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
