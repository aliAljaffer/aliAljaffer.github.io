import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remark } from "remark";

const WIKILINK = /\[\[([a-z0-9-]+(?:\/[a-z0-9-]+)*)(?:\|([^\]]+))?\]\]/g;

function linkDefinitions(text: string): string {
  return text.replace(
    WIKILINK,
    (_, target: string, label?: string) =>
      `[${label ?? target}](https://docs.alialjaffer.com/definitions/${target}/)`,
  );
}

export async function getMarkdownContent(id: string): Promise<string | null> {
  try {
    const markdownPath = path.join(process.cwd(), "src/data", `${id}.md`);
    if (!fs.existsSync(markdownPath)) {
      console.warn(`Markdown file not found: ${id}.md`);
      return null;
    }
    const fileContent = fs.readFileSync(markdownPath, "utf8");
    const { content } = matter(fileContent);
    const processed = String(
      await remark().use(remarkParse).use(remarkGfm).use(remarkMath).process(linkDefinitions(content)),
    );
    return processed;
  } catch (error) {
    console.error(`Error reading markdown file ${id}.md:`, error);
    return null;
  }
}

export function getAllMarkdownFiles(): string[] {
  try {
    const dataDir = path.join(process.cwd(), "src/data");
    if (!fs.existsSync(dataDir)) {
      return [];
    }
    return fs
      .readdirSync(dataDir)
      .filter((file) => !file.includes("template.md") && file.endsWith(".md"))
      .map((file) => file.replace(".md", ""));
  } catch (error) {
    console.error("Error reading markdown directory:", error);
    return [];
  }
}
