"use client";

import {
  type CSSProperties,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SOFTWARE = ["S", "o", "f", "t", "w", "a", "r", "e"] as const;

const CHAR_H_RATIO = 0.68;
const CHAR_H_RATIO_MOBILE = 0.6;
const CHAR_H_MIN = 62;
const CHAR_H_MAX = 132;
const CHAR_H_MIN_MOBILE = 44;
const CHAR_H_MAX_MOBILE = 84;
const ARC_H_RATIO = 0.78;
const ARC_H_RATIO_MOBILE = 0.58;
const STICKER_ARC_H_RATIO = 1.1;
const START_DELAY = 1750;
const HOP_PAUSE_MS = 180;
const W_SHOWCASE_MS = 2000;
const ARC_MS = 500;
const STICKER_HOP_MS = 760;

type Pose = "idle" | "launch" | "float" | "land" | "compile" | "boost";
type BurstKind = "dust" | "spark" | "compile" | "beam";

interface LetterPos {
  cx: number;
  top: number;
  h: number;
}

interface Burst {
  id: number;
  kind: BurstKind;
  x: number;
  y: number;
}

interface CodeMascotEasterEggProps {
  letterRefs: RefObject<(HTMLSpanElement | null)[]>;
  stickerRefs: RefObject<{
    sriLanka: HTMLDivElement | null;
    building: HTMLDivElement | null;
  }>;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): T {
  let timeout: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  }) as T;
}

