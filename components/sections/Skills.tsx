"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlitchHeading from "@/components/ui/GlitchHeading";
import {
  SiJavascript, SiTypescript, SiPython, SiSwift,
  SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss,
  SiMongodb, SiPostgresql, SiGit, SiDocker,
  SiVercel, SiPytorch,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";

const groups = [
  {
    title: "Languages", jp: "言語",
    skills: [
      { name: "Java", icon: FaJava }, { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript }, { name: "TypeScript", icon: SiTypescript },
      { name: "Swift", icon: SiSwift }, { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    title: "Frameworks & Tools", jp: "ツール",
    skills: [
      { name: "React", icon: SiReact }, { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: SiNodedotjs }, { name: "PyTorch", icon: SiPytorch },
      { name: "Tailwind CSS", icon: SiTailwindcss }, { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql }, { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit }, { name: "Vercel", icon: SiVercel },
    ],
  },
  {
    title: "Core Competencies", jp: "能力",
    skills: [
      { name: "REST APIs", icon: null }, { name: "System Design", icon: null },
      { name: "OOP", icon: null }, { name: "Agile / Scrum", icon: null },
      { name: "Auth & AuthZ", icon: null }, { name: "Microservices", icon: null },
      { name: "Performance Opt.", icon: null }, { name: "Test Automation", icon: null },
    ],
  },
];

function SkillBadge({ name, icon: Icon, delay }: { name: string; icon: React.ComponentType<{ className?: string }> | null; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: "0 0 20px rgba(0,200,255,0.2)", borderColor: "rgba(0,200,255,0.4)" }}
      className="flex items-center gap-2 px-4 py-2.5 bg-[#090f1e] border border-[#162035] rounded-sm cursor-default transition-colors duration-200"
    >
      {Icon && <Icon className="w-4 h-4 text-[#00c8ff] flex-shrink-0" />}
      <span className="font-urbanist text-sm text-[#e2f0ff]">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      {/* Digital world code atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 80% 40%, rgba(0,255,136,0.03) 0%, transparent 65%)" }} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-3"
          >
            <p className="font-mono text-xs tracking-[0.22em] text-[#00c8ff]/60 uppercase">
              {'// TECHNICAL STACK'}
            </p>
            <motion.span
              className="font-mono text-[8px] text-[#00ff88]/50 tracking-[0.15em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              SYS: ONLINE
            </motion.span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] signal-flicker" style={{ boxShadow: "0 0 6px rgba(0,255,136,0.9)" }} />
          </motion.div>
          <GlitchHeading text="Arsenal" subtitle="武器庫" inView={inView} delay={0.1} />
        </div>

        <div className="space-y-14">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: gi * 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#4a7090] whitespace-nowrap">{group.title}</span>
                <span className="font-spectral italic text-sm text-[#162035]">{group.jp}</span>
                <motion.div
                  className="flex-1 h-px bg-[#162035]"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.0, delay: gi * 0.1 + 0.18, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((s, si) => (
                  <SkillBadge key={s.name} name={s.name} icon={s.icon} delay={gi * 0.08 + si * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
