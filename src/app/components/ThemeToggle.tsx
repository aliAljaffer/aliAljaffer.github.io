"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <span
        className={`text-[10px] uppercase tracking-[0.2em] opacity-0 ${className}`}
        aria-hidden
      >
        dark
      </span>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-3 h-3" />
      {isDark ? "light" : "dark"}
    </button>
  );
}