function easeInCubic(t: number) {
  return t * t * t;
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export default function CodeMascotEasterEgg({ letterRefs, stickerRefs }: CodeMascotEasterEggProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const cancelRef = useRef(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const positionsRef = useRef<LetterPos[]>([]);
  const burstIdRef = useRef(0);
  const poseRef = useRef<Pose>("idle");

  const [pose, setPose] = useState<Pose>("idle");
  const [opacity, setOpacity] = useState(0);
  const [size, setSize] = useState(100);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const updatePose = useCallback((nextPose: Pose) => {
    if (poseRef.current === nextPose) return;

    poseRef.current = nextPose;
    setPose(nextPose);
  }, []);

  const measurePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const positions = (letterRefs.current ?? [])
      .map((letter) => {
        if (!letter) return null;

        const rect = letter.getBoundingClientRect();
        return {
          cx: rect.left - containerRect.left + rect.width / 2,
          top: rect.top - containerRect.top,
          h: rect.height,
        };
      })
      .filter((position): position is LetterPos => position !== null);

    positionsRef.current = positions;

    if (positions.length > 0) {
      const isMobile = window.innerWidth < 768;
      const ratio = isMobile ? CHAR_H_RATIO_MOBILE : CHAR_H_RATIO;
      const min = isMobile ? CHAR_H_MIN_MOBILE : CHAR_H_MIN;
      const max = isMobile ? CHAR_H_MAX_MOBILE : CHAR_H_MAX;

      setSize(
        Math.max(
          min,
          Math.min(max, Math.round(positions[0].h * ratio)),
        ),
      );
    }
  }, [letterRefs]);

  const measureElement = useCallback((element: HTMLElement | null) => {
    const container = containerRef.current;
    if (!container || !element) return null;

    const containerRect = container.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    return {
      cx: rect.left - containerRect.left + rect.width / 2,
      top: rect.top - containerRect.top,
      h: rect.height,
    };
  }, []);

  useEffect(() => {
    measurePositions();

    const debouncedMeasure = debounce(measurePositions, 120);
    const resizeObserver = new ResizeObserver(debouncedMeasure);

    window.addEventListener("resize", debouncedMeasure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", debouncedMeasure);
      resizeObserver.disconnect();
    };
  }, [measurePositions]);

  const moveTo = useCallback((x: number, y: number, rotate = 0, scale = 1) => {
    if (!mascotRef.current) return;

    mascotRef.current.style.left = `${x}px`;
    mascotRef.current.style.top = `${y}px`;
    mascotRef.current.style.transform = `translate(-50%, -100%) rotate(${rotate}deg) scale(${scale})`;
  }, []);

  const emitBurst = useCallback((kind: BurstKind, x: number, y: number) => {
    const id = burstIdRef.current;
    burstIdRef.current += 1;

    setBursts((current) => [...current.slice(-10), { id, kind, x, y }]);
    timeoutIdsRef.current.push(window.setTimeout(() => {
      setBursts((current) => current.filter((burst) => burst.id !== id));
    }, kind === "compile" ? 1250 : 900));
  }, []);

  const pulseLetter = useCallback((index: number, mode: "land" | "compile" | "beam") => {
    const letter = letterRefs.current?.[index];
    if (!letter) return;

    letter.classList.remove("mascot-letter-landed", "mascot-letter-compile", "mascot-letter-beam");
    void letter.offsetWidth;

    if (mode === "land") letter.classList.add("mascot-letter-landed");
    if (mode === "compile") letter.classList.add("mascot-letter-compile");
    if (mode === "beam") letter.classList.add("mascot-letter-beam");

    timeoutIdsRef.current.push(window.setTimeout(() => {
      letter.classList.remove("mascot-letter-landed", "mascot-letter-compile", "mascot-letter-beam");
    }, mode === "compile" ? W_SHOWCASE_MS : 820));
  }, [letterRefs]);

  const pulseSticker = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    element.classList.remove("mascot-sticker-landed");
    void element.offsetWidth;
    element.classList.add("mascot-sticker-landed");

    timeoutIdsRef.current.push(window.setTimeout(() => {
      element.classList.remove("mascot-sticker-landed");
    }, 900));
  }, []);

  const dropTo = useCallback(
    (x: number, fromY: number, toY: number, ms: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();

        const step = (now: number) => {
          if (cancelRef.current) {
            resolve();
            return;
          }

          const progress = Math.min((now - start) / ms, 1);
          const eased = easeInCubic(progress);

          updatePose(progress < 0.78 ? "land" : "idle");
          moveTo(x, fromY + (toY - fromY) * eased, -8 + progress * 8, 0.96 + progress * 0.04);

          if (progress < 1) rafRef.current = requestAnimationFrame(step);
          else resolve();
        };

        rafRef.current = requestAnimationFrame(step);
      }),
    [moveTo, updatePose],
  );

  const arcTo = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number, arcHeight: number, ms: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const direction = toX >= fromX ? 1 : -1;

        const step = (now: number) => {
          if (cancelRef.current) {
            resolve();
            return;
          }

          const progress = Math.min((now - start) / ms, 1);
          const easedX = easeInOutSine(progress);
          const parabola = arcHeight * 4 * progress * (1 - progress);
          const rotate = direction * (-10 + progress * 20);
          const scale = 1 + Math.sin(progress * Math.PI) * 0.065;

          moveTo(
            fromX + (toX - fromX) * easedX,
            fromY + (toY - fromY) * progress - parabola,
            rotate,
            scale,
          );

          if (progress < 0.24) updatePose("launch");
          else if (progress < 0.66) updatePose("float");
          else updatePose("land");

          if (progress < 1) rafRef.current = requestAnimationFrame(step);
          else resolve();
        };

        rafRef.current = requestAnimationFrame(step);
      }),
    [moveTo, updatePose],
  );

  const squashLanding = useCallback(async () => {
    const body = bodyRef.current;
    if (!body || cancelRef.current) return;

    body.style.transition = "none";
    body.style.transform = "scaleX(1.18) scaleY(0.82)";
    void body.getBoundingClientRect();

    await sleep(70);
    if (cancelRef.current) return;

    body.style.transition = "transform 0.34s cubic-bezier(0.2, 1.55, 0.42, 1)";
    body.style.transform = "scaleX(1) scaleY(1)";
    await sleep(300);
  }, []);

  const crouchTakeoff = useCallback(async () => {
    const body = bodyRef.current;
    if (!body || cancelRef.current) return;

    updatePose("idle");
    body.style.transition = "none";
    body.style.transform = "scaleX(1.2) scaleY(0.76)";
    void body.getBoundingClientRect();

    await sleep(74);
    if (cancelRef.current) return;

    body.style.transition = "transform 0.16s ease-out";
    body.style.transform = "scaleX(0.94) scaleY(1.08)";
    await sleep(104);
  }, [updatePose]);

  useEffect(() => {
    cancelRef.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        cancelRef.current = true;
        cancelAnimationFrame(rafRef.current);
      };
    }

    const timer = window.setTimeout(async () => {
      measurePositions();

      let positions = positionsRef.current;
      if (positions.length < SOFTWARE.length) return;

      let current = positions[0];
      const arcRatio = window.innerWidth < 768 ? ARC_H_RATIO_MOBILE : ARC_H_RATIO;
      const dropFromY = current.top - current.h * 1.12;

      moveTo(current.cx, dropFromY, -7, 0.94);
      updatePose("land");
      setOpacity(1);
      emitBurst("spark", current.cx, dropFromY - current.h * 0.12);

      await dropTo(current.cx, dropFromY, current.top, 430);
      if (cancelRef.current) return;

      updatePose("idle");
      emitBurst("dust", current.cx, current.top);
      pulseLetter(0, "land");
      await squashLanding();

      for (let i = 0; i < SOFTWARE.length - 1; i += 1) {
        if (cancelRef.current) return;

        measurePositions();
        positions = positionsRef.current;
        current = positions[i] ?? current;
        const next = positions[i + 1];
        if (!next) return;

        moveTo(current.cx, current.top);

        if (SOFTWARE[i].toLowerCase() === "w") {
          updatePose("compile");
          pulseLetter(i, "compile");
          emitBurst("compile", current.cx, current.top - current.h * 0.48);
          emitBurst("spark", current.cx - current.h * 0.18, current.top - current.h * 0.88);
          await sleep(760);

          updatePose("boost");
          pulseLetter(i, "beam");
          emitBurst("beam", current.cx + current.h * 0.08, current.top - current.h * 0.45);
          await sleep(W_SHOWCASE_MS - 760);
        } else {
          updatePose("idle");
          await sleep(HOP_PAUSE_MS);
        }

        if (cancelRef.current) return;

        await crouchTakeoff();
        emitBurst("dust", current.cx, current.top);
        if (cancelRef.current) return;

        await arcTo(
          current.cx,
          current.top,
          next.cx,
          next.top,
          current.h * arcRatio,
          ARC_MS,
        );

        if (cancelRef.current) return;

        updatePose("idle");
        emitBurst("dust", next.cx, next.top);
        pulseLetter(i + 1, "land");
        await squashLanding();
      }

      if (cancelRef.current) return;

      measurePositions();
      positions = positionsRef.current;
      const last = positions[SOFTWARE.length - 1];
      if (!last) return;

      let currentPoint = last;
      moveTo(currentPoint.cx, currentPoint.top);
      updatePose("compile");
      emitBurst("compile", currentPoint.cx, currentPoint.top - currentPoint.h * 0.48);
      await sleep(440);

      const stickerTargets = [
        { element: stickerRefs.current?.sriLanka ?? null, pose: "compile" as const, burst: "compile" as const },
        { element: stickerRefs.current?.building ?? null, pose: "boost" as const, burst: "beam" as const },
      ];

      for (const target of stickerTargets) {
        if (cancelRef.current) return;

        const point = measureElement(target.element);
        if (!point) continue;

        await crouchTakeoff();
        emitBurst("dust", currentPoint.cx, currentPoint.top);
        updatePose("boost");
        await arcTo(
          currentPoint.cx,
          currentPoint.top,
          point.cx,
          point.top,
          Math.max(currentPoint.h, point.h) * STICKER_ARC_H_RATIO,
          STICKER_HOP_MS,
        );

        if (cancelRef.current) return;

        updatePose(target.pose);
        emitBurst(target.burst, point.cx, point.top - point.h * 0.5);
        pulseSticker(target.element);
        await squashLanding();
        await sleep(target.burst === "compile" ? 420 : 260);
        currentPoint = point;
      }

      updatePose("boost");
      await crouchTakeoff();
      await arcTo(
        currentPoint.cx,
        currentPoint.top,
        currentPoint.cx + currentPoint.h * 4.8,
        currentPoint.top - currentPoint.h * 1.1,
        currentPoint.h * 1.35,
        720,
      );
      emitBurst("spark", currentPoint.cx + currentPoint.h * 2.6, currentPoint.top - currentPoint.h * 0.9);
      setOpacity(0);
    }, START_DELAY);

    return () => {
      window.clearTimeout(timer);
      timeoutIdsRef.current.forEach(window.clearTimeout);
      timeoutIdsRef.current = [];
      cancelRef.current = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [
    arcTo,
    crouchTakeoff,
    dropTo,
    emitBurst,
    measurePositions,
    measureElement,
    moveTo,
    pulseLetter,
    pulseSticker,
    squashLanding,
    stickerRefs,
    updatePose,
  ]);

  const mascotStyle = {
    "--mascot-size": `${size}px`,
    opacity,
    transition: "opacity 0.34s ease",
    willChange: "left, top, transform",
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none block overflow-visible"
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-visible">
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className={`mascot-burst mascot-burst-${burst.kind}`}
            style={{ left: burst.x, top: burst.y } as CSSProperties}
          />
        ))}
      </div>

      <div
        ref={mascotRef}
        className={`absolute pointer-events-none code-mascot code-mascot-${pose}`}
        style={mascotStyle}
      >
        <div ref={bodyRef} className="code-mascot-body">
          <TerminalWispFigure />
        </div>
      </div>
    </div>
  );
}

