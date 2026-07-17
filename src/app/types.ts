import type { CaseStudyTag } from "@/data/case-study-tags";

export interface ProjectImage {
  caption: string;
  "alt-text": string;
  url: string;
}

export interface CaseStudy {
  name: string;
  caseStudyId: string;
  repo: string;
  url: string;
  description: string;
  images: ProjectImage[];
  show: boolean;
  date: string;
  type: "blog" | "project";
  icon?: string;
  tags: CaseStudyTag[];
}
export type CaseStudyImage = ProjectImage;

export interface CaseStudies {
  [key: string]: CaseStudy;
}
