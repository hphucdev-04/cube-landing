"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Terminal,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ShowcaseFeature {
  id: string;
  code: string;
  label: string;
  roman: string;
  featureNum: string;
  title: string;
  tagline: string;
  bgAsset: string;
  // bgFocus: object-position for this image
  bgFocus: string;
  videoSrc?: string;
  description: string;
  bullets: string[];
  terminalLines: { type: "cmd" | "success" | "warn" | "info" | "bullet" | "output"; text: string }[];
}

const ALL_6_FEATURES: ShowcaseFeature[] = [
  {
    id: "gateway",
    code: "I",
    label: "Gateway",
    roman: "FEATURE I",
    featureNum: "I // VI",
    title: "Multi-Gateway Model Matrix",
    tagline: "Your subscriptions. Your keys. Zero lock-in.",
    // ascii-magic-3: the receding arched corridor — perfect for "gateway"
    bgAsset: "/assets/ascii-magic-1.png",
    bgFocus: "object-center",
    videoSrc: "/demos/gateway.mp4",
    description:
      "Connect directly to Claude Pro, ChatGPT Plus, or Grok via PKCE OAuth 2.0 with zero token markup. 15+ developer API keys, or 100% offline Ollama models.",
    bullets: [
      "PKCE OAuth: Claude Pro / ChatGPT Plus / Grok",
      "15+ API providers with unified fallback routing",
      "100% offline inference via Ollama / LM Studio",
    ],
    terminalLines: [
      { type: "cmd", text: "cube gateway status" },
      { type: "success", text: "✔ PKCE OAuth: Claude Pro (Active · 5hr quota)" },
      { type: "info", text: "ℹ API Matrix: 15 providers configured" },
      { type: "bullet", text: "Local Engine: Ollama / qwen2.5-coder:32b" },
      { type: "output", text: "Active: claude-3-7-sonnet · Zero token markup" },
    ],
  },
  {
    id: "skill",
    code: "II",
    label: "Skill",
    roman: "FEATURE II",
    featureNum: "II // VI",
    title: "Workspace Skill & Rule Discovery",
    tagline: "Repository guidelines right where you code.",
    // ascii-magic-2: ascending spiral staircase — recursive hierarchy
    bgAsset: "/assets/ascii-magic-2.png",
    bgFocus: "object-center",
    description:
      "Cube crawls project directories and walks up parent folders to automatically discover AGENTS.md rules, repository guidelines, and custom skill scripts.",
    bullets: [
      "Automatic AGENTS.md discovery across monorepo trees",
      "Dynamic skill loading with isolated runtimes",
      "Zero prompt maintenance across multiple repos",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube run "refactor database client"' },
      { type: "info", text: "[workspace] Scanning directory tree..." },
      { type: "success", text: "✔ AGENTS.md: 14 project rules injected" },
      { type: "info", text: "ℹ Loaded .cube/skills/sql-migration.md" },
      { type: "output", text: "Context injected. Zero prompt maintenance." },
    ],
  },
  {
    id: "hitl",
    code: "III",
    label: "HITL",
    roman: "FEATURE III",
    featureNum: "III // VI",
    title: "Human-in-the-Loop Safeguards",
    tagline: "Absolute developer authority.",
    // ascii-magic-1: mechanical trusses, chains — guardrails
    bgAsset: "/assets/ascii-magic-3.png",
    bgFocus: "object-center",
    videoSrc: "/demos/hitl.mp4",
    description:
      "No silent overwrites. Before disk mutations or destructive shell commands, Cube surfaces a colorized unified diff and waits for explicit confirmation.",
    bullets: [
      "Confirmation required for sensitive bash commands",
      "Colorized unified diff previews before any write",
      "One-key rollback and atomic commit guarantees",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube exec "rm -rf ./dist && pnpm migrate:prod"' },
      { type: "warn", text: "! GUARDRAIL: Potentially destructive mutation" },
      { type: "output", text: "Target: Recursive delete & schema migration" },
      { type: "cmd", text: "Approve? [y/N]: y" },
      { type: "success", text: "✔ Authorized. Rollback checkpoint #928a created." },
    ],
  },
  {
    id: "qa",
    code: "IV",
    label: "Q&A",
    roman: "FEATURE IV",
    featureNum: "IV // VI",
    title: "Interactive Intent Clarification",
    tagline: "Resolve ambiguity before writing code.",
    // ascii-magic-4: branching stairways & meander frieze — many paths
    bgAsset: "/assets/ascii-magic-4.png",
    bgFocus: "object-center",
    videoSrc: "/demos/qa.mp4",
    description:
      "When requirements are ambiguous, Cube renders keyboard-driven multiple-choice questions in your shell — lock down exact specs before a line of code is written.",
    bullets: [
      "Arrow-key interactive picker in terminal TUI",
      "Inline technical tradeoffs before selection",
      "Seamless return to autonomous execution",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube plan "migrate authentication subsystem"' },
      { type: "info", text: "? Multiple approaches detected. Choose one:" },
      { type: "bullet", text: "❯ [1] OAuth PKCE flow (Recommended)" },
      { type: "bullet", text: "  [2] Static API key rotation + LibSQL" },
      { type: "bullet", text: "  [3] Delegated subagent auth broker" },
      { type: "success", text: "✔ Spec locked. Proceeding with PKCE flow." },
    ],
  },
  {
    id: "mcp",
    code: "V",
    label: "MCP",
    roman: "FEATURE V",
    featureNum: "V // VI",
    title: "Model Context Protocol Foundation",
    tagline: "Universal tool & data interoperability.",
    // ascii-magic-6: grand colonnade hall — universal connection
    bgAsset: "/assets/ascii-magic-5.png",
    bgFocus: "object-center",
    description:
      "Built-in MCP client. Connect external tool servers, database inspectors, browser automation, and enterprise endpoints through open standards.",
    bullets: [
      "Universal MCP client: stdio & SSE transports",
      "Connect databases, GitHub, browser automation",
      "Community server ecosystem, zero adapter code",
    ],
    terminalLines: [
      { type: "cmd", text: "cube mcp list" },
      { type: "success", text: "✔ MCP client online" },
      { type: "bullet", text: "├─ postgres-inspector  (stdio · 6 tools)" },
      { type: "bullet", text: "├─ github-context       (stdio · 8 tools)" },
      { type: "bullet", text: "└─ browser-playwright   (sse  · 12 tools)" },
      { type: "output", text: "26 external tools available across 3 servers" },
    ],
  },
  {
    id: "subagent",
    code: "VI",
    label: "Subagent",
    roman: "FEATURE VI",
    featureNum: "VI // VI",
    title: "Parallel Subagent Delegation",
    tagline: "Orchestrate autonomous worker teams.",
    // ascii-magic-5: concurrent vaults & scaffolding — parallel execution
    bgAsset: "/assets/ascii-magic-6.png",
    bgFocus: "object-top",
    description:
      "Decompose massive refactoring goals into isolated parallel workers. Subagents explore, test, and edit concurrently without blocking your main shell.",
    bullets: [
      "Spawn workers with isolated context & workspace",
      "Parallel exploration, refactoring, and test writing",
      "Automatic dependency resolution & unified review",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube run --parallel "audit & refactor monorepo"' },
      { type: "info", text: "[orchestrator] Spawning 2 isolated subagents:" },
      { type: "bullet", text: "↳ Worker #1 [PID 4912] — /src/routes/auth" },
      { type: "bullet", text: "↳ Worker #2 [PID 4913] — /src/routes/billing" },
      { type: "success", text: "✔ Both complete. Schema merged → /docs/openapi.json" },
    ],
  },
];

