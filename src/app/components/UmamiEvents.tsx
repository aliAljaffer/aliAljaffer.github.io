"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type EventData = Record<string, unknown>;
type Track = (name: string, data?: EventData) => void;
type UmamiWindow = Window & { umami?: { track: Track } };

const MARKS = [25, 50, 75, 100];
const pending: Array<[string, EventData | undefined]> = [];

function flush() {
  const umami = (window as UmamiWindow).umami;
  if (!umami || typeof umami.track !== "function") return;
  while (pending.length) {
    const [name, data] = pending.shift()!;
    umami.track(name, data);
  }
}

// The tracker loads after hydration, so queue events instead of dropping them.
const track: Track = (name, data) => {
  pending.push([name, data]);
  flush();
};

function pageType(pathname: string) {
  const marked = document
    .querySelector("[data-page-type]")
    ?.getAttribute("data-page-type");
  if (marked) return marked;
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return "home";
  if (segments[0] === "case-study") return "case-study";
  if (segments[0] === "tags") return segments.length > 1 ? "tag" : "tags";
  if (segments[0] === "archive") return "archive";
  return "page";
}

export default function UmamiEvents() {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("load", flush, true);
    flush();
  }, []);

  useEffect(() => {
    const type = pageType(pathname);
    track("page-type", {
      type,
      path: pathname,
      lang: document.documentElement.lang || "en",
      title: document.title,
    });
    if (type === "404") {
      track("page-404", {
        path: pathname,
        referrer: document.referrer || "direct",
      });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const image = target.closest("button[aria-label^='Enlarge image']");
      if (image) {
        track("image-open", {
          alt: image.getAttribute("aria-label")?.replace("Enlarge image: ", "") ?? "",
          path: location.pathname,
        });
        return;
      }

      const share = target.closest("a[aria-label^='Share on ']");
      if (share) {
        track("share", {
          network: share
            .getAttribute("aria-label")!
            .replace("Share on ", "")
            .trim(),
          path: location.pathname,
        });
        return;
      }

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      let url: URL;
      try {
        url = new URL(link.getAttribute("href") ?? "", location.href);
      } catch {
        return;
      }

      if (
        url.hash &&
        url.origin === location.origin &&
        url.pathname === location.pathname
      ) {
        track("toc-jump", {
          target: url.hash.slice(1),
          path: location.pathname,
        });
        return;
      }

      if (url.pathname === "/rss.xml") {
        track("rss-click", { path: location.pathname });
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

    const root = document.documentElement;
    let scheme = root.classList.contains("dark") ? "dark" : "light";
    const observer = new MutationObserver(() => {
      const next = root.classList.contains("dark") ? "dark" : "light";
      if (next === scheme) return;
      scheme = next;
      track("theme-change", { scheme: next, path: location.pathname });
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

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
      observer.disconnect();
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
