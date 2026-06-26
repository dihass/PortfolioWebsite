"use client";

import { useEffect, useRef } from "react";
import { getParticle } from "./particleRegistry";

// ── Constants ────────────────────────────────────────────────────────────────

const TARGET_COUNT = 1100;

type RGB = [number, number, number];
const C_DARK:   RGB = [28,  23,  20];
const C_MINT:   RGB = [159, 234, 211];
const C_GOLD:   RGB = [249, 200, 64];
const C_ACCENT: RGB = [13,  127, 96];

// ── Types ─────────────────────────────────────────────────────────────────────

interface Formation {
  count:  number;
  docX:   Float32Array;
  docY:   Float32Array;
  size:   Float32Array;
  phase:  Float32Array;
  arcOX:  Float32Array;
  arcOY:  Float32Array;
}

// ── Math ──────────────────────────────────────────────────────────────────────

const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const ss    = (t: number) => t * t * (3 - 2 * t);
const qb    = (a: number, c: number, b: number, t: number) => {
  const s = 1 - t;
  return s * s * a + 2 * s * t * c + t * t * b;
};

function rgbAt(heat: number): string {
  const t = clamp(heat, 0, 1);
  let r: RGB, g: RGB, lt: number;
  if      (t < 0.45) { r = C_DARK;   g = C_MINT;   lt = t / 0.45; }
  else if (t < 0.75) { r = C_MINT;   g = C_GOLD;   lt = (t - 0.45) / 0.30; }
  else               { r = C_GOLD;   g = C_ACCENT;  lt = (t - 0.75) / 0.25; }
  return `rgb(${Math.round(lerp(r[0],g[0],lt))},${Math.round(lerp(r[1],g[1],lt))},${Math.round(lerp(r[2],g[2],lt))})`;
}

// ── Sample a formation from a registered handle ───────────────────────────────

function fromHandle(id: string, sy: number): Formation | null {
  const h    = getParticle(id);
  if (!h) return null;
  const data = h.getParticles();
  const rect = h.getCanvasRect();
  if (!data || !rect) return null;

  const { count, homeX, homeY, size, phase } = data;
  const cx  = rect.left;
  const cy  = rect.top + sy;          // document-space top of canvas

  const docX  = new Float32Array(TARGET_COUNT);
  const docY  = new Float32Array(TARGET_COUNT);
  const sz    = new Float32Array(TARGET_COUNT);
  const ph    = new Float32Array(TARGET_COUNT);
  const arcOX = new Float32Array(TARGET_COUNT);
  const arcOY = new Float32Array(TARGET_COUNT);

  for (let i = 0; i < TARGET_COUNT; i++) {
    const s = Math.floor((i / TARGET_COUNT) * count);
    docX[i]  = cx + homeX[s];
    docY[i]  = cy + homeY[s];
    sz[i]    = size[s];
    ph[i]    = phase[s];
    // Conservative arcs: subtle lateral spread, modest upward bias
    arcOX[i] = (Math.random() - 0.5) * 180;
    arcOY[i] = -(15 + Math.random() * 110);
  }

  return { count: TARGET_COUNT, docX, docY, size: sz, phase: ph, arcOX, arcOY };
}

