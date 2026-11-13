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
      className={`shrink-0 ${className}`}
    >
      <SectionLabel id="about-heading">About</SectionLabel>
      <p className="text-base leading-7 max-w-[72ch] text-body">
        I started as a web developer and slowly fell down the infrastructure
        rabbit hole - these days I build and run cloud platforms in Riyadh for
        Saudi AZM.
      </p>
    </section>
  );
}
