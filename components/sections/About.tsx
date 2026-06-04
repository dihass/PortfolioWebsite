"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Status", value: "Open to Opportunities", highlight: true },
  { label: "Location", value: "Colombo, Sri Lanka" },
  { label: "Education", value: "BEng CS — IIT / Westminster" },
  { label: "Experience", value: "Software Eng. Intern — IFS" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Real-world warm atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(200,169,78,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Left: photos */}
          <div className="relative pb-12 md:pb-0">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/4] max-w-[340px]"
            >
              <motion.div
                className="absolute inset-0 rounded-sm border border-[#c8a94e]/12"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0 }}
                style={{ boxShadow: "0 0 50px rgba(200,169,78,0.08)" }}
              />
              <Image src="/about.jpg" alt="Dihas at work" fill className="object-cover object-top rounded-sm" />
              <div className="absolute inset-0 rounded-sm bg-gradient-to-t from-[#060912]/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-4 md:-right-12 w-[140px] h-[180px] border-2 border-[#060912]"
            >
              <Image src="/hero.jpg" alt="Dihas Sathnindu" fill className="object-cover object-top grayscale-[20%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060912]/40 to-transparent" />
            </motion.div>
          </div>

          {/* Right: text */}
          <div className="pt-4 md:pt-0">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-xs tracking-[0.22em] text-[#00c8ff]/60 uppercase mb-4"
            >
              {'// THE PERSON'}
            </motion.p>

            <div className="mb-8 overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-spectral text-display-md text-[#e2f0ff]"
              >
                Engineer by craft,
                <br />
                builder by instinct.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="space-y-4 text-[#4a7090] leading-[1.85] font-urbanist mb-8"
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

            {/* DarvinCode callout — prominent HUD box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 p-4 bg-[#0d0b08] border border-[#c8a94e]/25 overflow-hidden"
            >
              {/* Animated corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c8a94e]/55" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c8a94e]/55" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c8a94e]/55" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c8a94e]/55" />

              {/* Pulsing bg glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(200,169,78,0.07) 0%, transparent 70%)" }}
              />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] text-[#c8a94e]/55 tracking-[0.22em] uppercase mb-1.5">
                    SIDE VENTURE // FOUNDER
                  </p>
                  <p className="font-spectral text-xl text-[#c8a94e] leading-tight">DarvinCode</p>
                  <p className="font-urbanist text-xs text-[#4a7090] mt-1">
                    Software agency — building in public
                  </p>
                </div>
                <motion.a
                  href="https://darvincode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 font-mono text-xs text-[#c8a94e] border border-[#c8a94e]/30 px-3 py-2 tracking-[0.1em] uppercase whitespace-nowrap"
                  whileHover={{ backgroundColor: "rgba(200,169,78,0.12)", borderColor: "rgba(200,169,78,0.8)", scale: 1.02 }}
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
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: "rgba(0,200,255,0.3)", y: -2 }}
                  className="bg-[#090f1e] border border-[#162035] p-4 rounded-sm transition-colors duration-200"
                >
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#2a4060] uppercase mb-1.5">{s.label}</p>
                  <p className={`font-urbanist text-sm font-medium ${s.highlight ? "text-[#00c8ff]" : "text-[#e2f0ff]"}`}>
                    {s.value}
                    {s.highlight && (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-[#00c8ff] ml-2 signal-flicker"
                        style={{ boxShadow: "0 0 8px rgba(0,200,255,0.8)" }}
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
