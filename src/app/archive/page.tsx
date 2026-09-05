import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import SectionLabel from "@/app/components/SectionLabel";
import PostRow from "@/app/components/PostRow";
import Footer from "@/app/components/Footer";
import { getVisibleCaseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const title = "Archive - Ali Aljaffer";
const description = "All blog posts and projects, grouped by year.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/archive/` },
  openGraph: { title, description, url: `${SITE_URL}/archive/`, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function ArchivePage() {
  const items = [
    ...(getVisibleCaseStudies("blog") ?? []),
    ...(getVisibleCaseStudies("project") ?? []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const byYear = new Map<string, typeof items>();
  for (const item of items) {
    const year = new Date(item.date).getFullYear().toString();
    byYear.set(year, [...(byYear.get(year) ?? []), item]);
  }
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return (
    <Layout>
      <div className="sticky top-0 left-0 w-full z-50 bg-terminal-bg border-b border-terminal-border px-6 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <BackLink href="/">← ~/ali-aljaffer</BackLink>
        </div>
        <div className="flex-1 min-w-0 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full flex-1 max-w-4xl mx-auto px-6 py-8">
        <header className="pb-6 border-b border-terminal-accent">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-accent">
            Archive
          </h1>
          <p className="text-[0.6875rem] text-neutral-600 dark:text-neutral-400 mt-2">
            {items.length} {items.length === 1 ? "entry" : "entries"} ·
            everything, by year
          </p>
        </header>
        <div>
          {years.map((year) => (
            <section key={year} aria-labelledby={`year-${year}`} className="mt-8">
              <SectionLabel
                id={`year-${year}`}
                line="weak"
                note={`${byYear.get(year)!.length}`}
              >
                {year}
              </SectionLabel>
              <div className="space-y-2.5">
                {byYear.get(year)!.map((item) => (
                  <PostRow key={item.caseStudyId} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
