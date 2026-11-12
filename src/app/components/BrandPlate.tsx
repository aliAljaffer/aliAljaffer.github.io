"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "day" | "night";

const currentMode = (): Mode => (document.documentElement.classList.contains("dark") ? "night" : "day");

// The still is the LCP image, so the drifting layers wait for window load before they request anything.
export default function BrandPlate() {
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !stage.current) return;
    const el = stage.current;
    const theme = new MutationObserver(() => {
      setLoaded(0);
      setMode(currentMode());
    });
    const view = new IntersectionObserver(([entry]) => {
      setPaused(!entry.isIntersecting);
      if (entry.isIntersecting) setMode((m) => m ?? currentMode());
    });
    const start = () => {
      view.observe(el);
      theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      view.disconnect();
      theme.disconnect();
    };
  }, []);

  // The still shares the layers' overscanned box so the swap to the live layers doesn't shift or rescale.
  const still = "select-none plate-still";
  const live = loaded === 2;
  return (
    <div className="shrink-0 w-full max-w-4xl mx-auto px-6" aria-hidden="true">
      <div ref={stage} className={`plate-stage w-full aspect-[2000/420] max-h-40 ${live ? "live" : ""} ${paused ? "paused" : ""}`}>
        <img src="/brand/plate-day.webp" alt="" width={2000} height={420} decoding="async" fetchPriority="high" className={`${still} dark:hidden`} />
        <img src="/brand/plate-night.webp" alt="" width={2000} height={420} decoding="async" className={`${still} hidden dark:block`} />
        {mode &&
          (["sky", "cloud"] as const).map((layer) => (
            <img
              key={`${mode}-${layer}`}
              src={`/brand/plate-${mode}-${layer}.webp`}
              alt=""
              decoding="async"
              onLoad={() => setLoaded((n) => n + 1)}
              className={`plate-layer plate-${layer}`}
            />
          ))}
      </div>
    </div>
  );
}
