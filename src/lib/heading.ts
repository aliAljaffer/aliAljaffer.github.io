import { slugify } from "@/lib/slug";

const MATH_SYMBOLS: Record<string, string> = {
  forall: "∀",
  exists: "∃",
  nexists: "∄",
  neg: "¬",
  lnot: "¬",
  implies: "⟹",
  impliedby: "⟸",
  iff: "⟺",
  to: "→",
  rightarrow: "→",
  leftrightarrow: "↔",
  land: "∧",
  wedge: "∧",
  lor: "∨",
  vee: "∨",
  oplus: "⊕",
  in: "∈",
  notin: "∉",
  subset: "⊂",
  subseteq: "⊆",
  cup: "∪",
  cap: "∩",
  emptyset: "∅",
  varnothing: "∅",
  leq: "≤",
  geq: "≥",
  neq: "≠",
  equiv: "≡",
  approx: "≈",
  times: "×",
  cdot: "·",
  therefore: "∴",
  because: "∵",
  top: "⊤",
  bot: "⊥",
};

const MATH_SPAN = /\$([^$\n]+)\$/g;

/** Markdown heading line to its text, with `##` markers removed. */
export function headingSource(line: string): string {
  return line
    .replace(/^#+\s*/, "")
    .replace(/\s*#+\s*$/, "")
    .trim();
}

/** Human-readable label: inline math becomes unicode symbols. */
export function headingLabel(raw: string): string {
  return raw.replace(MATH_SPAN, (_, tex: string) =>
    tex
      .replace(
        /\\([a-zA-Z]+)/g,
        (cmd: string, name: string) => MATH_SYMBOLS[name.toLowerCase()] ?? name,
      )
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

/** Anchor id. Math commands keep their names so slugs stay readable. */
export function headingSlug(raw: string): string {
  return slugify(
    raw.replace(MATH_SPAN, (_, tex: string) => tex.replace(/\\/g, " ")),
  );
}
