// Fixed tag taxonomy for case-study frontmatter (`tags: [Kubernetes, Terraform]`).
// A closed set, not freeform strings, so tagging stays consistent across
// entries instead of drifting into near-duplicate labels over time.
export const CASE_STUDY_TAGS = [
  "Kubernetes",
  "Terraform",
  "AWS",
  "Azure",
  "Alibaba Cloud",
  "CI/CD",
  "Homelab",
  "Networking",
  "Web Development",
  "Machine Learning",
  "Career",
  "Automation",
  "Security",
  "Docker",
  "Ansible",
  "Go",
  "Python",
  "React",
  "Next.js",
] as const;

export type CaseStudyTag = (typeof CASE_STUDY_TAGS)[number];

export function isCaseStudyTag(value: unknown): value is CaseStudyTag {
  return (
    typeof value === "string" &&
    (CASE_STUDY_TAGS as readonly string[]).includes(value)
  );
}
