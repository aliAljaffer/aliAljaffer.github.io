import { brandCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Ali Aljaffer - Platform Engineer";
export const size = ogSize;
export const contentType = "image/png";

const NAME = "Ali Aljaffer";
const ROLE = "Platform Engineer";
const TAGLINE = "Cloud Engineering and DevOps Portfolio";

export default async function Image() {
  return brandCard({ title: NAME, subtitle: ROLE, meta: TAGLINE });
}
