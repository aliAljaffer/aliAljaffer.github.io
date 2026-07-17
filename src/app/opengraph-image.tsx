import { ImageResponse } from "next/og";
import { loadRobotoMono, loadRomanesco } from "@/lib/og-font";

export const dynamic = "force-static";
export const alt = "Ali Aljaffer - Platform Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Ali Aljaffer";
const ROLE = "Platform Engineer";
const TAGLINE = "Cloud Engineering and DevOps Portfolio";

export default async function Image() {
  const metaText = `~/ali-aljaffer${ROLE}${TAGLINE}`;
  const [regular, romanesco] = await Promise.all([
    loadRobotoMono(metaText, 400),
    loadRomanesco(NAME),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px",
        backgroundColor: "#171717",
        color: "#f5f5f5",
        fontFamily: "Roboto Mono",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, opacity: 0.7 }}>
        ~/ali-aljaffer
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontFamily: "Romanesco", fontSize: 96 }}>
          {NAME}
        </div>
        <div style={{ display: "flex", fontSize: 32, opacity: 0.85 }}>
          {ROLE}
        </div>
        <div style={{ display: "flex", fontSize: 26, opacity: 0.7 }}>
          {TAGLINE}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Roboto Mono", data: regular, weight: 400, style: "normal" },
        { name: "Romanesco", data: romanesco, weight: 400, style: "normal" },
      ],
    },
  );
}