function TerminalWispFigure() {
  return (
    <svg
      className="code-mascot-svg"
      viewBox="0 0 150 150"
      role="img"
      aria-label="Animated terminal wisp mascot"
    >
      <defs>
        <radialGradient id="terminalWispGlow" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="38%" stopColor="#9fead3" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#9fead3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="terminalShell" x1="7%" x2="95%" y1="5%" y2="100%">
          <stop offset="0%" stopColor="#342a24" />
          <stop offset="54%" stopColor="#1c1714" />
          <stop offset="100%" stopColor="#0b0908" />
        </linearGradient>
        <linearGradient id="terminalGlass" x1="10%" x2="90%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#18231f" />
          <stop offset="62%" stopColor="#10100f" />
          <stop offset="100%" stopColor="#060706" />
        </linearGradient>
        <linearGradient id="terminalBeam" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#f9c840" />
          <stop offset="56%" stopColor="#9fead3" />
          <stop offset="100%" stopColor="#0d7f60" />
        </linearGradient>
      </defs>

      <ellipse className="cm-glow" cx="75" cy="80" rx="58" ry="54" fill="url(#terminalWispGlow)" />
      <path className="cm-trail cm-trail-a" d="M28 112 C6 115 5 130 23 137" />
      <path className="cm-trail cm-trail-b" d="M110 112 C135 116 142 132 122 142" />

      <g className="cm-orbit">
        <circle className="tw-orbit-dot tw-orbit-dot-a" cx="32" cy="50" r="4" />
        <circle className="tw-orbit-dot tw-orbit-dot-b" cx="122" cy="42" r="5" />
        <path className="tw-orbit-line" d="M28 75 C38 35 111 28 124 70" />
      </g>

      <g className="cm-head">
        <rect className="tw-shell" x="31" y="36" width="89" height="76" rx="17" />
        <rect className="tw-screen" x="39" y="51" width="73" height="52" rx="11" />
        <path className="tw-titlebar" d="M44 45 H108" />
        <circle className="tw-dot tw-dot-warn" cx="49" cy="43" r="3.2" />
        <circle className="tw-dot tw-dot-ok" cx="60" cy="43" r="3.2" />
        <circle className="tw-dot tw-dot-idle" cx="71" cy="43" r="3.2" />
        <path className="tw-prompt" d="M50 67 L57 73 L50 79" />
        <path className="tw-code-line tw-code-line-a" d="M66 68 H96" />
        <path className="tw-code-line tw-code-line-b" d="M66 82 H88" />
        <rect className="tw-caret" x="94" y="78" width="10" height="14" rx="2" />
        <path className="tw-smile" d="M61 93 C70 100 82 100 91 93" />
      </g>

      <g className="cm-antenna">
        <path className="tw-signal tw-signal-a" d="M54 27 C65 18 86 18 97 27" />
        <path className="tw-signal tw-signal-b" d="M63 20 C70 15 81 15 88 20" />
      </g>

      <g className="cm-torso">
        <path className="tw-shadow-foot" d="M52 112 C64 121 90 121 102 112" />
        <path className="tw-fold-left" d="M37 102 L25 119 L47 114 Z" />
        <path className="tw-fold-right" d="M113 102 L128 119 L104 114 Z" />
      </g>

      <g className="cm-compile-ui">
        <rect x="17" y="23" width="42" height="27" rx="8" />
        <path d="M26 36 L32 30 L26 26" />
        <path d="M40 26 L34 40" />
        <path d="M46 26 L53 31 L46 36" />
      </g>
    </svg>
  );
}
