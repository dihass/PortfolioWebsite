"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About",    href: "#about" },
  { label: "Arsenal",  href: "#skills" },
  { label: "Shipped",  href: "#projects" },
  { label: "Journey",  href: "#experience" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#060912]/92 backdrop-blur-md border-b border-[#162035]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => handleLink("#hero")}
            className="font-spectral text-lg text-[#e2f0ff] tracking-tight hover:text-[#00c8ff] transition-colors duration-200"
          >
            DS
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="font-urbanist text-sm tracking-[0.06em] text-[#4a7090] hover:text-[#e2f0ff] transition-colors duration-200 uppercase"
              >
                {l.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist text-sm tracking-[0.06em] uppercase px-4 py-2 border border-[#00c8ff] text-[#00c8ff] hover:bg-[#00c8ff] hover:text-[#060912] transition-all duration-200 rounded-sm"
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-[#e2f0ff] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-6 bg-[#e2f0ff] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-[#e2f0ff] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#060912]/97 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleLink(l.href)}
                className="font-spectral text-4xl text-[#e2f0ff] hover:text-[#00c8ff] transition-colors"
              >
                {l.label}
              </motion.button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist text-sm tracking-[0.1em] uppercase px-6 py-3 border border-[#00c8ff] text-[#00c8ff]"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
