"use client";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import MarkdownArticle from "./MarkdownArticle";
import "katex/dist/katex.min.css";

export default function ArticleBodyMath({ content }: { content: string }) {
  return (
    <MarkdownArticle
      content={content}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex, rehypePrism]}
    />
  );
}
