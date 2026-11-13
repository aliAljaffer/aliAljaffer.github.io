import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyToc from "@/app/components/CaseStudyToc";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
import RelatedPosts from "@/app/components/RelatedPosts";
import GiscusComments from "@/app/components/GiscusComments";
import Footer from "@/app/components/Footer";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/app/types";
import ArticleBody from "./ArticleBody";

// KaTeX and its stylesheet are ~290KB, so the math renderer loads only for the
// documents that need it. Server rendering stays on: the prerendered HTML has
// to carry the heading ids the table of contents links to.
const ArticleBodyMath = dynamic(() => import("./ArticleBodyMath"));

interface CaseStudyProps {
  caseStudy: CaseStudy & { content: string };
  relatedPosts?: CaseStudy[];
  hasMath?: boolean;
  headings: { text: string; slug: string }[];
  readingMinutes: number;
}

export default function CaseStudyClient({
  caseStudy,
  relatedPosts = [],
  hasMath = false,
  headings,
  readingMinutes,
}: CaseStudyProps) {
  if (!caseStudy) return NotFound({ message: "Case Study not found" });
  return (
    <Layout>
      <div className="sticky top-0 z-50 bg-terminal-bg h-11 flex items-center justify-between gap-5 border-b border-terminal-border max-w-4xl w-full mx-auto px-6">
        <BackLink href="/" className="shrink-0">
          ← <span className="max-md:sr-only">Home</span>
        </BackLink>
        <CaseStudyToc headings={headings} />
        <ThemeToggle className="shrink-0" labelClassName="max-md:sr-only" />
      </div>
      <main
        id="main-content"
        className="w-full flex-1 max-w-4xl mx-auto px-6 pt-6 pb-8 article-body"
      >
        <CaseStudyHeader
          caseStudy={caseStudy}
          readingMinutes={readingMinutes}
        />
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
