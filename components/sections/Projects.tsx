"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { BsActivity, BsDice5, BsStar, BsHouseDoor, BsPhone } from "react-icons/bs";
import type { IconType } from "react-icons";
import InteractiveWord from "@/components/ui/InteractiveWord";
import { useTheme } from "@/components/ui/ThemeProvider";

type Project = {
  number: string;
  title: string;
  description: string;
  stack: string[];
  badge: string;
  BadgeIcon: IconType;
  windowTitle: string;
  accentBar: string;
  accentBody: string;
  darkBar: string;
  darkBody: string;
  rotation: number;
  links: { label: string; href: string; icon: "github" | "external" }[];
  wide?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Leakage-Free Sepsis Detection",
    description:
      "Multimodal deep learning system predicting sepsis onset 6 hours before it occurs. Two-layer LSTM on 18-hour EHR time-series + Bio_ClinicalBERT clinical notes, fused via meta-learner. AUROC 0.9283 on 26,607 ICU patients from MIMIC-IV. Zero data leakage.",
    stack: ["Python", "PyTorch", "LSTM", "MIMIC-IV", "SHAP", "Streamlit"],
    badge: "Research · FYP 2026",
    BadgeIcon: BsActivity,
    windowTitle: "sepsis-detection.py",
    accentBar:  "#c8d4ff",
    accentBody: "#d8e0ff",
    darkBar:  "#10133a",
    darkBody: "#090b24",
    rotation: -1.5,
    links: [{ label: "GitHub", href: "https://github.com/dihass/LF-MSP", icon: "github" }],
    wide: true,
  },
  {
    number: "02",
    title: "Omi Game Engine",
    description:
      "Real-time multiplayer Omi card game platform with a server-authoritative .NET 10 backend, SignalR live gameplay, Redis-backed lobby/session state, JWT auth, reconnect handling, and full rule enforcement for trump, follow-suit, tricks, scoring, and dealer rotation.",
    stack: [".NET 10", "C#", "SignalR", "Redis", "JWT", "React", "Vite", "Docker"],
    badge: "Card Game · Live",
    BadgeIcon: BsDice5,
    windowTitle: "omi-game-engine.cs",
    accentBar:  "#f9d840",
    accentBody: "#fef09a",
    darkBar:  "#2a2105",
    darkBody: "#171304",
    rotation: 1.5,
    links: [{ label: "Live Demo", href: "https://omicardgame.vercel.app/", icon: "external" }],
  },
  {
    number: "03",
    title: "The Seascape Sri Lanka",
    description:
      "Hospitality website for a real client — boutique coastal resort in Weligama Bay. Rooms, gallery, booking integrations, Framer Motion throughout.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    badge: "Client Work · Live",
    BadgeIcon: BsStar,
    windowTitle: "seascape-client.tsx",
    accentBar:  "#a8f0d8",
    accentBody: "#c8f5e5",
    darkBar:  "#083326",
    darkBody: "#041d16",
    rotation: -1,
    links: [],
  },
  {
    number: "04",
    title: "PropVRty",
    description:
      "Real estate marketplace with immersive 360° virtual property tours — browse listings and walk through properties without leaving your browser.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Panolens.js"],
    badge: "Web App · Live",
    BadgeIcon: BsHouseDoor,
    windowTitle: "propvrty-app.jsx",
    accentBar:  "#ffc0a8",
    accentBody: "#ffd8c4",
    darkBar:  "#3a130b",
    darkBody: "#210905",
    rotation: -2,
    links: [{ label: "Live Demo", href: "https://prop-vr-ty.vercel.app/", icon: "external" }],
  },
  {
    number: "05",
    title: "WeatherDashboard",
    description:
      "Native iOS app — real-time weather + interactive MapKit explorer of nearby tourist attractions, with local SwiftData persistence.",
    stack: ["Swift", "SwiftUI", "MapKit", "CoreLocation", "SwiftData"],
    badge: "iOS · Mobile",
    BadgeIcon: BsPhone,
    windowTitle: "WeatherApp.swift",
    accentBar:  "#ffb8d0",
    accentBody: "#ffd0e4",
    darkBar:  "#3a0d28",
    darkBody: "#210717",
    rotation: -1.5,
    links: [{ label: "GitHub", href: "https://github.com/dihass/WeatherDashboard", icon: "github" }],
  },
];

