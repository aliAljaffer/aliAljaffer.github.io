import { getVisibleCaseStudies } from "@/lib/case-studies";

export const dynamic = "force-static";

export function GET() {
  const items = [
    ...(getVisibleCaseStudies("blog") ?? []),
    ...(getVisibleCaseStudies("project") ?? []),
  ].map((item) => ({
    id: item.caseStudyId,
    name: item.name,
    description: item.description,
    tags: item.tags,
    type: item.type,
    icon: item.icon ?? null,
  }));

  return Response.json(items);
}
