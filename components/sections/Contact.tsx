"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";

const links = [
  { label: "GitHub",   href: "https://github.com/dihass",                              Icon: FiGithub,   bg: "#2d333b", hover: "#444c56" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dihas-sathnindu-785060258/", Icon: FiLinkedin, bg: "#0077b5", hover: "#006097" },
  { label: "Email",    href: "mailto:dihas.sathnindu@gmail.com",                        Icon: FiMail,     bg: "#e30057", hover: "#bf004a" },
  { label: "Resume",   href: "/resume.pdf",                                             Icon: FiDownload, bg: "#0d7f60", hover: "#0a6650" },
];

const EMAIL = "dihas.sathnindu@gmail.com";

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-[#1c1714]">
      {/* Rainbow bar at top */}
      <div className="rainbow-bar" />

      {/* Dot grid on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#F6F0E4 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating stars */}
      {[
        { top: "20%", left: "8%",  color: "#9fead3", delay: 0 },
        { top: "65%", right: "12%",color: "#f9c840", delay: 0.5 },
        { top: "40%", left: "85%", color: "#ffd0bc", delay: 1 },
        { top: "80%", left: "20%", color: "#dce4ff", delay: 1.5 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-star-float"
          style={{
            top: s.top,
            left: s.left,
            right: (s as { right?: string }).right,
            background: s.color,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-28 text-center">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-silkscreen text-[11px] tracking-widest text-[#9fead3] uppercase mb-8"
        >
          GET IN TOUCH →
        </motion.p>

        {/* Big headline — single h2 with two animated lines */}
        <h2
          className="font-fraunces font-black leading-[0.9] mb-10"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          <div className="overflow-hidden mb-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#F6F0E4]"
            >
              Let&apos;s build
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#9fead3]"
            >
              something.
            </motion.span>
          </div>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-jakarta text-lg text-[#7a6f68] max-w-md mx-auto mb-12"
        >
          Looking for a junior engineer who actually ships? I&apos;m open to roles, freelance projects, and interesting conversations.
        </motion.p>

        {/* Email — Silkscreen large */}
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          whileHover={{ scale: 1.02 }}
          className="inline-block font-silkscreen text-[#F6F0E4] mb-14 hover:text-[#9fead3] transition-colors duration-200"
          style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.25rem)", letterSpacing: "0.05em" }}
        >
          {EMAIL}
        </motion.a>

        {/* Social link buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2.5 font-jakarta text-sm font-medium text-white px-5 py-3 rounded-xl transition-all duration-200"
              style={{ background: link.bg }}
            >
              <link.Icon className="w-4 h-4" />
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Location note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="font-silkscreen text-[9px] tracking-widest text-[#4a4238] uppercase mt-16"
        >
          Based in Colombo, Sri Lanka <span aria-hidden="true">🌴</span> · Available remotely worldwide
        </motion.p>
      </div>
    </section>
  );
}
