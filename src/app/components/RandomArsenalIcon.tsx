"use client";

import { useSyncExternalStore } from "react";
import ArsenalIcon from "./ArsenalIcon";
import ArsenalCannonIcon from "./ArsenalCannonIcon";

// Shows either the full crest or the cannon. The roll must happen client-side:
// the site is a static export, so a build-time pick would be baked into the
// HTML and never change. Reading it as an external store keeps the first client
// render identical to the server's (null, an empty slot) without a hydration
// mismatch. The roll is cached per page load, so client-side navigation does
// not reshuffle the footer icon.
const color = "text-neutral-900 dark:text-neutral-50";

let roll: boolean | null = null;
const getRoll = () => (roll ??= Math.random() < 0.5);
const noRoll = () => null;
const neverChanges = () => () => {};

export default function RandomArsenalIcon() {
  const showCannon = useSyncExternalStore(neverChanges, getRoll, noRoll);

  // Fixed-size slot shared by both variants (and the pre-roll empty state),
  // so the footprint never changes regardless of which icon rolls. Sized to
  // fit the widest variant (the cannon, ~61px at h-7) and the tallest (the
  // square crest, 44px); right-aligned so the icon hugs the same edge.
  return (
    <span className="flex items-center justify-end w-16 h-11 shrink-0">
      {showCannon === null ? null : showCannon ? (
        <ArsenalCannonIcon
          className={`h-7 w-auto ${color}`}
          aria-hidden={true}
        />
      ) : (
        <ArsenalIcon className={`w-11 h-11 ${color}`} aria-hidden={true} />
      )}
    </span>
  );
}
