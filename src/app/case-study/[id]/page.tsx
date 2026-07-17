// src/app/case-study/[id]/page.tsx

import type { Metadata } from "next";
import {
  getCaseStudy,
  getAllCaseStudyIds,
  getRelatedCaseStudies,
} from "@/lib/case-studies";
import { getMarkdownContent } from "@/lib/markdown-loader";
import { SITE_URL } from "@/lib/site";
import CaseStudyClient from "./CaseStudyClient";
import NotFound from "@/app/not-found";

export async function generateStaticParams() {
  return getAllCaseStudyIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);
  if (!caseStudy) return {};

  const url = `${SITE_URL}/case-study/${id}/`;
  return {
    title: caseStudy.name,
    description: caseStudy.description,
    alternates: { canonical: url },
    openGraph: {
      title: caseStudy.name,
      description: caseStudy.description,
      url,
      type: "article",
      publishedTime: caseStudy.date,
      tags: caseStudy.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.name,
      description: caseStudy.description,
    },
  };
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
  const relatedPosts = getRelatedCaseStudies(caseStudy);

  return (
    <CaseStudyClient
      caseStudy={{
        ...caseStudy,
        content: content || "",
      }}
      relatedPosts={relatedPosts}
    />
  );
}
