import ScrollableList from "@/app/components/ScrollableList";
import SectionLabel from "@/app/components/SectionLabel";
import { certsData } from "@/data/profile";

export default function CertsSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      aria-labelledby="certs-heading"
      className={`shrink-0 py-4 ${className}`}
    >
      <SectionLabel id="certs-heading">Certifications</SectionLabel>
      <ScrollableList className="space-y-2">
        {certsData
          .sort((a, b) => b.order - a.order)
          .map((cert, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2.5 text-sm min-w-0"
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${cert.name} (opens in new tab)`}
                className="min-w-0 truncate tracking-wide hover:underline underline-offset-2"
              >
                <span className="md:hidden">{cert.short}</span>
                <span className="hidden md:inline">{cert.name}</span>
              </a>
              <span
                aria-hidden="true"
                className="flex-1 min-w-4 self-center border-b border-dotted border-neutral-400 dark:border-neutral-600"
              />
              <span className="shrink-0 text-xs text-neutral-600 dark:text-neutral-400">
                {cert.date}
              </span>
            </div>
          ))}
      </ScrollableList>
    </section>
  );
}
