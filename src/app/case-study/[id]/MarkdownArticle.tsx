"use client";
import TerminalImage from "@/app/components/TerminalImage";
import ExcalidrawViewer from "@/app/components/ExcalidrawViewer";
import {
  isValidElement,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";
import Markdown, { type Components } from "react-markdown";
import { headingSlug, headingSource } from "@/lib/heading";

type Plugins = ComponentProps<typeof Markdown>["rehypePlugins"];

type HastElement = {
  position?: { start?: { offset?: number }; end?: { offset?: number } };
};

const DEAD_REGION = "me-south-1";
export const inDeadRegion = (imageSrc: string) =>
  imageSrc.includes(DEAD_REGION);

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

/**
 * Heading ids come from the markdown source, not the rendered children: KaTeX
 * expands $x$ into glyphs plus a TeX annotation, which would not match the slug
 * the table of contents builds from the same source.
 */
function rawHeading(node: HastElement | undefined, source: string): string {
  const start = node?.position?.start?.offset;
  const end = node?.position?.end?.offset;
  if (typeof start !== "number" || typeof end !== "number") return "";
  return headingSource(source.slice(start, end));
}

interface MarkdownArticleProps {
  content: string;
  remarkPlugins: Plugins;
  rehypePlugins: Plugins;
}

export default function MarkdownArticle({
  content,
  remarkPlugins,
  rehypePlugins,
}: MarkdownArticleProps) {
  // The first image that actually renders gets fetch priority. Derived from the
  // source rather than tracked while rendering, which would mutate render state.
  const firstImageSrc = useMemo(() => {
    for (const m of content.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)) {
      if (!inDeadRegion(m[1])) return m[1];
    }
    return null;
  }, [content]);

  return (
    <div className="markdown-content prose prose-invert">
      <Markdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={
          {
            img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
              const src = props.src?.toString() ?? "";
              if (inDeadRegion(src)) return null;
              return TerminalImage({
                ...props,
                priority: src === firstImageSrc,
              });
            },
            h2: (props: { children?: ReactNode; node?: HastElement }) => {
              const raw = rawHeading(props.node, content);
              const text = raw ? raw : childrenToText(props.children);
              return <h2 id={headingSlug(text)}>{props.children}</h2>;
            },
            p: "div",
            a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {props.children}
              </a>
            ),
            excalidraw: (props: { src?: string; height?: string }) => (
              <ExcalidrawViewer src={props.src} height={props.height} />
            ),
          } as Components
        }
      >
        {content}
      </Markdown>
    </div>
  );
}
