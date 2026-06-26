"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveWord from "@/components/ui/InteractiveWord";

/* ─ Ticker ──────────────────────────────────────────────────────────────────── */

const TICKER_ROW = [
  "JAVA", "PYTHON", "JAVASCRIPT", "TYPESCRIPT", "SWIFT", "SQL", "C#", ".NET", "ASP.NET",
  "REACT", "NEXT.JS", "NODE.JS", "PYTORCH", "TAILWIND", "MONGODB",
  "POSTGRESQL", "DOCKER", "GIT", "VERCEL", "REST APIS", "AGILE",
];

/* ─ npm ls data ─────────────────────────────────────────────────────────────── */

type Pkg      = { name: string; version: string; desc: string };
type PkgGroup = { group: string; color: string; pkgs: Pkg[] };

const GROUPS: PkgGroup[] = [
  {
    group: "full-stack",
    color: "#9fead3",
    pkgs: [
      { name: "react",        version: "^19.0.0",  desc: "ui framework"    },
      { name: "next",         version: "^15.0.0",  desc: "full-stack meta" },
      { name: "nodejs",       version: "^20.0.0",  desc: "js runtime"      },
      { name: "typescript",   version: "^5.0.0",   desc: "type safety"     },
      { name: "tailwindcss",  version: "^3.4.0",   desc: "utility css"     },
    ],
  },
  {
    group: "languages",
    color: "#f9c840",
    pkgs: [
      { name: "java",         version: "SE-21",    desc: "enterprise"      },
      { name: "python",       version: "3.11.0",   desc: "data & ai"       },
      { name: "javascript",   version: "ES2024",   desc: "web scripting"   },
      { name: "swift",        version: "5.9.0",    desc: "ios / macos"     },
      { name: "sql",          version: "ISO-2023", desc: "querying"        },
    ],
  },
  {
    group: "backend",
    color: "#a78bfa",
    pkgs: [
      { name: "csharp",       version: "12.0.0",   desc: "dotnet language" },
      { name: "dotnet",       version: "8.0.0",    desc: "microsoft clr"   },
      { name: "aspnet-core",  version: "8.0.0",    desc: "web api / mvc"   },
    ],
  },
  {
    group: "ai-ml",
    color: "#fb923c",
    pkgs: [
      { name: "pytorch",      version: "2.0.0",    desc: "deep learning"   },
    ],
  },
  {
    group: "infra",
    color: "#61DAFB",
    pkgs: [
      { name: "docker",       version: "25.0.0",   desc: "containers"      },
      { name: "git",          version: "2.43.0",   desc: "version control" },
      { name: "postgresql",   version: "16.0.0",   desc: "sql database"    },
      { name: "mongodb",      version: "7.0.0",    desc: "nosql"           },
      { name: "vercel",       version: "latest",   desc: "deployment"      },
    ],
  },
];

const TOTAL = GROUPS.reduce((a, g) => a + g.pkgs.length, 0);

/* ─ Interactive shell ───────────────────────────────────────────────────────── */

const ASCII_ART = [
  "╭─────────────────────────────────────────────╮",
  "│                                             │",
  "│   ██████╗ ██╗██╗  ██╗ █████╗ ███████╗     │",
  "│   ██╔══██╗██║██║  ██║██╔══██╗██╔════╝     │",
  "│   ██║  ██║██║███████║███████║███████╗      │",
  "│   ██║  ██║██║██╔══██║██╔══██║╚════██║     │",
  "│   ██████╔╝██║██║  ██║██║  ██║███████║     │",
  "│   ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    │",
  "│                                             │",
  "│   full stack engineer  ·  founder           │",
  "│   darvincode  ·  colombo, sri lanka         │",
  "│                                             │",
  "╰─────────────────────────────────────────────╯",
];

type OutLine  = { text: string; color?: string };
type HistItem = { cmd: string; output: OutLine[] };

