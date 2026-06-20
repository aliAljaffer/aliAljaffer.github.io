"use client";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import ExcalidrawViewer from "@/app/components/ExcalidrawViewer";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useEffect } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/app/types";
const DEAD_REGION = "me-south-1";
export const inDeadRegion = (imageSrc: string) => {
  return imageSrc.includes(DEAD_REGION);
};
interface CaseStudyProps {
  caseStudy: CaseStudy & { content: string };
}

export default function CaseStudyClient({ caseStudy }: CaseStudyProps) {
  useEffect(() => {
    if (!caseStudy?.name) return;
    document.title = caseStudy.name;
  }, [caseStudy]);

  if (!caseStudy) return NotFound({ message: "Case Study not found" });
  return (
    <Layout>
      {/* Nav bar — matches editorial toggle style */}
      <div className="sticky top-0 left-0 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 w-full px-6 py-4 z-50 flex justify-between items-center">
        <BackLink href="/">← Home</BackLink>
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
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
            <h2>Screenshots</h2>
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
    </Layout>
  );
}
