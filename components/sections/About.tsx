"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Status",    value: "Open to Opportunities", highlight: true },
  { label: "Location",  value: "Colombo, Sri Lanka" },
  { label: "Education", value: "BEng CS — IIT / Westminster" },
  { label: "Experience",value: "Software Eng. Intern — IFS" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Left: photos */}
          <div className="relative pb-12 md:pb-0">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/4] max-w-[340px]"
            >
              <Image src="/about.jpg" alt="Dihas at work" fill className="object-cover object-top rounded-sm" />
              <div className="absolute inset-0 rounded-sm" style={{ boxShadow: "inset 0 0 0 1px rgba(221,208,192,0.6)" }} />
            </motion.div>

            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-4 md:-right-12 w-[140px] h-[180px] border-2 border-[#f9f5ef] rounded-sm overflow-hidden"
            >
              <Image src="/hero.jpg" alt="Dihas Sathnindu" fill className="object-cover object-top" />
            </motion.div>
          </div>

          {/* Right: text */}
          <div className="pt-4 md:pt-0">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-silkscreen text-xs tracking-widest text-[#0d7f60] uppercase mb-4"
            >
              THE PERSON
            </motion.p>

            <div className="mb-8 overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="font-fraunces font-bold text-display-md text-[#1c1714]"
              >
                Engineer by craft,
                <br />
                builder by instinct.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.65 }}
              className="space-y-4 text-[#7a6f68] leading-[1.85] font-jakarta mb-8"
            >
              <p>
                I&apos;m a final-year Computer Science student at IIT / University of
                Westminster and a Software Engineering Intern at IFS — where I&apos;ve
                worked on enterprise systems, optimised backend queries, and shipped
                real features used by real people.
              </p>
              <p>
                Outside of that, I research clinical AI (my Final Year Project
                predicts sepsis 6 hours before onset), build iOS apps, and ship
                full-stack platforms. I&apos;m looking for a junior SWE role where I can
                grow fast and contribute from day one.
              </p>
            </motion.div>

            {/* DarvinCode callout — sunshine tinted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 p-4 bg-[#fef8e0] border border-[#f9c840]/50 rounded-sm overflow-hidden"
            >
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-silkscreen text-[9px] text-[#7a4800] tracking-wider uppercase mb-1.5">
                    FOUNDER · SIDE VENTURE
                  </p>
                  <p className="font-fraunces font-bold text-xl text-[#1c1714] leading-tight">DarvinCode</p>
                  <p className="font-jakarta text-xs text-[#7a6f68] mt-1">
                    Software agency — building in public
                  </p>
                </div>
                <motion.a
                  href="https://darvincode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 font-jakarta text-xs text-[#7a4800] border border-[#f9c840] px-3 py-2 tracking-[0.06em] whitespace-nowrap rounded-sm bg-[#f9c840]/20"
                  whileHover={{ backgroundColor: "rgba(249,200,64,0.4)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  darvincode.com ↗
                </motion.a>
              </div>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.7, delay: 1.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: "#9fead3", y: -2 }}
                  className="bg-surface border border-[#ddd0c0] p-4 rounded-sm transition-colors duration-200"
                >
                  <p className="font-silkscreen text-[8px] tracking-wider text-[#bdb0a0] uppercase mb-1.5">{s.label}</p>
                  <p className={`font-jakarta text-sm font-medium ${s.highlight ? "text-[#0d7f60]" : "text-[#1c1714]"}`}>
                    {s.value}
                    {s.highlight && (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-[#0d7f60] ml-2 pulse-dot"
                      />
                    )}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
