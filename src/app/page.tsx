import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import { getVisibleCaseStudies } from "@/lib/case-studies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import {
  faAws,
  faGithub,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { SiGooglecloud, SiTerraform, SiKubernetes } from "react-icons/si";
import ScrollableList from "@/app/components/ScrollableList";

type CertIcon = ComponentType<{ className?: string }>;

const contactData: {
  label: string;
  handle: string;
  value: string;
  icon: IconDefinition;
}[] = [
  {
    label: "Resume",
    handle: "resume.alialjaffer.com",
    value: "https://resume.alialjaffer.com",
    icon: faFileLines,
  },
  {
    label: "GitHub",
    handle: "github/aliAljaffer",
    value: "https://github.com/alialjaffer",
    icon: faGithub,
  },
  {
    label: "LinkedIn",
    handle: "linkedin/aliAljaffer",
    value: "https://linkedin.com/in/alialjaffer",
    icon: faLinkedin,
  },
  {
    label: "X",
    handle: "x/aliAljaffer",
    value: "https://x.com/alialjaffer",
    icon: faXTwitter,
  },
  {
    label: "YouTube",
    handle: "youtube/aliAljaffer",
    value: "https://www.youtube.com/@aliAljaffer",
    icon: faYoutube,
  },
];

const faAwsIcon: CertIcon = ({ className }) => (
  <FontAwesomeIcon icon={faAws} className={className} />
);

const certsData: {
  name: string;
  date: string;
  order: number;
  url: string;
  Icon?: CertIcon;
}[] = [
  {
    name: "GCP Professional Cloud Architect",
    date: "May 2026",
    order: 10,
    url: "https://www.credly.com/badges/f576ddd7-17b9-4a15-aa0e-86dca295cc37/public_url",
    Icon: SiGooglecloud as CertIcon,
  },
  {
    name: "Certified Kubernetes Security Specialist",
    date: "Feb 2026",
    order: 9,
    url: "https://www.credly.com/badges/6d3a6109-76a3-4873-9305-5679d128f6ba/public_url",
    Icon: SiKubernetes as CertIcon,
  },
  {
    name: "Certified Kubernetes Administrator",
    date: "Dec 2025",
    order: 7,
    url: "https://www.credly.com/badges/460fb1fe-342c-45e0-8b17-c6225e43ec7a/public_url",
    Icon: SiKubernetes as CertIcon,
  },
  {
    name: "Certified Kubernetes Application Developer",
    date: "Dec 2025",
    order: 6,
    url: "https://www.credly.com/badges/574c7848-77e6-4c25-a1b6-d7d4f70a130c/public_url",
    Icon: SiKubernetes as CertIcon,
  },
  {
    name: "Terraform Associate",
    date: "Aug 2025",
    order: 5,
    url: "https://www.credly.com/badges/2abf40d1-88d1-4d75-a79e-73d1c7ec94d9/public_url",
    Icon: SiTerraform as CertIcon,
  },
  {
    name: "AWS Solutions Architect – Associate",
    date: "Jul 2025",
    order: 4,
    url: "https://www.credly.com/badges/90df08a0-de5d-4eab-9ed3-013e17556f71/public_url",
    Icon: faAwsIcon,
  },
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
    <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 font-mono">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-neutral-950 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Fixed theme toggle — top-right, safe-area aware */}
      <div
        className="fixed top-0 right-0 z-50 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 px-4"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          paddingBottom: "0.75rem",
        }}
      >
        <ThemeToggle />
      </div>

      {/* Body — 2-col grid: About/Certs row 1, Blog/Projects row 2
          Mobile order: About → Certs → Blog → Projects             */}
      <main id="main-content" className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr] md:min-h-dvh">

        {/* About — col 1, row 1 */}
        <section
          aria-labelledby="about-heading"
          className="p-6 pt-14 md:pt-6 md:border-r border-neutral-950 dark:border-neutral-100"
        >
          <SectionLabel><span id="about-heading">About</span></SectionLabel>
          <p className="font-bold text-sm mb-0.5">Ali Aljaffer</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-3">DevOps Engineer</p>
          <p className="text-sm leading-5 text-neutral-700 dark:text-neutral-300">
            Passionate about automation, infrastructure as code, and building
            scalable, reliable systems. I come from a web development background
            and absolutely love drawing system architecture diagrams.
          </p>
          <nav aria-label="Social links" className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {contactData.map((c) => (
              <a
                key={c.label}
                href={c.value}
                target="_blank"
                rel="noreferrer"
                aria-label={c.label}
                className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
              >
                <FontAwesomeIcon icon={c.icon} className="w-3.5 h-3.5" />
                {c.handle}
              </a>
            ))}
          </nav>
        </section>

        {/* Certifications — col 2, row 1 */}
        <section aria-labelledby="certs-heading" className="p-6">
          <SectionLabel><span id="certs-heading">Certifications</span></SectionLabel>
          <ScrollableList className="space-y-2 md:max-h-[40vh] md:overflow-y-auto scrollbar-visible">
            {certsData.sort((a, b) => b.order - a.order).map((cert, i) => (
              <div key={i} className="flex justify-between gap-6 text-sm">
                <a href={cert.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                  {cert.Icon && <cert.Icon className="w-3.5 h-3.5 shrink-0" />}
                  {cert.name}
                </a>
                <span className="text-neutral-500 dark:text-neutral-400 shrink-0">{cert.date}</span>
              </div>
            ))}
          </ScrollableList>
        </section>

        {/* Blog — col 1, row 2 */}
        <section aria-labelledby="blog-heading" className="px-6 py-3 md:border-r border-neutral-950 dark:border-neutral-100">
          <SectionLabel><span id="blog-heading">Blog</span></SectionLabel>
          <ScrollableList className="space-y-4 md:max-h-[60vh] md:overflow-y-auto scrollbar-visible">
            {blogPosts.map((post) => (
              <Link
                key={post.caseStudyId}
                href={`/case-study/${post.caseStudyId}`}
                aria-label={`${post.name} — read more`}
                className="flex justify-between items-start gap-4 group"
              >
                <div>
                  <p className="text-sm font-bold leading-snug group-hover:underline">{post.name}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">{post.description}</p>
                </div>
                <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">→</span>
              </Link>
            ))}
          </ScrollableList>
        </section>

        {/* Projects — col 2, row 2 */}
        <section aria-labelledby="projects-heading" className="px-6 py-3">
          <SectionLabel><span id="projects-heading">Projects</span></SectionLabel>
          <ScrollableList className="space-y-4 md:max-h-[60vh] md:overflow-y-auto scrollbar-visible">
            {projects.map((project) => (
              <Link
                key={project.caseStudyId}
                href={`/case-study/${project.caseStudyId}`}
                aria-label={`${project.name} — view case study`}
                className="flex justify-between items-start gap-4 group"
              >
                <div>
                  <p className="text-sm font-bold leading-snug group-hover:underline">{project.name}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-snug">{project.description}</p>
                </div>
                <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">→</span>
              </Link>
            ))}
          </ScrollableList>
        </section>

      </main>
    </div>
  );
}
