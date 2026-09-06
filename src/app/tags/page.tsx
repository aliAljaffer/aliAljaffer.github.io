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
      <div className="sticky top-0 left-0 w-full z-50 bg-terminal-bg border-b border-terminal-border px-6 py-3 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <BackLink href="/">← HOME</BackLink>
        </div>
        <div className="flex-1 min-w-0 flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <main
        id="main-content"
        className="w-full flex-1 max-w-4xl mx-auto px-6 py-8"
      >
        <header className="pb-6 border-b border-terminal-accent">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-accent">
            Tags
          </h1>
          <p className="text-[0.6875rem] text-neutral-600 dark:text-neutral-400 mt-2">
            {tagCounts.length} {tagCounts.length === 1 ? "tag" : "tags"} in use
          </p>
        </header>
        <div className="mt-8 space-y-2.5">
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tagToSlug(tag)}/`}
              className="group flex items-baseline gap-2.5 text-sm min-w-0"
            >
              <span className="min-w-0 truncate group-hover:underline underline-offset-2">
                #{tagToSlug(tag)}
              </span>
              <span
                aria-hidden="true"
                className="flex-1 min-w-4 self-center border-b border-dotted border-neutral-400 dark:border-neutral-600"
              />
              <span className="shrink-0 text-xs text-neutral-600 dark:text-neutral-400">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
