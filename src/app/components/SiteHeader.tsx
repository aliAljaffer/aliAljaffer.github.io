import { contactData, learning } from "@/data/profile";
import ThemeToggle from "@/app/components/ThemeToggle";
import RandomArsenalIcon from "@/app/components/RandomArsenalIcon";

// Typographic masthead for the home page: name left with the Arsenal crest
// pinned right on the first row, role and socials on the second. Replaces the
// old black bar header.
export default function SiteHeader() {
  return (
    <header className="shrink-0 w-full max-w-[1100px] mx-auto px-6 pt-7 pb-4">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-[1.375rem] md:text-[1.625rem] font-bold leading-tight">
          Ali Aljaffer
        </h1>
        <RandomArsenalIcon />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mt-1.5">
        <div className="min-w-0">
          <p className="text-[0.625rem] uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400">
            Platform Engineer · Riyadh, KSA
          </p>
          {learning.length > 0 && (
            <p className="hidden md:flex items-center gap-2 text-[0.625rem] text-neutral-500 dark:text-neutral-500 mt-2">
              <span>currently learning:</span>
              {learning.map(({ name, url }, i) => (
                <span key={name} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} (opens in new tab)`}
                    className="hover:underline hover:text-neutral-950 dark:hover:text-neutral-50"
                  >
                    {name.toLowerCase()}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>
        <nav
          aria-label="Social links"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] text-neutral-600 dark:text-neutral-400"
        >
          {contactData.map((c) => (
            <a
              key={c.label}
              href={c.value}
              target="_blank"
              rel="noreferrer"
              aria-label={`${c.label} (opens in new tab)`}
              className="hover:text-neutral-950 dark:hover:text-neutral-50"
            >
              {c.label.toLowerCase()}
            </a>
          ))}
          <a
            href="/rss.xml"
            aria-label="RSS feed"
            className="hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            rss
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
