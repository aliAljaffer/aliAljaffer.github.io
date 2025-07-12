import Link from "next/link";
import { CaseStudy } from "../types";
type Project = CaseStudy;
interface ProjectListProps {
  projects: Project[];
  className?: string;
}
export interface ProjectImage {
  caption: string;
  "alt-text": string;
  url: string;
}

export default function ProjectList({
  projects,
  className = "",
}: ProjectListProps) {
  return (
    <div
      className={`ml-6 mt-4 mb-4 space-y-4 max-w-[560px] md:ml-6 ${className}`}
    >
      {projects.map((project, index) => {
        return (
          <p key={index} className="leading-5">
            <strong className="font-normal text-terminal-strong">
              {project.name}
            </strong>
            : {project.description} (
            <Link
              href={`/case-study/${project.caseStudyId}`}
              className="text-terminal-link underline hover:no-underline"
            >
              case study
            </Link>
            )
          </p>
        );
      })}
    </div>
  );
}
