export interface ProjectImage {
  caption: string;
  "alt-text": string;
  url: string;
}

export interface Project {
  name: string;
  caseStudyId: string;
  repo: string;
  url: string;
  description: string;
  images: ProjectImage[];
  show: boolean;
}
export type CaseStudyImage = ProjectImage;
export type CaseStudy = Project;

export interface CaseStudies {
  [key: string]: CaseStudy;
}
