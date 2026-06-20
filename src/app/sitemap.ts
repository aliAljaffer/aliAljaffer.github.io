import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getVisibleCaseStudies } from "@/lib/case-studies";

const BASE_URL = "https://alialjaffer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getVisibleCaseStudies("project") ?? [];
  const blogs = getVisibleCaseStudies("blog") ?? [];

  const articles = [...blogs, ...projects].map((article) => ({
    url: `${BASE_URL}/case-study/${article.caseStudyId}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articles,
  ];
}
