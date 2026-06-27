"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

// ── Types ─────────────────────────────────────────────────────────────────────

type Star = {
  id: number; x: number; y: number; size: number;
  opacity: number; delay: number; dur: number;
  r: number; g: number; b: number;
  bloom: boolean; pulsar: boolean;
};

type Comet = {
  id: number; startX: number; startY: number;
  delay: number; dur: number; length: number; angle: number;
};

// ── Nebula blobs ──────────────────────────────────────────────────────────────

const NEBULAE = [
  { cx: "12%",  cy: "22%", rx: "62%", ry: "48%", color: "rgba(0,200,155,0.06)",   pulse: false },
  { cx: "84%",  cy: "42%", rx: "52%", ry: "44%", color: "rgba(108,32,230,0.075)", pulse: false },
  { cx: "48%",  cy: "88%", rx: "55%", ry: "38%", color: "rgba(18,45,200,0.065)",  pulse: false },
  { cx: "76%",  cy: "28%", rx: "14%", ry: "10%", color: "rgba(0,230,170,0.10)",   pulse: true  },
  { cx: "30%",  cy: "60%", rx: "28%", ry: "22%", color: "rgba(200,40,130,0.038)", pulse: false },
  { cx: "96%",  cy: "10%", rx: "32%", ry: "26%", color: "rgba(0,160,210,0.05)",   pulse: false },
];

// ── Galactic arm helper ───────────────────────────────────────────────────────

function galaxyDensity(x: number, y: number): number {
  const bandY = -0.75 * x + 0.85;
  const dist  = Math.abs(y - bandY);
  return dist < 0.30 ? 1 - dist / 0.30 : 0;
}

// ── Star colour palette ───────────────────────────────────────────────────────

