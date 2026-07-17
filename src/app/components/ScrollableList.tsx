"use client";
import type { ReactNode } from "react";
import { useRef, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface ScrollableListProps {
  children: ReactNode;
  className?: string;
  direction?: "vertical" | "horizontal";
  /**
   * Size the list to its content's natural height instead of stretching to
   * fill the container. Pair with a `max-h-*` class on `className` so it
   * still clamps (and scrolls) once content exceeds the available space.
   */
  fitToContent?: boolean;
}

export default function ScrollableList({
  children,
  className = "",
  direction = "vertical",
  fitToContent = false,
}: ScrollableListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const isHorizontal = direction === "horizontal";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (fitToContent && !isHorizontal) {
        el.style.height = `${el.scrollHeight}px`;
      }

      const size = isHorizontal ? el.scrollWidth : el.scrollHeight;
      const client = isHorizontal ? el.clientWidth : el.clientHeight;
      const pos = isHorizontal ? el.scrollLeft : el.scrollTop;

      setHasMore(size > client + 4 && pos + client < size - 4);
      setHasPrev(pos > 4);
    };

    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [isHorizontal, fitToContent]);

  const scrollPrev = () =>
    ref.current?.scrollBy(
      isHorizontal
        ? { left: -150, behavior: "smooth" }
        : { top: -150, behavior: "smooth" }
    );

  const scrollNext = () =>
    ref.current?.scrollBy(
      isHorizontal
        ? { left: 150, behavior: "smooth" }
        : { top: 150, behavior: "smooth" }
    );

  return (
    <div className="relative md:flex-1 md:min-h-0">
      {hasPrev && (
        <>
          <div
            className={
              isHorizontal
                ? "absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none z-10"
                : "absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none z-10"
            }
          />
          <button
            onClick={scrollPrev}
            aria-label={isHorizontal ? "Scroll left" : "Scroll up"}
            className={
              isHorizontal
                ? "absolute left-1 top-1/2 -translate-y-1/2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 z-10"
                : "absolute top-1 left-1/2 -translate-x-1/2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 z-10"
            }
          >
            <FontAwesomeIcon
              icon={isHorizontal ? faChevronLeft : faChevronUp}
              className="w-3 h-3"
            />
          </button>
        </>
      )}
      <div ref={ref} className={className}>
        {children}
      </div>
      {hasMore && (
        <>
          <div
            className={
              isHorizontal
                ? "absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none"
                : "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-50 dark:from-neutral-900 to-transparent pointer-events-none"
            }
          />
          <button
            onClick={scrollNext}
            aria-label={isHorizontal ? "Scroll right" : "Scroll for more"}
            className={
              isHorizontal
                ? "absolute right-1 top-1/2 -translate-y-1/2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50"
                : "absolute bottom-1 left-1/2 -translate-x-1/2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50"
            }
          >
            <FontAwesomeIcon
              icon={isHorizontal ? faChevronRight : faChevronDown}
              className="w-3 h-3"
            />
          </button>
        </>
      )}
    </div>
  );
}