function processCmd(raw: string): OutLine[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];
  if (cmd === "clear") return "clear";

  if (cmd === "help") return [
    { text: "available commands:",                            color: "rgba(255,255,255,0.45)" },
    { text: "" },
    { text: "  ls              list directory contents",     color: "rgba(255,255,255,0.32)" },
    { text: "  cd art          display ascii art",           color: "rgba(255,255,255,0.32)" },
    { text: "  cat readme.txt  read the readme",             color: "rgba(255,255,255,0.32)" },
    { text: "  whoami          show user info",              color: "rgba(255,255,255,0.32)" },
    { text: "  pwd             print working directory",     color: "rgba(255,255,255,0.32)" },
    { text: "  clear           clear the terminal",          color: "rgba(255,255,255,0.32)" },
    { text: "  help            show this message",           color: "rgba(255,255,255,0.32)" },
  ];

  if (cmd === "ls") return [
    { text: "art/            readme.txt      package.json",  color: "#9fead3" },
  ];

  if (cmd === "cd art") return [
    { text: "# entering art/ ...", color: "rgba(255,255,255,0.22)" },
    { text: "" },
    ...ASCII_ART.map(line => ({ text: line, color: "#9fead3" })),
  ];

  if (cmd === "pwd") return [
    { text: "/home/dihas/skills", color: "rgba(255,255,255,0.42)" },
  ];

  if (cmd === "whoami") return [
    { text: "dihas sathnindu",                               color: "#f9f5ef" },
    { text: "" },
    { text: "  role    software engineer · founder",         color: "rgba(255,255,255,0.35)" },
    { text: "  edu     westminster / iit colombo",           color: "rgba(255,255,255,0.35)" },
    { text: "  work    ifs — enterprise software intern",    color: "rgba(255,255,255,0.35)" },
    { text: "  based   colombo, sri lanka",                  color: "rgba(255,255,255,0.35)" },
  ];

  if (cmd === "cat readme.txt") return [
    { text: "hi there! 👋",                                  color: "#f9f5ef" },
    { text: "" },
    { text: "  i'm dihas — a full stack engineer",           color: "rgba(255,255,255,0.42)" },
    { text: "  who builds things that actually ship.",       color: "rgba(255,255,255,0.42)" },
    { text: "" },
    { text: "  → dihas.sathnindu@gmail.com",                color: "#9fead3" },
    { text: "  → github.com/dihass",                        color: "#9fead3" },
  ];

  return [
    { text: `command not found: ${raw.trim()}`,              color: "#fb923c" },
    { text: "type 'help' to see available commands",         color: "rgba(255,255,255,0.22)" },
  ];
}

/* ─ Competencies ────────────────────────────────────────────────────────────── */

const COMPETENCIES = [
  "System Design", "OOP", "Agile / Scrum", "Auth & AuthZ",
  "Microservices", "Performance Optimisation", "Test Automation", "CI/CD",
];

/* ─ Sub-components ──────────────────────────────────────────────────────────── */

function ShellPrompt() {
  return (
    <>
      <span style={{ color: "#9fead3" }}>dihas</span>
      <span style={{ color: "rgba(255,255,255,0.28)" }}>@portfolio</span>
      <span style={{ color: "rgba(255,255,255,0.28)" }}>:~$ </span>
    </>
  );
}

function BlinkCursor() {
  return (
    <span
      className="inline-block align-middle"
      style={{
        width: "7px",
        height: "14px",
        background: "#9fead3",
        borderRadius: "1px",
        marginLeft: "1px",
        animation: "term-cursor-blink 1.1s step-start infinite",
      }}
    />
  );
}

