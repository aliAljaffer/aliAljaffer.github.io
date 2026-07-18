import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getVisibleCaseStudies, getTagCounts } from "@/lib/case-studies";
import { tagToSlug } from "@/data/case-study-tags";
import { SITE_URL as BASE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getVisibleCaseStudies("project") ?? [];
  const blogs = getVisibleCaseStudies("blog") ?? [];

  const articles = [...blogs, ...projects].map((article) => ({
    url: `${BASE_URL}/case-study/${article.caseStudyId}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tags = getTagCounts().map(({ tag }) => ({
    url: `${BASE_URL}/tags/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...articles,
    ...tags,
  ];
}
