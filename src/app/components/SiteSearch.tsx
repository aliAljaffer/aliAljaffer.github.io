"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { caseStudyIcons } from "@/data/case-study-icons";

interface SearchItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  type: "blog" | "project";
  icon: string | null;
}

export default function SiteSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (isOpen && items === null) {
      fetch("/search-index.json")
        .then((res) => res.json())
        .then(setItems)
        .catch(() => setItems([]));
    }
  }, [isOpen, items]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveIndex(0);
      return;
    }
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "unset";
      cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const results = (items ?? [])
    .filter((item) => {
      if (!query.trim()) return false;
      const haystack =
        `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    })
    .slice(0, 8);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      window.location.href = `/case-study/${results[activeIndex].id}/`;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.2em] hover:opacity-75 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        aria-label="Search posts and projects"
      >
        <RiSearchLine className="w-5 h-5" aria-hidden="true" />
        <span className="hidden sm:inline">search</span>
        <span className="hidden sm:inline opacity-50">[/]</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-start pt-24 sm:pt-[15vh] px-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
          <div
            className="relative w-full max-w-lg bg-terminal-bg border border-terminal-border text-terminal-text font-mono flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-terminal-border px-3 py-2">
              <RiSearchLine
                className="w-4 h-4 shrink-0 text-terminal-comment"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="search posts and projects..."
                className="flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-terminal-comment"
                aria-label="Search posts and projects"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="shrink-0 text-xs font-bold text-terminal-comment hover:text-terminal-text"
                aria-label="Close search"
              >
                [×]
              </button>
            </div>
            <div className="h-96 overflow-y-auto">
              {query.trim() === "" ? (
                <p className="px-3 py-4 text-xs text-terminal-comment">
                  Type to search {items ? `${items.length} ` : ""}
                  posts and projects.
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-4 text-xs text-terminal-comment">
                  No matches for &quot;{query}&quot;.
                </p>
              ) : (
                <ul>
                  {results.map((item, i) => {
                    const Icon = item.icon
                      ? caseStudyIcons[item.icon]
                      : undefined;
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/case-study/${item.id}/`}
                          onClick={() => setIsOpen(false)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={`flex items-center gap-3 px-3 py-2 border-b border-terminal-border last:border-b-0 ${
                            i === activeIndex ? "bg-terminal-border" : ""
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className="w-5 h-5 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-terminal-comment">
                              [{item.type}]
                            </p>
                            <p className="text-sm font-bold truncate">
                              {item.name}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
