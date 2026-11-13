"use client";
import { useEffect, useRef } from "react";
import ScrollableList from "@/app/components/ScrollableList";
import CaseStudyTocMenu from "@/app/components/CaseStudyTocMenu";
import { useActiveHeading } from "@/app/components/useActiveHeading";

interface CaseStudyTocProps {
  headings: { text: string; slug: string }[];
}

export default function CaseStudyToc({ headings }: CaseStudyTocProps) {
  const active = useActiveHeading(headings.map((h) => h.slug));
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (!active) return;
    chipRefs.current[active]?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
    });
  }, [active]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="min-w-0 flex-1">
      <CaseStudyTocMenu
        headings={headings}
        active={active}
        className="md:hidden"
      />
      <ScrollableList
        direction="horizontal"
        className="hidden md:flex items-center gap-4 overflow-x-auto snap-x snap-proximity py-2.5 scrollbar-hidden"
      >
        {headings.map((h) => (
          <a
            key={h.slug}
            href={`#${h.slug}`}
            ref={(el) => {
              chipRefs.current[h.slug] = el;
            }}
            aria-current={active === h.slug ? "true" : undefined}
            className={`brand-label whitespace-nowrap snap-start ${
              active === h.slug
                ? "brand-pill font-bold text-fg"
                : "text-muted hover:text-fg"
            }`}
          >
            {h.text}
          </a>
        ))}
      </ScrollableList>
    </nav>
  );
}
