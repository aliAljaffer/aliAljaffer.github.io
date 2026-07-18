import Link from "next/link";
import { RiSeparator } from "react-icons/ri";
import ThemeToggle from "@/app/components/ThemeToggle";
import SiteSearch from "@/app/components/SiteSearch";
import { learning } from "@/data/profile";

const sectionJumps: { label: string; href: string }[] = [
  { label: "About", href: "#about-heading" },
  { label: "Certs", href: "#certs-heading" },
  { label: "Blog", href: "#blog-heading" },
  { label: "Projects", href: "#projects-heading" },
];

// Full-width, sticky, safe-area-aware header: logo, "currently learning"
// (desktop only), theme toggle, and a mobile-only section-jump nav.
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950">
      <div
        className="px-6 py-3 flex items-center gap-4"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="flex-1 min-w-0">
          <Link href="/" className="font-bold text-sm hover:opacity-75">
            ~/ali-aljaffer
          </Link>
        </div>
        {learning.length > 0 && (
          <p className="hidden md:flex items-center justify-center gap-3 text-xs whitespace-nowrap text-neutral-300 dark:text-neutral-600">
            <span>Currently learning:</span>
            {learning.map(({ name, icon: Icon, url }, i) => (
              <span key={name} className="flex items-center gap-3">
                {i > 0 && (
                  <RiSeparator className="w-6 h-6" aria-hidden="true" />
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} (opens in new tab)`}
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <Icon className="w-6 h-6" />
                  {name}
                </a>
              </span>
            ))}
          </p>
        )}
        <div className="flex-1 min-w-0 flex justify-end items-center gap-4">
          <SiteSearch />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile section jumps */}
      <nav
        aria-label="Jump to section"
        className="md:hidden flex items-center gap-3 overflow-x-auto scrollbar-hidden px-6 pb-2 border-t border-neutral-800 dark:border-neutral-300 pt-2"
      >
        {sectionJumps.map((s, i) => (
          <span key={s.href} className="flex items-center gap-3">
            {i > 0 && (
              <RiSeparator className="w-6 h-6 shrink-0" aria-hidden="true" />
            )}
            <a
              href={s.href}
              className="text-[0.625rem] tracking-[0.2em] uppercase whitespace-nowrap hover:opacity-75"
            >
              {s.label}
            </a>
          </span>
        ))}
      </nav>
    </header>
  );
}
