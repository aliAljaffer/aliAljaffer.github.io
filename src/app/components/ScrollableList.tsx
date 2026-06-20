"use client";
import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface ScrollableListProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollableList({
  children,
  className = "",
}: ScrollableListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      setHasMore(
        el.scrollHeight > el.clientHeight + 4 &&
          el.scrollTop + el.clientHeight < el.scrollHeight - 4
      );
      setHasPrev(el.scrollTop > 4);
    };

    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {hasPrev && (
        <>
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none z-10" />
          <button
            onClick={() => ref.current?.scrollBy({ top: -150, behavior: "smooth" })}
            aria-label="Scroll up"
            className="absolute top-1 left-1/2 -translate-x-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 z-10"
          >
            <FontAwesomeIcon icon={faChevronUp} className="w-3 h-3" />
          </button>
        </>
      )}
      <div ref={ref} className={className}>
        {children}
      </div>
      {hasMore && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none" />
          <button
            onClick={() => ref.current?.scrollBy({ top: 150, behavior: "smooth" })}
            aria-label="Scroll for more"
            className="absolute bottom-1 left-1/2 -translate-x-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
          </button>
        </>
      )}
    </div>
  );
}
