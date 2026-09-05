"use client";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import ExcalidrawViewer from "@/app/components/ExcalidrawViewer";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyToc from "@/app/components/CaseStudyToc";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
import RelatedPosts from "@/app/components/RelatedPosts";
import GiscusComments from "@/app/components/GiscusComments";
import Footer from "@/app/components/Footer";
import { useMemo, isValidElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/app/types";
import { slugify } from "@/lib/slug";
import { estimateReadingMinutes } from "@/lib/reading-time";

function childrenToText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (isValidElement(children)) {
    return childrenToText(
      (children.props as { children?: ReactNode }).children,
    );
  }
  return "";
}

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
      const text = m[1].replace(/#+\s*$/, "").trim();
      if (text) headings.push({ text, slug: slugify(text) });
    }
  }
  return headings;
}
const DEAD_REGION = "me-south-1";
export const inDeadRegion = (imageSrc: string) => {
  return imageSrc.includes(DEAD_REGION);
};
interface CaseStudyProps {
  caseStudy: CaseStudy & { content: string };
  relatedPosts?: CaseStudy[];
}

export default function CaseStudyClient({
  caseStudy,
  relatedPosts = [],
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
  let sawFirstImage = false;
  return (
    <Layout>
      {/* Variant A: no chrome. A slim back/tools row sticks inside the
          article column; TOC chips live under the masthead, in the flow. */}
      <div className="w-full flex-1 max-w-4xl mx-auto px-6 pb-8 article-body">
        <div className="sticky top-0 z-50 bg-terminal-bg flex items-center justify-between gap-4 pt-4 pb-2.5 border-b border-terminal-border">
          <BackLink href="/">← ~/ali-aljaffer</BackLink>
          <ThemeToggle />
        </div>
        <CaseStudyHeader
          caseStudy={caseStudy}
          readingMinutes={readingMinutes}
        />
        {headings.length >= 2 && (
          <div className="sticky top-[47px] z-40 bg-terminal-bg mb-6 border-b border-terminal-border">
            {/* top-[47px] pins the chips right under the back/tools row; keep
                it in sync with that row's height (pt-4 + line + pb-2.5 + border) */}
            <CaseStudyToc headings={headings} />
          </div>
        )}
        <div className="markdown-content prose prose-invert">
          <Markdown
            rehypePlugins={[rehypeRaw, rehypePrism]}
            components={
              {
                img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
                  if (inDeadRegion(props.src?.toString() + "")) return null;
                  const priority = !sawFirstImage;
                  sawFirstImage = true;
                  return TerminalImage({ ...props, priority });
                },
                h2: (props: { children?: ReactNode }) => {
                  const text = childrenToText(props.children);
                  return <h2 id={slugify(text)}>{props.children}</h2>;
                },
                p: "div",
                a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                  return (
                    <a {...props} target="_blank">
                      {props.children}
                    </a>
                  );
                },
                excalidraw: (props: { src?: string; height?: string }) => (
                  <ExcalidrawViewer src={props.src} height={props.height} />
                ),
              } as Components
            }
          >
            {caseStudy.content}
          </Markdown>
        </div>

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
      </div>
      <Footer />
    </Layout>
  );
}
