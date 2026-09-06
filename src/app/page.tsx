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
      <SiteHeader />

      {/* Single column: about, certifications, blog. The blog area takes the
          remaining height and scrolls on md+; the page stacks and scrolls on
          smaller screens. */}
      <main
        id="main-content"
        className="w-full max-w-4xl mx-auto px-6 flex-1 min-h-0 flex flex-col"
      >
        <AboutSection />
        <CertsSection />
        <CaseStudySection
          id="blog-heading"
          title="Blog"
          items={posts}
        />
      </main>

      <Footer />
    </div>
  );
}
