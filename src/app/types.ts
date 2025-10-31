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
}
export type CaseStudyImage = ProjectImage;

export interface CaseStudies {
  [key: string]: CaseStudy;
}
