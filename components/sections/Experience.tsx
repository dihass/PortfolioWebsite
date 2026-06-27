"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveWord from "@/components/ui/InteractiveWord";
import { BsBriefcase, BsMortarboard } from "react-icons/bs";
import type { IconType } from "react-icons";
import { useTheme } from "@/components/ui/ThemeProvider";

export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const timeline = [
    {
      year: "2024 — 2025",
      role: "Software Engineering Intern",
      org: "IFS",
      location: "Colombo, Sri Lanka",
      type: "work",
      Icon: BsBriefcase,
      bg:         isDark ? "#06060f" : "#1c1714",
      barBg:      isDark ? "#0d0d1e" : "#2e2926",
      textColor:  isDark ? "#e8e2f4" : "#F6F0E4",
      mutedColor: isDark ? "#6a6a9a" : "#bdb0a0",
      accentColor: isDark ? "#4ecba8" : "#9fead3",
      rotation: -1.5,
      points: [
        "Developed enterprise features using Marble frontend and PL/SQL backend",
        "Investigated and resolved production bugs improving system stability",
        "Optimised backend queries for performance across key workflows",
        "Built TAR automation tests for feature validation in Agile sprints",
      ],
    },
    {
      year: "2022 — 2026",
      role: "BEng (Hons) Computer Science",
      org: "IIT / University of Westminster",
      location: "Colombo, Sri Lanka",
      type: "education",
      Icon: BsMortarboard,
      bg:         isDark ? "#100c00" : "#fef8e0",
      barBg:      isDark ? "#1c1600" : "#f9e070",
      textColor:  isDark ? "#f0e8c0" : "#1c1714",
      mutedColor: isDark ? "#806840" : "#7a6f68",
      accentColor: isDark ? "#e0a840" : "#7a4800",
      rotation: 1.5,
      points: [
        "FYP: Multimodal AI for early sepsis detection — AUROC 0.9283",
        "Modules: Distributed Systems, Security, Mobile Dev, AI & ML",
      ],
    },
  ];
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 relative overflow-hidden bg-cream bg-grid">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="section-label">Story So Far</span>
            <div className="flex-1 h-px bg-[#ddd0c0]" />
          </motion.div>
          <h2 aria-label="Journey.">
            <InteractiveWord
              particleId="journey"
              text="Journey."
              fontSize="clamp(2rem, 5vw, 4.5rem)"
              className="font-fraunces font-black leading-[1.05] tracking-tight"
              baseColor={isDark ? "#e8e2f4" : "#1c1714"}
              accentColor={isDark ? "#4ecba8" : "#0d7f60"}
              backgroundColor={isDark ? "#121216" : "#F6F0E4"}
            />
          </h2>
        </div>

        {/* Journal cards — scattered, rotated */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {timeline.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 50, rotate: item.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              style={{ transformOrigin: "center bottom" }}
              className="rounded-xl overflow-hidden shadow-md"
            >
              {/* Card header bar (like OS window bar) */}
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: item.barBg }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
                </div>
                <span className="font-silkscreen text-[9px] tracking-wider" style={{ color: item.mutedColor }}>
                  {item.year}
                </span>
                <item.Icon className="w-5 h-5 flex-shrink-0" style={{ color: item.mutedColor }} />
              </div>

              {/* Card body */}
              <div className="p-6" style={{ background: item.bg }}>
                <p
                  className="font-silkscreen text-[9px] tracking-widest uppercase mb-2"
                  style={{ color: item.accentColor }}
                >
                  {item.type === "work" ? "WORK EXPERIENCE" : "EDUCATION"}
                </p>

                <h3
                  className="font-fraunces font-bold text-2xl mb-1 leading-tight"
                  style={{ color: item.textColor }}
                >
                  {item.role}
                </h3>

                <p
                  className="font-jakarta text-base font-semibold mb-1"
                  style={{ color: item.accentColor }}
                >
                  {item.org}
                </p>

                <p
                  className="font-silkscreen text-[9px] tracking-wider mb-6"
                  style={{ color: item.mutedColor }}
                >
                  {item.location}
                </p>

                <ul className="space-y-2.5">
                  {item.points.map((point, pi) => (
                    <motion.li
                      key={pi}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + pi * 0.1 + 0.4 }}
                      className="flex gap-3 font-jakarta text-sm"
                      style={{ color: item.mutedColor }}
                    >
                      <span style={{ color: item.accentColor }} className="flex-shrink-0 mt-0.5">→</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
