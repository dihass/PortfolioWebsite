"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── T1: Hero → About ───────────────────────────────────────────────────────
export function T1Neural() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const N = 32;

  return (
    <div ref={ref} className="relative h-px bg-[#0e1628] overflow-visible pointer-events-none">
      {Array.from({ length: N }).map((_, i) => {
        const t = i / (N - 1);
        const distFromCenter = Math.abs(t - 0.5) * 2;
        const isGold = i % 8 === 3 || i % 8 === 7;
        const color = isGold ? "#c8a94e" : "#00c8ff";
        const size = isGold ? 5 : 3;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${t * 100}%`,
              top: "0px",
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${isGold ? 8 : 5}px ${color}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: [0, 1, 0.5, 0], scale: [0, 1.5, 1, 0] } : {}}
            transition={{ duration: 1.6, delay: distFromCenter * 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      <motion.div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 72, background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,78,0.28) 0%, transparent 68%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0.6] } : {}}
        transition={{ duration: 3.2, delay: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── T2: About → Skills ─────────────────────────────────────────────────────
export function T2Radar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const streaks = [
    { y:  0, opacity: 1.00, dur: 0.75, w: "100%" },
    { y: -1, opacity: 0.52, dur: 0.90, w:  "96%" },
    { y:  1, opacity: 0.44, dur: 1.00, w:  "90%" },
    { y: -2, opacity: 0.30, dur: 1.10, w:  "82%" },
    { y:  2, opacity: 0.20, dur: 1.25, w:  "70%" },
    { y: -3, opacity: 0.10, dur: 1.40, w:  "55%" },
  ];

  return (
    <div ref={ref} className="relative h-px bg-[#162035] overflow-visible pointer-events-none">
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px origin-left"
          style={{
            top: s.y,
            width: s.w,
            background: "linear-gradient(to right, #00ff88 0%, rgba(0,255,136,0.35) 75%, transparent 100%)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: [0, s.opacity, 0] } : {}}
          transition={{ duration: s.dur, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <motion.div
        className="absolute top-1/2 right-0 w-px -translate-y-1/2"
        style={{ height: 12, backgroundColor: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: [0, 1, 0.65] } : {}}
        transition={{ duration: 0.3, delay: 0.70 }}
      />
    </div>
  );
}

// ─── T3: Skills → Projects ──────────────────────────────────────────────────
export function T3ColumnBurst() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const cols = [
    { left: "3%",   h: 18, color: "#00c8ff", delay: 0.32 },
    { left: "14%",  h: 30, color: "#00ff88", delay: 0.24 },
    { left: "25%",  h: 46, color: "#00c8ff", delay: 0.16 },
    { left: "37%",  h: 58, color: "#00ff88", delay: 0.08 },
    { left: "50%",  h: 70, color: "#c8a94e", delay: 0.00 },
    { left: "63%",  h: 58, color: "#00ff88", delay: 0.08 },
    { left: "75%",  h: 46, color: "#00c8ff", delay: 0.16 },
    { left: "86%",  h: 30, color: "#00ff88", delay: 0.24 },
    { left: "97%",  h: 18, color: "#00c8ff", delay: 0.32 },
  ];

  return (
    <div ref={ref} className="relative h-px bg-[#162035] overflow-visible pointer-events-none">
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px origin-top"
          style={{
            left: col.left,
            height: col.h,
            backgroundColor: col.color,
            boxShadow: `0 0 4px ${col.color}90`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: [0, 1, 0], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.0, delay: col.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

// ─── T4: Projects → Experience ──────────────────────────────────────────────
export function T4Membrane() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="relative h-px bg-[#162035] overflow-visible pointer-events-none">
      <motion.div
        className="absolute inset-0 origin-left"
        style={{ background: "linear-gradient(to right, #00c8ff 0%, #00c8ff 75%, transparent 100%)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute left-0 right-0 -top-[2px]"
        style={{
          height: 5,
          transformOrigin: "center",
          background: "linear-gradient(to bottom, transparent, rgba(0,200,255,0.65) 38%, rgba(200,169,78,0.45) 62%, transparent)",
          filter: "blur(1px)",
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: [0, 1, 0], opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.65, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-0 origin-center"
        style={{ background: "linear-gradient(to right, transparent 4%, #c8a94e 28%, #c8a94e 72%, transparent 96%)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: [0, 0.6, 0.22] } : {}}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// ─── T5: Experience → Contact ───────────────────────────────────────────────
export function T5Convergence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className="relative h-px bg-[#162035] overflow-visible pointer-events-none">
      <motion.div
        className="absolute left-0 w-1/2 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent 0%, #c8a94e 55%)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute right-0 w-1/2 h-px origin-right"
        style={{ background: "linear-gradient(to left, transparent 0%, #00c8ff 55%)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "#f0ebe5",
          boxShadow: "0 0 18px 4px rgba(240,235,229,0.45), 0 0 8px rgba(0,200,255,0.7)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 2.8, 0], opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.75, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 260,
          height: 52,
          background: "radial-gradient(ellipse, rgba(240,235,229,0.18) 0%, rgba(0,200,255,0.10) 32%, transparent 68%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: [0, 0.7, 0.18] } : {}}
        transition={{ duration: 1.6, delay: 0.82, ease: "easeOut" }}
      />
    </div>
  );
}
