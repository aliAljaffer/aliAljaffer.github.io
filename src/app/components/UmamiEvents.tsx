"use client";

import { useEffect } from "react";

type Track = (name: string, data?: Record<string, unknown>) => void;
type UmamiWindow = Window & { umami?: { track: Track } };

const MARKS = [25, 50, 75, 100];

export default function UmamiEvents() {
  useEffect(() => {
    const track: Track = (name, data) => {
      const umami = (window as UmamiWindow).umami;
      if (umami && typeof umami.track === "function") umami.track(name, data);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;

      let url: URL;
      try {
        url = new URL(link.getAttribute("href") ?? "", location.href);
      } catch {
        return;
      }

      if (
        url.hostname === "resume.alialjaffer.com" ||
        /\.(pdf|zip|tar\.gz|tgz|dmg|pkg)$/i.test(url.pathname)
      ) {
        track("file-download", { file: url.pathname, path: location.pathname });
        return;
      }

      if (url.origin !== location.origin && /^https?:$/.test(url.protocol)) {
        track("outbound-link", {
          domain: url.hostname,
          target: url.pathname,
          path: location.pathname,
        });
      }
    };

    let seen = new Set<number>();
    let path = location.pathname;
    let timer: number | null = null;

    const depth = () => {
      // The site navigates client-side, so depth has to reset per path.
      if (location.pathname !== path) {
        path = location.pathname;
        seen = new Set<number>();
      }
      const root = document.documentElement;
      const total = root.scrollHeight - root.clientHeight;
      if (total <= 0) return;
      const percent = Math.min(100, Math.round((root.scrollTop / total) * 100));
      for (const mark of MARKS) {
        if (percent >= mark && !seen.has(mark)) {
          seen.add(mark);
          track("scroll-depth", { depth: mark, path });
        }
      }
    };

    const onScroll = () => {
      if (timer !== null) return;
      timer = window.setTimeout(() => {
        timer = null;
        depth();
      }, 200);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
