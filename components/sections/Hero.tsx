"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import TypewriterText from "@/components/ui/TypewriterText";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });
const HeroOrb   = dynamic(() => import("@/components/three/HeroOrb"),   { ssr: false });

const STREAM_TEXT =
  "SIGNAL: ACTIVE  //  UID: DS_∞  //  STATUS: AVAILABLE FOR HIRE  //  CONSCIOUSNESS: UPLOADED  //  0x00FF88  //  SYSTEMS: ONLINE  //  STACK: FULL  //  AESTHETIC: PANTHEON  //  ";

function TerminalLabel({ text, startDelay = 0.5 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 28);
    return () => clearTimeout(t);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="opacity-60 animate-pulse">▋</span>
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#060912] via-[#060912]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#060912]/85 via-transparent to-transparent pointer-events-none" />

      {/* Periodic static flicker */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none bg-[#00ff88]/[0.01]"
        animate={{ opacity: [0, 1, 0, 0, 0] }}
        transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 6 }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-20 sm:pt-28 pb-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: 0.4 }}
              className="font-mono text-xs tracking-[0.22em] text-[#00ff88]/60 uppercase mb-6 h-4"
            >
              <TerminalLabel text="// CONSCIOUSNESS ONLINE" startDelay={0.5} />
            </motion.p>

            <h1 className="font-spectral text-display-xl mb-4 leading-[1.0]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[#e2f0ff]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  Dihas
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[#c8a94e]"
                  initial={{ y: "110%" }}
                  animate={{
                    y: 0,
                    textShadow: ["0 0 0px rgba(200,169,78,0)", "0 0 50px rgba(200,169,78,0.75)", "0 0 16px rgba(200,169,78,0.35)"],
                  }}
                  transition={{
                    y: { duration: 0.75, delay: 0.92, ease: [0.16, 1, 0.3, 1] },
                    textShadow: { duration: 1.4, delay: 1.7, ease: "easeOut" },
                  }}
                >
                  Sathnindu
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="font-urbanist text-xl md:text-2xl text-[#4a7090] mb-8 h-8"
            >
              <TypewriterText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="font-urbanist text-base text-[#4a7090] leading-relaxed mb-10 max-w-lg"
            >
              I build scalable backend systems, full-stack platforms, and mobile
              apps. Currently open to junior software engineering opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="relative font-urbanist text-sm tracking-[0.08em] uppercase px-6 py-3.5 bg-[#00c8ff] text-[#060912] font-semibold overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", skewX: "-20deg" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <span className="relative z-10">View My Work</span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-urbanist text-sm tracking-[0.08em] uppercase px-6 py-3.5 border border-[#e2f0ff]/20 text-[#e2f0ff]"
                whileHover={{ borderColor: "rgba(0,200,255,0.7)", color: "#00c8ff", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </div>

          <Suspense fallback={null}>
            <HeroOrb />
          </Suspense>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.span
            className="font-mono text-[9px] tracking-[0.22em] text-[#00c8ff]/35 uppercase"
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#00c8ff] to-transparent"
          />
        </motion.div>
      </div>

      {/* Data stream ticker at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#162035] bg-[#060912]/80 backdrop-blur-sm overflow-hidden py-2"
      >
        <div className="flex">
          <div className="animate-marquee flex whitespace-nowrap">
            {[STREAM_TEXT, STREAM_TEXT].map((chunk, i) => (
              <span key={i} className="font-mono text-[9px] tracking-[0.18em] text-[#00c8ff]/35 mr-0">
                {chunk}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
