"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface CaseStudyTocMenuProps {
  headings: { text: string; slug: string }[];
  active: string | null;
  className?: string;
}

export default function CaseStudyTocMenu({
  headings,
  active,
  className = "",
}: CaseStudyTocMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const ac = new AbortController();
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") setOpen(false);
      },
      { signal: ac.signal },
    );
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      },
      { signal: ac.signal },
    );
    return () => ac.abort();
  }, [open]);

  const current = headings.find((h) => h.slug === active) ?? headings[0];

  return (
    <div ref={rootRef} className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 text-sm w-full min-w-0 items-center gap-2 text-fg cursor-pointer"
      >
        <span className="truncate font-medium">{current.text}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`size-3 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        className="absolute left-0 right-0 top-full max-h-[70dvh] overflow-y-auto border-b border-terminal-border bg-terminal-bg px-6 py-2 shadow-lg"
      >
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              aria-current={h.slug === current.slug ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm ${
                h.slug === current.slug ? "font-bold text-fg" : "text-body"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
