"use client";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import MarkdownArticle from "./MarkdownArticle";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <MarkdownArticle
      content={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypePrism]}
    />
  );
}
