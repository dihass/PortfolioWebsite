"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { registerParticle, unregisterParticle } from "./particleRegistry";
import { hexToRgb, lerpColor } from "@/lib/color";

interface InteractiveWordProps {
  text: string;
  className?: string;
  fontFamily?: string;
  backgroundColor?: string;
  baseColor?: string;
  accentColor?: string;
  /** Register this canvas in the particle registry under this id */
  particleId?: string;
  /** Override CSS font-size on the fallback span (e.g. "clamp(2rem,5vw,4.5rem)") */
  fontSize?: string;
  /** Start canvas + wrapper hidden — ParticleScrollFlow reveals it via setAlpha */
  initialHidden?: boolean;
}

const DEFAULT_FONT = "Fraunces, Georgia, serif";
const DEFAULT_BG   = "#F6F0E4";
const DEFAULT_BASE = "#1c1714";
const DEFAULT_ACC  = "#ff5a2c";

type ParticleBuffers = {
  count: number;
  x:     Float32Array;
  y:     Float32Array;
  vx:    Float32Array;
  vy:    Float32Array;
  homeX: Float32Array;
  homeY: Float32Array;
  phase: Float32Array;
  size:  Float32Array;
};


export default function InteractiveWord({
  text,
  className = "",
  fontFamily = DEFAULT_FONT,
  backgroundColor = DEFAULT_BG,
  baseColor  = DEFAULT_BASE,
  accentColor = DEFAULT_ACC,
  particleId,
  fontSize,
  initialHidden = false,
}: InteractiveWordProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const particlesRef    = useRef<ParticleBuffers | null>(null);
  const mouseRef        = useRef({ x: 0, y: 0, active: false });
  const rafRef          = useRef(0);
  const externalAlpha   = useRef(initialHidden ? 0 : 1);

  useEffect(() => {
    const canvas   = canvasRef.current;
    const wrap     = wrapRef.current;
    const fallback = fallbackRef.current;
    if (!canvas || !wrap || !fallback) return;

    // Mobile: skip all canvas/particle work — plain text only
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Apply initial hidden state to wrapper
    if (initialHidden) wrap.style.visibility = "hidden";

    const baseRgb   = hexToRgb(baseColor);
    const accentRgb = hexToRgb(accentColor);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, dpr = 1;

    const buildParticles = () => {
      const rect         = wrap.getBoundingClientRect();
      const fallbackStyle = window.getComputedStyle(fallback);
      const fallbackRect  = fallback.getBoundingClientRect();
      width  = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr    = Math.min(window.devicePixelRatio || 1, 2);
      const fs  = parseFloat(fallbackStyle.fontSize) || Math.min(width / 4, height);
      const fw  = fallbackStyle.fontWeight || "900";
      const ff  = fallbackStyle.fontFamily || fontFamily;

      canvas.width  = Math.floor(width  * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sampler    = document.createElement("canvas");
      const sampleCtx  = sampler.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      sampler.width  = Math.floor(width  * dpr);
      sampler.height = Math.floor(height * dpr);
      sampleCtx.scale(dpr, dpr);
      sampleCtx.clearRect(0, 0, width, height);
      sampleCtx.font         = `${fw} ${fs}px ${ff}`;
      sampleCtx.textAlign    = "left";
      sampleCtx.textBaseline = "alphabetic";
      sampleCtx.lineJoin     = "round";
      sampleCtx.fillStyle    = "#000";

      const metrics     = sampleCtx.measureText(text);
      const visualH     = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baseline    = Math.max(
        metrics.actualBoundingBoxAscent,
        (height - visualH) / 2 + metrics.actualBoundingBoxAscent,
      );
      const x = Math.max(0, (width - fallbackRect.width) / 2);
      sampleCtx.fillText(text, x, baseline);

      const image = sampleCtx.getImageData(0, 0, sampler.width, sampler.height);
      // Release sampler immediately — we only need the pixel data, not the canvas
      sampler.width = 0; sampler.height = 0;

      const gap   = Math.max(3, Math.round(fs / 42));
      const points: Array<[number, number, number]> = [];

      for (let py = 0; py < image.height; py += gap * dpr) {
        for (let px = 0; px < image.width; px += gap * dpr) {
          const a = image.data[(Math.floor(py) * image.width + Math.floor(px)) * 4 + 3];
          if (a > 80) points.push([px / dpr, py / dpr, a / 255]);
        }
      }

      const count = points.length;
      const buffers: ParticleBuffers = {
        count,
        x:     new Float32Array(count),
        y:     new Float32Array(count),
        vx:    new Float32Array(count),
        vy:    new Float32Array(count),
        homeX: new Float32Array(count),
        homeY: new Float32Array(count),
        phase: new Float32Array(count),
        size:  new Float32Array(count),
      };

      for (let i = 0; i < count; i++) {
        const [px, py, alpha] = points[i];
        buffers.x[i]     = px + (Math.random() - 0.5) * 4;
        buffers.y[i]     = py + (Math.random() - 0.5) * 4;
        buffers.homeX[i] = px;
        buffers.homeY[i] = py;
        buffers.phase[i] = Math.random() * Math.PI * 2;
        buffers.size[i]  = Math.max(1.15, gap * (0.42 + alpha * 0.24));
      }

      particlesRef.current = buffers;

      // Register handle after first successful build
      if (particleId) {
        registerParticle(particleId, {
          getParticles: () => {
            const p = particlesRef.current;
            if (!p) return null;
            return { count: p.count, homeX: p.homeX, homeY: p.homeY, size: p.size, phase: p.phase };
          },
          getCanvasRect: () => canvas.getBoundingClientRect(),
          setAlpha: (v: number) => {
            externalAlpha.current = v;
            const w = wrapRef.current;
            if (w) w.style.visibility = v > 0.01 ? "visible" : "hidden";
          },
        });
      }
    };

    const render = (now: number) => {
      const particles = particlesRef.current;
      const ea        = externalAlpha.current;
      ctx.clearRect(0, 0, width, height);

      if (particles && ea > 0.005) {
        const time       = now * 0.001;
        const radius     = Math.min(112, Math.max(68, width * 0.095));
        const radiusSq   = radius * radius;
        const reduceMotion = media.matches;

        for (let i = 0; i < particles.count; i++) {
          const hX   = particles.homeX[i];
          const hY   = particles.homeY[i];
          const drift = reduceMotion ? 0 : 0.85;
          let tX     = hX + Math.sin(time * 0.9  + particles.phase[i]) * drift;
          let tY     = hY + Math.cos(time * 0.75 + particles.phase[i] * 1.17) * drift;
          let heat   = 0;

          if (mouseRef.current.active) {
            const dx = particles.x[i] - mouseRef.current.x;
            const dy = particles.y[i] - mouseRef.current.y;
            const dq = dx * dx + dy * dy;
            if (dq < radiusSq) {
              const d   = Math.sqrt(dq) || 1;
              heat      = 1 - d / radius;
              const f   = heat * heat * radius * 0.26;
              tX       += (dx / d) * f;
              tY       += (dy / d) * f;
            }
          }

          particles.vx[i] += (tX - particles.x[i]) * 0.12;
          particles.vy[i] += (tY - particles.y[i]) * 0.12;
          particles.vx[i] *= 0.7;
          particles.vy[i] *= 0.7;
          particles.x[i]  += particles.vx[i];
          particles.y[i]  += particles.vy[i];

          ctx.fillStyle  = lerpColor(baseRgb, accentRgb, heat);
          ctx.globalAlpha = ea * (0.9 + heat * 0.1);
          ctx.beginPath();
          ctx.arc(
            particles.x[i],
            particles.y[i],
            particles.size[i] * (1 + heat * 0.95),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current  = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => { mouseRef.current.active = false; };

    const observer = new ResizeObserver(buildParticles);
    observer.observe(wrap);
    canvas.addEventListener("pointermove",  onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    void document.fonts?.ready.then(buildParticles);
    buildParticles();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener("pointermove",  onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      if (particleId) unregisterParticle(particleId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accentColor, backgroundColor, baseColor, fontFamily, text, particleId, initialHidden]);

  return (
    <div
      ref={wrapRef}
      className={`interactive-word ${className}`}
      style={{ "--word-bg": backgroundColor } as CSSProperties}
      aria-label={text}
    >
      <canvas ref={canvasRef} className="interactive-word-canvas" aria-hidden="true" />
      <span
        ref={fallbackRef}
        className="interactive-word-fallback"
        aria-hidden="true"
        style={fontSize ? { fontSize } : undefined}
      >
        {text}
      </span>
    </div>
  );
}
