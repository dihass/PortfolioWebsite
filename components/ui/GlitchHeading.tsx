"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  subtitle?: string;
  inView: boolean;
  delay?: number;
  center?: boolean;
}

export default function GlitchHeading({ text, subtitle, inView, delay = 0.1, center }: Props) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 600);
    }, (delay + 0.85) * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-baseline gap-4 ${center ? "justify-center" : ""}`}
      >
        <h2
          data-text={text}
          className={`font-spectral text-display-lg text-[#e2f0ff] ${glitching ? "glitch-active" : ""}`}
        >
          {text}
        </h2>
        {subtitle && (
          <span className="font-spectral italic text-2xl text-[#4a7090]/50">{subtitle}</span>
        )}
      </motion.div>
    </div>
  );
}
