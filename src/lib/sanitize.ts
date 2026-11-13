import { defaultSchema, type Options } from "rehype-sanitize";
import type { Root, RootContent } from "hast";

/**
 * Allow-list for the raw HTML the markdown in src/data uses: YouTube iframes
 * and the <excalidraw> embed, on top of the GitHub-style default schema. The
 * math and code class names are kept because remark-math output and fenced
 * code languages are read by KaTeX and Prism after sanitizing.
 */
export const sanitizeSchema: Options = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe", "excalidraw"],
  attributes: {
    ...defaultSchema.attributes,
    code: [["className", /^(language-|math-)./]],
    iframe: [
      "src",
      "title",
      "frameBorder",
      "allow",
      "referrerPolicy",
      "allowFullScreen",
      "loading",
      "width",
      "height",
    ],
    excalidraw: ["src", "height"],
  },
};

const YOUTUBE_EMBED = /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\//;

/** Drops iframes that do not point at a YouTube embed. Run after sanitize. */
export function rehypeYoutubeOnly() {
  const walk = (node: Root | RootContent) => {
    if (!("children" in node)) return;
    node.children = (node.children as RootContent[]).filter(
      (child) =>
        !(
          child.type === "element" &&
          child.tagName === "iframe" &&
          !YOUTUBE_EMBED.test(String(child.properties?.src ?? ""))
        ),
    ) as typeof node.children;
    for (const child of node.children as RootContent[]) walk(child);
  };
  return (tree: Root) => walk(tree);
}
