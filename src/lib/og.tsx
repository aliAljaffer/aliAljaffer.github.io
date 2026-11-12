import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import brand from "@/brand/brand.json";

export const ogSize = { width: 1200, height: 630 };

const load = (...parts: string[]) => readFile(path.join(process.cwd(), ...parts));

export async function brandCard({
  title,
  subtitle,
  meta,
  subtitleLines = 2,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  subtitleLines?: number;
}) {
  const [display, text, code, plate, icon] = await Promise.all([
    load("src/brand/og/Fraunces.ttf"),
    load("src/brand/og/Karla.ttf"),
    load("src/brand/og/SplineSansMono.ttf"),
    load("src/brand/og/plate.jpg"),
    load("public/brand/icon.svg"),
  ]);
  const c = brand.light;
  const wash = (colour: string, at: string, alpha: string) =>
    `radial-gradient(60% 60% at ${at}, ${colour}${alpha}, transparent 70%)`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: c.paper,
          backgroundImage: [wash(c.wash_a, "8% 100%", "4d"), wash(c.wash_c, "100% 80%", "33")].join(", "),
          color: c.ink,
          fontFamily: "Karla",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 1200, height: 190 }}>
          <img
            src={`data:image/jpeg;base64,${plate.toString("base64")}`}
            width={1200}
            height={190}
            style={{ objectFit: "cover", objectPosition: "top" }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 70,
              backgroundImage: `linear-gradient(to bottom, ${c.paper}00, ${c.paper})`,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", padding: "28px 64px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={`data:image/svg+xml;base64,${icon.toString("base64")}`} width={40} height={40} alt="" />
            <div style={{ display: "flex", fontFamily: "Spline Sans Mono", fontSize: 22, letterSpacing: "0.14em", color: c.ink_soft }}>
              ALIALJAFFER.COM
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: title.length > 42 ? 58 : 76, lineHeight: 1.1, letterSpacing: "-0.02em", color: c.ink_strong }}>
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: subtitleLines,
                  overflow: "hidden",
                  fontSize: 28,
                  lineHeight: 1.4,
                  color: c.ink_soft,
                }}
              >
                {subtitle}
              </div>
            )}
            {meta && (
              <div style={{ display: "flex", fontFamily: "Spline Sans Mono", fontSize: 22, color: c.ink_soft }}>{meta}</div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: display, weight: brand.type.heading_weight as 500, style: "normal" },
        { name: "Karla", data: text, weight: 400, style: "normal" },
        { name: "Spline Sans Mono", data: code, weight: 400, style: "normal" },
      ],
    },
  );
}
