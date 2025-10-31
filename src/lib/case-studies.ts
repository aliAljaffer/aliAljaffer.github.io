import "server-only";
import { CaseStudy, ProjectImage } from "@/app/types";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getVisibleCaseStudies(): CaseStudy[] | null {
  const allStudies = getAllCaseStudies();
  if (!allStudies) return null;
  return allStudies
    .filter((study) => study.show)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(id: string): CaseStudy | null {
  return getAllCaseStudies()?.find((study) => study.caseStudyId === id) || null;
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
          "FrontMatter shape does not match a CaseStudy shape for file" + file
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
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.basename(file, ".md"));
}

function isCaseStudy(data: unknown): data is CaseStudy {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;
  return typeof obj.name === "string" &&
    typeof obj.repo === "string" &&
    typeof obj.url === "string" &&
    typeof obj.description === "string" &&
    typeof obj.show === "boolean" &&
    obj.images
    ? Array.isArray(obj.images) &&
        obj.images.every(
          (img: ProjectImage) =>
            typeof img.caption === "string" &&
            typeof img["alt-text"] === "string" &&
            typeof img.url === "string"
        )
    : true;
}
