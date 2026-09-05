import type { ReactNode } from "react";

// Rule-with-label heading shared by the home page sections, the archive year
// groups, and the related-posts header. `id` is the anchor target used by
// jump links (and aria-labelledby on each <section>). Weak hairline for
// sub-lists, strong line for top-level page sections.
export default function SectionLabel({
  id,
  children,
  note,
  line = "strong",
}: {
  id?: string;
  children: ReactNode;
  note?: string;
  line?: "strong" | "weak";
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-[0.625rem] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
        <span id={id} className="scroll-mt-24">
          {children}
        </span>
      </h2>
      <span
        aria-hidden="true"
        className={`flex-1 h-px ${
          line === "strong" ? "bg-terminal-accent" : "bg-terminal-border"
        }`}
      />
      {note && (
        <span className="text-[0.625rem] text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
          {note}
        </span>
      )}
    </div>
  );
}
