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

  // Before the roll resolves, reserve space to avoid layout shift.
  if (showCannon === null) {
    return <span aria-hidden className="block w-8 h-8 shrink-0" />;
  }

  return showCannon ? (
    <ArsenalCannonIcon
      className={`h-5 w-auto shrink-0 ${color}`}
      aria-label="Arsenal F.C. supporter"
    />
  ) : (
    <ArsenalIcon
      className={`w-8 h-8 shrink-0 ${color}`}
      aria-label="Arsenal F.C. supporter"
    />
  );
}
