// src/app/case-study/[id]/page.tsx

import { getCaseStudy, getAllCaseStudyIds } from "@/data/case-studies";
import { getMarkdownContent } from "@/lib/markdown-loader";
import CaseStudyClient from "./CaseStudyClient";
import NotFound from "@/app/not-found";

export async function generateStaticParams() {
  return getAllCaseStudyIds().map((id) => ({ id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!params) {
    return NotFound({ message: `No content found for this case study` });
  }
  const { id } = await params;
  const caseStudy = getCaseStudy(id);
  if (!caseStudy) {
    return NotFound({ message: `No content found for case study: ${id}` });
  }
  const content = await getMarkdownContent(id);
  if (!content) {
    return NotFound({ message: `No content found for case study: ${id}` });
  }

  return (
    <CaseStudyClient
      caseStudy={{
        ...caseStudy,
        content: content || "",
      }}
    />
  );
}
