import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import Footer from "@/app/components/Footer";
import { tagToSlug } from "@/data/case-study-tags";
import { getTagCounts } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tags - Ali Aljaffer",
  description: "Browse all blog posts and projects by tag.",
  alternates: { canonical: `${SITE_URL}/tags/` },
  openGraph: {
    title: "Tags - Ali Aljaffer",
    description: "Browse all blog posts and projects by tag.",
    url: `${SITE_URL}/tags/`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tags - Ali Aljaffer",
    description: "Browse all blog posts and projects by tag.",
  },
};

export default function TagsIndexPage() {
  const tagCounts = getTagCounts();

  return (
    <Layout>
      <div className="sticky top-0 left-0 w-full z-50 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 px-6 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <BackLink href="/">← Home</BackLink>
        </div>
        <p className="hidden md:block min-w-0 truncate text-xs font-bold text-center uppercase tracking-[0.2em]">
          Tags
        </p>
        <div className="flex-1 min-w-0 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full flex-1 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-accent">
          Browse by tag
        </h1>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-6">
          {tagCounts.length} {tagCounts.length === 1 ? "tag" : "tags"} in use
        </p>
        <div className="flex flex-wrap gap-3">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tagToSlug(tag)}/`}
              className="inline-flex items-center gap-1.5 border border-terminal-border px-3 py-1.5 text-sm transition hover:border-terminal-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <span className="font-bold">#{tagToSlug(tag)}</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
