import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyCard from "@/app/components/CaseStudyCard";
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
      <div className="sticky top-0 left-0 w-full z-50 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 px-6 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <BackLink href="/">← Home</BackLink>
        </div>
        <p className="hidden md:block min-w-0 truncate text-xs font-bold text-center uppercase tracking-[0.2em]">
          Archive
        </p>
        <div className="flex-1 min-w-0 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full flex-1 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">
          Everything, by year
        </h1>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-6">
          {items.length} {items.length === 1 ? "entry" : "entries"} total
        </p>
        <div className="space-y-8">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-sm font-bold border-b border-terminal-border pb-1 mb-3">
                {year}/
              </h2>
              <div className="space-y-3">
                {byYear.get(year)!.map((item) => (
                  <CaseStudyCard
                    key={item.caseStudyId}
                    item={item}
                    ctaLabel="read more"
                    showType
                  />
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
