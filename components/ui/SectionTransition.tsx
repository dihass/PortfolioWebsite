"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionTransition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} className="relative h-px bg-[#162035] overflow-visible z-10">
      {/* Data scan sweep — left to right */}
      <motion.div
        className="absolute inset-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "linear-gradient(to right, #00c8ff, #00ff88 45%, rgba(0,200,255,0.35) 82%, transparent)" }}
      />

      {/* Glow halo on the sweep */}
      <motion.div
        className="absolute left-0 right-0 -top-px h-[4px] origin-left blur-sm"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: [0, 0.7, 0] } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        style={{ background: "linear-gradient(to right, rgba(0,200,255,1), rgba(0,255,136,0.7), transparent 85%)" }}
      />

      {/* Left anchor tick */}
      <motion.div
        className="absolute left-0 -top-[5px] w-px h-[11px] bg-[#00c8ff]"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={inView ? { opacity: [0, 1, 0.55], scaleY: 1 } : {}}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "top" }}
      />

      {/* Right anchor tick — fires when sweep completes */}
      <motion.div
        className="absolute right-0 -top-[5px] w-px h-[11px] bg-[#00ff88]"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={inView ? { opacity: [0, 1, 0.55], scaleY: 1 } : {}}
        transition={{ duration: 0.25, delay: 0.9 }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
