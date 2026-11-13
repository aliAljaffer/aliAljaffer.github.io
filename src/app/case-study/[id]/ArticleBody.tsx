import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypePrism from "rehype-prism-plus";
import { sanitizeSchema, rehypeYoutubeOnly } from "@/lib/sanitize";
import MarkdownArticle from "./MarkdownArticle";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <MarkdownArticle
      content={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [rehypeSanitize, sanitizeSchema],
        rehypeYoutubeOnly,
        rehypePrism,
      ]}
    />
  );
}
