import Link from "next/link";

// Typographic endnote footer. The top rule is constrained to the content
// column (not the full viewport) so it lines up with the page above it.
export default function Footer() {
  const linkClass =
    "hover:text-neutral-950 dark:hover:text-neutral-50 hover:underline underline-offset-2";

  return (
    <footer className="shrink-0 w-full px-6 pb-5 text-[0.6875rem] text-neutral-600 dark:text-neutral-400">
      <div className="max-w-4xl mx-auto pt-3 border-t border-terminal-accent flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span>© {new Date().getFullYear()} Ali Aljaffer</span>
        <span className="flex items-center gap-4">
          <Link href="/archive" className={linkClass}>
            {"// archive"}
          </Link>
          <a href="/rss.xml" aria-label="RSS feed" className={linkClass}>
            rss
          </a>
        </span>
      </div>
    </footer>
  );
}
