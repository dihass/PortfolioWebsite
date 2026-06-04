"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlitchHeading from "@/components/ui/GlitchHeading";

const timeline = [
  {
    year: "2024 — 2025",
    role: "Software Engineering Intern",
    org: "IFS",
    location: "Colombo, Sri Lanka",
    type: "work",
    points: [
      "Developed enterprise features using Marble frontend and PL/SQL backend",
      "Investigated and resolved production bugs improving system stability",
      "Optimised backend queries to improve performance across key workflows",
      "Built TAR automation tests for feature validation in Agile sprints",
    ],
  },
  {
    year: "2022 — 2026",
    role: "BEng (Hons) Computer Science",
    org: "IIT / University of Westminster",
    location: "Colombo, Sri Lanka",
    type: "education",
    points: [
      "Final Year Project: Multimodal AI for early sepsis detection — AUROC 0.9283",
      "Modules: Distributed Systems, Security, Mobile Development, AI & ML",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-60px" });

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      {/* Consciousness atmosphere — gold consciousness on dark field */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 30%, rgba(200,169,78,0.03) 0%, transparent 65%)" }} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.22em] text-[#00c8ff]/60 uppercase mb-3"
          >
            {'// BACKGROUND'}
          </motion.p>
          <GlitchHeading text="Journey" subtitle="経歴" inView={inView} delay={0.1} />
        </div>

        <div className="relative" ref={lineRef}>
          {/* Timeline line draws down */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00c8ff] via-[#c8a94e]/25 to-transparent"
          />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-8 md:pl-0 md:grid md:grid-cols-[200px_1fr] md:gap-10"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                  className={`absolute left-[-4px] md:left-[196px] top-1.5 w-2.5 h-2.5 rounded-full z-10 ${item.type === "work" ? "bg-[#00c8ff]" : "bg-[#c8a94e]"}`}
                  style={{ boxShadow: item.type === "work" ? "0 0 12px rgba(0,200,255,0.7)" : "0 0 12px rgba(200,169,78,0.65)" }}
                />

                {/* Year */}
                <div className="mb-3 md:mb-0 md:text-right md:pr-10 pt-0.5">
                  <span className="font-mono text-xs text-[#4a7090]">{item.year}</span>
                  <span className={`block font-mono text-[9px] tracking-[0.14em] uppercase mt-1 ${item.type === "work" ? "text-[#00c8ff]" : "text-[#c8a94e]"}`}>
                    {item.type === "work" ? "// Work" : "[ Education ]"}
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ borderColor: item.type === "work" ? "rgba(0,200,255,0.25)" : "rgba(200,169,78,0.22)", x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative bg-[#090f1e] border border-[#162035] p-6 rounded-sm overflow-hidden"
                >
                  {/* Scan on hover */}
                  <motion.div
                    className="absolute left-0 right-0 h-px pointer-events-none"
                    style={{ background: item.type === "work" ? "linear-gradient(to right, transparent, rgba(0,200,255,0.4), transparent)" : "linear-gradient(to right, transparent, rgba(200,169,78,0.35), transparent)", top: 0 }}
                    initial={{ y: 0, opacity: 0 }}
                    whileHover={{ y: "100%", opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.4 }}
                  />
                  <h3 className="font-spectral text-xl text-[#e2f0ff] mb-1">{item.role}</h3>
                  <p className={`font-urbanist text-sm mb-1 ${item.type === "work" ? "text-[#00c8ff]" : "text-[#c8a94e]"}`}>{item.org}</p>
                  <p className="font-mono text-[10px] text-[#2a4060] mb-5">{item.location}</p>
                  <ul className="space-y-2">
                    {item.points.map((p, pi) => (
                      <motion.li
                        key={p}
                        className="font-urbanist text-sm text-[#4a7090] flex gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: i * 0.2 + pi * 0.08 + 0.4 }}
                      >
                        <span className="text-[#00c8ff] mt-0.5 flex-shrink-0">—</span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
