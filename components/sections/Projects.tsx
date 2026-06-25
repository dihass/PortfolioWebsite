"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

type Project = {
  number: string;
  title: string;
  description: string;
  stack: string[];
  badge: string;
  windowTitle: string;
  accentBar: string;
  accentBody: string;
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
    badge: "🧬 Research · FYP 2026",
    windowTitle: "sepsis-detection.py",
    accentBar: "#c8d4ff",
    accentBody: "#eef1ff",
    rotation: -1.5,
    links: [{ label: "GitHub", href: "https://github.com/dihass/LF-MSP", icon: "github" }],
    wide: true,
  },
  {
    number: "02",
    title: "The Seascape Sri Lanka",
    description:
      "Hospitality website for a real client — boutique coastal resort in Weligama Bay. Rooms, gallery, booking integrations, Framer Motion throughout.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    badge: "🏖️ Client Work · Live",
    windowTitle: "seascape-client.tsx",
    accentBar: "#a8f0d8",
    accentBody: "#eefcf5",
    rotation: 1.5,
    links: [],
  },
  {
    number: "03",
    title: "PropVRty",
    description:
      "Real estate marketplace with immersive 360° virtual property tours — browse listings and walk through properties without leaving your browser.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Panolens.js"],
    badge: "🏠 Web App · Live",
    windowTitle: "propvrty-app.jsx",
    accentBar: "#ffc0a8",
    accentBody: "#fff4ef",
    rotation: -2,
    links: [{ label: "Live Demo", href: "https://prop-vr-ty.vercel.app/", icon: "external" }],
  },
  {
    number: "04",
    title: "LocateLink",
    description:
      "Send a unique link — when opened, you instantly see their exact GPS location on an interactive map. Real-time via Upstash Redis.",
    stack: ["Next.js", "TypeScript", "Upstash Redis", "Leaflet"],
    badge: "📍 Utility · Private",
    windowTitle: "locate-link.ts",
    accentBar: "#f9d840",
    accentBody: "#fffce8",
    rotation: 1,
    links: [],
  },
  {
    number: "05",
    title: "WeatherDashboard",
    description:
      "Native iOS app — real-time weather + interactive MapKit explorer of nearby tourist attractions, with local SwiftData persistence.",
    stack: ["Swift", "SwiftUI", "MapKit", "CoreLocation", "SwiftData"],
    badge: "📱 iOS · Mobile",
    windowTitle: "WeatherApp.swift",
    accentBar: "#ffb8d0",
    accentBody: "#fff0f5",
    rotation: -1.5,
    links: [{ label: "GitHub", href: "https://github.com/dihass/WeatherDashboard", icon: "github" }],
  },
];

function OSProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: project.rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{ transformOrigin: "center bottom" }}
      className="os-window cursor-default"
    >
      {/* Window chrome */}
      <div className="os-window-bar" style={{ background: project.accentBar }}>
        <div className="os-window-dots">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="os-window-title">{project.windowTitle}</span>
      </div>

      {/* Window body */}
      <div className="p-6" style={{ background: project.accentBody }}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-silkscreen text-[9px] tracking-wider text-[#bdb0a0] mb-1.5">
              {project.badge}
            </p>
            <h3 className="font-fraunces font-bold text-xl text-[#1c1714] leading-tight">
              {project.title}
            </h3>
          </div>
          <span className="font-fraunces font-black text-5xl text-[#1c1714]/[0.07] leading-none select-none">
            {project.number}
          </span>
        </div>

        <p className="font-jakarta text-sm text-[#7a6f68] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-silkscreen text-[9px] tracking-wider px-2.5 py-1 rounded-md bg-[#1c1714]/[0.06] text-[#4a4238]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="flex gap-4 border-t border-[#1c1714]/[0.08] pt-4">
            {project.links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-jakarta text-sm font-medium text-[#0d7f60]"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {link.icon === "github" ? <FiGithub className="w-4 h-4" /> : <FiExternalLink className="w-4 h-4" />}
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [p01, p02, p03, p04, p05] = projects;

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden bg-cream">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#1c1714 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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
            <div className="flex-1 h-px bg-[#ddd0c0]" />
            <span className="font-silkscreen text-[9px] text-[#bdb0a0] tracking-wider">
              {projects.length} PROJECTS
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-fraunces font-black text-display-lg text-[#1c1714]"
            >
              Shipped.
            </motion.h2>
          </div>
        </div>

        {/* Row 1: featured (wide) + card */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-5 mb-5">
          <OSProjectCard project={p01} delay={0.1} />
          <OSProjectCard project={p02} delay={0.2} />
        </div>

        {/* Row 2: three cards */}
        <div className="grid md:grid-cols-3 gap-5">
          <OSProjectCard project={p03} delay={0.3} />
          <OSProjectCard project={p04} delay={0.4} />
          <OSProjectCard project={p05} delay={0.5} />
        </div>
      </div>
    </section>
  );
}
