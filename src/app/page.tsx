import type { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import RandomArsenalIcon from "@/app/components/RandomArsenalIcon";
import { getVisibleCaseStudies } from "@/lib/case-studies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiSeparator } from "react-icons/ri";
import ScrollableList from "@/app/components/ScrollableList";
import KubestronautIcon from "@/app/components/KubestronautIcon";
import { contactData, certsData, learning } from "@/data/profile";

const sectionJumps: { label: string; href: string }[] = [
  { label: "About", href: "#about-heading" },
  { label: "Certs", href: "#certs-heading" },
  { label: "Blog", href: "#blog-heading" },
  { label: "Projects", href: "#projects-heading" },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-neutral-950 dark:border-neutral-100 pb-2 mb-3">
      {children}
    </h2>
  );
}

export default function Home() {
  const projects = getVisibleCaseStudies("project") ?? [];
  const blogPosts = getVisibleCaseStudies("blog") ?? [];
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 font-mono min-h-dvh flex flex-col">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-[60] focus:bg-neutral-950 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Header bar — full-width, sticky, safe-area aware */}
      <header className="sticky top-0 z-50 w-full bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950">
        <div
          className="px-6 py-3 flex items-center gap-4"
          style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
          <div className="flex-1 min-w-0">
            <Link href="/" className="font-bold text-sm hover:opacity-75">
              ~/ali-aljaffer
            </Link>
          </div>
          {learning.length > 0 && (
            <p className="hidden md:flex items-center justify-center gap-3 text-xs whitespace-nowrap text-neutral-300 dark:text-neutral-600">
              <span>Currently learning:</span>
              {learning.map(({ name, icon: Icon, url }, i) => (
                <span key={name} className="flex items-center gap-3">
                  {i > 0 && (
                    <RiSeparator className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} (opens in new tab)`}
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {name}
                  </a>
                </span>
              ))}
            </p>
          )}
          <div className="flex-1 min-w-0 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile section jumps */}
        <nav
          aria-label="Jump to section"
          className="md:hidden flex gap-4 overflow-x-auto scrollbar-hidden px-6 pb-2 border-t border-neutral-800 dark:border-neutral-300 pt-2"
        >
          {sectionJumps.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap hover:opacity-75"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Body — 2-col grid: About/Certs row 1, Blog/Projects row 2
          Mobile order: About → Certs → Blog → Projects             */}
      <main
        id="main-content"
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr] flex-1 min-h-0"
      >
        <h1 className="sr-only">Ali Aljaffer — DevOps Engineer</h1>

        {/* About — col 1, row 1 */}
        <section
          aria-labelledby="about-heading"
          className="p-6 md:border-r border-neutral-950 dark:border-neutral-100"
        >
          <SectionLabel>
            <span id="about-heading" className="scroll-mt-28 md:scroll-mt-20">
              About
            </span>
          </SectionLabel>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-bold text-sm mb-0.5">Ali Aljaffer</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
                DevOps Engineer
              </p>
            </div>
            <RandomArsenalIcon />
          </div>
          <p className="text-sm leading-5 text-neutral-700 dark:text-neutral-300">
            I started as a web developer and slowly fell down the infrastructure
            rabbit hole — these days I build and run cloud platforms in Riyadh
            for Saudi AZM. I&apos;m a{" "}
            <a
              href="https://www.cncf.io/training/kubestronaut/?_sft_lf-country=sa#:~:text=Ali-,Aljaffer,-(He/Him)"
              target="_blank"
              rel="noreferrer"
              aria-label="CNCF Kubestronaut (opens in new tab)"
              className="inline-flex items-center gap-1 align-middle hover:underline"
            >
              <KubestronautIcon
                className="w-4 h-4 shrink-0"
                aria-hidden={true}
              />
              Kubestronaut
            </a>
            , I run a 3-node Kubernetes cluster in my homelab for fun and
            expirementation, and I genuinely enjoy drawing architecture
            diagrams.
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
                <FontAwesomeIcon icon={c.icon} className="w-3.5 h-3.5" />
                {c.handle}
              </a>
            ))}
          </nav>
        </section>

        {/* Certifications — col 2, row 1 */}
        <section aria-labelledby="certs-heading" className="p-6">
          <SectionLabel>
            <span id="certs-heading" className="scroll-mt-28 md:scroll-mt-20">
              Certifications
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-2 md:max-h-[40vh] md:overflow-y-auto scrollbar-visible">
            {certsData
              .sort((a, b) => b.order - a.order)
              .map((cert, i) => (
                <div key={i} className="flex justify-between gap-6 text-sm">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${cert.name} (opens in new tab)`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    {cert.Icon && (
                      <cert.Icon className="w-3.5 h-3.5 shrink-0" />
                    )}
                    {cert.name}
                  </a>
                  <span className="text-neutral-600 dark:text-neutral-400 shrink-0">
                    {cert.date}
                  </span>
                </div>
              ))}
          </ScrollableList>
        </section>

        {/* Blog — col 1, row 2 */}
        <section
          aria-labelledby="blog-heading"
          className="px-6 py-3 md:border-r border-neutral-950 dark:border-neutral-100"
        >
          <SectionLabel>
            <span id="blog-heading" className="scroll-mt-28 md:scroll-mt-20">
              Blog
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-4 md:max-h-[60vh] md:overflow-y-auto scrollbar-visible">
            {blogPosts.map((post) => (
              <Link
                key={post.caseStudyId}
                href={`/case-study/${post.caseStudyId}`}
                aria-label={`${post.name} — read more`}
                className="flex justify-between items-start gap-4 group"
              >
                <div>
                  <p className="text-sm font-bold leading-snug group-hover:underline">
                    {post.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
                    {post.description}
                  </p>
                </div>
                <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </ScrollableList>
        </section>

        {/* Projects — col 2, row 2 */}
        <section aria-labelledby="projects-heading" className="px-6 py-3">
          <SectionLabel>
            <span
              id="projects-heading"
              className="scroll-mt-28 md:scroll-mt-20"
            >
              Projects
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-4 md:max-h-[60vh] md:overflow-y-auto scrollbar-visible">
            {projects.map((project) => (
              <Link
                key={project.caseStudyId}
                href={`/case-study/${project.caseStudyId}`}
                aria-label={`${project.name} — view case study`}
                className="flex justify-between items-start gap-4 group"
              >
                <div>
                  <p className="text-sm font-bold leading-snug group-hover:underline">
                    {project.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">
                    {project.description}
                  </p>
                </div>
                <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </ScrollableList>
        </section>
      </main>
    </div>
  );
}
