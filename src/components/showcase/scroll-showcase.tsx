"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { Cube3DNavigator } from "./cube-navigator-3d";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalMockLine {
  type: "cmd" | "info" | "success" | "warn" | "bullet" | "output";
  text: string;
}

interface ShowcaseFeature {
  id: string;
  label: string;
  faceName: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  videoSrc: string;
  terminalLines: TerminalMockLine[];
}

const FEATURES: ShowcaseFeature[] = [
  {
    id: "gateway",
    label: "Gateway",
    faceName: "FRONT",
    videoSrc: "/demos/gateway.mp4",
    badge: "01 · FRONT FACE: GATEWAY",
    title: "Multi-Gateway Model Matrix",
    tagline: "Your subscriptions. Your keys. Zero lock-in.",
    description:
      "Connect directly to Claude Pro, ChatGPT Plus, or Grok memberships via browser PKCE OAuth 2.0 with zero token markup. Plug in any of 15+ developer API keys, or run 100% offline with local Ollama models.",
    bullets: [
      "PKCE OAuth for Claude Pro / ChatGPT Plus / Grok",
      "15+ Developer API providers with unified fallback routing",
      "100% Air-gapped offline inference via Ollama & LM Studio",
    ],
    terminalLines: [
      { type: "cmd", text: "cube gateway status" },
      { type: "success", text: "PKCE OAuth: Claude Pro (Quota: Active · 5hr window)" },
      { type: "info", text: "API Matrix: 15 providers configured (Anthropic, OpenAI, Grok, Gemini)" },
      { type: "bullet", text: "Local Engine: Ollama / qwen2.5-coder:32b (100% Offline ready)" },
      { type: "output", text: "Active Model: claude-3-7-sonnet via OAuth · Zero token markup" },
    ],
  },
  {
    id: "skill",
    label: "Skill",
    faceName: "RIGHT",
    videoSrc: "/demos/skill.mp4",
    badge: "02 · RIGHT FACE: SKILL",
    title: "Workspace Skill & Rule Discovery",
    tagline: "Architectural context right where you code.",
    description:
      "Cube crawls project directories and walks up parent folders to automatically discover AGENTS.md rules, repository guidelines, and custom skill scripts. Injected into every turn with zero prompt copy-pasting.",
    bullets: [
      "Automatic AGENTS.md rule discovery across parent trees",
      "Dynamic skill loading with isolated execution runtimes",
      "Zero prompt maintenance across multiple monorepos",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube run "refactor database client"' },
      { type: "info", text: "[workspace] Scanning directory tree for project guidelines..." },
      { type: "success", text: "Discovered root AGENTS.md (14 rules injected)" },
      { type: "info", text: "[skill] Loaded .cube/skills/sql-migration.md" },
      { type: "output", text: "Architectural context injected into turn context with zero maintenance" },
    ],
  },
  {
    id: "hitl",
    label: "HITL",
    faceName: "TOP",
    videoSrc: "/demos/hitl.mp4",
    badge: "03 · TOP FACE: HITL",
    title: "Human-in-the-Loop Safeguards",
    tagline: "Absolute developer authority.",
    description:
      "No silent overwrites or rogue actions. Before applying atomic disk modifications or running potentially destructive terminal commands, Cube prompts for explicit developer confirmation with full unified diff previews.",
    bullets: [
      "Human confirmation required for sensitive bash commands",
      "Side-by-side colorized unified diff previews before write",
      "One-key rollback and atomic disk commit guarantees",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube exec "rm -rf ./dist && pnpm migrate:prod"' },
      { type: "warn", text: "GUARDRAIL TRIGGERED: Potentially destructive disk mutation" },
      { type: "output", text: "Target: Recursive directory deletion & production database schema change" },
      { type: "cmd", text: "Approve atomic execution? [y/N]: y" },
      { type: "success", text: "Action authorized by developer. Executed safely with atomic rollback point." },
    ],
  },
  {
    id: "qa",
    label: "Q&A",
    faceName: "LEFT",
    videoSrc: "/demos/qa.mp4",
    badge: "04 · LEFT FACE: Q&A",
    title: "Interactive Intent Clarification",
    tagline: "Resolve ambiguity before writing code.",
    description:
      "When requirements are underspecified or architectural tradeoffs arise, Cube presents keyboard-driven multiple-choice questions right in your shell to lock down exact implementation specs.",
    bullets: [
      "Interactive arrow-key multiple choice in terminal TUI",
      "Clarify underspecified requirements early in planning",
      "Instant architectural alignment without endless chat loops",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube plan "migrate authentication subsystem"' },
      { type: "info", text: "? Multiple architecture patterns detected. Choose approach:" },
      { type: "bullet", text: "[Recommended] OAuth PKCE flow (Zero storage of credentials)" },
      { type: "bullet", text: "Static API key rotation with LibSQL encryption" },
      { type: "bullet", text: "Delegated subagent auth broker" },
      { type: "success", text: "Selection confirmed via arrow keys. Specs locked down before writing code." },
    ],
  },
  {
    id: "mcp",
    label: "MCP",
    faceName: "BOTTOM",
    videoSrc: "/demos/mcp.mp4",
    badge: "05 · BOTTOM FACE: MCP",
    title: "Model Context Protocol Foundation",
    tagline: "Universal tool & data interoperability.",
    description:
      "Built-in Model Context Protocol (MCP) client architecture. Seamlessly connect external tool servers, database inspectors, browser automation runtimes, and proprietary enterprise endpoints through open standards.",
    bullets: [
      "Universal MCP client supporting stdio and SSE transports",
      "Connect databases, GitHub, browser automation, and APIs",
      "Community server ecosystem with zero custom adapter code",
    ],
    terminalLines: [
      { type: "cmd", text: "cube mcp list" },
      { type: "success", text: "Model Context Protocol (MCP) client online" },
      { type: "bullet", text: "postgres-inspector (stdio transport · 6 tools active)" },
      { type: "bullet", text: "github-context (stdio transport · 8 tools active)" },
      { type: "bullet", text: "browser-playwright (sse transport · 12 tools active)" },
      { type: "output", text: "Connected 3 MCP servers · 26 external tools available" },
    ],
  },
  {
    id: "subagent",
    label: "Subagent",
    faceName: "BACK",
    videoSrc: "/demos/subagent.mp4",
    badge: "06 · BACK FACE: SUBAGENT",
    title: "Parallel Subagent Task Delegation",
    tagline: "Orchestrate autonomous worker teams.",
    description:
      "Deconstruct massive refactoring projects into isolated parallel subagent workers. Subagents conduct deep codebase exploration, write tests, and apply scoped edits concurrently without blocking your main prompt loop.",
    bullets: [
      "Spawn background worker subagents with isolated context",
      "Parallel codebase exploration, refactoring, and test writing",
      "Automatic dependency resolution and unified pull review",
    ],
    terminalLines: [
      { type: "cmd", text: 'cube run --parallel "audit & refactor monorepo"' },
      { type: "info", text: "[orchestrator] Deconstructing task into 2 isolated subagents:" },
      { type: "bullet", text: "subagent-1 (Research): Indexing packages & dependency graph" },
      { type: "bullet", text: "subagent-2 (Tester): Running test suite concurrently" },
      { type: "success", text: "Workers running in background. Main interactive shell is responsive." },
    ],
  },
];

