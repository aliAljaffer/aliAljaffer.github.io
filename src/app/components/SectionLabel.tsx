import type { ReactNode } from "react";

// Shared heading for the home page's grid sections. `id` is the anchor target
// used by the header's jump links (and aria-labelledby on each <section>).
export default function SectionLabel({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 className="text-[0.625rem] uppercase tracking-[0.2em] font-bold border-b border-neutral-950 dark:border-neutral-100 pb-2 mb-3">
      <span id={id} className="scroll-mt-28 md:scroll-mt-20">
        {children}
      </span>
    </h2>
  );
}
