import SiteHeader from "@/app/components/SiteHeader";
import BrandPlate from "@/app/components/BrandPlate";
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
    <div className="text-fg font-mono min-h-dvh flex flex-col">
      <SiteHeader />
      <BrandPlate />

      <main
        id="main-content"
        className="w-full max-w-4xl mx-auto px-6 pt-5 pb-6 flex-1 flex flex-col gap-6"
      >
        <AboutSection />
        <CaseStudySection
          id="blog-heading"
          title="Blog"
          items={posts}
        />
        <CertsSection />
      </main>

      <Footer />
    </div>
  );
}
