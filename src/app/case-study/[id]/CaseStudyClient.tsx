"use client";
import Layout from "@/app/components/Layout";
import BackLink from "@/app/components/BackLink";
import TerminalImage from "@/app/components/TerminalImage";
import { useEffect } from "react";
import Markdown from "react-markdown";
import NotFound from "@/app/not-found";
import { CaseStudy } from "@/app/types";

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
      <div className="max-w-4xl mx-auto p-8 relative">
        <BackLink
          href="/"
          className="sticky top-0 left-0 bg-terminal-bg w-full pb-5 pt-4 border-b-terminal-comment rounded-sm border-1 border-t-0 border-l-0 border-r-0"
        >
          ← Back to Portfolio
        </BackLink>

        <div className="markdown-content prose prose-invert">
          <Markdown
            components={{
              img: TerminalImage,
              p: "div",
              a: (props) => {
                return (
                  <a {...props} target="_blank">
                    {props.children}
                  </a>
                );
              },
            }}
          >
            {caseStudy.content}
          </Markdown>
        </div>

        {caseStudy.images?.some(
          (project_image) => project_image.url.length > 1
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
              ) : null
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
