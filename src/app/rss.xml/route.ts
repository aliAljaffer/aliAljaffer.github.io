import { getVisibleCaseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const projects = getVisibleCaseStudies("project") ?? [];
  const blogs = getVisibleCaseStudies("blog") ?? [];
  const items = [...blogs, ...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const itemsXml = items
    .map((item) => {
      const url = `${SITE_URL}/case-study/${item.caseStudyId}/`;
      return `
    <item>
      <title>${escapeXml(item.name)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ali Aljaffer - Platform Engineer</title>
    <link>${SITE_URL}</link>
    <description>Cloud Engineering and DevOps Portfolio</description>${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
