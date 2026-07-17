import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyCard from "@/app/components/CaseStudyCard";
import Footer from "@/app/components/Footer";
import NotFound from "@/app/not-found";
import {
  CASE_STUDY_TAGS,
  tagFromSlug,
  tagToSlug,
} from "@/data/case-study-tags";
import { getCaseStudiesByTag } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return CASE_STUDY_TAGS.filter(
    (tag) => getCaseStudiesByTag(tag).length > 0,
  ).map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = tagFromSlug(slug);
  if (!tag) return {};

  const url = `${SITE_URL}/tags/${slug}/`;
  const title = `${tag} - Ali Aljaffer`;
  const description = `Blog posts and projects tagged "${tag}".`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: slug } = await params;
  const tag = tagFromSlug(slug);
  if (!tag) return NotFound({ message: `Unknown tag: ${slug}` });

  const items = getCaseStudiesByTag(tag);
  if (items.length === 0) {
    return NotFound({ message: `No posts tagged "${tag}" yet` });
  }

  return (
    <Layout>
      <div className="sticky top-0 left-0 w-full z-50 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 px-6 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <BackLink href="/">← Home</BackLink>
        </div>
        <p className="hidden md:block min-w-0 truncate text-xs font-bold text-center uppercase tracking-[0.2em]">
          #{tagToSlug(tag)}
        </p>
        <div className="flex-1 min-w-0 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full flex-1 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">
          Showing posts with tag #{tagToSlug(tag)}
        </h1>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-6">
          {items.length} {items.length === 1 ? "post" : "posts"}
        </p>
        <div className="space-y-3">
          {items.map((item) => (
            <CaseStudyCard
              key={item.caseStudyId}
              item={item}
              ctaLabel="read more"
              showType
            />
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
