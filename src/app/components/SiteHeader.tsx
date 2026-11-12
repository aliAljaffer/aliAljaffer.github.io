import { contactData, learning } from "@/data/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggle from "@/app/components/ThemeToggle";
import RandomArsenalIcon from "@/app/components/RandomArsenalIcon";

// Typographic masthead for the home page: name left with the Arsenal crest
// pinned right on the first row, role and socials on the second. Replaces the
// old black bar header.
export default function SiteHeader() {
  return (
    <header className="shrink-0 w-full max-w-4xl mx-auto px-6 pt-4 pb-3">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/brand/icon.svg" alt="" width={34} height={34} className="block dark:hidden" style={{ width: "var(--brand-logo-size)", height: "var(--brand-logo-size)" }} />
          <img src="/brand/icon-reversed.svg" alt="" width={34} height={34} className="hidden dark:block" style={{ width: "var(--brand-logo-size)", height: "var(--brand-logo-size)" }} />
          <h1 className="masthead-name text-[1.75rem] md:text-[2.25rem] leading-tight">
            Ali Aljaffer
          </h1>
        </div>
        <RandomArsenalIcon />
      </div>
      <div className="flex flex-wrap items-end  justify-between gap-x-6 gap-y-3 mt-1.5">
        <div className="min-w-0">
          <p className="brand-label text-neutral-600 dark:text-neutral-400">
            Platform Engineer · Riyadh, KSA
          </p>
          {learning.length > 0 && (
            <p className="hidden md:flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              <span>currently learning:</span>
              {learning.map(({ name, url, icon: Icon }, i) => (
                <span key={name} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} (opens in new tab)`}
                    className="flex items-center gap-1 hover:underline hover:text-neutral-950 dark:hover:text-neutral-50"
                  >
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    {name.toLowerCase()}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>
        <nav
          aria-label="Social links"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400"
        >
          {contactData.map((c) => (
            <a
              key={c.label}
              href={c.value}
              target="_blank"
              rel="noreferrer"
              aria-label={`${c.label} (opens in new tab)`}
              className="flex items-center gap-1.5 hover:text-neutral-950 dark:hover:text-neutral-50"
            >
              {typeof c.icon === "function" ? (
                <c.icon className="w-3 h-3" aria-hidden="true" />
              ) : (
                <FontAwesomeIcon
                  icon={c.icon}
                  className="w-3 h-3"
                  aria-hidden="true"
                />
              )}
              {c.label.toLowerCase()}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