const STAR_PALETTE = [
  [255, 255, 255], [255, 255, 255], [255, 255, 255],
  [210, 230, 255],
  [255, 245, 210],
  [200, 215, 255],
  [255, 230, 200],
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function NightSky() {
  const { theme } = useTheme();
  const isDark    = theme === "dark";

  const [stars,  setStars]  = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    // --- Starfield ---
    const list: Star[] = [];
    let id = 0;

    // Layer A — background haze (micro stars, denser in galactic band)
    for (let i = 0; i < 140; i++) {
      const x = Math.random(), y = Math.random();
      const density = galaxyDensity(x, y);
      if (density < 0.10 && Math.random() > 0.5) continue;
      list.push({
        id: id++, x: x * 100, y: y * 100,
        size: Math.random() * 0.55 + 0.25,
        opacity: 0.28 + density * 0.30 + Math.random() * 0.22,
        delay: Math.random() * 14,
        dur:   3.5 + Math.random() * 6,
        r: 255, g: 255, b: 255,
        bloom: false, pulsar: false,
      });
    }

    // Layer B — mid-field stars
    for (let i = 0; i < 110; i++) {
      const x = Math.random(), y = Math.random();
      const col = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];
      list.push({
        id: id++, x: x * 100, y: y * 100,
        size: Math.random() * 0.9 + 0.6,
        opacity: 0.45 + Math.random() * 0.50,
        delay: Math.random() * 10,
        dur:   2.2 + Math.random() * 4.5,
        r: col[0], g: col[1], b: col[2],
        bloom: false, pulsar: false,
      });
    }

    // Layer C — foreground bright stars (with bloom)
    for (let i = 0; i < 35; i++) {
      const col = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];
      list.push({
        id: id++, x: Math.random() * 100, y: Math.random() * 100,
        size: Math.random() * 1.6 + 1.8,
        opacity: 0.70 + Math.random() * 0.30,
        delay: Math.random() * 8,
        dur:   2.0 + Math.random() * 3.5,
        r: col[0], g: col[1], b: col[2],
        bloom: true, pulsar: false,
      });
    }

    // One pulsar — bright periodic flare
    list.push({
      id: id++, x: 22, y: 14,
      size: 2.2, opacity: 0.55,
      delay: 0, dur: 5,
      r: 180, g: 240, b: 255,
      bloom: true, pulsar: true,
    });

    setStars(list);

    // --- Comets ---
    // 2 comets, 30–42 s cycles. Each cycle: 52 % invisible wait → 32 % slow crossing → 16 % exit hold.
    // Motion is in the negative-X direction (translateX positive → negative), so angles 50–130°
    // (whose positive-X points downward) make the comet travel upward — bottom → top.
    const cometList: Comet[] = Array.from({ length: 2 }, (_, i) => {
      const dur = 30 + Math.random() * 12;     // 30–42 s full cycle
      return {
        id:     i,
        startX: 5 + Math.random() * 90,        // spread across bottom edge
        startY: 95 + Math.random() * 4,        // 95–99 % — right at the bottom
        delay:  -(Math.random() * dur),         // random phase so comets fire at different times
        dur,
        length: 55 + Math.random() * 65,       // 55–120 px — long enough for the taper to read
        angle:  50 + Math.random() * 80,       // 50–130° — varied left/right lean, all going upward
      };
    });
    setComets(cometList);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex:     0,
        opacity:    isDark ? 1 : 0,
        transition: "opacity 0.9s ease",
        background: [
          "radial-gradient(ellipse 90% 55% at 18% 28%, rgba(0,30,80,0.04) 0%, transparent 60%)",
          "radial-gradient(ellipse 70% 45% at 88% 18%, rgba(30,5,90,0.03) 0%, transparent 55%)",
          "radial-gradient(ellipse 110% 50% at 50% 95%, rgba(0,8,30,0.03) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 35% at 65% 55%, rgba(2,12,20,0.02) 0%, transparent 50%)",
          "linear-gradient(155deg, #000000 0%, #03020e 30%, #020108 60%, #000000 100%)",
        ].join(","),
      }}
    >
      {/* Nebula clouds */}
      {NEBULAE.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse ${n.rx} ${n.ry} at ${n.cx} ${n.cy}, ${n.color} 0%, transparent 70%)`,
            ...(n.pulse ? {
              animation: "ns-nebula-pulse 7s ease-in-out infinite",
              transformOrigin: `${n.cx} ${n.cy}`,
            } : {}),
          }}
        />
      ))}

      {/* Starfield */}
      {stars.map(s => {
        const glow = s.bloom
          ? `0 0 ${s.size * 2.2}px rgba(${s.r},${s.g},${s.b},0.75), 0 0 ${s.size * 5}px rgba(${s.r},${s.g},${s.b},0.28)`
          : "none";
        return (
          <div
            key={s.id}
            style={{
              position:     "absolute",
              left:         `${s.x}%`,
              top:          `${s.y}%`,
              width:        s.size,
              height:       s.size,
              borderRadius: "50%",
              background:   `rgb(${s.r},${s.g},${s.b})`,
              opacity:      s.opacity,
              boxShadow:    glow,
              animation:    s.pulsar
                ? `ns-pulsar 5s ease-in-out ${s.delay}s infinite`
                : `ns-star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Comets — outer wrapper rotates, inner div translates so both combine */}
      {isDark && comets.map(c => (
        <div
          key={c.id}
          style={{
            position:        "absolute",
            left:            `${c.startX}%`,
            top:             `${c.startY}%`,
            transform:       `rotate(${c.angle}deg)`,
            transformOrigin: "left center",
          }}
        >
          <div style={{ animation: `ns-comet-travel ${c.dur}s linear ${c.delay}s infinite both` }}>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
              {/* Nucleus — bright white core with 4-layer bloom */}
              <div style={{
                position:     "absolute",
                left:         -3,
                top:          "50%",
                transform:    "translateY(-50%)",
                width:        4,
                height:       4,
                borderRadius: "50%",
                background:   "white",
                boxShadow:    [
                  "0 0 3px 1px rgba(255,255,255,1)",
                  "0 0 8px 3px rgba(200,230,255,0.85)",
                  "0 0 18px 7px rgba(140,205,255,0.45)",
                  "0 0 34px 13px rgba(100,175,255,0.18)",
                ].join(", "),
                zIndex: 1,
              }} />
              {/* Tail — clipPath wedge: full height at the head (left), tapering to a point at the trailing end (right) */}
              <div style={{
                width:      c.length,
                height:     3,
                clipPath:   "polygon(0% 0%, 0% 100%, 100% 50%)",
                background: "linear-gradient(to right, rgba(220,240,255,0.78) 0%, rgba(160,215,255,0.42) 38%, rgba(100,175,255,0.12) 72%, transparent 100%)",
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