/* ─ Main component ──────────────────────────────────────────────────────────── */

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [hist,     setHist]     = useState<HistItem[]>([]);
  const [input,    setInput]    = useState("");
  const [focused,  setFocused]  = useState(false);
  const [cmdStack, setCmdStack] = useState<string[]>([]);
  const [stackIdx, setStackIdx] = useState(-1);

  const inputRef  = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  /* Scroll prompt into view when a new command is added */
  useEffect(() => {
    if (hist.length === 0) return;
    promptRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [hist]);

  const submit = useCallback((cmd: string) => {
    const result = processCmd(cmd);
    if (result === "clear") {
      setHist([]);
    } else {
      setHist(prev => [...prev, { cmd, output: result }]);
    }
    if (cmd.trim()) setCmdStack(prev => [cmd.trim(), ...prev.slice(0, 49)]);
    setInput("");
    setStackIdx(-1);
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(stackIdx + 1, cmdStack.length - 1);
      setStackIdx(next);
      if (cmdStack[next] !== undefined) setInput(cmdStack[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(stackIdx - 1, -1);
      setStackIdx(next);
      setInput(next === -1 ? "" : cmdStack[next]);
    }
  };

  const groups = GROUPS.map((g, i) => ({ ...g, isLast: i === GROUPS.length - 1 }));

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden bg-[#f0e9de]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="section-label">What I Know</span>
            <div className="flex-1 h-px bg-[#ddd0c0]" />
          </motion.div>
          <h2 aria-label="Arsenal.">
            <InteractiveWord
              particleId="arsenal"
              text="Arsenal."
              fontSize="clamp(2rem, 5vw, 4.5rem)"
              className="font-fraunces font-black leading-[1.05] tracking-tight"
              baseColor="#1c1714"
              accentColor="#0d7f60"
              backgroundColor="#f0e9de"
              initialHidden={true}
            />
          </h2>
        </div>

        {/* ── Terminal window ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="os-window mb-5"
        >
          {/* macOS chrome */}
          <div className="os-window-bar">
            <div className="os-window-dots">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="os-window-title hidden md:block">skill-audit — dihas@portfolio: ~</span>
            <span className="os-window-title md:hidden">skill-audit</span>
          </div>

          {/* Terminal body */}
          <div
            className="relative bg-[#0d0b09] overflow-x-auto cursor-text"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 23px,rgba(255,255,255,0.011) 23px,rgba(255,255,255,0.011) 24px)",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 45% at 50% 20%, rgba(159,234,211,0.045) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10 px-4 md:px-8 py-5 md:py-7 term-body">
              {/* ── Static npm ls ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.16 }}
                className="mb-1 whitespace-nowrap"
              >
                <ShellPrompt />
                <span style={{ color: "#f9f5ef" }}>npm ls --depth=2</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="mb-1 whitespace-nowrap"
              >
                <span style={{ color: "#f9f5ef", fontWeight: 700 }}>dihas-portfolio</span>
                <span style={{ color: "#9fead3" }}>@1.0.0</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}> /home/dihas/skills</span>
              </motion.div>

              {groups.map((grp, gi) => {
                const isLastGroup = gi === groups.length - 1;
                const groupPfx    = isLastGroup ? "└─┬" : "├─┬";
                const stemChar    = isLastGroup ? " " : "│";
                return (
                  <motion.div
                    key={grp.group}
                    initial={{ opacity: 0, x: -6 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.32 + gi * 0.1 }}
                  >
                    <div className="whitespace-nowrap">
                      <span style={{ color: "rgba(255,255,255,0.18)" }}>{groupPfx} </span>
                      <span style={{ color: grp.color, fontWeight: 700 }}>{grp.group}</span>
                      <span style={{ color: "rgba(255,255,255,0.22)" }}>
                        {" "}({grp.pkgs.length} package{grp.pkgs.length !== 1 ? "s" : ""})
                      </span>
                    </div>
                    {grp.pkgs.map((pkg, pi) => {
                      const isLastPkg = pi === grp.pkgs.length - 1;
                      const pkgPfx    = `${stemChar} ${isLastPkg ? "└" : "├"}──`;
                      return (
                        <div key={pkg.name} className="flex items-baseline whitespace-nowrap">
                          <span style={{ color: "rgba(255,255,255,0.14)" }}>{pkgPfx} </span>
                          <span className="inline-block w-[120px] md:w-[165px]" style={{ color: "#f9f5ef" }}>{pkg.name}</span>
                          <span className="inline-block w-[80px] md:w-[110px]" style={{ color: grp.color, opacity: 0.75 }}>{pkg.version}</span>
                          <span className="hidden md:inline" style={{ color: "rgba(255,255,255,0.22)" }}># {pkg.desc}</span>
                        </div>
                      );
                    })}
                    {!isLastGroup && (
                      <div style={{ color: "rgba(255,255,255,0.09)" }}>│</div>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.32 + groups.length * 0.1 + 0.15 }}
                className="mt-2 whitespace-nowrap"
              >
                <span style={{ color: "#28c840" }}>✓ </span>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>
                  added{" "}
                  <span style={{ color: "#9fead3", fontWeight: 700 }}>{TOTAL}</span>
                  {" "}packages, found{" "}
                  <span style={{ color: "#9fead3", fontWeight: 700 }}>0</span>
                  {" "}vulnerabilities
                </span>
              </motion.div>

              {/* Interactive section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.32 + groups.length * 0.1 + 0.3 }}
              >
                {/* Separator */}
                <div className="mt-5 mb-3 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: "rgba(159,234,211,0.22)" }} />
                  <span style={{
                    color: "#9fead3",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    opacity: 0.65,
                    textTransform: "uppercase" as const,
                    fontFamily: "inherit",
                  }}>
                    interactive shell
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(159,234,211,0.22)" }} />
                </div>

                {/* Quick-launch chips */}
                {hist.length === 0 && (
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginRight: 2 }}>
                      try →
                    </span>
                    {(["ls", "cd art", "whoami", "help"] as const).map(cmd => (
                      <button
                        key={cmd}
                        onClick={e => { e.stopPropagation(); submit(cmd); inputRef.current?.focus(); }}
                        style={{
                          background: "rgba(159,234,211,0.08)",
                          border: "1px solid rgba(159,234,211,0.28)",
                          color: "#9fead3",
                          padding: "1px 10px",
                          borderRadius: "4px",
                          fontSize: 12,
                          fontFamily: "inherit",
                          cursor: "pointer",
                          lineHeight: 1.75,
                          transition: "background 0.12s",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(159,234,211,0.18)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(159,234,211,0.08)";
                        }}
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Command history */}
              {hist.map((item, hi) => (
                <div key={hi}>
                  <div className="whitespace-nowrap">
                    <ShellPrompt />
                    <span style={{ color: "#f9f5ef" }}>{item.cmd}</span>
                  </div>
                  {item.output.map((line, li) => (
                    <div
                      key={li}
                      style={{ color: line.color ?? "rgba(255,255,255,0.42)", whiteSpace: "pre" }}
                    >
                      {line.text || "\u00A0"}
                    </div>
                  ))}
                </div>
              ))}

              {/* Live prompt */}
              <div ref={promptRef} className="flex items-center whitespace-nowrap mt-0.5">
                <ShellPrompt />
                <span style={{ color: "#f9f5ef" }}>{input}</span>
                {focused
                  ? <BlinkCursor />
                  : <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, marginLeft: 1 }}>
                      click to type
                    </span>
                }
              </div>

              {/* Hidden real input */}
              <input
                ref={inputRef}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                value={input}
                onChange={e => { setInput(e.target.value); setStackIdx(-1); }}
                onKeyDown={onKey}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>

        {/* Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="rounded-2xl border border-[#ddd0c0] p-5"
        >
          <p className="font-silkscreen text-[9px] tracking-widest text-[#bdb0a0] uppercase mb-3">
            Core Competencies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COMPETENCIES.map(c => (
              <span
                key={c}
                className="font-jakarta text-sm text-[#4a4238] px-3 py-1 bg-[#f0e9de] rounded-lg border border-[#ddd0c0]"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Ticker */}
      <div className="mt-10 border-y border-[#ddd0c0] overflow-hidden py-2.5">
        <div className="flex">
          <div className="animate-ticker-right flex whitespace-nowrap gap-0">
            {[...TICKER_ROW, ...TICKER_ROW, ...TICKER_ROW, ...TICKER_ROW].map((item, i) => (
              <span key={i} className="font-silkscreen text-[9px] tracking-widest text-[#bdb0a0] mx-6">
                {item} <span className="text-[#9fead3]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
