import SiteHeader from "@/app/components/SiteHeader";
import AboutSection from "@/app/components/AboutSection";
import CertsSection from "@/app/components/CertsSection";
import CaseStudySection from "@/app/components/CaseStudySection";
import Footer from "@/app/components/Footer";
import { getVisibleCaseStudies } from "@/lib/case-studies";

export default function Home() {
  // Blog and projects are one merged list now: everything, newest first.
  const posts = [
    ...(getVisibleCaseStudies("blog") ?? []),
    ...(getVisibleCaseStudies("project") ?? []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 font-mono min-h-dvh md:h-dvh md:overflow-hidden flex flex-col">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-[60] focus:bg-neutral-950 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <SiteHeader />

      {/* Single column: about, certifications, blog. The blog area takes the
          remaining height and scrolls on md+; the page stacks and scrolls on
          smaller screens. */}
      <main
        id="main-content"
        className="w-full max-w-[1100px] mx-auto px-6 flex-1 min-h-0 flex flex-col"
      >
        <AboutSection />
        <CertsSection />
        <CaseStudySection
          id="blog-heading"
          title="Blog"
          items={posts}
          ctaLabel="read more"
        />
      </main>

      <Footer />
    </div>
  );
}
