"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import GlitchHeading from "@/components/ui/GlitchHeading";

type Project = {
  number: string;
  title: string;
  description: string;
  stack: string[];
  badge: string;
  badgeColor: "purple" | "cyan" | "muted";
  darvincode?: boolean;
  links: { label: string; href: string; icon: "github" | "external" }[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "Leakage-Free Sepsis Detection",
    description:
      "Multimodal deep learning system that predicts sepsis onset 6 hours before it occurs with zero data leakage. Combines a two-layer LSTM on 18-hour EHR time-series with Bio_ClinicalBERT clinical note embeddings, fused via a meta-learner — achieving AUROC 0.9283 on 26,607 ICU patients from MIMIC-IV.",
    stack: ["Python", "PyTorch", "LSTM", "Bio_ClinicalBERT", "MIMIC-IV", "SHAP", "Streamlit"],
    badge: "Research · FYP 2026",
    badgeColor: "purple",
    links: [{ label: "GitHub", href: "https://github.com/dihass/LF-MSP", icon: "github" }],
  },
  {
    number: "02",
    title: "The Seascape Sri Lanka",
    description:
      "Full hospitality website built for a real client through DarvinCode — boutique coastal resort in Weligama Bay. Rooms, gallery, TripAdvisor and Booking.com integrations, Framer Motion throughout.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    badge: "Client Work · Live",
    badgeColor: "cyan",
    darvincode: true,
    links: [],
  },
  {
    number: "03",
    title: "PropVRty",
    description:
      "Real estate marketplace with immersive 360° virtual property tours. Browse listings and walk through properties without leaving your browser.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Panolens.js"],
    badge: "Live",
    badgeColor: "cyan",
    links: [{ label: "Live Demo", href: "https://prop-vr-ty.vercel.app/", icon: "external" }],
  },
  {
    number: "04",
    title: "LocateLink",
    description:
      "Send a unique link to anyone — when they open it, you instantly see their exact location on an interactive map. Built with real-time session management via Upstash Redis.",
    stack: ["Next.js", "TypeScript", "Upstash Redis", "Leaflet", "UUID"],
    badge: "Private",
    badgeColor: "muted",
    links: [],
  },
  {
    number: "05",
    title: "WeatherDashboard",
    description:
      "Native iOS app delivering real-time weather and an interactive MapKit explorer of nearby tourist attractions, with local SwiftData persistence.",
    stack: ["Swift", "SwiftUI", "MapKit", "CoreLocation", "SwiftData"],
    badge: "Mobile · iOS",
    badgeColor: "purple",
    links: [{ label: "GitHub", href: "https://github.com/dihass/WeatherDashboard", icon: "github" }],
  },
];

const cardVariants = {
  rest: { boxShadow: "0 0 0px rgba(0,200,255,0)", y: 0 },
  hover: { boxShadow: "0 0 45px rgba(0,200,255,0.12)", y: -5 },
};
const scanVariants = {
  rest: { y: "-100%", opacity: 0 },
  hover: { y: "200%", opacity: [0, 0.7, 0.7, 0], transition: { duration: 0.45, ease: "easeOut" } },
};
const bracketVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2 } },
};

function TiltCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  const badgeClass =
    project.badgeColor === "purple" ? "text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/5"
    : project.badgeColor === "cyan"   ? "text-[#00c8ff] border-[#00c8ff]/30 bg-[#00c8ff]/5"
    : "text-[#4a7090] border-[#162035] bg-[#090f1e]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      variants={cardVariants}
      whileHover="hover"
      className="group relative bg-[#090f1e] border border-[#162035] p-6 md:p-8 rounded-sm cursor-default overflow-hidden transition-colors duration-300 hover:border-[#00c8ff]/22"
    >
      {/* HUD corner brackets — appear on hover */}
      {(["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"] as const).map((cls, i) => (
        <motion.div key={i} variants={bracketVariants} className={`absolute w-5 h-5 border-[#00c8ff]/50 pointer-events-none ${cls}`} />
      ))}

      {/* Scan line */}
      <motion.div
        variants={scanVariants}
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,200,255,0.55), transparent)" }}
      />

      {/* Number watermark */}
      <motion.span
        className="absolute top-4 right-6 font-spectral text-7xl text-[#162035]/70 select-none leading-none pointer-events-none"
        variants={{ rest: { opacity: 0.4 }, hover: { opacity: 0.7 } }}
      >
        {project.number}
      </motion.span>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className={`inline-block font-mono text-[9px] tracking-[0.16em] uppercase px-2.5 py-1 border rounded-sm ${badgeClass}`}>
            {project.badge}
          </span>
          {project.darvincode && (
            <motion.a
              href="https://darvincode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 border border-[#00c8ff]/40 text-[#00c8ff] rounded-sm"
              whileHover={{ backgroundColor: "rgba(0,200,255,0.1)", borderColor: "rgba(0,200,255,0.8)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="w-1 h-1 rounded-full bg-[#00c8ff] signal-flicker" style={{ boxShadow: "0 0 4px rgba(0,200,255,1)" }} />
              DarvinCode
            </motion.a>
          )}
        </div>

        <h3 className="font-spectral text-xl md:text-2xl text-[#e2f0ff] mb-3 leading-tight">
          {project.title}
        </h3>

        <p className="font-urbanist text-sm text-[#4a7090] leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.1 + i * 0.035 }}
              className="font-mono text-[10px] text-[#4a7090] bg-[#0e1628] border border-[#162035] px-2.5 py-1 rounded-sm"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex gap-4">
            {project.links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-urbanist text-sm text-[#4a7090]"
                whileHover={{ color: "#00c8ff", x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {link.icon === "github" ? <FiGithub className="w-4 h-4" /> : <FiExternalLink className="w-4 h-4" />}
                {link.label}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [featured, ...rest] = projects;

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      {/* Digital network atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 75% 55% at 60% 60%, rgba(0,200,255,0.025) 0%, transparent 65%)" }} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-[0.22em] text-[#00c8ff]/60 uppercase mb-3"
          >
            {'// SELECTED WORK'}
          </motion.p>
          <GlitchHeading text="Shipped" subtitle="作品" inView={inView} delay={0.1} />
        </div>

        <div className="mb-6">
          <TiltCard project={featured} delay={0.1} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <TiltCard key={p.number} project={p} delay={0.1 + (i + 1) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
