import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import SectionLabel from "@/app/components/SectionLabel";
import PostRow from "@/app/components/PostRow";
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
            #{tagToSlug(tag)}
          </h1>
          <p className="text-[0.6875rem] text-neutral-600 dark:text-neutral-400 mt-2">
            {items.length} {items.length === 1 ? "post" : "posts"}
          </p>
        </header>
        <div className="mt-8">
          <SectionLabel line="weak">Posts</SectionLabel>
          <div className="space-y-2.5">
            {items.map((item) => (
              <PostRow key={item.caseStudyId} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
