"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsWrench, BsGeoAlt, BsLightning } from "react-icons/bs";
import type { IconType } from "react-icons";
import CodeMascotEasterEgg from "@/components/ui/CodeMascotEasterEgg";
import InteractiveWord from "@/components/ui/InteractiveWord";

const SOFTWARE_LETTERS = ["S", "o", "f", "t", "w", "a", "r", "e"];

const STACK_TICKER = [
  "NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT", "PYTHON", "SWIFT", "PYTORCH",
  "POSTGRESQL", "DOCKER", "TAILWIND", "MONGODB", "JAVA",
];

const stickers: { label: string; Icon: IconType; bg: string; text: string; rotation: number; top?: string; bottom?: string; left?: string; right?: string; animation: string }[] = [
  { label: "Building since 2022", Icon: BsWrench,  bg: "#f9c840", text: "#7a4800", rotation:  8, top: "0%",  right: "0%", animation: "float-right" },
  { label: "SRI LANKA",           Icon: BsGeoAlt,  bg: "#9fead3", text: "#0d7f60", rotation: -7, top: "4%",  left: "0%",  animation: "float-left"  },
  { label: "DarvinCode founder",  Icon: BsLightning, bg: "#ffd0bc", text: "#8b3010", rotation:  5, top: "45%", right: "0%", animation: "float-right" },
];

