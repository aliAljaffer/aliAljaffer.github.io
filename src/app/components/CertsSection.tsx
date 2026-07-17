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
      className={`px-6 py-4 ${className}`}
    >
      <SectionLabel id="certs-heading">Certifications</SectionLabel>
      <ScrollableList className="space-y-2 md:max-h-[40vh] md:overflow-y-auto scrollbar-hidden">
        {certsData
          .sort((a, b) => b.order - a.order)
          .map((cert, i) => (
            <div key={i} className="flex justify-between gap-6 text-sm">
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${cert.name} (opens in new tab)`}
                className="flex items-center gap-2 tracking-wide hover:underline"
              >
                {cert.Icon && <cert.Icon className="w-5 h-5 shrink-0" />}
                {cert.name}
              </a>
              <span className="text-neutral-600 dark:text-neutral-400 shrink-0">
                {cert.date}
              </span>
            </div>
          ))}
      </ScrollableList>
    </section>
  );
}
