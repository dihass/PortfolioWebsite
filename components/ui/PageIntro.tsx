"use client";

import { motion } from "framer-motion";

export default function PageIntro() {
  return (
    <motion.div
      className="fixed inset-0 z-[99998] bg-[#060912] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-10 h-10 border border-[#00c8ff]/35 rounded-full"
        animate={{ scale: [1, 2, 0.5], opacity: [1, 0.4, 0] }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      />
    </motion.div>
  );
}
