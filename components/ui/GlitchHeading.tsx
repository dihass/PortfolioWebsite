"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  subtitle?: string;
  inView: boolean;
  delay?: number;
  center?: boolean;
}

export default function GlitchHeading({ text, subtitle, inView, delay = 0.1, center }: Props) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-baseline gap-4 ${center ? "justify-center" : ""}`}
      >
        <h2 className="font-fraunces font-bold text-display-lg text-[#1c1714]">
          {text}
        </h2>
        {subtitle && (
          <span className="font-fraunces italic text-2xl text-[#ddd0c0]">{subtitle}</span>
        )}
      </motion.div>
    </div>
  );
}
