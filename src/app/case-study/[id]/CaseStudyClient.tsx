"use client";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import ExcalidrawViewer from "@/app/components/ExcalidrawViewer";
import ThemeToggle from "@/app/components/ThemeToggle";
import CaseStudyToc from "@/app/components/CaseStudyToc";
import CaseStudyHeader from "@/app/components/CaseStudyHeader";
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
}

export default function CaseStudyClient({ caseStudy }: CaseStudyProps) {
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
      {/* Nav bar + TOC — sticky stack */}
      <div className="sticky top-0 left-0 w-full z-50">
        <div className="bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 w-full px-6 py-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <BackLink href="/">← Home</BackLink>
          </div>
          <p className="hidden md:block min-w-0 truncate text-xs font-bold text-center uppercase tracking-[0.2em]">
            {caseStudy.name}
          </p>
          <div className="flex-1 min-w-0 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
        {headings.length >= 2 && (
          <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-800">
            <CaseStudyToc headings={headings} />
          </div>
        )}
      </div>

      <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-6 py-10">
        <CaseStudyHeader caseStudy={caseStudy} readingMinutes={readingMinutes} />
        <div className="markdown-content prose prose-invert">
          <Markdown
            rehypePlugins={[rehypeRaw, rehypePrism]}
            components={
              {
                img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
                  return inDeadRegion(props.src?.toString() + "")
                    ? null
                    : TerminalImage(props);
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
          <div className="markdown-content">
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
      </div>
      <Footer />
    </Layout>
  );
}
