import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import { remark } from "remark";

export async function getMarkdownContent(id: string): Promise<string | null> {
  try {
    const markdownPath = path.join(process.cwd(), "src/data", `${id}.md`);

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Markdown file not found: ${id}.md`);
      return null;
    }

    const fileContent = fs.readFileSync(markdownPath, "utf8");
    const { content } = matter(fileContent);
    const processed = String(await remark().use(remarkParse).process(content));
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
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", ""));
  } catch (error) {
    console.error("Error reading markdown directory:", error);
    return [];
  }
}
