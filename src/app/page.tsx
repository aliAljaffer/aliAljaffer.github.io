import SiteHeader from "@/app/components/SiteHeader";
import AboutSection from "@/app/components/AboutSection";
import CertsSection from "@/app/components/CertsSection";
import CaseStudySection from "@/app/components/CaseStudySection";
import Footer from "@/app/components/Footer";
import { getVisibleCaseStudies } from "@/lib/case-studies";

export default function Home() {
  const projects = getVisibleCaseStudies("project") ?? [];
  const blogPosts = getVisibleCaseStudies("blog") ?? [];
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 font-mono min-h-dvh md:h-dvh flex flex-col md:overflow-hidden">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-[60] focus:bg-neutral-950 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <SiteHeader />

      {/* Body - 2-col grid: About/Certs row 1, Blog/Projects row 2
          Mobile order: About → Certs → Blog → Projects             */}
      <main
        id="main-content"
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr] flex-1 min-h-0"
      >
        <h1 className="sr-only">Ali Aljaffer - Platform Engineer</h1>

        <AboutSection className="md:border-r border-neutral-950 dark:border-neutral-100" />
        <CertsSection />
        <CaseStudySection
          id="blog-heading"
          title="Blog"
          items={blogPosts}
          ctaLabel="read more"
          className="py-4 md:border-r border-neutral-950 dark:border-neutral-100"
        />
        <CaseStudySection
          id="projects-heading"
          title="Projects"
          items={projects}
          ctaLabel="view case study"
          className="py-4"
        />
      </main>

      <Footer />
    </div>
  );
}