const IDS = ["engineer", "shipped", "arsenal", "journey"] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ParticleScrollFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0, alive = true;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Scroll anchors ────────────────────────────────────────────────────────
    const getAnchors = () => {
      const vp   = window.innerHeight;
      const proj = document.getElementById("projects");
      const skl  = document.getElementById("skills");
      const exp  = document.getElementById("experience");
      if (!proj || !skl || !exp) return null;
      const sy = window.scrollY;
      const pT = proj.getBoundingClientRect().top + sy;
      const sT = skl .getBoundingClientRect().top + sy;
      const eT = exp .getBoundingClientRect().top + sy;

      // m01s: the exact scroll position at which Engineer has fully left the viewport.
      // Read the engineer canvas rect live so any layout shift is accounted for.
      const engRect = getParticle("engineer")?.getCanvasRect();
      const m01s = engRect
        ? engRect.bottom + sy   // canvas bottom in document space = viewport-scroll where it clears the top
        : sy;                   // fallback: start immediately if no rect

      return {
        m01s,
        // Give the user at least 35vh of scroll to complete the flight before Projects arrives
        m01e: Math.max(m01s + vp * 0.35, pT - vp * 0.15),
        // Projects → Skills
        m12s: pT + vp * 0.55,
        m12e: sT + vp * 0.08,
        // Skills → Experience
        m23s: sT + vp * 0.55,
        m23e: eT + vp * 0.08,
        // Fade out Journey
        fdOs: eT + vp * 0.85,
        fdOe: eT + vp * 1.6,
      };
    };

    // ── State ─────────────────────────────────────────────────────────────────
    const ms = { fromIdx: 0, toIdx: 0, progress: 0, canvasAlpha: 0 };
    let driftTime = 0;
    const formations: (Formation | null)[] = [null, null, null, null];
    let built = false;

    // ── Set all handle alphas at once ─────────────────────────────────────────
    const setAlphas = (e: number, s: number, a: number, j: number) => {
      getParticle("engineer")?.setAlpha(e);
      getParticle("shipped") ?.setAlpha(s);
      getParticle("arsenal") ?.setAlpha(a);
      getParticle("journey") ?.setAlpha(j);
    };

    // ── Scroll → state ────────────────────────────────────────────────────────
    const onScroll = () => {
      if (!alive || !built) return;
      const sy = window.scrollY;
      const a  = getAnchors();
      if (!a) return;
      const { m01s, m01e, m12s, m12e, m23s, m23e, fdOs, fdOe } = a;

      if (sy <= m01s) {
        // Hero at rest — InteractiveWord handles Engineer
        ms.canvasAlpha = 0; ms.fromIdx = 0; ms.toIdx = 0; ms.progress = 0;
        setAlphas(1, 0, 0, 0);

      } else if (sy < m01e) {
        // Transition: Engineer → Shipped
        // Instant handoff — canvas takes over immediately, no crossfade
        ms.canvasAlpha = 1;
        ms.fromIdx = 0; ms.toIdx = 1;
        ms.progress = clamp((sy - m01s) / (m01e - m01s), 0, 1);
        setAlphas(0, 0, 0, 0);   // hide all InteractiveWords; overlay handles it

      } else if (sy < m12s) {
        // Settled at Shipped — Shipped InteractiveWord is live + interactive
        ms.canvasAlpha = 0; ms.fromIdx = 1; ms.toIdx = 1; ms.progress = 1;
        setAlphas(0, 1, 0, 0);

      } else if (sy < m12e) {
        // Transition: Shipped → Arsenal
        ms.canvasAlpha = 1;
        ms.fromIdx = 1; ms.toIdx = 2;
        ms.progress = clamp((sy - m12s) / (m12e - m12s), 0, 1);
        setAlphas(0, 0, 0, 0);

      } else if (sy < m23s) {
        // Settled at Arsenal
        ms.canvasAlpha = 0; ms.fromIdx = 2; ms.toIdx = 2; ms.progress = 1;
        setAlphas(0, 0, 1, 0);

      } else if (sy < m23e) {
        // Transition: Arsenal → Journey
        ms.canvasAlpha = 1;
        ms.fromIdx = 2; ms.toIdx = 3;
        ms.progress = clamp((sy - m23s) / (m23e - m23s), 0, 1);
        setAlphas(0, 0, 0, 0);

      } else if (sy < fdOs) {
        // Settled at Journey
        ms.canvasAlpha = 0; ms.fromIdx = 3; ms.toIdx = 3; ms.progress = 1;
        setAlphas(0, 0, 0, 1);

      } else {
        // Fade Journey out as Contact approaches
        ms.canvasAlpha = 0; ms.fromIdx = 3; ms.toIdx = 3; ms.progress = 1;
        const fade = clamp((sy - fdOs) / (fdOe - fdOs), 0, 1);
        setAlphas(0, 0, 0, 1 - fade);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Build ─────────────────────────────────────────────────────────────────
    const build = async () => {
      await document.fonts.ready;
      // Two rAF cycles so all InteractiveWord buildParticles() calls complete
      await new Promise(r => requestAnimationFrame(r));
      await new Promise(r => requestAnimationFrame(r));
      if (!alive) return;

      const sy = window.scrollY;
      for (let i = 0; i < IDS.length; i++) {
        formations[i] = fromHandle(IDS[i], sy);
      }
      if (!formations[0]) return;   // Engineer must be present

      // Initially hide section headings
      getParticle("shipped")?.setAlpha(0);
      getParticle("arsenal")?.setAlpha(0);
      getParticle("journey")?.setAlpha(0);

      built = true;
      onScroll(); // sync immediately
    };
    void build();

    // ── Render ────────────────────────────────────────────────────────────────
    const render = (now: number) => {
      if (!alive) return;
      driftTime = now * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(render);

      if (ms.canvasAlpha < 0.005) return;

      const sy    = window.scrollY;
      const fromF = formations[ms.fromIdx];
      const toF   = formations[ms.toIdx];
      if (!fromF) return;

      const isMorphing = ms.fromIdx !== ms.toIdx && toF != null;

      // Particles stay at source for the first 35% of scroll progress,
      // then start flying. This makes it clear they "leave" the word.
      const morphT = isMorphing
        ? clamp((ms.progress - 0.35) / 0.65, 0, 1)
        : 1;

      for (let i = 0; i < TARGET_COUNT; i++) {
        const ph = fromF.phase[i];
        // Per-particle staggered progress inside the morph window
        const pT    = clamp((morphT - ph * 0.22) / (1 - 0.22), 0, 1);
        const eased = ss(pT);

        let vx: number, vy: number;

        if (isMorphing && toF && eased > 0.002) {
          // Flying: bezier arc in document space
          const midX = (fromF.docX[i] + toF.docX[i]) * 0.5;
          const midY = (fromF.docY[i] + toF.docY[i]) * 0.5;
          const cx   = midX + (fromF.arcOX[i] + toF.arcOX[i]) * 0.5;
          const cy   = midY + (fromF.arcOY[i] + toF.arcOY[i]) * 0.5;
          vx = qb(fromF.docX[i], cx, toF.docX[i], eased);
          vy = qb(fromF.docY[i], cy, toF.docY[i], eased) - sy;
        } else {
          // At source (either waiting, or settled) — gentle drift matching InteractiveWord
          const drift = 0.75;
          vx = fromF.docX[i] + Math.sin(driftTime * 0.9  + ph * Math.PI * 2) * drift;
          vy = fromF.docY[i] + Math.cos(driftTime * 0.75 + ph * Math.PI * 2 + 0.6) * drift - sy;
        }

        if (vy < -30 || vy > canvas.height + 30) continue;
        if (vx < -30 || vx > canvas.width  + 30) continue;

        // Heat: only ramps up AFTER particles have clearly started moving (pT > 0.15)
        // This keeps particles looking dark/natural while still at source
        const heat = (isMorphing && pT > 0.15)
          ? Math.sin(clamp((pT - 0.15) / 0.85, 0, 1) * Math.PI)
          : 0;

        const r = fromF.size[i] * (1 + heat * 0.45);

        ctx.fillStyle   = rgbAt(heat);
        ctx.globalAlpha = ms.canvasAlpha * (0.9 + heat * 0.1);
        ctx.beginPath();
        ctx.arc(vx, vy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(render);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      IDS.forEach(id => getParticle(id)?.setAlpha(1));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 40,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