export default function Hero() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stickerRefs = useRef<{
    sriLanka: HTMLDivElement | null;
    building: HTMLDivElement | null;
  }>({ sriLanka: null, building: null });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex flex-col">

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-28 pb-8">
          <div className="grid md:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-center">

            {/* Left: text content */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-silkscreen text-[11px] tracking-widest text-[#0d7f60] uppercase mb-5"
              >
                HELLO, I&apos;M A →
              </motion.p>

              {/* Giant heading — outer wrapper lets the mascot escape the text reveal clip */}
              <div className="relative mb-2">
                <CodeMascotEasterEgg letterRefs={letterRefs} stickerRefs={stickerRefs} />
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-fraunces font-black text-[#1c1714] leading-[0.88] tracking-tight"
                    style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)" }}
                  >
                    {SOFTWARE_LETTERS.map((char, i) => (
                      <span
                        key={i}
                        ref={el => { letterRefs.current[i] = el; }}
                        className="inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </motion.h1>
                </div>
              </div>
              <div className="overflow-hidden mb-8 md:hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="font-fraunces font-black text-[#1c1714] leading-[0.88] tracking-tight"
                  style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)" }}
                >
                  Engineer.
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 42, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block mb-8"
              >
                <InteractiveWord
                  text="Engineer."
                  className="font-fraunces font-black leading-[0.88] tracking-tight"
                  baseColor="#1c1714"
                  accentColor="#0d7f60"
                  backgroundColor="#f9f5ef"
                  particleId="engineer"
                  fontSize="clamp(4.5rem, 13vw, 10rem)"
                />
              </motion.div>

              {/* Name + role line */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                <span className="font-fraunces font-semibold text-xl text-[#1c1714]">Dihas Sathnindu</span>
                <span className="font-silkscreen text-[9px] text-[#bdb0a0]">—</span>
                <span className="font-silkscreen text-[9px] tracking-wider text-[#7a6f68] uppercase">Colombo, Sri Lanka</span>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="font-jakarta text-[1.05rem] text-[#7a6f68] leading-relaxed mb-8 max-w-lg"
              >
                I build full-stack platforms, mobile apps, and AI research tools. Final year CS student at IIT/Westminster. Interned at IFS. Founder of DarvinCode. Open to junior SWE roles.
              </motion.p>

              {/* Tags row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.35 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                <span className="flex items-center gap-1.5 font-silkscreen text-[9px] tracking-wider px-3 py-1.5 rounded-full bg-[#c8f5e5] text-[#0d7f60]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d7f60] pulse-dot inline-block" />
                  AVAILABLE NOW
                </span>
                <span className="font-silkscreen text-[9px] tracking-wider px-3 py-1.5 rounded-full bg-[#fef8e0] text-[#7a4800]">
                  IFS INTERN 2024
                </span>
                <span className="font-silkscreen text-[9px] tracking-wider px-3 py-1.5 rounded-full bg-[#dce4ff] text-[#3440c0]">
                  FYP · AI RESEARCH
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-jakarta font-medium text-sm px-7 py-3.5 bg-[#1c1714] text-[#f9f5ef] rounded-xl overflow-hidden relative"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-[#0d7f60]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <span className="relative z-10">See My Work →</span>
                </motion.button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta text-sm px-7 py-3.5 border-2 border-[#1c1714] text-[#1c1714] rounded-xl hover:bg-[#1c1714] hover:text-[#f9f5ef] transition-all duration-200"
                >
                  Resume ↗
                </a>
              </motion.div>
            </div>

            {/* Right: photo collage */}
            <div className="relative h-[480px] hidden md:block">

              {/* Spinning circular badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="relative w-[300px] h-[300px]">
                  {/* Spinning text ring */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full spin-slow"
                  >
                    <defs>
                      <path id="spinCircle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                    </defs>
                    <text fill="#0d7f60" fontFamily="Silkscreen" fontSize="10">
                      <textPath href="#spinCircle">AVAILABLE FOR HIRE ✦ OPEN TO WORK ✦ DIHAS SATHNINDU ✦ </textPath>
                    </text>
                  </svg>

                  {/* Photo inside the ring */}
                  <div className="absolute inset-[30px] rounded-full overflow-hidden border-[3px] border-[#1c1714]">
                    <Image
                      src="/about.jpg"
                      alt="Dihas Sathnindu"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Scattered sticker notes */}
              {stickers.map((s, i) => (
                <motion.div
                  key={i}
                  ref={(el) => {
                    if (s.label === "SRI LANKA") stickerRefs.current.sriLanka = el;
                    if (s.label === "Building since 2022") stickerRefs.current.building = el;
                  }}
                  className={`absolute ${s.animation}`}
                  style={{
                    top: s.top,
                    bottom: s.bottom,
                    left: s.left,
                    right: s.right,
                    rotate: `${s.rotation}deg`,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.15, type: "spring", stiffness: 260 }}
                  whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
                >
                  <div
                    className="px-3 py-2.5 shadow-md rounded-sm"
                    style={{ background: s.bg, color: s.text }}
                  >
                    <p className="font-silkscreen text-[9px] tracking-wide leading-tight whitespace-nowrap flex items-center gap-1.5">
                      <s.Icon className="w-4 h-4 flex-shrink-0" />
                      {s.label}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Floating star decorations */}
              {[
                { top: "14%", left: "12%", color: "#f9c840", size: 6, delay: 1.8 },
                { top: "80%", left: "30%", color: "#9fead3", size: 5, delay: 2.1 },
                { top: "35%", right: "8%", color: "#ffd0bc", size: 7, delay: 2.4 },
              ].map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full star-float"
                  style={{
                    top: star.top,
                    left: star.left,
                    right: (star as { right?: string }).right,
                    width: star.size,
                    height: star.size,
                    background: star.color,
                    animationDelay: `${i * 0.7}s`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: star.delay }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark ticker strip at bottom — vibecoding.to style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="bg-[#1c1714] border-t-2 border-[#1c1714] overflow-hidden py-3"
      >
        <div className="flex">
          <div className="animate-ticker-left flex whitespace-nowrap gap-0">
            {[...STACK_TICKER, ...STACK_TICKER, ...STACK_TICKER, ...STACK_TICKER].map((item, i) => (
              <span key={i} className="font-silkscreen text-[10px] tracking-widest text-[#f9f5ef] mx-6">
                {item} <span className="text-[#9fead3]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
