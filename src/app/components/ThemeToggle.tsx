"use client";
import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// The theme lives on <html>, set by an inline script before paint, so the
// server cannot know it. Reading it as an external store keeps the first client
// render identical to the server's (null, the hidden placeholder), and the
// observer picks up class changes made outside this component.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const readTheme = () => document.documentElement.classList.contains("dark");
const noTheme = () => null;

export default function ThemeToggle({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const isDark = useSyncExternalStore(subscribe, readTheme, noTheme);

  if (isDark === null) {
    return (
      <span
        className={`text-[10px] uppercase tracking-[0.2em] opacity-0 ${className}`}
        style={style}
        aria-hidden
      >
        dark
      </span>
    );
  }

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      style={style}
      className={`flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.2em] hover:opacity-75 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-5 h-5" />
      {isDark ? "light" : "dark"}
    </button>
  );
}
