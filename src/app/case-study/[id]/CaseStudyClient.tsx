"use client";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyToc from "@/app/components/CaseStudyToc";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
import RelatedPosts from "@/app/components/RelatedPosts";
import GiscusComments from "@/app/components/GiscusComments";
import Footer from "@/app/components/Footer";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/app/types";
import { headingLabel, headingSlug, headingSource } from "@/lib/heading";
import { estimateReadingMinutes } from "@/lib/reading-time";
import ArticleBody from "./ArticleBody";

// KaTeX and its stylesheet are ~290KB, so the math renderer loads only for the
// documents that need it. Server rendering stays on: the prerendered HTML has
// to carry the heading ids the table of contents links to.
const ArticleBodyMath = dynamic(() => import("./ArticleBodyMath"));

function extractHeadings(markdown: string): { text: string; slug: string }[] {
  const headings: { text: string; slug: string }[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      const raw = headingSource(m[0]);
      if (raw)
        headings.push({ text: headingLabel(raw), slug: headingSlug(raw) });
    }
  }
  return headings;
}
interface CaseStudyProps {
  caseStudy: CaseStudy & { content: string };
  relatedPosts?: CaseStudy[];
  hasMath?: boolean;
}

export default function CaseStudyClient({
  caseStudy,
  relatedPosts = [],
  hasMath = false,
}: CaseStudyProps) {
  const hasImages = caseStudy?.images?.some(
    (project_image) => project_image.url.length > 1,
  );

  const headings = useMemo(() => {
    const h = extractHeadings(caseStudy?.content ?? "");
    if (hasImages) h.push({ text: "Screenshots", slug: "screenshots" });
    return h;
  }, [caseStudy?.content, hasImages]);

  const readingMinutes = useMemo(
    () => estimateReadingMinutes(caseStudy?.content ?? ""),
    [caseStudy?.content],
  );

  if (!caseStudy) return NotFound({ message: "Case Study not found" });
  return (
    <Layout>
      {/* Variant A: no chrome. A slim back/tools row sticks inside the
          article column; TOC chips live under the masthead, in the flow. */}
      <div className="sticky top-0 z-50 bg-terminal-bg h-11 flex items-center justify-between gap-4 border-b border-terminal-border max-w-4xl w-full mx-auto px-6">
        <BackLink href="/">← Home</BackLink>
        <ThemeToggle />
      </div>
      <main
        id="main-content"
        className="w-full flex-1 max-w-4xl mx-auto px-6 pb-8 article-body"
      >
        <CaseStudyHeader
          caseStudy={caseStudy}
          readingMinutes={readingMinutes}
        />
        {headings.length >= 2 && (
          <div className="sticky top-11 z-40 bg-terminal-bg mb-6 border-b border-terminal-border">
            <CaseStudyToc headings={headings} />
          </div>
        )}
        {hasMath ? (
          <ArticleBodyMath content={caseStudy.content} />
        ) : (
          <ArticleBody content={caseStudy.content} />
        )}

        {caseStudy.images?.some(
          (project_image) => project_image.url.length > 1,
        ) && (
          <div className="markdown-content mt-10">
            <h2 id="screenshots">Screenshots</h2>
            {caseStudy.images.map((image) =>
              image.url.length > 0 ? (
                <TerminalImage
                  key={image.url}
                  src={image.url}
                  alt={image["alt-text"]}
                  caption={image.caption}
                  width={600}
                  height={400}
                />
              ) : null,
            )}
          </div>
        )}

        <RelatedPosts items={relatedPosts} />
        <GiscusComments key={caseStudy.caseStudyId} />
      </main>
      <Footer />
    </Layout>
  );
}
