"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Use event delegation — works for dynamic elements and has proper cleanup
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button"))
        ringRef.current?.classList.add("scale-[2.5]", "opacity-30");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button"))
        ringRef.current?.classList.remove("scale-[2.5]", "opacity-30");
    };
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout",  onOut,  true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout",  onOut,  true);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none hidden [@media(pointer:fine)]:block"
        style={{
          willChange: "transform",
          backgroundColor: "#f9f5ef",
          border: "1px solid rgba(28, 23, 20, 0.9)",
          boxShadow: "0 0 0 2px rgba(249, 245, 239, 0.75), 0 0 12px rgba(159, 234, 211, 0.85)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full pointer-events-none transition-all duration-300 hidden [@media(pointer:fine)]:block"
        style={{
          willChange: "transform",
          border: "1px solid rgba(249, 245, 239, 0.72)",
          boxShadow: "inset 0 0 0 1px rgba(28, 23, 20, 0.22), 0 0 18px rgba(159, 234, 211, 0.42)",
        }}
      />
    </>
  );
}
