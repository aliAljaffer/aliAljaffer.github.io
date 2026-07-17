import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiRssLine } from "react-icons/ri";
import { contactData } from "@/data/profile";

const linkClass =
  "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50";

export default function Footer() {
  const socials = contactData.filter((c) => c.label !== "Resume");

  return (
    <footer className="px-6 py-3 border-t border-neutral-950 dark:border-neutral-100 text-xs text-neutral-600 dark:text-neutral-400">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Ali Aljaffer</span>
        <div className="flex items-center gap-4">
          {socials.map((c) => (
            <a
              key={c.label}
              href={c.value}
              target="_blank"
              rel="noreferrer"
              aria-label={c.label}
              className={linkClass}
            >
              <FontAwesomeIcon icon={c.icon} className="w-4 h-4" />
            </a>
          ))}
          <a href="/rss.xml" aria-label="RSS feed" className={linkClass}>
            <RiRssLine className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
