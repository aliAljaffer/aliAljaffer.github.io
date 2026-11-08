import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { loadBodoni, loadRobotoMono } from "@/lib/og-font";

export const dynamic = "force-static";
export const alt = "Ali Aljaffer - Platform Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Ali Aljaffer";
const ROLE = "Platform Engineer · Riyadh, KSA";
const SITE = "alialjaffer.com";

const asset = (path: string) =>
  `data:image/png;base64,${readFileSync(join(process.cwd(), "public", path)).toString("base64")}`;

export default async function Image() {
  const [regular, bodoni] = await Promise.all([
    loadRobotoMono(`${ROLE}${SITE}`, 400),
    loadBodoni(NAME, 500),
  ]);
  const mark = asset("brand/a-spill-reversed-512.png");
  const band = asset("paint/og-band.png");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#161029",
          color: "#fff9f2",
          fontFamily: "Roboto Mono",
        }}
      >
        <img src={band} width={1200} height={252} style={{ objectFit: "cover" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "34px 64px 52px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <img src={mark} width={96} height={96} />
            <div
              style={{
                display: "flex",
                fontFamily: "Bodoni Moda",
                fontSize: 86,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {NAME}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", fontSize: 26, color: "#b3adb6" }}>
              {ROLE}
            </div>
            <div style={{ display: "flex", fontSize: 22, color: "#e0b1cb" }}>
              {SITE}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Roboto Mono", data: regular, weight: 400, style: "normal" },
        { name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" },
      ],
    },
  );
}
