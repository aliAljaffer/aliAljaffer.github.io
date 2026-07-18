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
  --color-fg-default: #111111;
  --color-fg-muted: #525252;
  --color-fg-subtle: #737373;
  --color-canvas-default: #fafafa;
  --color-canvas-overlay: #fafafa;
  --color-canvas-inset: #ffffff;
  --color-canvas-subtle: #f5f5f5;
  --color-border-default: #0a0a0a;
  --color-border-muted: #e5e7eb;
  --color-neutral-muted: #e5e5e580;
  --color-accent-fg: #0a0a0a;
  --color-accent-emphasis: #0a0a0a;
  --color-accent-muted: #d4d4d466;
  --color-accent-subtle: #f5f5f5;
  --color-btn-text: #111111;
  --color-btn-bg: #fafafa;
  --color-btn-border: #0a0a0a;
  --color-btn-hover-bg: #f0f0f0;
  --color-btn-hover-border: #0a0a0a;
  --color-btn-active-bg: #e5e5e5;
  --color-btn-active-border: #0a0a0a;
  --color-btn-selected-bg: #e5e5e5;
  --color-btn-primary-text: #fafafa;
  --color-btn-primary-bg: #0a0a0a;
  --color-btn-primary-border: #0a0a0a;
  --color-btn-primary-hover-bg: #262626;
  --color-btn-primary-hover-border: #0a0a0a;
  --color-btn-primary-selected-bg: #262626;
  --color-success-fg: #166534;
  --color-attention-fg: #854d0e;
  --color-danger-fg: #b91c1c;
}
`;

const GISCUS_DARK_CSS = `
main {
  --color-fg-default: #f5f5f5;
  --color-fg-muted: #a3a3a3;
  --color-fg-subtle: #a3a3a3;
  --color-canvas-default: #171717;
  --color-canvas-overlay: #171717;
  --color-canvas-inset: #0a0a0a;
  --color-canvas-subtle: #262626;
  --color-border-default: #f5f5f5;
  --color-border-muted: #262626;
  --color-neutral-muted: #40404080;
  --color-accent-fg: #f5f5f5;
  --color-accent-emphasis: #f5f5f5;
  --color-accent-muted: #52525266;
  --color-accent-subtle: #262626;
  --color-btn-text: #f5f5f5;
  --color-btn-bg: #171717;
  --color-btn-border: #f5f5f5;
  --color-btn-hover-bg: #262626;
  --color-btn-hover-border: #f5f5f5;
  --color-btn-active-bg: #333333;
  --color-btn-active-border: #f5f5f5;
  --color-btn-selected-bg: #333333;
  --color-btn-primary-text: #171717;
  --color-btn-primary-bg: #f5f5f5;
  --color-btn-primary-border: #f5f5f5;
  --color-btn-primary-hover-bg: #d4d4d4;
  --color-btn-primary-hover-border: #f5f5f5;
  --color-btn-primary-selected-bg: #d4d4d4;
  --color-success-fg: #4ade80;
  --color-attention-fg: #facc15;
  --color-danger-fg: #f87171;
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
