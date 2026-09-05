import Link from "next/link";
import { contactData } from "@/data/profile";

// Typographic endnote footer shared by every page.
export default function Footer() {
  const socials = contactData.filter((c) => c.label !== "Resume");
  const linkClass =
    "hover:text-neutral-950 dark:hover:text-neutral-50 hover:underline underline-offset-2";

  return (
    <footer className="shrink-0 w-full px-6 py-3 border-t border-terminal-accent text-[0.6875rem] text-neutral-600 dark:text-neutral-400">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="flex items-center gap-4">
          © {new Date().getFullYear()} Ali Aljaffer
          <Link href="/archive" className={linkClass}>
            {"// archive"}
          </Link>
        </span>
        <span className="flex flex-wrap items-center gap-4">
          {socials.map((c) => (
            <a
              key={c.label}
              href={c.value}
              target="_blank"
              rel="noreferrer"
              aria-label={c.label}
              className={linkClass}
            >
              {c.label.toLowerCase()}
            </a>
          ))}
          <a href="/rss.xml" aria-label="RSS feed" className={linkClass}>
            rss
          </a>
        </span>
      </div>
    </footer>
  );
}
