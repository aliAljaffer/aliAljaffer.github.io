import type { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import RandomArsenalIcon from "@/app/components/RandomArsenalIcon";
import { getVisibleCaseStudies } from "@/lib/case-studies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiSeparator } from "react-icons/ri";
import ScrollableList from "@/app/components/ScrollableList";
import KubestronautIcon from "@/app/components/KubestronautIcon";
import {
  contactData,
  certsData,
  learning,
  experienceData,
} from "@/data/profile";

const sectionJumps: { label: string; href: string }[] = [
  { label: "About", href: "#about-heading" },
  { label: "Certs", href: "#certs-heading" },
  { label: "Experience", href: "#experience-heading" },
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

      {/* Header bar */}
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

      {/* 2-col, 6-row grid on desktop.
          Col 1: About (rows 1-2) → Certs (rows 3-4) → Experience (rows 5-6)
          Col 2: Blog (rows 1-3) → Projects (rows 4-6)
          Mobile: single column, DOM order.                                    */}
      <main
        id="main-content"
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-6 flex-1 min-h-0"
      >
        <h1 className="sr-only">Ali Aljaffer — DevOps Engineer</h1>

        {/* About — col 1, rows 1-2 */}
        <section
          aria-labelledby="about-heading"
          className="p-6 md:col-start-1 md:row-start-1 md:row-span-2 md:border-r md:border-b border-neutral-950 dark:border-neutral-100"
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

        {/* Certifications — col 1, rows 3-4 */}
        <section
          aria-labelledby="certs-heading"
          className="p-6 md:col-start-1 md:row-start-3 md:row-span-2 md:border-r md:border-b border-neutral-950 dark:border-neutral-100 flex flex-col overflow-hidden"
        >
          <SectionLabel>
            <span id="certs-heading" className="scroll-mt-28 md:scroll-mt-20">
              Certifications
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-2 flex-1 overflow-y-auto scrollbar-visible min-h-0">
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

        {/* Experience — col 1, rows 5-6 */}
        <section
          aria-labelledby="experience-heading"
          className="p-6 md:col-start-1 md:row-start-5 md:row-span-2 md:border-r border-neutral-950 dark:border-neutral-100"
        >
          <SectionLabel>
            <span
              id="experience-heading"
              className="scroll-mt-28 md:scroll-mt-20"
            >
              Experience
            </span>
          </SectionLabel>
          <ul className="space-y-1.5">
            {experienceData.map((e) => (
              <li key={e.company} className="flex items-center gap-2 text-xs">
                {e.Icon && <e.Icon className="w-3.5 h-3.5 shrink-0" />}
                <span className="font-medium">{e.company}</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {e.title}
                </span>
                <span
                  className={
                    e.current
                      ? "ml-auto text-[10px] uppercase tracking-[0.15em] text-neutral-950 dark:text-neutral-50"
                      : "ml-auto text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500"
                  }
                >
                  {e.current ? "current" : "past"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog — col 2, rows 1-3 */}
        <section
          aria-labelledby="blog-heading"
          className="p-6 md:col-start-2 md:row-start-1 md:row-span-3 md:border-b border-neutral-950 dark:border-neutral-100 flex flex-col overflow-hidden"
        >
          <SectionLabel>
            <span id="blog-heading" className="scroll-mt-28 md:scroll-mt-20">
              Blog
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-4 flex-1 overflow-y-auto scrollbar-visible min-h-0">
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

        {/* Projects — col 2, rows 4-6 */}
        <section
          aria-labelledby="projects-heading"
          className="p-6 md:col-start-2 md:row-start-4 md:row-span-3 flex flex-col overflow-hidden"
        >
          <SectionLabel>
            <span
              id="projects-heading"
              className="scroll-mt-28 md:scroll-mt-20"
            >
              Projects
            </span>
          </SectionLabel>
          <ScrollableList className="space-y-4 flex-1 overflow-y-auto scrollbar-visible min-h-0">
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
