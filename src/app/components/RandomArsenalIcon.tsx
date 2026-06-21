"use client";

import { useEffect, useState } from "react";
import ArsenalIcon from "./ArsenalIcon";
import ArsenalCannonIcon from "./ArsenalCannonIcon";

// Rolls a die on mount to show either the full crest or the cannon.
// The roll must run client-side: the site is a static export, so a
// build-time pick would be baked into the HTML and never change. Picking
// during render would also cause a hydration mismatch, hence useEffect.
const color = "text-neutral-900 dark:text-neutral-50";

export default function RandomArsenalIcon() {
  const [showCannon, setShowCannon] = useState<boolean | null>(null);

  useEffect(() => {
    setShowCannon(Math.random() < 0.5);
  }, []);

  // Fixed-size slot shared by both variants (and the pre-roll empty state),
  // so the footprint never changes regardless of which icon rolls. Sized to
  // fit the widest variant (the cannon, ~61px at h-7) and the tallest (the
  // square crest, 44px); right-aligned so the icon hugs the same edge.
  return (
    <span className="flex items-center justify-end w-16 h-11 shrink-0">
      {showCannon === null ? null : showCannon ? (
        <ArsenalCannonIcon className={`h-7 w-auto ${color}`} aria-hidden={true} />
      ) : (
        <ArsenalIcon className={`w-11 h-11 ${color}`} aria-hidden={true} />
      )}
    </span>
  );
}