function OSProjectCard({ project, delay, isDark }: { project: Project; delay: number; isDark: boolean }) {
  const bar  = isDark ? project.darkBar  : project.accentBar;
  const body = isDark ? project.darkBody : project.accentBody;

  const titleColor  = isDark ? "#e8e2f4"              : "#1c1714";
  const descColor   = isDark ? "#8888aa"              : "#7a6f68";
  const badgeColor  = isDark ? "#55557a"              : "#bdb0a0";
  const tagBg       = isDark ? "rgba(255,255,255,0.05)" : "rgba(28,23,20,0.06)";
  const tagText     = isDark ? "#7070a0"              : "#4a4238";
  const divider     = isDark ? "rgba(255,255,255,0.07)" : "rgba(28,23,20,0.08)";
  const linkColor   = isDark ? "#4ecba8"              : "#0d7f60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: project.rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{ transformOrigin: "center bottom" }}
      className="os-window cursor-default flex flex-col"
    >
      {/* Window chrome */}
      <div className="os-window-bar" style={{ background: bar }}>
        <div className="os-window-dots">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="os-window-title"
          style={{ color: isDark ? "rgba(255,255,255,0.3)" : undefined }}
        >
          {project.windowTitle}
        </span>
      </div>

      {/* Window body */}
      <div className="p-6 flex-1" style={{ background: body }}>
        {/* Badge */}
        <div className="mb-4">
          <p
            className="font-silkscreen text-[9px] tracking-wider mb-1.5 flex items-center gap-1.5"
            style={{ color: badgeColor }}
          >
            <project.BadgeIcon className="w-4 h-4 flex-shrink-0" />
            {project.badge}
          </p>
          <h3
            className="font-fraunces font-bold text-xl leading-tight"
            style={{ color: titleColor }}
          >
            {project.title}
          </h3>
        </div>

        <p className="font-jakarta text-sm leading-relaxed mb-5" style={{ color: descColor }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-silkscreen text-[9px] tracking-wider px-2.5 py-1 rounded-md"
              style={{ background: tagBg, color: tagText }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div
            className="flex gap-4 pt-4"
            style={{ borderTop: `1px solid ${divider}` }}
          >
            {project.links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-jakarta text-sm font-medium"
                style={{ color: linkColor }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {link.icon === "github"
                  ? <FiGithub className="w-4 h-4" />
                  : <FiExternalLink className="w-4 h-4" />}
                {link.label} →
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [p01, p02, p03, p04, p05] = projects;

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden bg-cream bg-grid">

      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="section-label">What I&apos;ve Built</span>
            <div
              className="flex-1 h-px"
              style={{ background: isDark ? "rgba(255,255,255,0.08)" : "#ddd0c0" }}
            />
            <span
              className="font-silkscreen text-[9px] tracking-wider"
              style={{ color: isDark ? "rgba(255,255,255,0.28)" : "#bdb0a0" }}
            >
              {projects.length} PROJECTS
            </span>
          </motion.div>

          <h2 aria-label="Shipped.">
            <InteractiveWord
              particleId="shipped"
              text="Shipped."
              fontSize="clamp(2rem, 5vw, 4.5rem)"
              className="font-fraunces font-black leading-[1.05] tracking-tight"
              baseColor={isDark ? "#e8e2f4" : "#1c1714"}
              accentColor={isDark ? "#4ecba8" : "#0d7f60"}
              backgroundColor={isDark ? "#121216" : "#F6F0E4"}
              initialHidden={true}
            />
          </h2>
        </div>

        {/* Asymmetric desktop stack: WeatherDashboard anchors the left side below the feature card. */}
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] gap-5 items-start">
          <div className="grid md:grid-cols-4 gap-5 items-start">
            <div className="md:col-span-4">
              <OSProjectCard project={p01} delay={0.1} isDark={isDark} />
            </div>
            <div className="md:col-span-2">
              <OSProjectCard project={p05} delay={0.5} isDark={isDark} />
            </div>
            <div className="md:col-span-2">
              <OSProjectCard project={p04} delay={0.4} isDark={isDark} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-5 lg:pt-10">
            <OSProjectCard project={p02} delay={0.2} isDark={isDark} />
            <OSProjectCard project={p03} delay={0.3} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}
