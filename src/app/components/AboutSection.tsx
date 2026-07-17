import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RandomArsenalIcon from "@/app/components/RandomArsenalIcon";
import KubestronautIcon from "@/app/components/KubestronautIcon";
import SectionLabel from "@/app/components/SectionLabel";
import { contactData } from "@/data/profile";

export default function AboutSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      aria-labelledby="about-heading"
      className={`px-6 py-4 ${className}`}
    >
      <SectionLabel id="about-heading">About</SectionLabel>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-bold text-sm mb-0.5">Ali Aljaffer</p>
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
            DevOps Engineer
          </p>
        </div>
        <RandomArsenalIcon />
      </div>
      <p className="text-sm leading-5 text-neutral-700 dark:text-neutral-300">
        I started as a web developer and slowly fell down the infrastructure
        rabbit hole — these days I build and run cloud platforms in Riyadh for
        Saudi AZM. I&apos;m a{" "}
        <a
          href="https://www.cncf.io/training/kubestronaut/?_sft_lf-country=sa#:~:text=Ali-,Aljaffer,-(He/Him)"
          target="_blank"
          rel="noreferrer"
          aria-label="CNCF Kubestronaut (opens in new tab)"
          className="inline-flex items-center gap-1 align-middle hover:underline"
        >
          <KubestronautIcon className="w-6 h-6 shrink-0" aria-hidden={true} />
          Kubestronaut
        </a>
        , I run a 3-node Kubernetes cluster in my homelab for fun and
        expirementation, and I genuinely enjoy drawing architecture diagrams.
      </p>
      <nav
        aria-label="Social links"
        className="mt-3 flex flex-wrap gap-x-4 gap-y-2"
      >
        {contactData.map((c) => (
          <a
            key={c.label}
            href={c.value}
            target="_blank"
            rel="noreferrer"
            aria-label={`${c.label} (opens in new tab)`}
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            <FontAwesomeIcon icon={c.icon} className="w-7 h-7" />
            {c.handle}
          </a>
        ))}
      </nav>
    </section>
  );
}
