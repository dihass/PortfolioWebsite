"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work",    href: "#projects"   },
  { label: "Stack",   href: "#skills"     },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact"    },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300`}
      >
        <div className={`max-w-[1280px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between rounded-xl transition-all duration-300 ${
          scrolled
            ? "bg-[#f9f5ef]/95 backdrop-blur-md border border-[#ddd0c0] shadow-sm"
            : "bg-[#f9f5ef]/80 border border-[#e8ddd0]"
        }`}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-fraunces font-black text-2xl text-[#1c1714] hover:text-[#0d7f60] transition-colors duration-200 tracking-tight"
          >
            Dihas.
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="font-silkscreen text-[10px] tracking-widest text-[#7a6f68] hover:text-[#1c1714] transition-colors duration-200 uppercase px-4 py-2 hover:bg-[#f0e9de] rounded-lg"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right: availability + resume */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 font-silkscreen text-[9px] text-[#0d7f60] tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0d7f60] pulse-dot" />
              OPEN TO HIRE
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-silkscreen text-[10px] tracking-wider uppercase px-4 py-2 bg-[#1c1714] text-[#f9f5ef] rounded-lg hover:bg-[#0d7f60] transition-colors duration-200"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-[#1c1714] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-5 bg-[#1c1714] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-[#1c1714] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#f9f5ef]/97 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleLink(l.href)}
                className="font-fraunces font-black text-5xl text-[#1c1714] hover:text-[#0d7f60] transition-colors"
              >
                {l.label}
              </motion.button>
            ))}
            <div className="flex items-center gap-2 font-silkscreen text-[10px] text-[#0d7f60] tracking-wider mt-4">
              <span className="w-2 h-2 rounded-full bg-[#0d7f60] pulse-dot" />
              OPEN TO HIRE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