// Compute scroll-to position for a given feature index
function useFeatureJump(sectionRef: React.RefObject<HTMLDivElement | null>) {
  return useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      // Each feature occupies 100vh scroll travel within the section
      const target = top + (index + 0.15) * window.innerHeight;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [sectionRef]
  );
}

export function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Total slots: 6 features + 1 trailing slot (700vh total) so the final feature stays pinned while Ship slides over it
  const totalSlots = ALL_6_FEATURES.length + 1; // 7
  const exitStart = ALL_6_FEATURES.length / totalSlots; // 6/7 ≈ 0.857

  // Map scroll progress across the 700vh section to feature index 0→5
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // When next card (Ship) slides over during the 7th 100vh block:
  // scale down subtly (1 -> 0.94) and fade in dark shadow veil (0 -> 0.55)
  const exitScale = useTransform(scrollYProgress, [exitStart, 1], [1, 0.94]);
  const exitVeil = useTransform(scrollYProgress, [exitStart, 1], [0, 0.55]);

  const updateActiveIdx = useCallback((nextIdx: number) => {
    setActiveIdx((prev) => {
      if (nextIdx !== prev) {
        setDirection(nextIdx >= prev ? 1 : -1);
        return nextIdx;
      }
      return prev;
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Progress during the first 600vh maps to features 0 to 5; beyond 6/7 locks to feature 5 (Subagent)
    const activePortion = Math.min(1, v * (totalSlots / ALL_6_FEATURES.length));
    const idx = Math.max(
      0,
      Math.min(ALL_6_FEATURES.length - 1, Math.floor(activePortion * ALL_6_FEATURES.length))
    );
    updateActiveIdx(idx);
  });

  // Auto-play video when active feature changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIdx]);

  const rawJumpTo = useFeatureJump(sectionRef);
  const jumpTo = useCallback(
    (index: number) => {
      updateActiveIdx(index);
      rawJumpTo(index);
    },
    [rawJumpTo, updateActiveIdx]
  );

  const feat = ALL_6_FEATURES[activeIdx];
  const hasVideo = Boolean(feat.videoSrc);

  // Transition variants moving horizontally matching the progress bar flow
  const horizontalSlideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    /**
     * 600vh tall scroll container — each 100vh = one feature chamber.
     * The sticky child is pinned to the viewport for the full 600vh scroll travel.
     */
    <section
      ref={sectionRef}
      id="demo"
      className="relative z-20"
      style={{ height: `${(ALL_6_FEATURES.length + 2) * 100}vh` }}
    >
      {/* ═══════════════════════════════════════════════════════════
          STICKY PINNED STAGE — occupies exactly one viewport height
          Slides up over the final Harness card with deep shadow.
      ═══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0908] border-t border-[#3E3833]/80 shadow-[0_-30px_70px_rgba(0,0,0,0.98),0_-10px_25px_rgba(0,0,0,0.85)]">
        {/* Top hairline highlight for incoming architectural card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#78716C]/60 to-transparent z-30"
        />

        {/* Receding depth wrapper: scales down as next card (Ship) slides over during the 7th 100vh block */}
        <motion.div
          style={{ scale: exitScale }}
          className="relative w-full h-full flex flex-col justify-between origin-top will-change-transform"
        >

        {/* ── LAYER 0: FULL-SCREEN PIRANESI BACKDROP ────────────────
            This is NOT an image inside a box.
            The artwork IS the entire stage — no borders, no frames.
        ──────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          {ALL_6_FEATURES.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={f.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none will-change-[opacity]",
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <Image
                  src={f.bgAsset}
                  alt=""
                  fill
                  priority={i === 0 || i === 1}
                  sizes="100vw"
                  className={cn(
                    "object-cover contrast-[1.12] brightness-[0.80]",
                    f.bgFocus
                  )}
                />
                {/* Chiaroscuro: clear Piranesi etching artwork with text shadow on left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/90 via-[#0A0908]/35 to-[#0A0908]/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/70 via-transparent to-[#0A0908]/85" />
              </div>
            );
          })}
        </div>

        {/* ── LAYER 1: ARCHITECTURAL DATUM GRID (very subtle) ───────── */}
        <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-[4.5rem] left-0 right-0 h-px bg-[#3E3833]/25" />
          <div className="absolute bottom-[3.5rem] left-0 right-0 h-px bg-[#3E3833]/25" />
          {/* Vertical divider at ~55% only on large screens */}
          <div className="absolute inset-y-0 hidden lg:block" style={{ left: "55%" }}>
            <div className="h-full w-px bg-[#2A2622]/40" />
          </div>
        </div>

        {/* ── LAYER 2: CONTENT INSCRIBED INTO THE ARCHITECTURAL SPACE ── */}
        <div className="relative z-10 h-full flex flex-col">

          {/* TOP HEADER BAR — clear of left & right sidebars (w-16 = 64px) */}
          <div className="flex items-center justify-between px-5 sm:px-8 md:px-20 lg:px-24 py-3 border-b border-[#2A2622]/60 bg-[#0A0908]/55 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-[11px] font-bold text-[#D6D3D1] tracking-wider">
                CAPABILITIES // {feat.label.toUpperCase()}
              </span>
              <span className="font-mono text-[11px] text-[#3E3833]">{feat.featureNum}</span>
            </div>

            {/* 6-dot feature navigator */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Showcase features">
              {ALL_6_FEATURES.map((f, i) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={i === activeIdx}
                  onClick={() => jumpTo(i)}
                  title={`${f.code} — ${f.label}`}
                  className="group flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <span
                    className={cn(
                      "block transition-all duration-200",
                      i === activeIdx
                        ? "w-4 h-1 bg-[#38BDF8] rounded-full"
                        : "w-1.5 h-1.5 bg-[#3E3833] rounded-full group-hover:bg-[#78716C]"
                    )}
                  />
                   <span className={cn("font-mono text-[9px] hidden sm:block", i === activeIdx ? "text-[#A8A29E]" : "text-[#3E3833] group-hover:text-[#78716C]")}>
                    {f.code}
                  </span>
                </button>
              ))}
            </div>

            <span className="font-mono text-[10px] text-[#3E3833] hidden sm:block">{feat.code} // {feat.label.toUpperCase()}</span>
          </div>

          {/* MAIN BODY — fills remaining height */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

            {/* LEFT: MONUMENTAL INSCRIPTION ON STONE — clear of left sidebar ──── */}
            <div className="lg:w-[52%] flex flex-col justify-center px-5 sm:px-8 md:pl-20 md:pr-8 lg:pl-24 lg:pr-10 py-6 lg:py-10 overflow-y-auto">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={feat.id}
                  custom={direction}
                  variants={horizontalSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl"
                >
                  {/* Giant dim ordinal watermark — limestone stone tone, Piranesi scale */}
                  <div
                    aria-hidden="true"
                    className="font-cinzel font-bold text-[#F5F5F4]/[0.05] leading-none select-none -ml-1 mb-1"
                    style={{ fontSize: "clamp(5rem,14vw,11rem)" }}
                  >
                    {feat.code}
                  </div>

                  {/* Feature title — offset over the giant numeral */}
                  <div className="-mt-6 sm:-mt-10 lg:-mt-14 relative z-10">
                    {/* Surveyor's notation — muted stone, NOT cyan */}
                    <div className="font-mono text-[11px] text-[#78716C] mb-2 tracking-wider">
                      ├── {feat.tagline}
                    </div>

                    <h2
                      className="font-sans font-semibold text-[#F5F5F4] leading-[1.1] mb-3"
                      style={{ fontSize: "clamp(1.5rem,3.5vw,2.6rem)" }}
                    >
                      {feat.title}
                    </h2>

                    <p className="text-[#A8A29E] font-serif leading-relaxed mb-5 text-sm sm:text-base">
                      {feat.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-[#3E3833]/40">
                      {feat.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#D6D3D1] font-mono">
                          <Check className="w-3.5 h-3.5 text-[#A8A29E] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* VERTICAL DIVIDER (desktop only) */}
            <div className="hidden lg:block w-px bg-[#2A2622]/50 self-stretch" />

            {/* RIGHT: TERMINAL / VIDEO — clear of right sidebar ── */}
            <div className="lg:w-[48%] flex flex-col justify-center px-5 sm:px-6 md:pr-20 md:pl-6 lg:pr-24 lg:pl-8 py-5 overflow-y-auto">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={feat.id + "-terminal"}
                  custom={direction}
                  variants={horizontalSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  {/* Terminal chrome bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#0A0908]/85 border border-[#2A2622] border-b-0 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2A2622]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2A2622]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2A2622]" />
                      </div>
                      <Terminal className="w-3 h-3 text-[#A8A29E]" />
                      <span className="font-mono text-[11px] text-[#D6D3D1]">cube ~ {feat.id}</span>
                    </div>

                    <span className="font-mono text-[10px] text-[#78716C]">
                      {hasVideo ? "CAPTURE ACTIVE" : "STANDBY"}
                    </span>
                  </div>

                  {/* Content area: MP4 video if available, otherwise COMING SOON placeholder */}
                  <div className="border border-[#2A2622] bg-[#050403]/90 backdrop-blur-sm overflow-hidden">
                    {hasVideo ? (
                      <div className="relative aspect-video w-full bg-[#050403]">
                        <video
                          ref={videoRef}
                          key={feat.videoSrc}
                          src={feat.videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video w-full flex flex-col items-center justify-center p-6 bg-[#050403]/95 text-center">
                        {/* Subtle corner ticks */}
                        <div className="absolute top-2.5 left-2.5 font-mono text-[9px] text-[#3E3833]">┌ DEMO // {feat.code}</div>
                        <div className="absolute top-2.5 right-2.5 font-mono text-[9px] text-[#3E3833]">{feat.label.toUpperCase()} ┐</div>
                        <div className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-[#3E3833]">└ CUBE RUNTIME</div>
                        <div className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-[#3E3833]">┘</div>

                        <div className="w-10 h-10 border border-[#2A2622] bg-[#0C0B09] flex items-center justify-center mb-3">
                          <Terminal className="w-4 h-4 text-[#78716C]" />
                        </div>
                        <span className="font-serif text-sm tracking-[0.25em] uppercase text-[#D6D3D1]">
                          COMING SOON
                        </span>
                        <p className="mt-1.5 font-mono text-[11px] text-[#78716C] max-w-xs">
                          Live terminal demonstration for {feat.label} is currently in recording.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#0A0908]/85 border border-t-0 border-[#2A2622] backdrop-blur-sm text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          hasVideo ? "bg-[#38BDF8] animate-pulse" : "bg-[#3E3833]"
                        )}
                      />
                      <span className={hasVideo ? "text-[#D6D3D1] font-semibold" : "text-[#78716C]"}>
                        LIVE TERMINAL CAPTURE
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* BOTTOM FEATURE PROGRESS BAR — clear of sidebars (w-16 = 64px) */}
          <div className="px-5 sm:px-8 md:px-20 lg:px-24 py-3 border-t border-[#2A2622]/60 bg-[#0A0908]/55 backdrop-blur-sm flex items-center gap-4">
            {/* Prev */}
            <button
              onClick={() => jumpTo(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="text-[#78716C] hover:text-[#F5F5F4] disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Previous feature"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Feature progress ruler */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <span className="font-mono text-[10px] text-[#78716C] shrink-0">I</span>
              <div className="relative flex-1 h-[3px] bg-[#1A1816] overflow-visible">
                {/* Filled progress */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#38BDF8]"
                  animate={{ width: `${((activeIdx + 1) / ALL_6_FEATURES.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                {/* Tick marks at each feature */}
                {ALL_6_FEATURES.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => jumpTo(i)}
                    className="absolute top-[-4px] w-[3px] h-[11px] cursor-pointer transition-colors"
                    style={{ left: `${(i / (ALL_6_FEATURES.length - 1)) * 100}%` }}
                    title={`${f.code} ${f.label}`}
                  >
                    <div className={cn("w-full h-full", i <= activeIdx ? "bg-[#38BDF8]" : "bg-[#2A2622]")} />
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#78716C] shrink-0">VI</span>
            </div>

            {/* Next */}
            <button
              onClick={() => jumpTo(Math.min(ALL_6_FEATURES.length - 1, activeIdx + 1))}
              disabled={activeIdx === ALL_6_FEATURES.length - 1}
              className="text-[#78716C] hover:text-[#F5F5F4] disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Next feature"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Current feature readout */}
            <div className="font-mono text-[11px] text-[#F5F5F4] font-bold shrink-0">
              FEATURE {feat.code} // VI
            </div>
          </div>
        </div>
        {/* ─────────────────────────────────────────────────────────── */}
        </motion.div>

        {/* Receding dark shadow veil when Ship slides over */}
        <motion.div
          style={{ opacity: exitVeil }}
          className="pointer-events-none absolute inset-0 z-40 bg-[#0A0908]"
        />
      </div>
    </section>
  );
}