const VIDEO_EXTENSIONS = [".mp4", ".webm"];

function TerminalScreen({
  activeFeature,
  isVideoAvailable,
  currentVideo,
  onVideoError,
}: {
  activeFeature: ShowcaseFeature;
  isVideoAvailable: boolean;
  currentVideo: string;
  onVideoError: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeFeature.id, currentVideo]);

  return (
    <div className="relative min-h-[320px] sm:min-h-[420px] bg-[#090A0E] flex flex-col justify-start overflow-hidden">
      {isVideoAvailable ? (
        <video
          ref={videoRef}
          key={`${activeFeature.id}-${currentVideo}`}
          src={currentVideo}
          autoPlay
          muted
          playsInline
          onError={onVideoError}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] text-white flex flex-col justify-between h-full min-h-[320px] sm:min-h-[420px]">
          <div className="space-y-3">
            {/* Terminal prompt bar */}
            <div className="flex items-center gap-2 text-xs text-[#A1A1AA] pb-3 border-b border-[#27272A]/50 overflow-hidden">
              <span className="text-[#27C93F] shrink-0">●</span>
              <span className="text-white font-medium shrink-0">cube-session</span>
              <span className="text-[#27272A] shrink-0">•</span>
              <span className="shrink-0">{activeFeature.faceName} FACE</span>
              <span className="text-[#27272A] shrink-0 hidden sm:inline">•</span>
              <span className="text-white/60 truncate hidden sm:inline">{activeFeature.tagline}</span>
            </div>

            {/* Simulated Shell Execution */}
            <div className="space-y-2 pt-1">
              {activeFeature.terminalLines?.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2.5 leading-relaxed text-[11px] sm:text-[13px]">
                  {line.type === "cmd" ? (
                    <>
                      <span className="text-white select-none font-bold shrink-0">❯</span>
                      <span className="text-white font-semibold">{line.text}</span>
                    </>
                  ) : line.type === "success" ? (
                    <>
                      <span className="text-[#27C93F] select-none shrink-0 font-bold">✔</span>
                      <span className="text-[#E4E4E7]">{line.text}</span>
                    </>
                  ) : line.type === "warn" ? (
                    <>
                      <span className="text-[#FFBD2E] select-none shrink-0 font-bold">⚠</span>
                      <span className="text-[#FFBD2E]">{line.text}</span>
                    </>
                  ) : line.type === "info" ? (
                    <>
                      <span className="text-[#60A5FA] select-none shrink-0">ℹ</span>
                      <span className="text-[#D4D4D8]">{line.text}</span>
                    </>
                  ) : line.type === "bullet" ? (
                    <>
                      <span className="text-[#A1A1AA] select-none shrink-0">▸</span>
                      <span className="text-[#E4E4E7]">{line.text}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-transparent select-none shrink-0">›</span>
                      <span className="text-[#A1A1AA]">{line.text}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Blinking Prompt Cursor */}
            <div className="flex items-center gap-2 pt-2 text-sm text-white">
              <span className="text-white select-none font-bold">❯</span>
              <span className="w-2 h-4 bg-white animate-pulse" />
            </div>
          </div>

          <div className="pt-4 border-t border-[#27272A]/40 flex items-center justify-between text-xs text-[#A1A1AA]">
            <span className="text-[11px] font-mono text-[#A1A1AA]/70 truncate">
              CUBE DEMO · {activeFeature.label.toUpperCase()}
            </span>
            <span className="text-[11px] font-mono text-[#A1A1AA]/50 shrink-0">
              Interactive Mode
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedFeatures, setFailedFeatures] = useState<Record<string, boolean>>({});
  const [extIndices, setExtIndices] = useState<Record<string, number>>({});
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeFeature = FEATURES[activeIndex] || FEATURES[0];
  const extIdx = extIndices[activeFeature.id] || 0;
  const currentVideo = `/demos/${activeFeature.id}${VIDEO_EXTENSIONS[extIdx]}`;
  const isVideoAvailable = !failedFeatures[activeFeature.id];

  const handleVideoError = () => {
    const currentIdx = extIndices[activeFeature.id] || 0;
    if (currentIdx < VIDEO_EXTENSIONS.length - 1) {
      setExtIndices((prev) => ({ ...prev, [activeFeature.id]: currentIdx + 1 }));
    } else {
      setFailedFeatures((prev) => ({ ...prev, [activeFeature.id]: true }));
    }
  };

  const isProgrammaticScroll = useRef(false);
  const scrollLockTimeout = useRef<NodeJS.Timeout | null>(null);

  // Set up IntersectionObserver ONLY on desktop (window.innerWidth >= 1024)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
              break;
            }
          }
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
    };
  }, []);

  const handleSelectFacet = (index: number) => {
    setActiveIndex(index);

    // Only scroll left-column cards into view on desktop (lg: >= 1024px)
    // On mobile (< 1024px), DO NOT scroll away so the demo remains right in front of the user!
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      isProgrammaticScroll.current = true;
      if (scrollLockTimeout.current) clearTimeout(scrollLockTimeout.current);
      scrollLockTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 850);

      const targetEl = sectionRefs.current[index];
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <section id="demo" className="relative border-t border-[#27272A] bg-transparent">
      <span id="showcase" className="sr-only" />
      {/* Section Eyebrow Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10 sm:pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>CORE CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-white leading-[1.15]">
          Terminal intelligence engineered for developer flow
        </h2>
        <p className="mt-3 text-base text-[#A1A1AA] max-w-xl mx-auto">
          Engineered for speed, privacy, and full developer agency. Explore how Cube orchestrates models, workspace context, and safe execution directly inside your shell.
        </p>
      </div>

      {/* Desktop Layout (>= lg): Two-Column Scroll-Synced Layout */}
      <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Stacked feature sections (scroll-synced) */}
          <div className="col-span-5 space-y-0 pb-44">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                data-index={idx}
                className={cn(
                  "min-h-[75vh] flex flex-col justify-center py-12 transition-opacity duration-300",
                  activeIndex === idx ? "opacity-100" : "opacity-35 hover:opacity-60"
                )}
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono text-white/70 tracking-wider">
                    {feature.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <div className="text-sm font-mono text-[#A1A1AA]">
                    {feature.tagline}
                  </div>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-2">
                    {feature.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs font-mono text-white/90 flex items-start gap-2">
                        <span className="text-white select-none">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A1A1AA]/60">
                    <span>Facet {idx + 1} of 6</span>
                    <span className="text-[#27272A]">•</span>
                    <span>Cube Face: {feature.faceName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky 3D Cube Navigator + macOS Terminal Panel */}
          <div className="col-span-7 sticky top-20 pb-16">
            <Cube3DNavigator
              activeIndex={activeIndex}
              onSelectIndex={handleSelectFacet}
              features={FEATURES.map((f) => ({
                id: f.id,
                label: f.label,
                faceName: f.faceName,
              }))}
            />

            <div className="rounded-[10px] border border-[#27272A] bg-[#0D0D0F] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] truncate px-2">
                  <Terminal className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-white font-medium truncate">
                    D:\cube | gpt-6-astra
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/10 shrink-0">
                  {activeFeature.faceName} FACE
                </span>
              </div>

              <TerminalScreen
                activeFeature={activeFeature}
                isVideoAvailable={isVideoAvailable}
                currentVideo={currentVideo}
                onVideoError={handleVideoError}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (< lg): Interactive Tabbed Showcase (Terminal Demo + Synced Detail Card) */}
      <div className="block lg:hidden max-w-xl mx-auto px-4 pb-20 space-y-4">
        {/* 3D Cube Interactive Rotating Model */}
        <Cube3DNavigator
          activeIndex={activeIndex}
          onSelectIndex={handleSelectFacet}
          features={FEATURES.map((f) => ({
            id: f.id,
            label: f.label,
            faceName: f.faceName,
          }))}
        />

        {/* 6-Facet Scrollable Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {FEATURES.map((feat, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={feat.id}
                onClick={() => handleSelectFacet(idx)}
                className={cn(
                  "relative px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer shrink-0 border",
                  isSelected
                    ? "text-black font-semibold border-white"
                    : "text-[#A1A1AA] hover:text-white border-[#27272A] bg-[#0D0D0F]"
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="mobileActiveFacetPill"
                    className="absolute inset-0 rounded-lg bg-white z-0"
                    transition={{ type: "spring", stiffness: 480, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={cn("text-[10px]", isSelected ? "text-black/70" : "text-[#A1A1AA]/60")}>
                    0{idx + 1}
                  </span>
                  <span>{feat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* macOS Terminal Window Container */}
        <div className="rounded-[10px] border border-[#27272A] bg-[#0D0D0F] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* macOS Window Chrome */}
          <div className="px-3.5 py-2.5 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A1A1AA] truncate px-1">
              <Terminal className="w-3 h-3 text-white shrink-0" />
              <span className="text-white font-medium truncate">
                D:\cube | gpt-6-astra
              </span>
            </div>

            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/10 shrink-0">
              {activeFeature.faceName}
            </span>
          </div>

          {/* Terminal Screen */}
          <TerminalScreen
            activeFeature={activeFeature}
            isVideoAvailable={isVideoAvailable}
            currentVideo={currentVideo}
            onVideoError={handleVideoError}
          />
        </div>

        {/* Active Feature Detail Card (Placed directly under the terminal) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="rounded-[10px] border border-[#27272A] bg-[#0D0D0F] p-4 sm:p-5 space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/70 tracking-wider">
                {activeFeature.badge}
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA]/60">
                Facet {activeIndex + 1} of 6
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug">
              {activeFeature.title}
            </h3>

            <div className="text-xs font-mono text-[#A1A1AA]">
              {activeFeature.tagline}
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              {activeFeature.description}
            </p>

            {/* Bullet points */}
            <ul className="space-y-1.5 pt-2 border-t border-[#27272A]/50">
              {activeFeature.bullets.map((b, bIdx) => (
                <li key={bIdx} className="text-xs font-mono text-white/90 flex items-start gap-2">
                  <span className="text-white select-none">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Previous / Next navigation buttons for thumb-friendly navigation */}
            <div className="pt-2.5 border-t border-[#27272A]/50 flex items-center justify-between">
              <button
                onClick={() => handleSelectFacet((activeIndex - 1 + FEATURES.length) % FEATURES.length)}
                className="px-3 py-1.5 rounded-md text-xs font-mono text-[#A1A1AA] hover:text-white bg-[#18181B] border border-[#27272A] transition-colors cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{FEATURES[(activeIndex - 1 + FEATURES.length) % FEATURES.length].label}</span>
              </button>

              <button
                onClick={() => handleSelectFacet((activeIndex + 1) % FEATURES.length)}
                className="px-3 py-1.5 rounded-md text-xs font-mono text-black font-semibold bg-white hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{FEATURES[(activeIndex + 1) % FEATURES.length].label}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
