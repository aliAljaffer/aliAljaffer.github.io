import KubestronautIcon from "@/app/components/KubestronautIcon";
import SectionLabel from "@/app/components/SectionLabel";

// Pure-text about block. The name, role, and social links live in the
// masthead; only the paragraph lives here.
export default function AboutSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      aria-labelledby="about-heading"
      className={`shrink-0 py-4 ${className}`}
    >
      <SectionLabel id="about-heading">About</SectionLabel>
      <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300 max-w-[820px]">
        I started as a web developer and slowly fell down the infrastructure
        rabbit hole - these days I build and run cloud platforms in Riyadh for
        Saudi AZM. I&apos;m a{" "}
        <a
          href="https://www.cncf.io/training/kubestronaut/?_sft_lf-country=sa#:~:text=Ali-,Aljaffer,-(He/Him)"
          target="_blank"
          rel="noreferrer"
          aria-label="CNCF Kubestronaut (opens in new tab)"
          className="inline-flex items-center gap-1 align-middle underline font-bold underline-offset-2 hover:no-underline"
        >
          <KubestronautIcon className="w-6 h-6 shrink-0" aria-hidden={true} />
          Kubestronaut
        </a>
        , I run a 3-node Kubernetes cluster in my homelab for fun and
        expirementation, and I genuinely enjoy drawing architecture diagrams.
      </p>
    </section>
  );
}
