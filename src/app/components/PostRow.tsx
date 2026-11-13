import Link from "next/link";
import type { CaseStudy } from "@/app/types";
import { ViewTransition } from "react";
import { postIcons } from "@/data/post-icons";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// Dotted-leader list row for a post/project link. Shared by the home blog
// list, related posts, the archive, and tag pages. `showIcon` renders the
// post's brand icon in the leading slot (home blog list only).
export default function PostRow({
  item,
  showIcon = false,
}: {
  item: CaseStudy;
  showIcon?: boolean;
}) {
  const date = dateFormat.format(new Date(item.date));
  const Icon = postIcons[item.caseStudyId];
  return (
    <Link
      href={`/case-study/${item.caseStudyId}`}
      aria-label={`${item.name} - read more`}
      className="group flex items-baseline gap-2.5 text-base min-w-0"
    >
      {showIcon && Icon && (
        <span className="shrink-0 w-6 self-center flex items-center text-muted">
          <Icon className="w-4 h-4" aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0 truncate group-hover:underline underline-offset-2">
        <ViewTransition name={`title-${item.caseStudyId}`} share="morph">
          <span className="md:hidden">{item["short-title"] ?? item.name}</span>
          <span className="hidden md:inline">{item.name}</span>
        </ViewTransition>
      </span>
      <span
        aria-hidden="true"
        className="flex-1 min-w-4 self-center border-b border-dotted border-subtle"
      />
      <span className="shrink-0 text-xs text-muted">
        {date}
      </span>
    </Link>
  );
}
