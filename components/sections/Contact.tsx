"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import GlitchHeading from "@/components/ui/GlitchHeading";

const links = [
  { label: "GitHub",   href: "https://github.com/dihass",                               icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dihas-sathnindu-785060258/",  icon: FiLinkedin },
  { label: "Email",    href: "mailto:dihas.sathnindu@gmail.com",                         icon: FiMail },
  { label: "Resume",   href: "/resume.pdf",                                              icon: FiDownload },
];

const EMAIL = "dihas.sathnindu@gmail.com";

function EmailReveal({ inView }: { inView: boolean }) {
  return (
    <a href={`mailto:${EMAIL}`} className="font-spectral text-base sm:text-xl md:text-2xl lg:text-3xl text-[#e2f0ff] hover:text-[#00c8ff] transition-colors duration-300 block mb-8 md:mb-16">
      {EMAIL.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${char === "@" || char === "." ? "text-[#00c8ff]" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.5 + i * 0.022, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-40 relative overflow-hidden">
      {/* Pulsing ambient glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="w-[700px] h-[700px] rounded-full bg-[#00c8ff]/4 blur-[140px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-[400px] h-[200px] bg-[#00c8ff]/4 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.22em] text-[#00c8ff]/60 uppercase mb-6"
        >
          {'// GET IN TOUCH'}
        </motion.p>

        <GlitchHeading text="Let's Talk" inView={inView} delay={0.1} center />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-urbanist text-lg text-[#4a7090] mt-6 mb-8 max-w-xl mx-auto"
        >
          Looking for a junior engineer who ships? Let&apos;s talk.
        </motion.p>

        <EmailReveal inView={inView} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.85 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={{ y: -5, boxShadow: "0 0 28px rgba(0,200,255,0.22)", borderColor: "rgba(0,200,255,0.45)" }}
              className="flex items-center gap-2.5 font-urbanist text-sm tracking-[0.06em] uppercase px-5 py-3 border border-[#162035] text-[#4a7090] hover:text-[#e2f0ff] transition-colors duration-200 rounded-sm"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
