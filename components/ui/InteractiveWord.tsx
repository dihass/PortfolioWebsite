"use client";

import { type CSSProperties, useEffect, useRef } from "react";

interface InteractiveWordProps {
  text: string;
  className?: string;
  fontFamily?: string;
  backgroundColor?: string;
  baseColor?: string;
  accentColor?: string;
}

const DEFAULT_FONT = "Fraunces, Georgia, serif";
const DEFAULT_BACKGROUND = "#f9f5ef";
const DEFAULT_BASE = "#1c1714";
const DEFAULT_ACCENT = "#ff5a2c";

type ParticleBuffers = {
  count: number;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  homeX: Float32Array;
  homeY: Float32Array;
  phase: Float32Array;
  size: Float32Array;
};

function lerpColor(from: [number, number, number], to: [number, number, number], amount: number) {
  const t = Math.max(0, Math.min(1, amount));
  const r = Math.round(from[0] + (to[0] - from[0]) * t);
  const g = Math.round(from[1] + (to[1] - from[1]) * t);
  const b = Math.round(from[2] + (to[2] - from[2]) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean, 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export default function InteractiveWord({
  text,
  className = "",
  fontFamily = DEFAULT_FONT,
  backgroundColor = DEFAULT_BACKGROUND,
  baseColor = DEFAULT_BASE,
  accentColor = DEFAULT_ACCENT,
}: InteractiveWordProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<ParticleBuffers | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const fallback = fallbackRef.current;
    if (!canvas || !wrap || !fallback) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const baseRgb = hexToRgb(baseColor);
    const accentRgb = hexToRgb(accentColor);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let dpr = 1;

    const buildParticles = () => {
      const rect = wrap.getBoundingClientRect();
      const fallbackStyle = window.getComputedStyle(fallback);
      const fallbackRect = fallback.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const fontSize = Number.parseFloat(fallbackStyle.fontSize) || Math.min(width / 4, height);
      const fontWeight = fallbackStyle.fontWeight || "900";
      const computedFontFamily = fallbackStyle.fontFamily || fontFamily;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sampler = document.createElement("canvas");
      const sampleCtx = sampler.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      sampler.width = Math.floor(width * dpr);
      sampler.height = Math.floor(height * dpr);
      sampleCtx.scale(dpr, dpr);
      sampleCtx.clearRect(0, 0, width, height);
      sampleCtx.font = `${fontWeight} ${fontSize}px ${computedFontFamily}`;
      sampleCtx.textAlign = "left";
      sampleCtx.textBaseline = "alphabetic";
      sampleCtx.lineJoin = "round";
      sampleCtx.fillStyle = "#000";
      const metrics = sampleCtx.measureText(text);
      const visualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baseline = Math.max(
        metrics.actualBoundingBoxAscent,
        (height - visualHeight) / 2 + metrics.actualBoundingBoxAscent,
      );
      const x = Math.max(0, (width - fallbackRect.width) / 2);
      sampleCtx.fillText(text, x, baseline);

      const image = sampleCtx.getImageData(0, 0, sampler.width, sampler.height);
      const gap = Math.max(3, Math.round(fontSize / 42));
      const points: Array<[number, number, number]> = [];

      for (let y = 0; y < sampler.height; y += gap * dpr) {
        for (let x = 0; x < sampler.width; x += gap * dpr) {
          const alpha = image.data[(Math.floor(y) * sampler.width + Math.floor(x)) * 4 + 3];
          if (alpha > 80) points.push([x / dpr, y / dpr, alpha / 255]);
        }
      }

      const count = points.length;
      const buffers: ParticleBuffers = {
        count,
        x: new Float32Array(count),
        y: new Float32Array(count),
        vx: new Float32Array(count),
        vy: new Float32Array(count),
        homeX: new Float32Array(count),
        homeY: new Float32Array(count),
        phase: new Float32Array(count),
        size: new Float32Array(count),
      };

      for (let i = 0; i < count; i += 1) {
        const [px, py, alpha] = points[i];
        buffers.x[i] = px + (Math.random() - 0.5) * 4;
        buffers.y[i] = py + (Math.random() - 0.5) * 4;
        buffers.homeX[i] = px;
        buffers.homeY[i] = py;
        buffers.phase[i] = Math.random() * Math.PI * 2;
        buffers.size[i] = Math.max(1.15, gap * (0.42 + alpha * 0.24));
      }

      particlesRef.current = buffers;
    };

    const render = (now: number) => {
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, width, height);

      if (particles) {
        const time = now * 0.001;
        const radius = Math.min(112, Math.max(68, width * 0.095));
        const radiusSq = radius * radius;
        const reduceMotion = media.matches;

        for (let i = 0; i < particles.count; i += 1) {
          const homeX = particles.homeX[i];
          const homeY = particles.homeY[i];
          const drift = reduceMotion ? 0 : 0.85;
          let targetX = homeX + Math.sin(time * 0.9 + particles.phase[i]) * drift;
          let targetY = homeY + Math.cos(time * 0.75 + particles.phase[i] * 1.17) * drift;
          let heat = 0;

          if (mouseRef.current.active) {
            const dx = particles.x[i] - mouseRef.current.x;
            const dy = particles.y[i] - mouseRef.current.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq) || 1;
              heat = 1 - dist / radius;
              const force = heat * heat * radius * 0.26;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }
          }

          particles.vx[i] += (targetX - particles.x[i]) * 0.12;
          particles.vy[i] += (targetY - particles.y[i]) * 0.12;
          particles.vx[i] *= 0.7;
          particles.vy[i] *= 0.7;
          particles.x[i] += particles.vx[i];
          particles.y[i] += particles.vy[i];

          const color = lerpColor(baseRgb, accentRgb, heat);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.9 + heat * 0.1;
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

        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    const observer = new ResizeObserver(buildParticles);
    observer.observe(wrap);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    void document.fonts?.ready.then(buildParticles);
    buildParticles();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [accentColor, backgroundColor, baseColor, fontFamily, text]);

  return (
    <div
      ref={wrapRef}
      className={`interactive-word ${className}`}
      style={{ "--word-bg": backgroundColor } as CSSProperties}
      aria-label={text}
    >
      <canvas ref={canvasRef} className="interactive-word-canvas" aria-hidden="true" />
      <span ref={fallbackRef} className="interactive-word-fallback" aria-hidden="true">
        {text}
      </span>
    </div>
  );
}
