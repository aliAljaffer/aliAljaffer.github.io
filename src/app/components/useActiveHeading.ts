"use client";
import { useEffect, useState } from "react";

const ACTIVATION_LINE = 0.3;

export function useActiveHeading(slugs: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = slugs.join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const update = () => {
      const line = window.innerHeight * ACTIVATION_LINE;
      let current = els[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top > line) break;
        current = el;
      }
      setActive(current.id);
    };

    update();
    const ac = new AbortController();
    const opts = { passive: true, signal: ac.signal };
    window.addEventListener("scroll", update, opts);
    window.addEventListener("resize", update, opts);
    return () => ac.abort();
  }, [key]);

  return active;
}
