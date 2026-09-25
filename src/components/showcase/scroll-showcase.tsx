"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { Cube3DNavigator } from "./cube-navigator-3d";
import { cn } from "@/lib/utils";

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
  },
];

interface TerminalPreview {
  command: string;
  badge: string;
  lines: { type: "info" | "success" | "warn" | "text" | "prompt"; text: string }[];
}

const FEATURE_TERMINAL_PREVIEWS: Record<string, TerminalPreview> = {
  gateway: {
    command: "/gateway oauth anthropic",
    badge: "GATEWAY ROUTER",
    lines: [
      { type: "info", text: "Initiating browser PKCE OAuth 2.0 handshake..." },
      { type: "success", text: "✔ Authenticated with Claude Pro (anthropic)" },
      { type: "text", text: "  Active Model : claude-3-7-sonnet-20250219" },
      { type: "text", text: "  Thinking     : Enabled (effort: high)" },
      { type: "text", text: "  Billing      : Direct monthly subscription ($0 markup)" },
      { type: "prompt", text: "Ready for instructions." },
    ],
  },
  skill: {
    command: "/status --context",
    badge: "WORKSPACE DISCOVERY",
    lines: [
      { type: "info", text: "Scanning repository tree from D:\\projects\\payments..." },
      { type: "success", text: "✔ Located Git root and 3 rule files:" },
      { type: "text", text: "  • AGENTS.md (Monorepo boundary, pnpm, strict ESM)" },
      { type: "text", text: "  • .agents/skills/database.md (Migration safety protocols)" },
      { type: "text", text: "  • .cube/rules/formatting.md (Prettier and 100-col wrapping)" },
      { type: "prompt", text: "Project conventions loaded into prompt context." },
    ],
  },
  hitl: {
    command: "cube refactor --safe",
    badge: "SAFE EXECUTION",
    lines: [
      { type: "warn", text: "▲ HUMAN-IN-THE-LOOP APPROVAL REQUIRED" },
      { type: "text", text: "  Action   : atomic_file_write -> src/auth/token-store.ts" },
      { type: "text", text: "  Diff     : +38 lines, -12 lines (AES-256 encryption)" },
      { type: "warn", text: "  Command  : pnpm --filter @cube/runtime test:auth" },
      { type: "text", text: "  [Y] Approve & Execute   [D] View Unified Diff   [N] Abort" },
      { type: "prompt", text: "Awaiting developer keystroke..." },
    ],
  },
  qa: {
    command: "cube plan \"migrate session store\"",
    badge: "INTENT CLARIFICATION",
    lines: [
      { type: "info", text: "Architectural decision point detected:" },
      { type: "text", text: "? Select target persistence engine for session threads:" },
      { type: "success", text: "  ❯ 1. Embedded LibSQL (Local SQLite, zero network latency)" },
      { type: "text", text: "    2. PostgreSQL with pgvector (Remote multi-machine sync)" },
      { type: "text", text: "    3. In-memory ephemeral (Discards state on exit)" },
      { type: "prompt", text: "Use ↑/↓ arrows to select, Enter to confirm" },
    ],
  },
  mcp: {
    command: "cube mcp status",
    badge: "MODEL CONTEXT PROTOCOL",
    lines: [
      { type: "info", text: "Checking active Model Context Protocol connections..." },
      { type: "success", text: "✔ 2 MCP servers connected via stdio:" },
      { type: "text", text: "  • @modelcontextprotocol/server-postgres (12 schema tools)" },
      { type: "text", text: "  • github-mcp-server (issues, PRs, review comments)" },
      { type: "prompt", text: "All 18 external tools registered into agent schema." },
    ],
  },
  subagent: {
    command: "cube run --parallel",
    badge: "PARALLEL WORKERS",
    lines: [
      { type: "info", text: "Spawning isolated background subagent workers..." },
      { type: "success", text: "✔ Worker #1 [Explorer]: Analyzed 84 import dependencies" },
      { type: "success", text: "✔ Worker #2 [Tester]: Executing 32 integration test suites" },
      { type: "info", text: "• Worker #3 [Refactorer]: Applying AST codemod in branch" },
      { type: "prompt", text: "Main thread unblocked. Turns streaming live." },
    ],
  },
};

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeFeature = FEATURES[activeIndex] || FEATURES[0];
  const currentVideo = activeFeature.videoSrc;
  const isVideoAvailable = currentVideo && !failedVideos[currentVideo];

  // Set up IntersectionObserver to sync scroll position with active feature demo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectFacet = (index: number) => {
    setActiveIndex(index);
    const targetEl = sectionRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section id="showcase" className="relative border-t border-[#27272A] bg-transparent">
      {/* Section Eyebrow Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
          <span>6 ARCHITECTURAL PILLARS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-white leading-[1.15]">
          Six dimensions of terminal intelligence.
        </h2>
        <p className="mt-3 text-base text-[#A1A1AA] max-w-xl mx-auto">
          Engineered for speed, privacy, and full developer agency. Explore how Cube orchestrates models, workspace context, and safe execution directly inside your shell.
        </p>
      </div>

      {/* Two-Column Scroll-Synced Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Stacked feature sections (min-h-[75vh] each) */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-0 pb-20 lg:pb-44">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                data-index={idx}
                className={cn(
                  "min-h-[50vh] lg:min-h-[75vh] flex flex-col justify-center py-12 transition-opacity duration-300",
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
          <div className="lg:col-span-7 lg:sticky lg:top-20 pb-16">
            {/* Concept 1: 3D Isometric Wireframe Cube Navigator */}
            <Cube3DNavigator
              activeIndex={activeIndex}
              onSelectIndex={handleSelectFacet}
              features={FEATURES.map((f) => ({
                id: f.id,
                label: f.label,
                faceName: f.faceName,
              }))}
            />

            {/* macOS Terminal Window Container */}
            <div className="rounded-[10px] border border-[#27272A] bg-[#0D0D0F] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* macOS Window Chrome */}
              <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
                {/* Traffic light dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                </div>

                {/* Path and title bar */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] truncate px-2">
                  <Terminal className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-white font-medium truncate">
                    ~/workspace/cube | claude-3-7-sonnet (thinking: high)
                  </span>
                </div>

                {/* Right spacer to balance traffic light buttons */}
                <div className="w-12 shrink-0 hidden sm:block" />
              </div>

              {/* Terminal Screen Content (Plays video of active facet, or shows prompt with facet info) */}
              <div className="relative min-h-[380px] sm:min-h-[460px] bg-[#090A0E] flex flex-col justify-start overflow-hidden">
                {isVideoAvailable ? (
                  <video
                    key={currentVideo}
                    src={currentVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => {
                      setFailedVideos((prev) => ({ ...prev, [currentVideo]: true }));
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 font-mono text-[13px] text-white flex flex-col justify-between h-full min-h-[380px] sm:min-h-[460px]">
                    <div className="space-y-3">
                      {/* Terminal header line with prompt */}
                      <div className="flex items-center gap-2 pb-2 border-b border-[#27272A]/60">
                        <span className="text-[#A1A1AA] select-none text-xs">~/workspace/cube</span>
                        <span className="text-[#27272A]">•</span>
                        <span className="text-xs text-white/80 font-semibold">
                          {FEATURE_TERMINAL_PREVIEWS[activeFeature.id]?.badge || activeFeature.faceName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white pt-1">
                        <span className="text-white select-none font-bold">❯</span>
                        <span className="text-white font-medium">
                          {FEATURE_TERMINAL_PREVIEWS[activeFeature.id]?.command || `cube ${activeFeature.id}`}
                        </span>
                      </div>

                      {/* Output lines */}
                      <div className="space-y-1.5 pt-2 text-xs sm:text-[13px]">
                        {FEATURE_TERMINAL_PREVIEWS[activeFeature.id]?.lines.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            className={cn(
                              "font-mono leading-relaxed",
                              line.type === "info" && "text-[#A1A1AA]",
                              line.type === "success" && "text-white font-medium",
                              line.type === "warn" && "text-white font-semibold",
                              line.type === "text" && "text-[#A1A1AA]/80",
                              line.type === "prompt" && "text-white/60 pt-2"
                            )}
                          >
                            {line.text}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status & Blinking Cursor */}
                    <div className="pt-4 border-t border-[#27272A]/40 flex items-center justify-between text-xs text-[#A1A1AA]">
                      <div className="flex items-center gap-2">
                        <span className="text-white select-none font-bold">❯</span>
                        <span className="w-2 h-4 bg-white animate-pulse" />
                      </div>
                      <span className="text-[11px] font-mono text-[#A1A1AA]/50">
                        {activeFeature.faceName} FACE · {activeFeature.label.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
