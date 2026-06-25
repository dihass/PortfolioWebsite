"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function WaveTransition({ flip = false }: { flip?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });

  return (
    <div ref={ref} className={`relative overflow-hidden pointer-events-none py-1 ${flip ? "[transform:scaleX(-1)]" : ""}`} style={{ height: 32 }}>
      <svg viewBox="0 0 1440 32" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <motion.path
          d="M0,16 C180,4 360,28 540,16 C720,4 900,28 1080,16 C1260,4 1350,22 1440,16"
          fill="none"
          stroke="#ddd0c0"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}

export function T1Neural()      { return <WaveTransition />; }
export function T2Radar()       { return <WaveTransition flip />; }
export function T3ColumnBurst() { return <WaveTransition />; }
export function T4Membrane()    { return <WaveTransition flip />; }
export function T5Convergence() { return <WaveTransition />; }
