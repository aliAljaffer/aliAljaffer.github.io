"use client";

import { useEffect, useRef } from "react";

const REPO = "aliAljaffer/aliAljaffer.github.io";
const REPO_ID = "R_kgDOIZBWHA";
const CATEGORY = "Announcements";
const CATEGORY_ID = "DIC_kwDOIZBWHM4DBcZ5";

// Inlined as data: URIs (rather than fetched from our own domain) so giscus.app
// never needs a cross-origin request - no CORS config, no production dependency.
// Overrides only the documented giscus CSS custom properties, based on
// https://giscus.app/themes/{light,dark}.css (Primer / GitHub Inc., MIT License).
const GISCUS_LIGHT_CSS = `
main {
  --color-fg-default: #3b3144;
  --color-fg-muted: #5c5362;
  --color-fg-subtle: #89818a;
  --color-canvas-default: #fff9f2;
  --color-canvas-overlay: #fff9f2;
  --color-canvas-inset: #fffdfa;
  --color-canvas-subtle: #f6efe9;
  --color-border-default: #d8ccc9;
  --color-border-muted: #e6dbd4;
  --color-neutral-muted: #3b31441f;
  --color-accent-fg: #8c4f63;
  --color-accent-emphasis: #8c4f63;
  --color-accent-muted: #f4acb766;
  --color-accent-subtle: #fdf0f2;
  --color-btn-text: #3b3144;
  --color-btn-bg: #fffdfa;
  --color-btn-border: #d8ccc9;
  --color-btn-hover-bg: #fdf0f2;
  --color-btn-hover-border: #8c4f63;
  --color-btn-active-bg: #f7e3e7;
  --color-btn-active-border: #8c4f63;
  --color-btn-selected-bg: #f7e3e7;
  --color-btn-primary-text: #fff9f2;
  --color-btn-primary-bg: #3b3144;
  --color-btn-primary-border: #3b3144;
  --color-btn-primary-hover-bg: #574b64;
  --color-btn-primary-hover-border: #3b3144;
  --color-btn-primary-selected-bg: #574b64;
  --color-success-fg: #3f6f57;
  --color-attention-fg: #8a6a3f;
  --color-danger-fg: #a34a5f;
}
`;

const GISCUS_DARK_CSS = `
main {
  --color-fg-default: #f3ecef;
  --color-fg-muted: #b3adb6;
  --color-fg-subtle: #8f8797;
  --color-canvas-default: #161029;
  --color-canvas-overlay: #1d1529;
  --color-canvas-inset: #0f0a1d;
  --color-canvas-subtle: #221a30;
  --color-border-default: #3a2f4a;
  --color-border-muted: #2a2035;
  --color-neutral-muted: #ffffff1a;
  --color-accent-fg: #e0b1cb;
  --color-accent-emphasis: #e0b1cb;
  --color-accent-muted: #e0b1cb66;
  --color-accent-subtle: #2a2035;
  --color-btn-text: #f3ecef;
  --color-btn-bg: #1d1529;
  --color-btn-border: #3a2f4a;
  --color-btn-hover-bg: #2a2035;
  --color-btn-hover-border: #e0b1cb;
  --color-btn-active-bg: #352a44;
  --color-btn-active-border: #e0b1cb;
  --color-btn-selected-bg: #352a44;
  --color-btn-primary-text: #161029;
  --color-btn-primary-bg: #f3ecef;
  --color-btn-primary-border: #f3ecef;
  --color-btn-primary-hover-bg: #e0d6e2;
  --color-btn-primary-hover-border: #f3ecef;
  --color-btn-primary-selected-bg: #e0d6e2;
  --color-success-fg: #8fd3ae;
  --color-attention-fg: #f0cf8a;
  --color-danger-fg: #f5a0b1;
}
`;

function giscusThemeUrl(isDark: boolean) {
  const css = isDark ? GISCUS_DARK_CSS : GISCUS_LIGHT_CSS;
  return `data:text/css;charset=UTF-8,${encodeURIComponent(css)}`;
}

export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = document.documentElement.classList.contains("dark");
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", REPO);
    script.setAttribute("data-repo-id", REPO_ID);
    script.setAttribute("data-category", CATEGORY);
    script.setAttribute("data-category-id", CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", giscusThemeUrl(isDark));
    script.setAttribute("data-lang", "en");
    container.appendChild(script);

    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains("dark");
      const iframe = container.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame",
      );
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: giscusThemeUrl(nowDark) } } },
        "https://giscus.app",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-10 pt-6 border-t border-terminal-border"
    >
      <h2
        id="comments-heading"
        className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-neutral-600 dark:text-neutral-400"
      >
        Comments
      </h2>
      <div ref={containerRef} />
    </section>
  );
}
