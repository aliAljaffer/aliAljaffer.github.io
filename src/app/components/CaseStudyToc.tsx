"use client";
import { useEffect, useRef, useState } from "react";
import ScrollableList from "@/app/components/ScrollableList";

interface CaseStudyTocProps {
  headings: { text: string; slug: string }[];
}

export default function CaseStudyToc({ headings }: CaseStudyTocProps) {
  const [active, setActive] = useState<string | null>(null);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (headings.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!active) return;
    chipRefs.current[active]?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
    });
  }, [active]);

  if (headings.length < 2) return null;

  return (
    <ScrollableList
      direction="horizontal"
      className="flex gap-4 overflow-x-auto px-6 py-2 scrollbar-hidden"
    >
      {headings.map((h) => (
        <a
          key={h.slug}
          href={`#${h.slug}`}
          ref={(el) => {
            chipRefs.current[h.slug] = el;
          }}
          className={`text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-opacity ${
            active === h.slug
              ? "font-bold underline opacity-100"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {h.text}
        </a>
      ))}
    </ScrollableList>
  );
}
