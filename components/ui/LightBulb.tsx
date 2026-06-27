"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const MOUNT_H   = 10;
const CORD_BASE = 32;

function BulbSVG({ isDark }: { isDark: boolean }) {
  return (
    <svg width="46" height="60" viewBox="0 0 46 60" fill="none">
      <path
        d="M 23 5 C 9 5 3 14 3 23 C 3 32 10 38 17 41 L 17 47 L 29 47 L 29 41 C 36 38 43 32 43 23 C 43 14 37 5 23 5 Z"
        fill={isDark ? "#0e0e16" : "#fffbeb"}
        stroke={isDark ? "#333360" : "#fbbf24"}
        strokeWidth="1.5"
      />
      {!isDark && (
        <>
          <path
            d="M 23 5 C 9 5 3 14 3 23 C 3 32 10 38 17 41 L 17 47 L 29 47 L 29 41 C 36 38 43 32 43 23 C 43 14 37 5 23 5 Z"
            fill="rgba(253,230,138,0.42)"
          />
          <path d="M 17 27 Q 23 19 29 27" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <ellipse cx="15" cy="14" rx="4" ry="6.5" fill="white" opacity="0.22" transform="rotate(-25 15 14)" />
        </>
      )}
      {isDark && (
        <path d="M 18 28 Q 23 22 28 28" stroke="#222250" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      )}
      <rect x="16" y="47" width="14" height="4"   rx="2"   fill={isDark ? "#141428" : "#d97706"} />
      <rect x="15" y="50" width="16" height="3.5" rx="1.5" fill={isDark ? "#101020" : "#b45309"} />
      <rect x="16" y="53" width="14" height="3"   rx="1"   fill={isDark ? "#0c0c18" : "#92400e"} />
    </svg>
  );
}

export default function LightBulb() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const yMv   = useMotionValue(0);
  const cordH = useTransform(yMv, v => CORD_BASE + Math.max(0, v));

  const toggledRef   = useRef(false);
  const clickAnimRef = useRef(false);
  const transAnimRef = useRef(false);
  const bulbWrapRef  = useRef<HTMLDivElement>(null);

  const getBulbCenter = (): { x: number; y: number } => {
    if (!bulbWrapRef.current) {
      const isMobile = window.innerWidth < 768;
      return { x: isMobile ? window.innerWidth / 2 : window.innerWidth - 40, y: 72 };
    }

    const r = bulbWrapRef.current.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // Circular reveal using the View Transitions API.
  // The browser captures real before/after DOM screenshots and wipes between them.
  const runTransition = (ox: number, oy: number) => {
    if (transAnimRef.current) return;
    transAnimRef.current = true;

    // Pass the origin to the CSS animation via custom properties
    document.documentElement.style.setProperty("--vt-x", `${ox}px`);
    document.documentElement.style.setProperty("--vt-y", `${oy}px`);

    if (!("startViewTransition" in document)) {
      // Fallback for browsers without View Transitions support
      toggleTheme();
      transAnimRef.current = false;
      return;
    }

    const nextIsDark = !isDark;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vt = (document as any).startViewTransition(() => {
      // flushSync forces React to render the new state synchronously so the
      // "after" snapshot the browser captures includes all React-driven changes.
      flushSync(() => toggleTheme());
      // useEffect runs async, so also apply the class directly for the snapshot.
      document.documentElement.classList.toggle("dark", nextIsDark);
    });

    vt.finished.finally(() => {
      transAnimRef.current = false;
    });
  };

  const handleClick = () => {
    if (clickAnimRef.current || transAnimRef.current) return;
    clickAnimRef.current = true;
    toggledRef.current = true;

    const { x, y } = getBulbCenter();

    animate(yMv, 72, {
      duration: 0.2,
      ease: "easeOut",
      onComplete: () => {
        runTransition(x, y);
        animate(yMv, 0, {
          type: "spring",
          stiffness: 280,
          damping: 18,
          onComplete: () => {
            clickAnimRef.current = false;
            toggledRef.current = false;
          },
        });
      },
    });
  };

  const cordBg  = isDark ? "#22224a" : "#a16207";
  const mountBg = isDark
    ? "linear-gradient(to bottom, #1e1e40, #14142e)"
    : "linear-gradient(to bottom, #92400e, #78350f)";

  return (
    <div
      className="absolute top-0 left-1/2 z-[9998] -translate-x-1/2 select-none md:fixed md:left-auto md:right-10 md:translate-x-0"
      style={{ width: 50, height: MOUNT_H + CORD_BASE + 130, touchAction: "none" }}
    >
      {/* Ceiling bracket */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,
          height: MOUNT_H,
          borderRadius: "0 0 5px 5px",
          background: mountBg,
          transition: "background 0.5s ease",
        }}
      />

      {/* Cord — stretches as bulb is pulled */}
      <motion.div
        style={{
          position: "absolute",
          top: MOUNT_H,
          left: "50%",
          marginLeft: -1,
          width: 2,
          height: cordH,
          background: cordBg,
          transformOrigin: "top center",
          transition: "background 0.5s ease",
        }}
      />

      {/* Draggable bulb */}
      <div
        ref={bulbWrapRef}
        style={{
          position: "absolute",
          top: MOUNT_H + CORD_BASE,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.62 }}
          dragMomentum={false}
          style={{
            y: yMv,
            filter: !isDark
              ? "drop-shadow(0 0 18px rgba(251,191,36,0.7)) drop-shadow(0 0 7px rgba(253,230,138,0.55))"
              : "none",
            transition: "filter 0.5s ease",
            cursor: "pointer",
          }}
          whileDrag={{ cursor: "grabbing" }}
          onClick={handleClick}
          onDragStart={() => {
            if (!clickAnimRef.current) toggledRef.current = false;
          }}
          onDrag={(_, info) => {
            if (info.offset.y > 55 && !toggledRef.current) {
              toggledRef.current = true;
              const { x, y } = getBulbCenter();
              runTransition(x, y);
            }
          }}
          onDragEnd={() => {
            if (!clickAnimRef.current) toggledRef.current = false;
          }}
        >
          <BulbSVG isDark={isDark} />
        </motion.div>
      </div>
    </div>
  );
}
