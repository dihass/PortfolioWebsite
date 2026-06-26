"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveWord from "@/components/ui/InteractiveWord";
import {
  SiJavascript, SiTypescript, SiPython, SiSwift,
  SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss,
  SiMongodb, SiPostgresql, SiGit, SiDocker, SiVercel, SiPytorch,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";
import { BsCode, BsCpu, BsPhone, BsType, BsGear } from "react-icons/bs";
import type { IconType } from "react-icons";

const TICKER_ROW = [
  "JAVA", "PYTHON", "JAVASCRIPT", "TYPESCRIPT", "SWIFT", "SQL",
  "REACT", "NEXT.JS", "NODE.JS", "PYTORCH", "TAILWIND", "MONGODB",
  "POSTGRESQL", "DOCKER", "GIT", "VERCEL", "REST APIS", "AGILE",
];

const bento: { id: string; label: string; CellIcon: IconType; bg: string; text: string; col: string; items: { name: string; Icon: IconType }[] }[] = [
  {
    id: "fullstack",
    label: "FULL STACK",
    CellIcon: BsCode,
    bg: "#9fead3",
    text: "#0d7f60",
    col: "md:col-span-2",
    items: [
      { name: "React",       Icon: SiReact       },
      { name: "Next.js",     Icon: SiNextdotjs   },
      { name: "Node.js",     Icon: SiNodedotjs   },
      { name: "TypeScript",  Icon: SiTypescript  },
      { name: "Tailwind",    Icon: SiTailwindcss },
    ],
  },
  {
    id: "aiml",
    label: "AI & ML",
    CellIcon: BsCpu,
    bg: "#dce4ff",
    text: "#3440c0",
    col: "md:col-span-1",
    items: [
      { name: "PyTorch",  Icon: SiPytorch },
      { name: "Python",   Icon: SiPython  },
    ],
  },
  {
    id: "mobile",
    label: "MOBILE",
    CellIcon: BsPhone,
    bg: "#ffd0bc",
    text: "#8b3010",
    col: "md:col-span-1",
    items: [
      { name: "Swift", Icon: SiSwift },
    ],
  },
  {
    id: "languages",
    label: "LANGUAGES",
    CellIcon: BsType,
    bg: "#f9c840",
    text: "#7a4800",
    col: "md:col-span-2",
    items: [
      { name: "Java",        Icon: FaJava       },
      { name: "Python",      Icon: SiPython     },
      { name: "JavaScript",  Icon: SiJavascript },
      { name: "TypeScript",  Icon: SiTypescript },
      { name: "Swift",       Icon: SiSwift      },
      { name: "SQL",         Icon: FaDatabase   },
    ],
  },
  {
    id: "infra",
    label: "INFRA & TOOLS",
    CellIcon: BsGear,
    bg: "#1c1714",
    text: "#f9f5ef",
    col: "md:col-span-1",
    items: [
      { name: "Docker",     Icon: SiDocker    },
      { name: "Git",        Icon: SiGit       },
      { name: "PostgreSQL", Icon: SiPostgresql},
      { name: "MongoDB",    Icon: SiMongodb   },
      { name: "Vercel",     Icon: SiVercel    },
    ],
  },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden bg-[#f0e9de]">

      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="section-label">What I Know</span>
            <div className="flex-1 h-px bg-[#ddd0c0]" />
          </motion.div>
          <h2 aria-label="Arsenal.">
            <InteractiveWord
              particleId="arsenal"
              text="Arsenal."
              fontSize="clamp(2rem, 5vw, 4.5rem)"
              className="font-fraunces font-black leading-[1.05] tracking-tight"
              baseColor="#1c1714"
              accentColor="#0d7f60"
              backgroundColor="#f0e9de"
              initialHidden={true}
            />
          </h2>
        </div>

        {/* Bento grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bento.map((cell, i) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`${cell.col} rounded-xl p-6 relative overflow-hidden`}
              style={{ background: cell.bg }}
            >
              {/* Label + icon */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="font-silkscreen text-[9px] tracking-widest uppercase font-bold"
                  style={{ color: cell.text }}
                >
                  {cell.label}
                </span>
                <cell.CellIcon className="w-5 h-5 flex-shrink-0" style={{ color: cell.text }} />
              </div>

              {/* Icons + names */}
              <div className="flex flex-wrap gap-2">
                {cell.items.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.35)" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: cell.text }} />
                    <span
                      className="font-jakarta text-sm font-medium"
                      style={{ color: cell.text }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Competencies row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-xl border-2 border-[#ddd0c0] p-5 bg-cream"
        >
          <p className="font-silkscreen text-[9px] tracking-widest text-[#bdb0a0] uppercase mb-3">CORE COMPETENCIES</p>
          <div className="flex flex-wrap gap-2">
            {["REST APIs", "System Design", "OOP", "Agile / Scrum", "Auth & AuthZ",
              "Microservices", "Performance Optimisation", "Test Automation", "CI/CD"].map((c) => (
              <span key={c} className="font-jakarta text-sm text-[#4a4238] px-3 py-1 bg-[#f0e9de] rounded-lg">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker — reversed direction */}
      <div className="mt-10 border-y border-[#ddd0c0] overflow-hidden py-2.5">
        <div className="flex">
          <div className="animate-ticker-right flex whitespace-nowrap gap-0">
            {[...TICKER_ROW, ...TICKER_ROW, ...TICKER_ROW, ...TICKER_ROW].map((item, i) => (
              <span key={i} className="font-silkscreen text-[9px] tracking-widest text-[#bdb0a0] mx-6">
                {item} <span className="text-[#9fead3]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
