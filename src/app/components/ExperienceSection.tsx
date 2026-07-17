import SectionLabel from "@/app/components/SectionLabel";
import { experienceData } from "@/data/profile";

export default function ExperienceSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      aria-labelledby="experience-heading"
      className={`px-6 py-4 ${className}`}
    >
      <SectionLabel id="experience-heading">Experience</SectionLabel>
      <div className="space-y-2">
        {experienceData.map((exp) => (
          <div
            key={exp.company}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span className="flex items-center gap-2">
              {exp.Icon && <exp.Icon className="w-5 h-5 shrink-0" />}
              <span className="font-bold">{exp.title}</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                at {exp.company}
              </span>
            </span>
            {exp.current && (
              <span className="text-[10px] uppercase tracking-wide text-neutral-500 shrink-0">
                [current]
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
