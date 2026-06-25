"use client";

import { motion } from "framer-motion";

export default function PageIntro() {
  return (
    <motion.div
      className="fixed inset-0 z-[99998] bg-[#f9f5ef] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-10 h-10 rounded-full border-2 border-[#9fead3]"
        animate={{ scale: [1, 1.8, 0.4], opacity: [1, 0.5, 0] }}
        transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
      />
    </motion.div>
  );
}
