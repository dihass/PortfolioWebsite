import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Dihas Sathnindu — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ─── Font loader ─────────────────────────────────────────────────────────────
// Satori (next/og) accepts TTF/OTF only — not WOFF/WOFF2.
// Fraunces is a variable font; Satori's fontkit crashes on its GVAR tables
// ("Cannot read properties of undefined (reading '256')").
// DM Serif Display is a static-weight display serif with a similar high-contrast
// editorial feel. Its single-weight TTF has no variation tables and parses cleanly.
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf"
    );
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

// ─── Image route ─────────────────────────────────────────────────────────────
export default async function Image() {
  const [displayFont, photoBuffer] = await Promise.all([
    loadDisplayFont(),
    readFile(path.join(process.cwd(), "public", "about.jpg")).catch(() => null),
  ]);

  const photoSrc = photoBuffer
    ? `data:image/jpeg;base64,${photoBuffer.toString("base64")}`
    : null;

  const HEADING = displayFont ? "DMSerifDisplay" : "Georgia, serif";

  const TICKER = [
    "NEXT.JS","REACT","NODE.JS","TYPESCRIPT","PYTHON",
    "SWIFT","PYTORCH","POSTGRESQL","DOCKER","TAILWIND",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f9f5ef",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* ── Main content ──────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "56px 80px 40px",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Left: text ─────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Label */}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "#0d7f60",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              HELLO, I&apos;M A →
            </div>

            {/* Giant heading */}
            <div
              style={{
                fontFamily: HEADING,
                fontSize: 118,
                color: "#1c1714",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
              }}
            >
              Software
            </div>
            <div
              style={{
                fontFamily: HEADING,
                fontSize: 118,
                color: "#1c1714",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                marginBottom: 32,
              }}
            >
              Engineer.
            </div>

            {/* Name row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontFamily: HEADING,
                  fontSize: 20,
                  color: "#1c1714",
                }}
              >
                Dihas Sathnindu
              </span>
              <span style={{ color: "#bdb0a0", fontSize: 20 }}>—</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "#7a6f68",
                  textTransform: "uppercase",
                }}
              >
                Colombo, Sri Lanka
              </span>
            </div>

            {/* Status tags */}
            <div style={{ display: "flex", gap: 8 }}>
              {/* Available now */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "#c8f5e5",
                  color: "#0d7f60",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#0d7f60",
                  }}
                />
                AVAILABLE NOW
              </div>

              {/* IFS */}
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "#fef8e0",
                  color: "#7a4800",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                }}
              >
                IFS INTERN 2024
              </div>

              {/* AI */}
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "#dce4ff",
                  color: "#3440c0",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                }}
              >
                FYP · AI RESEARCH
              </div>
            </div>
          </div>

          {/* Right: photo circle ─────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Outer ring (mint accent) */}
            <div
              style={{
                position: "absolute",
                width: 310,
                height: 310,
                borderRadius: "50%",
                border: "3px dashed #9fead3",
                opacity: 0.6,
              }}
            />

            {/* Photo / initials fallback */}
            <div
              style={{
                width: 270,
                height: 270,
                borderRadius: "50%",
                border: "4px solid #1c1714",
                overflow: "hidden",
                background: "#f9c840",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {photoSrc ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={photoSrc}
                  alt=""
                  width={270}
                  height={270}
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              ) : (
                <span
                  style={{
                    fontFamily: HEADING,
                    fontSize: 72,
                    color: "#1c1714",
                    letterSpacing: "-0.02em",
                  }}
                >
                  DS
                </span>
              )}
            </div>

            {/* Sticker note — "BUILDING SINCE 2022" */}
            <div
              style={{
                position: "absolute",
                top: -8,
                right: -12,
                background: "#f9c840",
                padding: "8px 14px",
                transform: "rotate(8deg)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "2px 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "#7a4800",
                  fontWeight: 700,
                }}
              >
                BUILDING SINCE 2022
              </span>
            </div>

            {/* Sticker note — "DarvinCode founder" */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: -16,
                background: "#ffd0bc",
                padding: "8px 14px",
                transform: "rotate(5deg)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "2px 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "#8b3010",
                  fontWeight: 700,
                }}
              >
                DarvinCode FOUNDER
              </span>
            </div>
          </div>
        </div>

        {/* ── Dark ticker strip ─────────────────────────────────────────── */}
        <div
          style={{
            background: "#1c1714",
            padding: "13px 80px",
            display: "flex",
            alignItems: "center",
            gap: 0,
            overflow: "hidden",
          }}
        >
          {TICKER.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "#f9f5ef",
                whiteSpace: "nowrap",
                marginRight: 24,
              }}
            >
              {item}{" "}
              <span style={{ color: "#9fead3" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: displayFont
        ? [{ name: "DMSerifDisplay", data: displayFont, style: "normal", weight: 400 }]
        : [],
    }
  );
}
