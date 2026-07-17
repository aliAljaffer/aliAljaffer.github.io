import "server-only";
import { CaseStudy, ProjectImage } from "@/app/types";
import { isCaseStudyTag, CaseStudyTag } from "@/data/case-study-tags";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
export const DEV_MODE = false;
export function getVisibleCaseStudies(
  caseType: "project" | "blog" = "project",
): CaseStudy[] | null {
  const allStudies = getAllCaseStudies();
  if (!allStudies) return null;
  return allStudies
    .filter((study) => study.show && study.type === caseType)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(id: string): CaseStudy | null {
  return getAllCaseStudies()?.find((study) => study.caseStudyId === id) || null;
}

export function getCaseStudiesByTag(tag: CaseStudyTag): CaseStudy[] {
  const all = getAllCaseStudies() ?? [];
  return all
    .filter((study) => study.show && study.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTagCounts(): { tag: CaseStudyTag; count: number }[] {
  const all = (getAllCaseStudies() ?? []).filter((study) => study.show);
  const counts = new Map<CaseStudyTag, number>();
  for (const study of all) {
    for (const tag of study.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// Ranks other visible posts by shared tag count (ties broken by most recent),
// dropping anything with zero overlap rather than backfilling with unrelated
// posts just to hit the limit.
export function getRelatedCaseStudies(
  current: CaseStudy,
  limit = 3,
): CaseStudy[] {
  const all = getAllCaseStudies() ?? [];
  return all
    .filter((study) => study.show && study.caseStudyId !== current.caseStudyId)
    .map((study) => ({
      study,
      sharedTags: study.tags.filter((tag) => current.tags.includes(tag))
        .length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return (
        new Date(b.study.date).getTime() - new Date(a.study.date).getTime()
      );
    })
    .slice(0, limit)
    .map(({ study }) => study);
}

export function getAllCaseStudies(): CaseStudy[] | null {
  const dirPath = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dirPath);

  const caseStudies = files // read all .md files, exclude the template.
    .filter((file) => !file.includes("template.md") && file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const caseStudyId = path.basename(file, ".md");
      // Check to make sure all attributes in the .md file match
      // the project type
      if (data[caseStudyId]?.show != false && !isCaseStudy(data[caseStudyId])) {
        throw new Error(
          "FrontMatter shape does not match a CaseStudy shape for file" + file,
        );
      }
      return {
        ...data[caseStudyId],
        caseStudyId,
      } as CaseStudy;
    });
  return caseStudies;
}

export function getAllCaseStudyIds(): string[] {
  const dirPath = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dirPath);

  return files
    .filter((file) => file.endsWith(".md") && !file.startsWith("template"))
    .map((file) => path.basename(file, ".md"));
}

function isCaseStudy(data: unknown): data is CaseStudy {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;
  if (!Array.isArray(obj.tags) || !obj.tags.every(isCaseStudyTag)) {
    return false;
  }
  return typeof obj.name === "string" &&
    typeof obj.repo === "string" &&
    typeof obj.url === "string" &&
    typeof obj.description === "string" &&
    typeof obj.show === "boolean" &&
    obj.images
    ? (Array.isArray(obj.images) &&
        obj.images.every(
          (img: ProjectImage) =>
            typeof img.caption === "string" &&
            typeof img["alt-text"] === "string" &&
            typeof img.url === "string",
        )) ||
        (Array.isArray(obj.images) && obj.images.length == 0)
    : true;
}
